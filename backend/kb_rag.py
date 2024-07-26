import boto3
import json

KB_ID = "6R8TDE7AER"
REGION = "us-east-1"
MODEL = "anthropic.claude-3-haiku-20240307-v1:0"

QUERY = """
I have these following stocks: AAPL, NVDA and TSLA. Can you summarise their news and recommend if I should buy, sell or hold each stocks?

"""
NUM_RESULTS = 20

# Setup bedrock
bedrock_agent_runtime = boto3.client(
    service_name="bedrock-agent-runtime",
    region_name=REGION,
)
bedrock_runtime = boto3.client('bedrock-runtime', region_name=REGION)

docs_only_response = bedrock_agent_runtime.retrieve(
    knowledgeBaseId=KB_ID,
    retrievalQuery={"text": QUERY},
    retrievalConfiguration={
        "vectorSearchConfiguration": {"numberOfResults": NUM_RESULTS,
                                      "overrideSearchType": "HYBRID"}
    },
)

'''
for doc in docs_only_response["retrievalResults"]:
    print(f"Citation:{doc}")


text_response = bedrock_agent_runtime.retrieve_and_generate(
    input={"text": QUERY},
    retrieveAndGenerateConfiguration={
        "type": "KNOWLEDGE_BASE",
        "knowledgeBaseConfiguration": {
            "knowledgeBaseId": KB_ID,
            "modelArn": MODEL,
        },
    },
)
# for citation in text_response["citations"]:
#     print(f"Citation:\n{citation}\n")
print(f"\nOutput:\n{text_response['output']['text']}\n")
'''

contexts = []
for retrievedResult in docs_only_response["retrievalResults"]:
    contexts.append(retrievedResult['content']['text'])

#print(contexts)

prompt = f"""
Human: You are a financial advisor AI system, and provides answers to questions by using fact based and statistical information when possible. 
Use the following pieces of information to provide an answer to the question enclosed in <question> tags. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.

<context>
{contexts}
</context>

<question>
{QUERY}
</question>

The response should be specific.

Assistant:"""

# payload with model paramters
messages = [{"role": 'user', "content": [{'type': 'text', 'text': prompt.format(contexts, QUERY)}]}]
llama2_payload = json.dumps({
    "prompt": prompt,
    "temperature": 0.5,
    "top_p": 0.5
})

modelId = 'meta.llama3-70b-instruct-v1:0' # change this to use a different version from the model provider
#accept = 'application/json'
#contentType = 'application/json'
response = bedrock_runtime.invoke_model(body=llama2_payload, modelId=modelId)
response_body = json.loads(response.get('body').read())
print(response_body['generation'])
#print(f"Generated Text: {response['generation']}")
#print(f"Prompt Token count:  {response['prompt_token_count']}")

