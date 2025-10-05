"""
Celery configuration for AGRITRACE
"""
import os
from celery import Celery
from celery.schedules import crontab

# Set default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agritrace.settings')

app = Celery('agritrace')

# Load config from Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks from all installed apps
app.autodiscover_tasks()

# Periodic tasks configuration
app.conf.beat_schedule = {
    'sync-blockchain-daily': {
        'task': 'blockchain.tasks.sync_blockchain_data',
        'schedule': crontab(hour=2, minute=0),  # Run at 2 AM daily
    },
    'generate-daily-reports': {
        'task': 'analytics.tasks.generate_daily_reports',
        'schedule': crontab(hour=6, minute=0),  # Run at 6 AM daily
    },
    'cleanup-expired-sessions': {
        'task': 'users.tasks.cleanup_expired_sessions',
        'schedule': crontab(hour=3, minute=0),  # Run at 3 AM daily
    },
}


@app.task(bind=True)
def debug_task(self):
    """Debug task for testing Celery"""
    print(f'Request: {self.request!r}')
