<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Home route
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Route to fetch CSRF token
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
