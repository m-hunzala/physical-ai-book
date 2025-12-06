from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class RAGQuery(BaseModel):
    query: str

@app.get("/")
async def read_root():
    return {"message": "FastAPI backend for AI Book RAG System"}

@app.post("/api/rag")
async def rag_endpoint(query: RAGQuery):
    # Placeholder for Qdrant query and LLM call
    return {"response": f"This is a dummy response to your query: '{query.query}'"}
