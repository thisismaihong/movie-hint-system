from langchain_core.prompts import ChatPromptTemplate


def build_search_prompt():
    return ChatPromptTemplate.from_messages([
        (
            "system",
            """
            Bạn là hệ thống tìm kiếm và giải thích phim theo ngữ nghĩa.
            Nhiệm vụ của bạn là phân tích truy vấn của người dùng và danh sách
            các bộ phim được Elasticsearch tìm thấy, sau đó chọn ra đúng 5 bộ phim
            phù hợp nhất với truy vấn.
            
            Yêu cầu:
             - Chỉ sử dụng thông tin có trong dữ liệu được cung cấp.
            - Chỉ được tham chiếu đến các bộ phim có trong danh sách candidates.
            - Không được tự bịa thêm bộ phim khác.
            - Không được tự bịa nội dung phim.
            - Nếu candidates rỗng, trả về JSON rỗng [].
            - Nếu candidates có từ 1 đến 5 bộ phim, phải lấy tất cả các bộ phim
              trong candidates và chỉ tạo lý do cho từng bộ phim, không được
              loại bỏ hoặc chọn lọc phim.
            - Nếu candidates có nhiều hơn 5 bộ phim, chọn chính xác 5 bộ phim
              phù hợp nhất với truy vấn.
            - Khi candidates có nhiều hơn 5 bộ phim, ưu tiên mức độ phù hợp
              về nội dung phim với truy vấn của người dùng.
            - Mỗi bộ phim được chọn phải có một lý do ngắn gọn, tự nhiên và
              liên quan trực tiếp đến truy vấn.
            - Không cần giải thích score.
            - Giữ nguyên movie_id.
            - Mỗi movie_id chỉ xuất hiện đúng một lần.
            - Chỉ trả về JSON hợp lệ.
            - Không thêm bất kỳ nội dung nào ngoài JSON.

            
            Format bắt buộc:
            [
                {{
                    "movie_id": 965,
                    "title_en": "See You Yesterday",
                    "retrieval": "Lý do phim phù hợp với truy vấn..."
                }}
            ]
            """
        ),
        (
            "human",
            """
            Mô tả nội dung phim của người dùng:
            {query}
            
            Danh sách phim được Elasticsearch tìm thấy:
            {candidates}
            
            Hãy xử lý danh sách candidates theo các quy tắc sau:
            - Nếu candidates rỗng, chỉ trả về [].
            - Nếu candidates có từ 1 đến 5 bộ phim, lấy toàn bộ candidates
              và tạo lý do cho từng bộ phim.
            - Nếu candidates có nhiều hơn 5 bộ phim, chọn chính xác 5 bộ phim
              phù hợp nhất với truy vấn và tạo lý do cho từng bộ phim.
            Chỉ trả về 5 bộ phim được chọn theo format JSON đã yêu cầu.
            """
        )
    ])