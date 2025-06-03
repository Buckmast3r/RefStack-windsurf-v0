"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().optional(),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal('')),
  company: z.string().optional(),
  location: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function SettingsPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: async () => {
      try {
        const response = await fetch('/api/user/profile')
        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }
        const data = await response.json()
        setIsLoading(false)
        return {
          name: data.name || '',
          email: data.email || '',
          bio: data.bio || '',
          website: data.website || '',
          company: data.company || '',
          location: data.location || '',
          twitter: data.twitter || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setIsLoading(false)
        return {
          name: '',
          email: '',
          bio: '',
          website: '',
          company: '',
          location: '',
          twitter: '',
          github: '',
          linkedin: '',
        }
      }
    },
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent('/settings')}`)
    }
  }, [status, router])

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsSaving(true)
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      // Update the session with the new name and email
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          email: data.email,
        },
      })

      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="container py-8">
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account" disabled>Account</TabsTrigger>
            <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your profile information and personal details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...form.register('name')}
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...form.register('email')}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium leading-none">
                        Company
                      </label>
                      <Input
                        id="company"
                        placeholder="Your company"
                        {...form.register('company')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium leading-none">
                        Location
                      </label>
                      <Input
                        id="location"
                        placeholder="Your location"
                        {...form.register('location')}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="bio" className="text-sm font-medium leading-none">
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us a bit about yourself..."
                        className="min-h-[100px]"
                        {...form.register('bio')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="website" className="text-sm font-medium leading-none">
                        Website
                      </label>
                      <Input
                        id="website"
                        placeholder="https://example.com"
                        {...form.register('website')}
                      />
                      {form.formState.errors.website && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.website.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="twitter" className="text-sm font-medium leading-none">
                        Twitter
                      </label>
                      <Input
                        id="twitter"
                        placeholder="yourusername"
                        {...form.register('twitter')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="github" className="text-sm font-medium leading-none">
                        GitHub
                      </label>
                      <Input
                        id="github"
                        placeholder="yourusername"
                        {...form.register('github')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="linkedin" className="text-sm font-medium leading-none">
                        LinkedIn
                      </label>
                      <Input
                        id="linkedin"
                        placeholder="yourusername"
                        {...form.register('linkedin')}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
