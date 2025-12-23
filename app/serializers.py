from rest_framework import serializers
from .models import Filme, Diretor, Filmografia, User, Post, Comment, Todo, Album, Photo 

# SERIALIZERS DA TAREFA
class FilmeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filme
        fields = '__all__'


class DiretorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diretor
        fields = '__all__'


class FilmografiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filmografia
        fields = '__all__'
        
        
# SERIALIZERS DO PROJETO FINAL
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
    
        