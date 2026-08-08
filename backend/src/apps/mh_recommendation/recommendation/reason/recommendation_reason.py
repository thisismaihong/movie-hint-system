from langchain_google_genai import ChatGoogleGenerativeAI
import json
from ..reason.prompt_langchain import build_recommendation_prompt

llm=ChatGoogleGenerativeAI(model="gemini-3.6-flash")

def generate_recommendation_reason(context):
    prompt=build_recommendation_prompt()
    message=prompt.invoke({
        "user":context["user"],
        "candidates":context["candidates"]
    })
    response=llm.invoke(message)
    reasons=json.loads(response.content[0]["text"])
    reason_map={
        item["movie_id"]: item["reason"] for item in reasons
    }
    candidates=context["candidates"]
    for movie in candidates:
        movie["reason"]=reason_map.get(movie["movie_id"])
    return candidates