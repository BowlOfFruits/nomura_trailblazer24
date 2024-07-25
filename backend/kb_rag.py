import boto3

KB_ID = "6R8TDE7AER"
QUERY = "I have these following stocks: AAPL, NVDA and TSLA. Can you summarise their news?"
REGION = "us-east-1"
MODEL = "anthropic.claude-3-haiku-20240307-v1:0"

NUM_RESULTS = 30

# Setup bedrock
bedrock_agent_runtime = boto3.client(
    service_name="bedrock-agent-runtime",
    region_name=REGION,
)

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

print(contexts)