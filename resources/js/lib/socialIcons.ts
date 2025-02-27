import { Facebook, Globe, Instagram, Linkedin, Mail, Phone, Twitter, Youtube } from 'lucide-react';
import { ComponentType } from 'react';

// Define the type for icon components
type IconComponent = ComponentType<{ className?: string }>;

// Mapping of social link names to Lucide icons
export const socialIconMap: Record<string, IconComponent> = {
    email: Mail,
    phone: Phone,
    website: Globe,
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
};

// Fallback icon if no match is found (optional)
export const DefaultIcon: IconComponent = Globe; // Or any default icon
