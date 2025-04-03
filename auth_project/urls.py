from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel
    path('accounts/', include('accounts.urls')),  # Include authentication URLs
    path('fitness/', include('fitness.urls'))
]
