# In api/models.py
from django.db import models
from django.conf import settings

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    gem_count = models.PositiveIntegerField(
        default=0,
        help_text="The total number of gems this team has."
    )
    
    def __str__(self):
        return f"{self.name} ({self.gem_count} gems)"

class GemAdjustment(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    amount = models.IntegerField(
        default=0,
        help_text="Number of gems to add (use a negative number to subtract)."
    )
    reason = models.CharField(max_length=255, blank=True)
    adjusted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        editable=False
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.amount >= 0:
            return f"Added {self.amount} gems to {self.team.name}"
        else:
            return f"Subtracted {abs(self.amount)} gems from {self.team.name}"
            
    class Meta:
        verbose_name = "Gem Adjustment"
        verbose_name_plural = "Gem Adjustments"