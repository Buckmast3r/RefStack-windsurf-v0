"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Plus, Edit, Trash, Link, Copy, CheckCheck, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

type ReferralLink = {
  id: string
  name: string
  url: string
  shortCode: string
  customSlug?: string
  description?: string
  clickCount: number
  conversionCount: number
  createdAt: string
  updatedAt: string
}

type ReferralFormData = {
  name: string
  description: string
  customSlug: string
}

export default function ReferralsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [referrals, setReferrals] = useState<ReferralLink[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [formData, setFormData] = useState<ReferralFormData>({
    name: "",
    description: "",
    customSlug: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    customSlug: "",
    general: "",
  })
  const [selectedReferral, setSelectedReferral] = useState<ReferralLink | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent('/dashboard/referrals')}`)
      return
    }

    if (status === "authenticated") {
      fetchReferralLinks()
    }
  }, [status, router])

  const fetchReferralLinks = async () => {
    try {
      setRefreshing(true)
      const res = await fetch('/api/referral-links')
      
      if (!res.ok) {
        throw new Error('Failed to fetch referral links')
      }
      
      const data = await res.json()
      setReferrals(data.links || [])
    } catch (error) {
      console.error('Error fetching referral links:', error)
      toast.error('Failed to load referral links')
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const handleCreateReferral = () => {
    setFormData({
      name: "",
      description: "",
      customSlug: "",
    })
    setErrors({
      name: "",
      customSlug: "",
      general: "",
    })
    setShowCreateDialog(true)
  }

  const handleEditReferral = (referral: ReferralLink) => {
    setSelectedReferral(referral)
    setFormData({
      name: referral.name,
      description: referral.description || "",
      customSlug: referral.customSlug || "",
    })
    setErrors({
      name: "",
      customSlug: "",
      general: "",
    })
    setShowEditDialog(true)
  }

  const handleDeleteReferral = (referral: ReferralLink) => {
    setSelectedReferral(referral)
    setShowDeleteDialog(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when typing
    if (name in errors) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      customSlug: "",
      general: "",
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (formData.customSlug.trim() && !/^[a-zA-Z0-9-_]+$/.test(formData.customSlug)) {
      newErrors.customSlug = "Custom slug can only contain letters, numbers, hyphens, and underscores"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/referral-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create referral link')
      }
      
      await fetchReferralLinks()
      setShowCreateDialog(false)
      toast.success('Referral link created successfully')
    } catch (error: any) {
      console.error('Error creating referral link:', error)
      setErrors(prev => ({
        ...prev,
        general: error.message || 'Failed to create referral link'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !selectedReferral) return
    
    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/referral-links/${selectedReferral.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update referral link')
      }
      
      await fetchReferralLinks()
      setShowEditDialog(false)
      toast.success('Referral link updated successfully')
    } catch (error: any) {
      console.error('Error updating referral link:', error)
      setErrors(prev => ({
        ...prev,
        general: error.message || 'Failed to update referral link'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!selectedReferral) return
    
    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/referral-links/${selectedReferral.id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete referral link')
      }
      
      await fetchReferralLinks()
      setShowDeleteDialog(false)
      toast.success('Referral link deleted successfully')
    } catch (error: any) {
      console.error('Error deleting referral link:', error)
      toast.error(error.message || 'Failed to delete referral link')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (referral: ReferralLink) => {
    const baseUrl = window.location.origin
    const fullUrl = `${baseUrl}/r/${referral.customSlug || referral.shortCode}`
    
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        setCopiedId(referral.id)
        setTimeout(() => setCopiedId(null), 2000)
        toast.success('Referral link copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy:', err)
        toast.error('Failed to copy to clipboard')
      })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-12 w-full mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Referral Links</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your referral links
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={fetchReferralLinks} 
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleCreateReferral}>
            <Plus className="h-4 w-4 mr-2" />
            New Link
          </Button>
        </div>
      </div>

      {referrals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Link className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No referral links yet</h3>
            <p className="text-muted-foreground mb-4 text-center max-w-md">
              Create your first referral link to start tracking clicks and conversions
            </p>
            <Button onClick={handleCreateReferral}>
              <Plus className="h-4 w-4 mr-2" />
              Create Link
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Links</CardTitle>
            <CardDescription>
              You have {referrals.length} active referral links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-center">Clicks</TableHead>
                    <TableHead className="text-center">Conversions</TableHead>
                    <TableHead className="text-center">Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => {
                    const fullUrl = `${window.location.origin}/r/${referral.customSlug || referral.shortCode}`
                    return (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">{referral.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="truncate max-w-[180px]">{fullUrl}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => copyToClipboard(referral)}
                            >
                              {copiedId === referral.id ? (
                                <CheckCheck className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{referral.clickCount}</TableCell>
                        <TableCell className="text-center">{referral.conversionCount}</TableCell>
                        <TableCell className="text-center">
                          {formatDate(referral.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditReferral(referral)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteReferral(referral)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Referral Link</DialogTitle>
            <DialogDescription>
              Create a new referral link to share with others
            </DialogDescription>
          </DialogHeader>
          
          {errors.general && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>{errors.general}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmitCreate}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="e.g., Dropbox Promotion"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description"
                  name="description"
                  placeholder="Optional description of this link"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customSlug">Custom Slug</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 text-sm text-muted-foreground">
                    {window.location.origin}/r/
                  </div>
                  <Input 
                    id="customSlug"
                    name="customSlug"
                    placeholder="my-custom-link"
                    value={formData.customSlug}
                    onChange={handleFormChange}
                    className={errors.customSlug ? "border-destructive" : ""}
                  />
                </div>
                {errors.customSlug ? (
                  <p className="text-destructive text-sm">{errors.customSlug}</p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Leave empty to generate a random code
                  </p>
                )}
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowCreateDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Referral Link</DialogTitle>
            <DialogDescription>
              Update your referral link details
            </DialogDescription>
          </DialogHeader>
          
          {errors.general && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>{errors.general}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmitEdit}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="edit-name"
                  name="name"
                  placeholder="e.g., Dropbox Promotion"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input 
                  id="edit-description"
                  name="description"
                  placeholder="Optional description of this link"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-customSlug">Custom Slug</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 text-sm text-muted-foreground">
                    {window.location.origin}/r/
                  </div>
                  <Input 
                    id="edit-customSlug"
                    name="customSlug"
                    placeholder="my-custom-link"
                    value={formData.customSlug}
                    onChange={handleFormChange}
                    className={errors.customSlug ? "border-destructive" : ""}
                  />
                </div>
                {errors.customSlug ? (
                  <p className="text-destructive text-sm">{errors.customSlug}</p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Leave empty to use the system-generated code
                  </p>
                )}
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEditDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Referral Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this referral link? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReferral && (
            <div className="py-4">
              <div className="p-4 border rounded-md mb-4">
                <p className="font-medium">{selectedReferral.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {window.location.origin}/r/{selectedReferral.customSlug || selectedReferral.shortCode}
                </p>
              </div>
              
              <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 text-sm p-3 rounded-md flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  Deleting this link will remove all associated stats and make the URL unavailable.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
