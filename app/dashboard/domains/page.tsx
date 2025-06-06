'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Plus, Trash2, RefreshCw, Check, X, ExternalLink, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Define TypeScript interface for domain
interface CustomDomain {
  id: string;
  domain: string;
  verified: boolean;
  dnsVerified: boolean;
  sslProvisioned: boolean;
  status: 'pending' | 'active' | 'error';
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export default function DomainsPage() {
  const { data: session, status } = useSession();
  const [domains, setDomains] = useState<CustomDomain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Fetch domains on component mount
  useEffect(() => {
    if (status === 'authenticated') {
      fetchDomains();
    }
  }, [status]);

  // Function to fetch domains
  const fetchDomains = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/domains');
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch domains');
      }
      
      const data = await response.json();
      setDomains(data);
    } catch (error) {
      console.error('Error fetching domains:', error);
      toast.error('Failed to load domains');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a new domain
  const addDomain = async () => {
    if (!newDomain) {
      setValidationError('Please enter a domain');
      return;
    }

    try {
      setIsAddingDomain(true);
      setValidationError('');
      
      const response = await fetch('/api/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: newDomain }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add domain');
      }
      
      const data = await response.json();
      setDomains([data, ...domains]);
      setNewDomain('');
      setIsDialogOpen(false);
      toast.success('Domain added successfully');
    } catch (error: any) {
      console.error('Error adding domain:', error);
      setValidationError(error.message || 'Failed to add domain');
      toast.error(error.message || 'Failed to add domain');
    } finally {
      setIsAddingDomain(false);
    }
  };

  // Function to delete a domain
  const deleteDomain = async (id: string) => {
    if (!confirm('Are you sure you want to delete this domain?')) {
      return;
    }

    try {
      const response = await fetch(`/api/domains/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete domain');
      }
      
      setDomains(domains.filter(domain => domain.id !== id));
      toast.success('Domain deleted successfully');
    } catch (error: any) {
      console.error('Error deleting domain:', error);
      toast.error(error.message || 'Failed to delete domain');
    }
  };

  // Function to verify domain DNS
  const verifyDomainDNS = async (id: string) => {
    try {
      const response = await fetch(`/api/domains/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dnsVerified: true }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to verify domain DNS');
      }
      
      const data = await response.json();
      setDomains(domains.map(domain => (domain.id === id ? data : domain)));
      toast.success('Domain DNS verified successfully');
    } catch (error: any) {
      console.error('Error verifying domain DNS:', error);
      toast.error(error.message || 'Failed to verify domain DNS');
    }
  };

  // Filter domains based on active tab
  const filteredDomains = domains.filter(domain => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return domain.status === 'active';
    if (activeTab === 'pending') return domain.status === 'pending';
    if (activeTab === 'error') return domain.status === 'error';
    return true;
  });

  // Show loading skeleton when loading
  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Custom Domains</h1>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Custom Domains</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new custom domain</DialogTitle>
              <DialogDescription>
                Enter your domain name below. You&apos;ll need to configure DNS records after adding.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
                {validationError && (
                  <p className="text-sm text-red-500">{validationError}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addDomain} disabled={isAddingDomain}>
                {isAddingDomain ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Domain'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {domains.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No custom domains yet</CardTitle>
            <CardDescription>
              Add a custom domain to use with your public referral stack.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <ExternalLink className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Personalize your referral stack</h3>
              <p className="text-muted-foreground mb-4">
                Custom domains make your referral links more professional and increase trust.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>Add Your First Domain</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="error">Error</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-4">
            {filteredDomains.map((domain) => (
              <Card key={domain.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {domain.domain}
                      {domain.status === 'active' && (
                        <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">Active</Badge>
                      )}
                      {domain.status === 'pending' && (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      {domain.status === 'error' && (
                        <Badge variant="destructive">Error</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Added {formatDistanceToNow(new Date(domain.createdAt))} ago
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteDomain(domain.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {domain.status === 'error' && domain.errorMessage && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{domain.errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">DNS Verification</span>
                      <span>
                        {domain.dnsVerified ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">SSL Certificate</span>
                      <span>
                        {domain.sslProvisioned ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </span>
                    </div>
                  </div>

                  {domain.status === 'pending' && !domain.dnsVerified && (
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Configure your DNS</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add the following DNS records to your domain:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-3 gap-2 p-2 bg-background rounded-md">
                          <div className="font-medium">Type</div>
                          <div className="font-medium">Name</div>
                          <div className="font-medium">Value</div>
                          <div>CNAME</div>
                          <div>@</div>
                          <div className="truncate">refstack-app.vercel.app</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 p-2 bg-background rounded-md">
                          <div className="font-medium">Type</div>
                          <div className="font-medium">Name</div>
                          <div className="font-medium">Value</div>
                          <div>TXT</div>
                          <div>_refstack-verify</div>
                          <div className="truncate">refstack-verify={domain.id}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {domain.status === 'pending' && !domain.dnsVerified && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => verifyDomainDNS(domain.id)}
                    >
                      Verify DNS Configuration
                    </Button>
                  )}
                  {domain.status === 'active' && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <a href={`https://${domain.domain}`} target="_blank" rel="noopener noreferrer">
                        Visit Domain
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
