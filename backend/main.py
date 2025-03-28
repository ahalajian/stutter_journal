from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from story_generation import generate_story
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class StoryRequest(BaseModel):
    words: list[str]
    tone: str | None = None

@app.post("/generate-story")
def generate_story_endpoint(request: StoryRequest):
    try:
        story = generate_story(request.words, request.tone)
        return {"story": story}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))