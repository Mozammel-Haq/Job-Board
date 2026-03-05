import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function Home() {
  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: '#F8F8FD' }}>
      <div className="container-custom space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold mb-2">QuickHire UI Kit</h1>
          <p className="text-lg" style={{ color: '#515B6F' }}>
            Testing all components with Figma design system
          </p>
        </div>

        {/* Buttons */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>

          <div className="mt-4 max-w-md">
            <Button variant="primary" fullWidth>Full Width Button</Button>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Input Fields</h2>
          <div className="max-w-md space-y-4">
            <Input placeholder="Simple input" />
            <Input label="Job Title" placeholder="e.g. Software Engineer" />
            <Input 
              label="Email Address" 
              type="email"
              placeholder="you@example.com" 
            />
            <Input 
              label="With Error" 
              placeholder="Enter something"
              error="This field is required"
            />
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-bold mb-2">Basic Card</h3>
              <p style={{ color: '#515B6F' }}>This is a simple card component</p>
            </Card>
            
            <Card hover>
              <h3 className="text-xl font-bold mb-2">Hoverable Card</h3>
              <p style={{ color: '#515B6F' }}>Hover over me to see effect</p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-bold mb-3">Card with Badges</h3>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="primary">Full-Time</Badge>
                <Badge variant="success">Remote</Badge>
              </div>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

      </div>
    </main>
  );
}