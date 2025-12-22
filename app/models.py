from django.db import models

# MODELS DA TAREFA
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
    

# MODELS DO PROJETO FINAL
class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    website = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.username

class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField()

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    body = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.post_id}"

class Todo(models.Model):
    user = models.ForeignKey(User, related_name='todos', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Album(models.Model):
    user = models.ForeignKey(User, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Photo(models.Model):
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    url = models.URLField()
    thumbnailUrl = models.URLField()

    def __str__(self):
        return self.title

