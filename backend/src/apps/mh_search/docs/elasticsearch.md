# ELASTICSEARCH - CHỨC NĂNG TÌM KIẾM PHIM

## Tổng quan

Chức năng tìm kiếm phim bằng ngôn ngữ tự nhiên được xây dựng theo 4 giai đoạn:
1. Chuẩn bị dữ liệu
2. Retrieval
3. RAG
4. API

# GIAI ĐOẠN 1 - CHUẨN BỊ DỮ LIỆU

## 1. Mục tiêu
Giai đoạn 1 có nhiệm vụ chuyển dữ liệu phim từ Database thành các vector embedding và đưa vào Elasticsearch để phục vụ cho việc tìm kiếm phim theo ngữ nghĩa ở Giai đoạn 2.

Dữ liệu hiện tại:
- Tổng số phim: **3201**
- Trường nội dung sử dụng để embedding: `description_en`
- Embedding Model: `BAAI/bge-m3`
- Số chiều vector: **1024**
- Elasticsearch version: **8.19.0**
- Vector similarity: **cosine similarity**


## 2. Pipeline tổng thể
Quá trình chuẩn bị dữ liệu được thực hiện theo thứ tự sau:
### Bước 1. prepare_movie_data.py
- Lấy dữ liệu Movie từ Django Database
- Xây dựng movie_text từ description_en
### Bước 2. generate_embeddings.py
- Load Embedding Model
- BAAI/bge-m3
- Chuyển movie_text thành vector 
### Bước 3. save_embeddings.py
- Lưu vector vào movie_embeddings.npy
- Lưu thông tin phim vào movie_embedding_metadata.json
### Bước 4. verify_embedding_metadata.py
- Kiểm tra embedding và metadata
- Kiểm tra số lượng
- Kiểm tra dimension
- Kiểm tra movie_id
- Kiểm tra thứ tự mapping
- Kiểm tra đầy đủ metadata
### Bước 5. create_movie_index.py
- Kết nối Elasticsearch
- Tạo index movies
- Khai báo mapping cho embedding
### Bước 6. bulk_movies.py
- Đọc embeddings + metadata
- Kết nối Elasticsearch
- Bulk toàn bộ movie vào index movies

## KẾT QUẢ GIAI ĐOẠN 1
- Elasticsearch bao gồm: Tên index là movies với 3201 documents


# GIAI ĐOẠN 2 - RETRIEVAL

## 1. Mục tiêu
Giai đoạn 2 có nhiệm vụ nhận truy vấn bằng ngôn ngữ tự nhiên của người dùng, 
chuyển truy vấn thành vector embedding và sử dụng Elasticsearch 
để tìm kiếm các bộ phim có nội dung tương đồng về mặt ngữ nghĩa.

Quá trình Retrieval không tìm kiếm dựa trên việc khớp chính xác từ khóa 
mà sử dụng vector similarity giữa embedding của truy vấn và embedding của phim.

## 2. Pipeline tổng thể
Quá trình Retrieval được thực hiện theo thứ tự sau:
### Bước 1. Nhận query
- Người dùng nhập mô tả nhu cầu tìm kiếm bằng ngôn ngữ tự nhiên.
### Bước 2. Generate query embedding (retrieval/embed_query.py)
- Load BAAI/bge-m3 
- Nhận query từ người dùng 
- Chuyển query thành vector embedding 
- Vector có số chiều 1024
### Bước 3. Semantic Search trên Elasticsearch (retrieval/search_movies.py)
- Elasticsearch thực hiện vector search trên field embedding
- Với các tham số: k = 20, num_candidates = 100
### Bước 4. Tính similarity score
- Elasticsearch sử dụng cosine similarity để đánh giá mức độ tương đồng giữa query embedding và movie embedding.
- Giá trị _score được Elasticsearch trả về cùng với mỗi kết quả search.
### Bước 5. Retrieval kết quả
- Các thông tin được lấy từ Elasticsearch gồm: movie_id, title_en, title_vn, release_year, movie_text, _score

## KẾT QUẢ GIAI ĐOẠN 2
- Elasticsearch index: movies 
- Tổng số documents: 3201 
- Query được embedding bằng BAAI/bge-m3 
- Dimension: 1024 
- Retrieval sử dụng vector similarity 
- Similarity: cosine similarity 
- Số lượng ứng viên Retrieval: Top-20


# GIAI ĐOẠN 3 - RAG

## 1. Mục tiêu
- Giai đoạn 3 sử dụng kết quả Retrieval từ Elasticsearch 
làm dữ liệu đầu vào cho Large Language Model (LLM).
- LLM không tìm kiếm trực tiếp toàn bộ Database. Thay vào đó, hệ thống cung cấp cho LLM 
danh sách các bộ phim phù hợp được Elasticsearch tìm thấy trong Top-K.
- Quá trình này giúp LLM có thêm thông tin thực tế từ dữ liệu phim để lựa chọn kết quả và tạo ra lý do giải thích.

## 2. Pipeline tổng thể
Quá trình Retrieval được thực hiện theo thứ tự sau:
### Bước 1. Lấy Top-K movie
- TOP 20 phim từ elasticsearch.
### Bước 2. Tạo ngữ cảnh để tìm kiếm (rag/search_context.py)
- query
- candidates
### Bước 3. Tạo prompt từ LangChain (rag/prompt_langchain.py)
- Hệ thống sử dụng ChatPromptTemplate của LangChain để xây dựng prompt cho Gemini.
- Nhằm chọn ra 5 phim(có lý do chọn) từ danh sách 20 phim được cung cấp từ context.
### Bước 4. Gọi Gemini (rag/search_reason.py)
- Gọi Gemini bằng prompt của LangChain 

## KẾT QUẢ GIAI ĐOẠN 3
- Gemini phân tích Top-20 
- Gemini chọn 5 phim 
- Gemini tạo reason 
- Hệ thống kiểm tra movie được chọn phải thuộc Top-20 
- Output được parse từ JSON


# GIAI ĐOẠN 4 - TẠO API 