"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2, Check, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  type: 'avatar' | 'banner' | 'logo'
  label: string
  currentUrl?: string
  onUploadComplete: (url: string) => void
  className?: string
}

export function FileUpload({
  type,
  label,
  currentUrl,
  onUploadComplete,
  className
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null)
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Reset states
    setError(null)
    setSuccess(false)
    setIsUploading(true)
    
    // Create preview for immediate feedback
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    fileReader.readAsDataURL(file)
    
    try {
      // Prepare form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)
      
      // Upload the file
      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }
      
      // Handle success
      setSuccess(true)
      onUploadComplete(data.url)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
      console.error('File upload error:', err)
    } finally {
      setIsUploading(false)
    }
  }
  
  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={`upload-${type}`}>{label}</Label>
      
      <div className="flex items-center gap-4">
        {previewUrl && (
          <div className={cn(
            "relative overflow-hidden bg-gray-100",
            type === 'avatar' ? "h-16 w-16 rounded-full" : 
            type === 'logo' ? "h-12 w-24" : 
            "h-16 w-32 rounded-md"
          )}>
            <Image
              src={previewUrl}
              alt={`${type} preview`}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="relative"
              disabled={isUploading}
            >
              <input
                type="file"
                id={`upload-${type}`}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/jpeg, image/png, image/gif, image/webp"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
            
            {currentUrl && !isUploading && (
              <Input
                value={currentUrl}
                readOnly
                className="text-xs max-w-64 flex-1"
              />
            )}
            
            {success && !isUploading && (
              <span className="text-green-500 flex items-center text-sm">
                <Check className="h-4 w-4 mr-1" /> Uploaded
              </span>
            )}
          </div>
          
          {error && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <X className="h-3 w-3 mr-1" /> {error}
            </p>
          )}
          
          <p className="text-xs text-muted-foreground mt-1">
            Max 2MB. Supported formats: JPEG, PNG, GIF, WebP
          </p>
        </div>
      </div>
    </div>
  )
}
