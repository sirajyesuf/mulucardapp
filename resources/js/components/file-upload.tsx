import { AlertCircle, CheckCircle, Upload, X, XCircle } from 'lucide-react';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

// Define interfaces for props and file status
interface FileStatus {
    file: File;
    progress: number;
    status: 'idle' | 'validating' | 'invalid' | 'uploading' | 'success' | 'error';
    errorMessage?: string;
}

export interface FileUploadProps {
    id: string; // Unique identifier for the input
    label?: string; // Custom label text
    allowedFileTypes?: string[]; // e.g., ['image/jpeg', 'image/png']
    maxFileSize?: number; // in bytes
    onFileChange?: (file: File | null, previewUrl: string | null) => void; // Callback for file selection
    onUpload?: (file: File) => Promise<'success' | 'error'>; // Custom upload handler
    disabled?: boolean; // Disable the component
    className?: string; // Custom styling
}

// Use forwardRef to allow parent components to access the input ref if needed
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
    (
        {
            id,
            label = 'Select a file to upload',
            allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'],
            maxFileSize = 5 * 1024 * 1024, // 5MB default
            onFileChange,
            onUpload,
            disabled = false,
            className = '',
        },
        ref,
    ) => {
        const [fileStatus, setFileStatus] = useState<FileStatus | null>(null);
        const internalRef = useRef<HTMLInputElement>(null);

        // Expose the input ref to the parent via forwardRef
        useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

        // Validation logic
        const validateFile = (file: File): string | null => {
            if (!allowedFileTypes.includes(file.type)) {
                return `Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}.`;
            }
            if (file.size > maxFileSize) {
                return `File is too large. Max size: ${maxFileSize / (1024 * 1024)}MB.`;
            }
            return null;
        };

        // Handle file selection
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setFileStatus({ file, progress: 0, status: 'validating' });

            const errorMessage = validateFile(file);
            if (errorMessage) {
                setFileStatus({ file, progress: 0, status: 'invalid', errorMessage });
                onFileChange?.(null, null);
            } else {
                setFileStatus({ file, progress: 0, status: 'idle' });
                let previewUrl: string | null = null;
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        previewUrl = e.target?.result as string;
                        onFileChange?.(file, previewUrl);
                    };
                    reader.readAsDataURL(file);
                } else {
                    onFileChange?.(file, null);
                }
            }
        };

        // Default simulated upload (can be overridden by onUpload prop)
        const defaultUpload = async (file: File) => {
            setFileStatus((prev) => (prev ? { ...prev, status: 'uploading' } : null));
            for (let i = 0; i <= 100; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 200));
                setFileStatus((prev) => (prev ? { ...prev, progress: i } : null));
            }
            const isSuccess = Math.random() < 0.8;
            setFileStatus((prev) => (prev ? { ...prev, status: isSuccess ? 'success' : 'error' } : null));
            return isSuccess ? 'success' : 'error';
        };

        // Trigger upload
        const handleUpload = async () => {
            if (!fileStatus || fileStatus.status !== 'idle' || disabled) return;
            const uploadFn = onUpload || defaultUpload;
            const result = await uploadFn(fileStatus.file);
            setFileStatus((prev) => (prev ? { ...prev, status: result } : null));
        };

        // Reset the component
        const reset = () => {
            setFileStatus(null);
            onFileChange?.(null, null);
            if (internalRef.current) {
                internalRef.current.value = '';
            }
        };

        return (
            <div className={`w-full ${className}`}>
                <div className="rounded-lg border-2 p-8 text-center">
                    <Upload className="mx-auto h-6 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">{label}</p>
                    <label
                        htmlFor={id}
                        className={`mt-2 inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                            disabled ? 'cursor-not-allowed bg-gray-400' : 'bg-primary hover:bg-primary/90 focus:ring-primary'
                        }`}
                    >
                        Choose File
                    </label>
                    <input
                        id={id}
                        name={id}
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        ref={internalRef}
                        accept={allowedFileTypes.join(',')}
                        disabled={disabled}
                    />
                </div>
                {fileStatus && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="max-w-[200px] truncate text-sm text-gray-600">{fileStatus.file.name}</span>
                            <div className="flex items-center gap-2">
                                {fileStatus.status === 'idle' && (
                                    <>
                                        <span className="text-xs text-gray-400">Ready to upload</span>
                                        <button
                                            onClick={reset}
                                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                            aria-label="Remove file"
                                            disabled={disabled}
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                                {fileStatus.status === 'validating' && <span className="text-xs text-gray-400">Validating...</span>}
                                {fileStatus.status === 'invalid' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                                {fileStatus.status === 'uploading' && (
                                    <div className="h-2.5 w-20 rounded-full bg-gray-200">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${fileStatus.progress}%` }} />
                                    </div>
                                )}
                                {fileStatus.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {fileStatus.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                            </div>
                        </div>
                        {fileStatus.status === 'invalid' && <p className="mt-1 text-xs text-red-500">{fileStatus.errorMessage}</p>}
                        {/* {fileStatus.status === 'idle' && (
                            <button
                                onClick={handleUpload}
                                className={`mt-4 w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                                    disabled ? 'cursor-not-allowed bg-gray-400' : 'bg-primary hover:bg-primary/90 focus:ring-primary'
                                }`}
                                disabled={disabled}
                            >
                                Upload File
                            </button>
                        )} */}
                        {(fileStatus.status === 'success' || fileStatus.status === 'error') && (
                            <button
                                onClick={reset}
                                className={`mt-4 w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                                    disabled ? 'cursor-not-allowed bg-gray-400' : 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500'
                                }`}
                                disabled={disabled}
                            >
                                Upload Another File
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

// Add displayName for debugging and React DevTools
FileUpload.displayName = 'FileUpload';

export default FileUpload;
