from elasticsearch import Elasticsearch

es = Elasticsearch("http://localhost:9200")

print("Ping:", es.ping())

try:
    print("Info:")
    print(es.info())
except Exception as e:
    print("ERROR:", repr(e))

