# ELASTICSEARCH - HỆ THỐNG TÌM KIẾM PHIM

## Tổng quan

Hệ thống tìm kiếm phim bằng ngôn ngữ tự nhiên được xây dựng theo 5 giai đoạn:
1. Chuẩn bị dữ liệu
2. Retrieval
3. RAG
4. API
5. Frontend

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
Elasticsearch
Index: movies
3201 documents