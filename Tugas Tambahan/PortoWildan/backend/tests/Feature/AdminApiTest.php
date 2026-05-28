<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_routes_require_authentication(): void
    {
        $this->getJson('/api/admin/skills')->assertUnauthorized();
        $this->postJson('/api/admin/skills', [])->assertUnauthorized();
    }

    public function test_authenticated_admin_can_upload_portfolio_image(): void
    {
        Storage::fake('public');

        User::create([
            'name' => 'Wildan Admin',
            'email' => 'admin@wildan.test',
            'password' => Hash::make('password'),
        ]);

        $token = $this->postJson('/api/login', [
            'email' => 'admin@wildan.test',
            'password' => 'password',
        ])->json('token');

        $path = sys_get_temp_dir().DIRECTORY_SEPARATOR.'portfolio-upload-test.png';
        file_put_contents($path, base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII='));

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/admin/uploads', [
                'image' => new UploadedFile($path, 'portfolio.png', 'image/png', null, true),
            ]);

        $response->assertCreated()
            ->assertJsonStructure(['url']);

        Storage::disk('public')->assertExists(
            str_replace('/storage/', '', $response->json('url'))
        );
    }
}
