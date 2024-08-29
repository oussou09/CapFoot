<?php

use App\Http\Controllers\ReceivingController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


// No need for `use routes;`

// CSRF token route
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});



Route::middleware([EnsureFrontendRequestsAreStateful::class, 'auth.admin'])->group(function () {
Route::post('/receiving', [ReceivingController::class, 'storeceiving']);
Route::get('/datareceiving', [ReceivingController::class, 'datareceiving']);
Route::post('/updateconfirmation', [ReceivingController::class, 'updateconfirmation']);

Route::get('/getcontactus', [ReceivingController::class, 'getcontactus']);
Route::post('/storecontactus', [ReceivingController::class, 'storecontactus']);
Route::delete('/deletecontactus', [ReceivingController::class, 'deletecontactus']);

Route::get('/stadiums', [ReceivingController::class, 'showstadiums']);
Route::post('/addstadium', [ReceivingController::class, 'addstadium']);
Route::delete('/deletestadium', [ReceivingController::class, 'deletestadium']);
Route::post('/LogoutFormAdmin', [ReceivingController::class, 'LogoutFormAdmin']);



Route::delete('/deleteallreceiving', [ReceivingController::class, 'deleteAllReceiving']);
});

Route::post('/ReqFormAdmin', [ReceivingController::class, 'ReqFormAdmin']);

// Route::middleware('auth:sanctum')->get('/stadiums', [ReceivingController::class, 'showstadiums']);
// Route::middleware('auth:sanctum')->get('/receiving', [ReceivingController::class, 'storeceiving']);


// Protected routes
// Route::middleware('auth:sanctum')->post('/receiving', [ReceivingController::class, 'storeceiving']);
// Route::middleware('auth:sanctum')->get('/stadiums', [ReceivingController::class, 'showstadiums']);
