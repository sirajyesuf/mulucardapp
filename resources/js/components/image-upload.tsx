'use client';

import { Upload } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
interface ImageUploadProps {
    id: string;
    label: string;
    onImageChange: (file: File | null, previewUrl: string | null) => void;
    accept?: string;
}

export default function ImageUpload({ id, label, onImageChange, accept = 'image/*' }: ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            const newPreviewUrl = URL.createObjectURL(file);
            setPreviewUrl(newPreviewUrl);

            onImageChange(file, newPreviewUrl);
        } else {
            setPreviewUrl(null);
            onImageChange(null, null);
            if (file) {
                alert('Please select an image file (e.g., PNG, JPEG)');
            }
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        // <div className="space-y-2">
        //     <Label htmlFor={id}>{label}</Label>
        //     <Input id={id} type="file" accept={accept} onChange={handleImageChange} className="max-w-md" />
        // </div>
        //
        <div className="rounded-lg border-2 p-8 text-center">
            <Upload className="mx-auto h-6 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">{label}</p>
            <label
                htmlFor={id}
                className="bg-primary hover:bg-primary/90 focus:ring-primary mt-2 inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
                Choose File
            </label>
            <input id={id} name={id} type="file" onChange={handleImageChange} accept={accept} />
        </div>
    );
}
