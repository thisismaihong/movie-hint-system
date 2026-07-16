from django.db import models

from apps.mh_oauth.models import User
from apps.mh_search.enums import SearchTypeEnum


class SearchHistory(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='search_history')
    content=models.CharField(max_length=200)
    created_date=models.DateTimeField(auto_now_add=True)
    search_type=models.CharField(choices=SearchTypeEnum.choices, max_length=20)
    class Meta:
        db_table = 'search_history'
        ordering=['-created_date']
    def __str__(self):
        return f"{self.user}-{self.content}"
