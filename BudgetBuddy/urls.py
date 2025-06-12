
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# from django.conf.urls import handler404
from django.http import HttpResponseNotFound
import os

from django.contrib import admin


def custom_404_view(request, exception):
    print("error:", exception)
    with open(os.path.join(settings.BASE_DIR, 'dist', '404.html')) as f:
        return HttpResponseNotFound(f.read(), content_type='text/html')

# handler400 = custom_404_view
# handler404 = custom_404_view


urlpatterns = [
    path('admin/', admin.site.urls),
    # all root URLs are handled by budget.urls
    path('', include('budget.urls')),
]

urlpatterns += (
    static('/assets/',
           document_root=os.path.join(
               settings.BASE_DIR,
               'dist',
               'assets'
            ))
    )
