<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create
                            {name? : The name of the user}
                            {email? : The email address of the user}
                            {--password= : The password for the user}
                            {--verified : Mark the user\'s email as verified}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $name = $this->argument('name') ?: $this->ask('Name');
        $email = $this->argument('email') ?: $this->ask('Email');
        $password = $this->option('password') ?: $this->secret('Password');

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            return self::FAILURE;
        }

        $user = new User();
        $user->forceFill([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => $this->option('verified') ? now() : null,
        ]);
        $user->save();

        $this->info("User created successfully!");
        $this->table(
            ['ID', 'Name', 'Email', 'Verified'],
            [
                [
                    $user->id,
                    $user->name,
                    $user->email,
                    $user->email_verified_at ? 'Yes' : 'No',
                ],
            ]
        );

        return self::SUCCESS;
    }
}
