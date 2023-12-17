<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

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
            'email' => 'Coach@gmail.com',
            'role' => 'Coach',
            'password' => bcrypt('12345678'),
        ]);
        
    }
}
