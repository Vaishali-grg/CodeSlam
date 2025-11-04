# In api/urls.py
from django.urls import path
from .views import LeaderboardAPIView

urlpatterns = [
    # This is the URL our React app will fetch from
    path('leaderboard/', LeaderboardAPIView.as_view(), name='leaderboard-api'),
]