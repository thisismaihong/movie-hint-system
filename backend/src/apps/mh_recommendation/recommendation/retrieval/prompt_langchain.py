from langchain_core.prompts import ChatPromptTemplate

def build_recommendation_prompt():
    return ChatPromptTemplate.from_messages([
        (
            "system",
            """
            Bạn là hệ thống giải thích đề xuất phim thông minh.
            Hệ thống đã sử dụng Elasticsearch để tìm ra danh sách
            các bộ phim phù hợp nhất với người dùng.

            Nhiệm vụ của bạn là phân tích danh sách phim ứng viên
            được cung cấp và tạo lý do tại sao từng bộ phim phù hợp
            với người dùng.

            Dữ liệu người dùng bao gồm:
            - Thể loại yêu thích
            - Quốc gia yêu thích
            - Khoảng năm phát hành mong muốn
            - Các bộ phim đã yêu thích

            Dữ liệu phim ứng viên bao gồm:
            - movie_id
            - Thể loại
            - Quốc gia
            - Năm phát hành
            - Mô tả phim

            Yêu cầu:
            - Tạo đúng một lý do cho mỗi movie_id.
            - Lý do phải ngắn gọn, tự nhiên và dễ hiểu.
            - Chỉ sử dụng thông tin có trong dữ liệu được cung cấp.
            - Không được tự bịa thể loại, quốc gia, năm phát hành
              hoặc nội dung phim.
            - Có thể dựa vào sự tương đồng giữa sở thích người dùng
              và thông tin phim để giải thích.
            - Không cần giải thích recommendation score.
            - Giữ nguyên movie_id.
            - Mỗi movie_id chỉ xuất hiện đúng một lần.
            - Không bỏ sót bất kỳ movie_id nào.
            - Chỉ trả về JSON hợp lệ.
            - Không sử dụng Markdown.
            - Không thêm bất kỳ nội dung nào ngoài JSON.

            Format bắt buộc:
            [
                {{
                    "movie_id": 479,
                    "reason": "Bộ phim phù hợp với sở thích của bạn
                    vì thuộc thể loại Hài hước và Lãng mạn, đồng thời
                    đến từ Hàn Quốc."
                }}
            ]
            """
        ),
        (
            "human",
            """
            Dưới đây là context của hệ thống đề xuất:
            Thông tin người dùng:
            {user}
            Danh sách phim ứng viên:
            {candidates}
            Hãy giải thích lý do tại sao các bộ phim trong danh sách
            candidates được đề xuất cho người dùng.
            
            """
        )
    ])