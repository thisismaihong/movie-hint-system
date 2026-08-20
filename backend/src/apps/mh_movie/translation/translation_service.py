import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm=ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=os.getenv("GEMINI_API_KEY"))

translation_prompt=ChatPromptTemplate([
    (
        "system",
        """
        Bạn là một hệ thống dịch nội dung phim.

        Nhiệm vụ:
        - Dịch chính xác nội dung phim từ tiếng Anh sang tiếng Việt.
        - Giữ nguyên ý nghĩa, tên riêng, nhân vật và bối cảnh.
        - Văn phong tự nhiên, dễ đọc như phần mô tả phim trên các nền tảng xem phim.
        - Không thêm thông tin không có trong nội dung gốc.
        - Chỉ trả về nội dung đã dịch, không giải thích thêm.
        """
    ),
    (
        "human",
        """
        Hãy dịch nội dung phim sau sang tiếng Việt:
        {text}
        """
    )
])


def translate_movie_description(description_en):
    if not description_en:
        return ""

    prompt = translation_prompt.format_messages(text=description_en)
    response=llm.invoke(prompt)


    return response.content[0]["text"].strip()


