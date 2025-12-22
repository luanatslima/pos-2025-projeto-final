from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import FilmeViewSet, DiretorViewSet, FilmografiaViewSet,UserViewSet, PostViewSet, CommentViewSet, TodoViewSet, AlbumViewSet, PhotoViewSet


router = DefaultRouter()
router.register(r'filmes', FilmeViewSet)
router.register(r'diretores', DiretorViewSet)
router.register(r'filmografias', FilmografiaViewSet)
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'todos', TodoViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'photos', PhotoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
