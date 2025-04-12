"use client"

import { useState } from "react"
import { Facebook, Linkedin, Mail, Share2, Twitter, LinkIcon, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from 'sonner';
import { cn } from "@/lib/utils"

interface ShareButtonProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export default function ShareButton({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check this out!",
  description = "I thought you might find this interesting.",
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#4267B2] hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-[#0077B5] hover:text-white",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
      color: "hover:bg-gray-500 hover:text-white",
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    //   toast({
    //     title: "Link copied!",
    //     description: "The link has been copied to your clipboard.",
    //   })
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
    //   toast({
    //     title: "Failed to copy",
    //     description: "Please try again or copy the URL manually.",
    //     variant: "destructive",
    //   })
    toast.error('Failed to copy link')
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2", className)}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="end">
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Share</h4>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
                  link.color,
                )}
                aria-label={`Share on ${link.name}`}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or copy link</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 mt-2" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Copy className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" />
                Copy link
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}