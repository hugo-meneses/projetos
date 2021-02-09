<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\DogController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::Resource('dogs', 'api\DogController');

Route::get('/dogs', [DogController::class, 'index']);
Route::post('/dogs', [DogController::class, 'store']);
Route::get('/dogs/{id}', [DogController::class, 'show']);
Route::put('/dogs/{id}', [DogController::class, 'update']);
Route::delete('/dogs/{id}', [DogController::class, 'destroy']);


