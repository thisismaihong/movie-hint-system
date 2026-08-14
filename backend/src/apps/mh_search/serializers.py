from rest_framework import serializers


class SearchInputSerializer(serializers.Serializer):
    description=serializers.CharField()

class SearchOutputSerializer(serializers.Serializer):
    movie_id = serializers.IntegerField()
    title_en = serializers.CharField()
    title_vn = serializers.CharField(allow_blank=True, required=False)
    release_year = serializers.IntegerField()
    score = serializers.FloatField()
    reason = serializers.CharField()

