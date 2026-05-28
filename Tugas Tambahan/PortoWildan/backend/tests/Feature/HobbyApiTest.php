<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HobbyApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_hobbies_endpoint_returns_seeded_hobbies(): void
    {
        $this->seed();

        $this->getJson('/api/hobbies')
            ->assertOk()
            ->assertJsonFragment(['name' => 'Coding'])
            ->assertJsonFragment(['name' => 'Futsal']);
    }
}
