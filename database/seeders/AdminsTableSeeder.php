<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('admins')->insert([
            [
                'FullName' => 'gefa',
                'email' => 'gefa@mailinator.com',
                'phone' => '0613583510',
                'password' => Hash::make('1010'), // Hashing the password for security
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'FullName' => 'dyhajojidu',
                'email' => 'dyhajojidu@mailinator.com',
                'phone' => '0613583511',
                'password' => Hash::make('1020'), // Hashing the password for security
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}


// php artisan db:seed --class=AdminsTableSeeder
