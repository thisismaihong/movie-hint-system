import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from .prompt_langchain import build_search_prompt

load_dotenv()

llm=ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"))
def generate_search_reason(context):
    prompt = build_search_prompt()
    message=prompt.invoke({
        "query": context["query"],
        "candidates": context["candidates"]
    })
    response=llm.invoke(message)
    content=response.content

    if isinstance(content,list):
        content="".join(
            item.get("text","") for item in content if isinstance(item, dict)
        )
    # print("===== RAW GEMINI RESPONSE =====")
    # print(repr(content))
    # print("================================")

    content = content.strip()

    if content.startswith("```json"):
        content = content[7:]
    if content.endswith("```"):
        content = content[:-3]

    content = content.strip()

    result=json.loads(content)
    return result
