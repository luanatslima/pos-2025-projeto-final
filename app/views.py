from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import Filme, Diretor, Filmografia, User, Post, Comment, Todo, Album, Photo
from .serializers import FilmeSerializer, DiretorSerializer, FilmografiaSerializer, UserSerializer, PostSerializer, CommentSerializer, TodoSerializer, AlbumSerializer, PhotoSerializer
 

# VIEWS DA TAREFA
class FilmeViewSet(viewsets.ModelViewSet):
    queryset = Filme.objects.all()
    serializer_class = FilmeSerializer

class DiretorViewSet(viewsets.ModelViewSet):
    queryset = Diretor.objects.all()
    serializer_class = DiretorSerializer

class FilmografiaViewSet(viewsets.ModelViewSet):
    queryset = Filmografia.objects.all()
    serializer_class = FilmografiaSerializer


# VIEWS DO PROJETO FINAL
class BaseViewSet(viewsets.ModelViewSet):
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['id'] 
    ordering_fields = ['id']

class UserViewSet(BaseViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ['id', 'name', 'username', 'email']
    ordering_fields = ['id', 'name', 'username']

class PostViewSet(BaseViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    search_fields = ['id', 'title', 'body', 'user__username']
    ordering_fields = ['id', 'user_id']

class CommentViewSet(BaseViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    search_fields = ['id', 'name', 'email', 'body', 'post__title']
    ordering_fields = ['id', 'post_id']

class TodoViewSet(BaseViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    search_fields = ['id', 'title', 'user__username']
    ordering_fields = ['id', 'user_id', 'completed']

class AlbumViewSet(BaseViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    search_fields = ['id', 'title', 'user__username']
    ordering_fields = ['id', 'user_id']

class PhotoViewSet(BaseViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    search_fields = ['id', 'title', 'album__title']
    ordering_fields = ['id', 'album_id', 'title']

