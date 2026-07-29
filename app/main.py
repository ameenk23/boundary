from fastapi import FastAPI

app = FastAPI(
    title="ODD Tool API",
    version="0.1.0",
)


@app.get("/")
def root():
    return {"message": "ODD Tool API is running"}