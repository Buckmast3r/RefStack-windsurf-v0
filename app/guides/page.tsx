import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Code, Link as LinkIcon, Settings, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guides & Documentation - RefStack',
  description: 'Learn how to get the most out of RefStack with our comprehensive guides and documentation.'
};

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn how to create your first referral link and share it with your audience.',
    icon: <Zap className="w-5 h-5" />,
    href: '/guides/getting-started'
  },
  {
    title: 'Link Management',
    description: 'Learn how to create, edit, and organize your referral links for maximum impact.',
    icon: <LinkIcon className="w-5 h-5" />,
    href: '/guides/link-management'
  },
  {
    title: 'Customization',
    description: 'Customize your public profile and referral links to match your brand.',
    icon: <Settings className="w-5 h-5" />,
    href: '/guides/customization'
  },
  {
    title: 'Analytics',
    description: 'Understand your referral traffic and optimize your campaigns.',
    icon: <BookOpen className="w-5 h-5" />,
    href: '/guides/analytics'
  },
  {
    title: 'API Reference',
    description: 'Integrate RefStack with your own applications using our powerful API.',
    icon: <Code className="w-5 h-5" />,
    href: '/guides/api'
  }
];

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Guides & Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to get the most out of RefStack with our comprehensive guides and documentation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide, index) => (
          <Link key={index} href={guide.href}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {guide.icon}
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                </div>
                <CardDescription className="min-h-[60px]">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:bg-transparent">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">How do I create my first referral link?</h3>
            <p className="text-muted-foreground mt-2">
              Navigate to your dashboard and click the "Create New Link" button. Fill in the required details and click "Create".
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Can I customize how my referral links look?</h3>
            <p className="text-muted-foreground mt-2">
              Yes! With a Pro account, you can fully customize the appearance of your referral links and public profile.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">What analytics are available?</h3>
            <p className="text-muted-foreground mt-2">
              Track clicks, conversions, geographic data, referral sources, and more with our comprehensive analytics dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
