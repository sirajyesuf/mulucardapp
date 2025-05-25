<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Card;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ServiceUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_service_update_logic()
    {
        // Create a user and card manually
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        
        $card = Card::create([
            'user_id' => $user->id,
            'url' => 'test-card',
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'organization' => 'Test Org',
            'job_title' => 'Developer',
            'headline' => 'Test headline',
            'banner_color' => '#000000',
            'banner' => '/storage/banners/test-banner.jpg'
        ]);
        
        // Create existing services
        $service1 = $card->services()->create([
            'name' => 'Service 1',
            'description' => 'Description 1',
            'path' => '/storage/services/service1.jpg'
        ]);
        
        $service2 = $card->services()->create([
            'name' => 'Service 2', 
            'description' => 'Description 2',
            'path' => '/storage/services/service2.jpg'
        ]);

        // Simulate request data
        $services = [
            // Update existing service 1
            [
                'id' => (string)$service1->id, // Existing service (numeric ID as string)
                'name' => 'Updated Service 1',
                'description' => 'Updated Description 1',
                'file' => null,
                'path' => '/storage/services/service1.jpg'
            ],
            // Add new service (UUID)
            [
                'id' => '550e8400-e29b-41d4-a716-446655440000', // New service (UUID)
                'name' => 'New Service',
                'description' => 'New Description',
                'file' => null, // Simplified - no file upload for test
                'path' => null
            ]
            // Note: service2 is not included, so it should be deleted
        ];

        // Test the logic
        $controller = new \App\Http\Controllers\CardController();
        $reflection = new \ReflectionClass($controller);
        $method = $reflection->getMethod('updateCardService');
        $method->setAccessible(true);
        
        // Call the method
        $method->invoke($controller, $card, $services);
        
        // Refresh the card to get updated services
        $card->refresh();
        $updatedServices = $card->services()->get();
        
        // Assertions
        $this->assertEquals(2, $updatedServices->count(), 'Should have 2 services after update');
        
        // Check that service1 was updated
        $updatedService1 = $updatedServices->where('id', $service1->id)->first();
        $this->assertNotNull($updatedService1, 'Service 1 should still exist');
        $this->assertEquals('Updated Service 1', $updatedService1->name);
        $this->assertEquals('Updated Description 1', $updatedService1->description);
        
        // Check that service2 was deleted
        $this->assertNull($updatedServices->where('id', $service2->id)->first(), 'Service 2 should be deleted');
        
        // Check that new service was created
        $newService = $updatedServices->where('name', 'New Service')->first();
        $this->assertNotNull($newService, 'New service should be created');
        $this->assertEquals('New Description', $newService->description);
        
        echo "✅ Service update logic test passed!\n";
        echo "- Existing service updated correctly\n";
        echo "- Removed service deleted correctly\n"; 
        echo "- New service created correctly\n";
    }
} 