"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Upload, Palette, Eye, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react"
import { PreviewStack } from "@/components/profile/preview-stack"
import { FileUpload } from "@/components/profile/file-upload"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [profileForm, setProfileForm] = useState<any>({})
  const [themeForm, setThemeForm] = useState<any>({})
  const [brandingForm, setBrandingForm] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState("profile")
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard/profile")
      return
    }
    if (status === "authenticated") {
      fetchProfile()
    }
  }, [status, router])

  const fetchProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/user/profile")
      if (!res.ok) throw new Error("Failed to fetch profile")
      const data = await res.json()
      setProfile(data)
      setProfileForm({
        name: data.name || "",
        bio: data.bio || "",
        website: data.website || "",
        company: data.company || "",
        location: data.location || "",
        twitter: data.twitter || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
      })
      setThemeForm({
        theme: data.theme || "default",
        customTheme: data.customTheme || "",
      })
      setBrandingForm({
        avatarUrl: data.avatarUrl || "",
        bannerUrl: data.bannerUrl || "",
        logo: data.customBranding?.logo || "",
        primary: data.customBranding?.colors?.primary || "",
        secondary: data.customBranding?.colors?.secondary || "",
        background: data.customBranding?.colors?.background || "",
        fontHeading: data.customBranding?.fonts?.heading || "",
        fontBody: data.customBranding?.fonts?.body || "",
      })
    } catch (e: any) {
      setError(e.message || "Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (e: any) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value })
  }
  const handleThemeChange = (e: any) => {
    setThemeForm({ ...themeForm, [e.target.name]: e.target.value })
  }
  const handleBrandingChange = (e: any) => {
    setBrandingForm({ ...brandingForm, [e.target.name]: e.target.value })
  }

  const handleProfileSave = async (e: any) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      })
      if (!res.ok) throw new Error("Failed to update profile")
      toast.success("Profile updated")
      fetchProfile()
    } catch (e: any) {
      setError(e.message || "Failed to update profile")
      toast.error(e.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleThemeSave = async (e: any) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/user/theme", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(themeForm),
      })
      if (!res.ok) throw new Error("Failed to update theme")
      toast.success("Theme updated")
      fetchProfile()
    } catch (e: any) {
      setError(e.message || "Failed to update theme")
      toast.error(e.message || "Failed to update theme")
    } finally {
      setSaving(false)
    }
  }

  const handleBrandingSave = async (e: any) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/user/branding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingForm),
      })
      if (!res.ok) throw new Error("Failed to update branding")
      toast.success("Branding updated")
      fetchProfile()
    } catch (e: any) {
      setError(e.message || "Failed to update branding")
      toast.error(e.message || "Failed to update branding")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          {(profile?.subscription?.plan === 'PRO' || profile?.subscription?.plan === 'ENTERPRISE') && (
            <TabsTrigger value="branding">Branding</TabsTrigger>
          )}
          {profile?.isWhiteLabeled && (
            <TabsTrigger value="whitelabel">White-Label</TabsTrigger>
          )}
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" value={profileForm.name} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input name="website" value={profileForm.website} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input name="company" value={profileForm.company} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input name="location" value={profileForm.location} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input name="twitter" value={profileForm.twitter} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input name="github" value={profileForm.github} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input name="linkedin" value={profileForm.linkedin} onChange={handleProfileChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input name="bio" value={profileForm.bio} onChange={handleProfileChange} />
                </div>
                <Button type="submit" disabled={saving} className="mt-2">
                  {saving ? "Saving..." : "Save Profile"}
                </Button>
                {error && <div className="text-red-500 mt-2 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</div>}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Customize Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleThemeSave} className="space-y-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Input name="theme" value={themeForm.theme} onChange={handleThemeChange} />
                </div>
                {(profile?.subscription?.plan === 'PRO' || profile?.subscription?.plan === 'ENTERPRISE') && (
                  <div>
                    <Label htmlFor="customTheme">Custom Theme</Label>
                    <Input name="customTheme" value={themeForm.customTheme} onChange={handleThemeChange} />
                  </div>
                )}
                <Button type="submit" disabled={saving} className="mt-2">
                  {saving ? "Saving..." : "Save Appearance"}
                </Button>
                {error && <div className="text-red-500 mt-2 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</div>}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab (PRO/ENTERPRISE) */}
        {(profile?.subscription?.plan === 'PRO' || profile?.subscription?.plan === 'ENTERPRISE') && (
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Custom Branding</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBrandingSave} className="space-y-6">
                  <div className="space-y-6">
                    <FileUpload
                      type="avatar"
                      label="Profile Avatar"
                      currentUrl={brandingForm.avatarUrl}
                      onUploadComplete={(url) => setBrandingForm({...brandingForm, avatarUrl: url})}
                    />
                    <FileUpload
                      type="banner"
                      label="Profile Banner"
                      currentUrl={brandingForm.bannerUrl}
                      onUploadComplete={(url) => setBrandingForm({...brandingForm, bannerUrl: url})}
                    />
                    <FileUpload
                      type="logo"
                      label="Brand Logo"
                      currentUrl={brandingForm.logo}
                      onUploadComplete={(url) => setBrandingForm({...brandingForm, logo: url})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <Label htmlFor="primary">Primary Color</Label>
                      <Input name="primary" value={brandingForm.primary} onChange={handleBrandingChange} />
                    </div>
                    <div>
                      <Label htmlFor="secondary">Secondary Color</Label>
                      <Input name="secondary" value={brandingForm.secondary} onChange={handleBrandingChange} />
                    </div>
                    <div>
                      <Label htmlFor="background">Background Color</Label>
                      <Input name="background" value={brandingForm.background} onChange={handleBrandingChange} />
                    </div>
                    <div>
                      <Label htmlFor="fontHeading">Heading Font</Label>
                      <Input name="fontHeading" value={brandingForm.fontHeading} onChange={handleBrandingChange} />
                    </div>
                    <div>
                      <Label htmlFor="fontBody">Body Font</Label>
                      <Input name="fontBody" value={brandingForm.fontBody} onChange={handleBrandingChange} />
                    </div>
                  </div>
                  <Button type="submit" disabled={saving} className="mt-2">
                    {saving ? "Saving..." : "Save Branding"}
                  </Button>
                  {error && <div className="text-red-500 mt-2 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</div>}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* White-Label Tab (ENTERPRISE) */}
        {profile?.isWhiteLabeled && (
          <TabsContent value="whitelabel">
            <Card>
              <CardHeader>
                <CardTitle>White-Label Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                    <span className="text-lg font-semibold">White-labeling is enabled for your account.</span>
                  </div>
                  <p className="text-muted-foreground">
                    All RefStack branding will be removed from your public stack and referral links. You can fully customize your appearance and even use a custom domain.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>RefStack branding hidden</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Custom domain support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Custom logo, colors, and fonts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Live Preview Tab */}
        <TabsContent value="preview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Live Preview</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowPreview(prev => !prev)}
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
                {profile?.username && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(`/u/${profile.username}`, '_blank')}
                  >
                    View Public Page
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This is a live preview of how your public referral stack will appear to visitors. Changes you make to your profile, theme, and branding will be reflected here.
                </p>
                
                {showPreview ? (
                  <div className="mt-6">
                    <PreviewStack 
                      profile={{
                        name: profileForm.name,
                        bio: profileForm.bio,
                        website: profileForm.website,
                        company: profileForm.company,
                        location: profileForm.location,
                        twitter: profileForm.twitter,
                        github: profileForm.github,
                        linkedin: profileForm.linkedin,
                        image: profile?.image,
                      }}
                      theme={themeForm}
                      branding={brandingForm}
                      showWhiteLabel={profile?.isWhiteLabeled}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center p-12">
                    <Button 
                      onClick={() => setShowPreview(true)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" /> Show Preview
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
