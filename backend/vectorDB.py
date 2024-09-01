import os
from dotenv import load_dotenv
from tqdm import tqdm
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

load_dotenv(dotenv_path="../api_keys.env")

# Initialise the embedding model and vector db
openai_embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = Chroma(
    collection_name="nomura_trailblazer24",
    embedding_function=openai_embeddings,
    persist_directory="./chroma_langchain_db"
)

# Load and chunk pdf documents
for file in tqdm(os.listdir("pdf_outputs"), "Processing pdfs"):
    loader = PyPDFLoader(f"pdf_outputs/{file}") # Load
    pages = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50) # Chunk
    splits = text_splitter.split_documents(pages)

    vector_store.add_documents(documents=splits, embeddings=openai_embeddings) # Add into vector store



'''
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


text = f"""
I have these following stocks: {', '.join(client_profile['current_portfolio'])}. 

My profile is:
Risk Tolerance: {client_profile['risk_tolerance']}
Preferred Sectors: {', '.join(client_profile['preferred_sectors'])}
Investment Horizon: {client_profile['investment_horizon']}
    
{QUERY}
"""

prompt = f"""
Human: You are a financial advisor, and provides answers to questions by using fact based and statistical information when possible. 
Use the following pieces of information to provide an answer to the question enclosed in <question> tags. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.

<context>

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
'''