<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

### 🎲 Sobre APi Livros

API Rest orientações para instalação :

- Clone do projeto
- cp .env.example .env.
- php artisan migrate: fresh
- php artisan db:seed --class=BookSeeder
- php artisan key:generate --ansi
- php artisan serve
- Api Teste: Postman


## GET / message
+ Response 201 (text/plain)

        Livro adicionado com sucesso!

## POST / message
+ Response 201 (text/plain)

        Lista exibida completa!

## PUT / message
+ Response 201 (text/plain)

        Livro atualizado com sucesso!

## DELETE / message
+ Response 201 (text/plain)

        Livro deletado com sucesso!

## ERRO / message
+ Response 404 (text/plain)

        Livro não encontrado!



### 🎲 Api endpoints

As URIs absolutas dos recursos, mencionados acima na mesma ordem, são os seguintes:


+ **GET**: http://127.0.0.1:8000/api/books
+ **GET**: http://127.0.0.1:8000/api/books/id
+ **POST**: http://127.0.0.1:8000/api/books
+ **PUT**: http://127.0.0.1:8000/api/books/id
+ **DELETE**: http://127.0.0.1:8000/api/books/id


### 🎲 Estrutura de Dados
+ Books (object):
    + id (string) - Id 
    + name (string) - Name 
    + author (string) - Author 
    + publish_date (date) - Date 

