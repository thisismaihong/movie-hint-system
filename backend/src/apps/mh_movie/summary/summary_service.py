import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm=ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=os.getenv("GEMINI_API_KEY"))

summary_prompt=ChatPromptTemplate([
    (
        "system",
        """
        Bạn là một hệ thống tóm tắt nội dung phim.

        Nhiệm vụ:
        - Tóm tắt nội dung phim bằng tiếng Việt.
        - Chỉ giữ lại cốt truyện chính, nhân vật chính và nội dung quan trọng nhất.
        - Loại bỏ các chi tiết phụ, mô tả dài dòng và thông tin không cần thiết.
        - Không thêm bất kỳ thông tin nào không có trong nội dung gốc.
        - Viết tự nhiên, dễ hiểu, giống phần giới thiệu phim trên website.

        QUY ĐỊNH BẮT BUỘC:
        - Chỉ viết từ 2 đến 3 câu.
        - Tối đa 60 từ.
        - Không chia thành nhiều đoạn.
        - Không dùng gạch đầu dòng.
        - Không mở đầu bằng "Bộ phim kể về..." hoặc "Phim kể về...".
        """
    ),
    (
        "human",
        """
        Hãy tóm tắt nội dung phim sau bằng tiếng Việt.
        Chỉ trả về phần tóm tắt, không giải thích thêm:
        {text}
        """
    )
])


def summary_movie_description(description_en):
    if not description_en:
        return ""

    prompt = summary_prompt.format_messages(text=description_en)
    response=llm.invoke(prompt)

    return response.content[0]["text"].strip()


