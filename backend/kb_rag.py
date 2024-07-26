import boto3
import json

KB_ID = "6R8TDE7AER"
REGION = "us-east-1"
MODEL = "anthropic.claude-3-haiku-20240307-v1:0"

# From the frontend client profile settings
client_profile = {
    "risk_tolerance": "low",
    "preferred_sectors": ["technology", "healthcare"],
    "investment_horizon": "long-term",
    "current_portfolio": ["AAPL", "AMZN", "TSLA"],
}

# User input from the chatbot
QUERY = f"""
Based on their news and my profile, recommend if I should buy, sell or hold each stocks?
Also recommend other stocks that can help to diversify my portfolio according to my profile and summarise their news.
"""

NUM_RESULTS = 20

# Setup bedrock
bedrock_agent_runtime = boto3.client(
    service_name="bedrock-agent-runtime",
    region_name=REGION,
)
bedrock_runtime = boto3.client('bedrock-runtime', region_name=REGION)

def get_docs(QUERY, client_profile):
    text = f"""
    I have these following stocks: {', '.join(client_profile['current_portfolio'])}. 

    My profile is:
    Risk Tolerance: {client_profile['risk_tolerance']}
    Preferred Sectors: {', '.join(client_profile['preferred_sectors'])}
    Investment Horizon: {client_profile['investment_horizon']}
    
    {QUERY}
    """
    docs_only_response = bedrock_agent_runtime.retrieve(
        knowledgeBaseId=KB_ID,
        retrievalQuery={"text": text},
        retrievalConfiguration={
            "vectorSearchConfiguration": {
                "numberOfResults": NUM_RESULTS,
                "overrideSearchType": "HYBRID",
            }
        },
    )

    return docs_only_response


def get_llm_response(QUERY, client_profile):
    docs_only_response = get_docs(QUERY, client_profile)

    contexts = []
    for retrievedResult in docs_only_response["retrievalResults"]:
        contexts.append(retrievedResult["content"]["text"])

    prompt = f"""
    Human: You are a financial advisor, and provides answers to questions by using fact based and statistical information when possible. 
    Use the following pieces of information to provide an answer to the question enclosed in <question> tags. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    
    <context>
    {contexts}
    </context>
    
    <question>
    I have these following stocks: {', '.join(client_profile['current_portfolio'])}. 

    My profile is:
    Risk Tolerance: {client_profile['risk_tolerance']}
    Preferred Sectors: {', '.join(client_profile['preferred_sectors'])}
    Investment Horizon: {client_profile['investment_horizon']}
    
    {QUERY}
    </question>
    
    The response should be specific.
    
    Assistant:"""

    # model paramters
    llama2_payload = json.dumps({"prompt": prompt, "temperature": 0.5, "top_p": 0.5})

    modelId = "meta.llama3-70b-instruct-v1:0"  # change this to use a different version from the model provider
    response = bedrock_runtime.invoke_model(body=llama2_payload, modelId=modelId)
    response_body = json.loads(response.get("body").read())

    return response_body["generation"]
