<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\QhJob;
use App\Models\Application;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'is_admin' => true,
        ]);

        // Create Normal user
        User::create([
            'name' => 'Normal User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('1234445678'),
            'is_admin' => false,
        ]);

        // Sample jobs data
        $jobs = [
            [
                'title' => 'Senior Frontend Developer',
                'company' => 'Google',
                'location' => 'San Francisco, USA',
                'category' => 'Technology',
                'employment_type' => 'Full Time',
                'salary' => '$120k - $150k/year',
                'description' => 'We are looking for a talented Senior Frontend Developer to join our growing team. You will be responsible for building the next generation of our web applications using modern technologies and best practices.',
                'responsibilities' => [
                    'Build responsive and performant web applications using React, Next.js, and TypeScript',
                    'Collaborate with design team to implement pixel-perfect UIs',
                    'Write clean, maintainable, and well-tested code',
                    'Participate in code reviews and mentor junior developers',
                    'Optimize applications for maximum speed and scalability',
                ],
                'requirements' => [
                    '5+ years of experience in frontend development',
                    'Expert knowledge of React, TypeScript, and modern JavaScript',
                    'Experience with Next.js, Tailwind CSS, and component libraries',
                    'Strong understanding of web performance optimization',
                    'Excellent problem-solving and communication skills',
                ],
                'benefits' => [
                    'Competitive salary and equity package',
                    'Health, dental, and vision insurance',
                    'Flexible work schedule and remote options',
                    '401(k) matching and retirement planning',
                    'Professional development budget',
                ],
                'logo' => '/images/companies/dropbox.svg',
                'is_active' => true,
            ],
            [
                'title' => 'Product Designer',
                'company' => 'Facebook',
                'location' => 'New York, USA',
                'category' => 'Design',
                'employment_type' => 'Full Time',
                'salary' => '$100k - $130k/year',
                'description' => 'Join our design team to create beautiful and intuitive products used by millions of people worldwide.',
                'responsibilities' => [
                    'Design user interfaces and experiences for web and mobile',
                    'Create wireframes, prototypes, and high-fidelity mockups',
                    'Collaborate with product and engineering teams',
                    'Conduct user research and usability testing',
                ],
                'requirements' => [
                    '3+ years of product design experience',
                    'Proficiency in Figma, Sketch, or similar tools',
                    'Strong portfolio demonstrating design skills',
                    'Understanding of design systems and component libraries',
                ],
                'benefits' => [
                    'Competitive compensation',
                    'Health insurance',
                    'Remote work options',
                    'Learning and development budget',
                ],
                'logo' => '/images/companies/revolut.svg',
                'is_active' => true,
            ],
            [
                'title' => 'Backend Engineer',
                'company' => 'Amazon',
                'location' => 'Seattle, USA',
                'category' => 'Technology',
                'employment_type' => 'Full Time',
                'salary' => '$130k - $160k/year',
                'description' => 'Build scalable backend systems that power our global e-commerce platform.',
                'responsibilities' => [
                    'Design and implement RESTful APIs',
                    'Optimize database queries and performance',
                    'Write clean, testable code',
                    'Collaborate with frontend teams',
                ],
                'requirements' => [
                    '4+ years backend development experience',
                    'Strong knowledge of Node.js or Python',
                    'Experience with SQL and NoSQL databases',
                    'Understanding of microservices architecture',
                ],
                'benefits' => [
                    'Stock options',
                    'Comprehensive health coverage',
                    'Unlimited PTO',
                    'Gym membership',
                ],
                'logo' => '/images/companies/pitch.svg',
                'is_active' => true,
            ],
            [
                'title' => 'Marketing Manager',
                'company' => 'Spotify',
                'location' => 'London, UK',
                'category' => 'Marketing',
                'employment_type' => 'Full Time',
                'salary' => '£60k - £80k/year',
                'description' => 'Lead marketing campaigns and help grow our user base across Europe.',
                'responsibilities' => [
                    'Develop and execute marketing strategies',
                    'Manage social media campaigns',
                    'Analyze marketing metrics and ROI',
                    'Collaborate with creative teams',
                ],
                'requirements' => [
                    '5+ years marketing experience',
                    'Strong analytical skills',
                    'Experience with digital marketing tools',
                    'Excellent communication skills',
                ],
                'benefits' => [
                    'Competitive salary',
                    'Private health insurance',
                    'Pension scheme',
                    'Annual bonus',
                ],
                'logo' => '/images/companies/blinkist.svg',
                'is_active' => true,
            ],
            [
                'title' => 'Data Scientist',
                'company' => 'Netflix',
                'location' => 'Los Angeles, USA',
                'category' => 'Technology',
                'employment_type' => 'Full Time',
                'salary' => '$140k - $180k/year',
                'description' => 'Use data to drive insights and improve our recommendation algorithms.',
                'responsibilities' => [
                    'Build machine learning models',
                    'Analyze large datasets',
                    'Present insights to stakeholders',
                    'Collaborate with engineering teams',
                ],
                'requirements' => [
                    'PhD or Masters in Computer Science',
                    'Strong Python and R skills',
                    'Experience with ML frameworks',
                    'Published research is a plus',
                ],
                'benefits' => [
                    'Top-tier compensation',
                    'Unlimited vacation',
                    'Free Netflix subscription',
                    'Learning budget',
                ],
                'logo' => '/images/companies/canva.svg',
                'is_active' => true,
            ],
            [
                'title' => 'UX Researcher',
                'company' => 'Airbnb',
                'location' => 'Remote',
                'category' => 'Design',
                'employment_type' => 'Remote',
                'salary' => '$90k - $120k/year',
                'description' => 'Conduct user research to improve our platform and enhance user experience.',
                'responsibilities' => [
                    'Plan and conduct user research studies',
                    'Analyze qualitative and quantitative data',
                    'Present findings to product teams',
                    'Develop user personas and journey maps',
                ],
                'requirements' => [
                    '3+ years UX research experience',
                    'Strong understanding of research methodologies',
                    'Excellent presentation skills',
                    'Experience with research tools',
                ],
                'benefits' => [
                    'Work from anywhere',
                    'Annual travel credit',
                    'Health benefits',
                    'Home office stipend',
                ],
                'logo' => '/images/companies/godaddy.svg',
                'is_active' => true,
            ],
        ];

        foreach ($jobs as $jobData) {
            QhJob::create($jobData);
        }

        // Additional random jobs to test pagination
        $categories = ['Technology', 'Design', 'Marketing', 'Business', 'Management'];
        $types = ['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'];
        $locations = ['San Francisco, USA', 'New York, USA', 'Seattle, USA', 'London, UK', 'Remote'];
        for ($j = 0; $j < 20; $j++) {
            QhJob::create([
                'title' => 'Job ' . ($j + 1),
                'company' => ['Google', 'Amazon', 'Meta', 'Apple', 'Netflix'][array_rand(['Google', 'Amazon', 'Meta', 'Apple', 'Netflix'])],
                'location' => $locations[array_rand($locations)],
                'category' => $categories[array_rand($categories)],
                'employment_type' => $types[array_rand($types)],
                'salary' => rand(60, 180) . 'k/year',
                'description' => 'This is a generated job used for testing pagination and charts.',
                'responsibilities' => ['Responsibility A', 'Responsibility B', 'Responsibility C'],
                'requirements' => ['Requirement A', 'Requirement B', 'Requirement C'],
                'benefits' => ['Benefit A', 'Benefit B', 'Benefit C'],
                'logo' => null,
                'is_active' => (bool)rand(0, 1),
            ]);
        }
        // Seed applications across multiple days and jobs for charts/pagination
        $jobsAll = QhJob::all();
        $start = Carbon::now()->subDays(20)->startOfDay();
        $statuses = ['pending', 'reviewed', 'accepted', 'rejected'];
        $domains = ['example.com', 'mail.com', 'inbox.com'];

        foreach ($jobsAll as $jobIter) {
            for ($d = 0; $d < 21; $d++) {
                $day = (clone $start)->addDays($d)->setTime(rand(8, 20), rand(0, 59));
                $countForDay = rand(0, 5); // 0-5 applications per job per day
                for ($i = 0; $i < $countForDay; $i++) {
                    $name = 'Candidate ' . ($d * 10 + $i);
                    $email = 'candidate' . $jobIter->id . '_' . $d . '_' . $i . '@' . $domains[array_rand($domains)];
                    $status = $statuses[array_rand($statuses)];
                    Application::create([
                        'qhjob_id' => $jobIter->id,
                        'name' => $name,
                        'email' => $email,
                        'resume_url' => 'https://example.com/resumes/' . $jobIter->id . '/' . $d . '/' . $i,
                        'cover_note' => 'Cover letter for ' . $name . ' applying to ' . $jobIter->title . '. I am a strong fit and excited to contribute.',
                        'status' => $status,
                        'created_at' => $day,
                        'updated_at' => $day,
                    ]);
                }
            }
        }

        $this->command->info('Database seeded successfully!');
    }
}
