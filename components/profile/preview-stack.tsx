"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

type PreviewStackProps = {
  profile: any
  theme: any
  branding: any
  showWhiteLabel?: boolean
}

export function PreviewStack({
  profile,
  theme,
  branding,
  showWhiteLabel = false
}: PreviewStackProps) {
  // Sample referral links for preview
  const sampleReferrals = [
    { name: "Dropbox", description: "Free cloud storage", customColor: "#0062ff" },
    { name: "Coinbase", description: "Buy and sell crypto", customColor: "#0052ff" },
    { name: "Airbnb", description: "Book unique places to stay", customColor: "#ff385c" },
  ]

  // Dynamic styles based on branding
  const headerStyle = {
    backgroundColor: branding.background || "#f8f9fa",
    color: branding.primary || "#000",
  }

  const accentColor = branding.primary || "#0062ff"
  const textColor = branding.secondary || "#333"
  
  // Font styles
  const fontStyles = branding.fontHeading || branding.fontBody 
    ? `
      @import url('https://fonts.googleapis.com/css2?family=${branding.fontHeading?.replace(' ', '+')||'Inter'}&family=${branding.fontBody?.replace(' ', '+')||'Inter'}&display=swap');
      
      .preview-heading {
        font-family: '${branding.fontHeading || 'Inter'}', sans-serif;
      }
      .preview-body {
        font-family: '${branding.fontBody || 'Inter'}', sans-serif;
      }
    ` 
    : ""

  return (
    <div className="preview-container rounded-lg border overflow-hidden shadow-md w-full max-w-md mx-auto">
      {fontStyles && <style jsx global>{fontStyles}</style>}
      
      {/* Header */}
      <div 
        className="p-6 relative" 
        style={headerStyle}
      >
        {branding.bannerUrl && (
          <div className="absolute inset-0 w-full h-full opacity-20">
            <Image
              src={branding.bannerUrl}
              alt="Banner"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className="relative z-10 flex items-center">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarImage src={branding.avatarUrl || profile.image} alt={profile.name} />
            <AvatarFallback>{profile.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h1 className="preview-heading text-2xl font-bold">{profile.name || "User Name"}</h1>
            <p className="preview-body text-sm opacity-80">{profile.bio || "User bio goes here"}</p>
            <div className="flex gap-2 mt-2">
              {profile.location && (
                <Badge variant="secondary" className="text-xs">
                  {profile.location}
                </Badge>
              )}
              {profile.company && (
                <Badge variant="secondary" className="text-xs">
                  {profile.company}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex mt-4 gap-3">
          {profile.website && (
            <a 
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {profile.twitter && (
            <a 
              href={`https://twitter.com/${profile.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <Twitter size={18} />
            </a>
          )}
          {profile.github && (
            <a 
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <Github size={18} />
            </a>
          )}
          {profile.linkedin && (
            <a 
              href={`https://linkedin.com/in/${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
      
      {/* Referral Links */}
      <div className="bg-white p-6">
        <h2 className="preview-heading text-lg font-semibold mb-4" style={{ color: textColor }}>My Referral Links</h2>
        
        <div className="space-y-3">
          {sampleReferrals.map((referral, i) => (
            <Card key={i} className="overflow-hidden border-2 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 
                    className="preview-heading font-medium"
                    style={{ color: referral.customColor || accentColor }}
                  >
                    {referral.name}
                  </h3>
                  <p className="preview-body text-sm text-gray-600">{referral.description}</p>
                </div>
                <div 
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: referral.customColor || accentColor }}
                >
                  <ExternalLink size={14} className="text-white" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      {!showWhiteLabel && (
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-xs text-gray-500">
            Powered by <span className="font-semibold">RefStack</span>
          </p>
        </div>
      )}
    </div>
  )
}
