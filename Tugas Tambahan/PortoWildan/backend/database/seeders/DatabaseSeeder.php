<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\Hobby;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate([
            'email' => 'admin@wildan.test',
        ], [
            'name' => 'Wildan Admin',
            'password' => Hash::make('password'),
        ]);

        Profile::updateOrCreate(['id' => 1], [
            'name' => 'Wildan',
            'headline' => 'Full Stack Developer',
            'bio' => 'Saya membangun web app dengan React dan Laravel, sambil terus belajar dari pengalaman sekolah, hobi, dan latihan coding sehari-hari.',
            'email' => 'hello@wildan.test',
            'phone' => '+62 812 0000 0000',
            'location' => 'Jakarta, Indonesia',
            'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
            'social_links' => [
                'github' => 'https://github.com/wildan',
                'linkedin' => 'https://linkedin.com/in/wildan',
                'instagram' => 'https://instagram.com/wildan',
            ],
        ]);

        $skills = [
            ['name' => 'ReactJS', 'category' => 'Frontend', 'level' => 'Advanced', 'sort_order' => 1],
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 'Advanced', 'sort_order' => 2],
            ['name' => 'REST API', 'category' => 'Backend', 'level' => 'Advanced', 'sort_order' => 3],
            ['name' => 'UI Implementation', 'category' => 'Frontend', 'level' => 'Intermediate', 'sort_order' => 4],
            ['name' => 'Database Design', 'category' => 'Backend', 'level' => 'Intermediate', 'sort_order' => 5],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(['name' => $skill['name']], $skill);
        }

        $hobbies = [
            ['name' => 'Coding', 'description' => 'Mencoba fitur web baru, membuat eksperimen kecil, dan belajar framework modern.', 'sort_order' => 1],
            ['name' => 'Futsal', 'description' => 'Melatih kerja sama, komunikasi, dan disiplin lewat permainan tim.', 'sort_order' => 2],
            ['name' => 'Desain UI', 'description' => 'Mencari referensi tampilan gelap, layout dashboard, dan palet warna yang nyaman.', 'sort_order' => 3],
            ['name' => 'Musik', 'description' => 'Menemani belajar dan membantu menjaga fokus saat mengerjakan tugas.', 'sort_order' => 4],
        ];

        foreach ($hobbies as $hobby) {
            Hobby::updateOrCreate(['name' => $hobby['name']], $hobby);
        }

        $experiences = [
            [
                'title' => 'SD',
                'organization' => 'Sekolah Dasar',
                'location' => 'Indonesia',
                'start_date' => '2014',
                'end_date' => '2020',
                'description' => 'Membangun dasar belajar, disiplin, membaca, menulis, dan rasa ingin tahu.',
                'type' => 'study',
                'sort_order' => 1,
            ],
            [
                'title' => 'SMP',
                'organization' => 'Sekolah Menengah Pertama',
                'location' => 'Indonesia',
                'start_date' => '2020',
                'end_date' => '2023',
                'description' => 'Mulai mengenal kerja kelompok, presentasi, teknologi, dan minat ke dunia komputer.',
                'type' => 'study',
                'sort_order' => 2,
            ],
            [
                'title' => 'SMK',
                'organization' => 'Sekolah Menengah Kejuruan',
                'location' => 'Indonesia',
                'start_date' => '2023',
                'end_date' => 'Present',
                'description' => 'Fokus pada pembelajaran kejuruan, dasar pemrograman, web development, dan kesiapan karir.',
                'type' => 'study',
                'sort_order' => 3,
            ],
            [
                'title' => 'Karir Awal',
                'organization' => 'Belajar & Praktik Mandiri',
                'location' => 'Remote',
                'start_date' => '2024',
                'end_date' => 'Present',
                'description' => 'Mengerjakan latihan web, portfolio, dan eksplorasi React serta Laravel untuk bekal kerja.',
                'type' => 'career',
                'sort_order' => 4,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::updateOrCreate([
                'title' => $experience['title'],
                'organization' => $experience['organization'],
            ], $experience);
        }
    }
}
