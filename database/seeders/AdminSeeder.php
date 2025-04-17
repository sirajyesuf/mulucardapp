<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\Role;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //first delete the existing admin
        User::where('email', 'admin@admin.com')->delete();
        //then create the new admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role' => Role::ADMIN->value,
        ]);

        //display success message and show both email and password
        $this->command->info('Admin Email: admin@admin.com');
        $this->command->info('Admin Password: password');

        $this->command->info('Admin seeded successfully');
    }
}
