<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class usuario extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'firstName' => 'Admin',
            'lastName' => 'Admin',
            'email' => 'admin@gmail.com',
            'role' => 'Admin',
            'password' => bcrypt('12345678'),
        ]);

        DB::table('users')->insert([
            'firstName' => 'Coach',
            'lastName' => 'Coach',
            'email' => 'coach@gmail.com',
            'role' => 'Coach',
            'password' => bcrypt('12345678'),
        ]);

        DB::table('users')->insert([
            'firstName' => 'Organizador',
            'lastName' => 'Organizador',
            'email' => 'organizador@gmail.com',
            'role' => 'Creador',
            'password' => bcrypt('12345678'),
        ]);
        
    }
}
