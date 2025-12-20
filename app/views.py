from django.shortcuts import render
from rest_framework import viewsets
from .models import Filme, Diretor, Filmografia
from .serializers import FilmeSerializer, DiretorSerializer, FilmografiaSerializer  

class FilmeViewSet(viewsets.ModelViewSet):
    queryset = Filme.objects.all()
    serializer_class = FilmeSerializer

class DiretorViewSet(viewsets.ModelViewSet):
    queryset = Diretor.objects.all()
    serializer_class = DiretorSerializer

class FilmografiaViewSet(viewsets.ModelViewSet):
    queryset = Filmografia.objects.all()
    serializer_class = FilmografiaSerializer

