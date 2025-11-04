# In api/views.py
from .models import Team
from .serializers import TeamSerializer
from rest_framework.generics import ListAPIView

class LeaderboardAPIView(ListAPIView):
    """
    API endpoint for the leaderboard.
    Provides a list of all teams, ordered by gem_count (descending).
    """
    queryset = Team.objects.all().order_by('-gem_count')
    serializer_class = TeamSerializer