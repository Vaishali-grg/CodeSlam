# In api/admin.py
from django.contrib import admin
from .models import Team, GemAdjustment

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'gem_count', 'description')
    search_fields = ('name',)
    # Make gem_count read-only so it's only changed via GemAdjustment
    readonly_fields = ('gem_count',)

@admin.register(GemAdjustment)
class GemAdjustmentAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'team', 'amount', 'reason', 'adjusted_by')
    list_filter = ('team',)
    search_fields = ('team__name', 'reason')

    def save_model(self, request, obj, form, change):
        # Automatically set the 'adjusted_by' field
        obj.adjusted_by = request.user
        
        # Get the team and update its gem_count
        team = obj.team
        team.gem_count = team.gem_count + obj.amount
        team.save()
        
        # Save the GemAdjustment log entry
        super().save_model(request, obj, form, change)