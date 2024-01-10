Instale as dependencias :
composer install

Configure o ambiente: 
cp .env.example .env

Autenticação da aplicação:
php artisan key:generate

Popule o banco de dados mysql
php artisan migrate:refresh --seed

Rode o servidor
php artisan serve
http://127.0.0.1:8000/
