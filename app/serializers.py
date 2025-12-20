from rest_framework import serializers
from .models import Filme, Diretor, Filmografia  

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
        
        