import { Facebook, Twitter, Linkedin, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
    url: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function SocialShare({ url, title, isOpen, onClose }: SocialShareProps) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const socialLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'white'
        },
        {
            name: 'Twitter',
            icon: X,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: 'white'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'white'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            color: 'white'
        }
    ];

    const handleShare = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={`absolute bottom-16 left-0 transform transition-all duration-200 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <div className="flex items-center gap-2 rounded-lg bg-gray-500 p-2 shadow-none">
                {socialLinks.map((social) => (
                    <button
                        key={social.name}
                        onClick={() => handleShare(social.url)}
                        className="flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-110"
                        title={social.name}
                    >
                        <social.icon size={24} color={social.color} />
                    </button>
                ))}
            </div>
        </div>
    );
}
