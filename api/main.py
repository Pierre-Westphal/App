import requests
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API alive"}

@app.get("/health")
def health():
    return {"message": "API Health"}

@app.post("/login")
async def login(request: Request):
    print(request.headers.get('Content-Type'))
    print(request.json())
    return await request.json()