from django.db import models

class Filme(models.Model):
    titulo = models.CharField(max_length=200)
    diretor = models.CharField(max_length=100)
    ano_lancamento = models.IntegerField()
    genero = models.CharField(max_length=50)

    def __str__(self):
        return self.titulo
    
class Diretor(models.Model):
    nome = models.CharField(max_length=100)
    data_nascimento = models.DateField()
    nacionalidade = models.CharField(max_length=50)

    def __str__(self):
        return self.nome
    
class Filmografia(models.Model):
    diretor = models.ForeignKey(Diretor, on_delete=models.CASCADE)
    filme = models.ForeignKey(Filme, on_delete=models.CASCADE)
    papel = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.diretor.nome} - {self.filme.titulo} ({self.papel})"
    

