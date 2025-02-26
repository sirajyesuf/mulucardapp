'use client';

import { AlertCircle, CheckCircle, Upload, X, XCircle } from 'lucide-react';
import type React from 'react';
import { useRef, useState } from 'react';

interface FileStatus {
    file: File;
    progress: number;
    status: 'idle' | 'validating' | 'invalid' | 'uploading' | 'success' | 'error';
    errorMessage?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export default function FileUpload({ setPreviewUrl }) {
    const [fileStatus, setFileStatus] = useState<FileStatus | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return 'Invalid file type. Please upload a JPEG, PNG, or PDF file.';
        }
        if (file.size > MAX_FILE_SIZE) {
            return 'File is too large. Maximum size is 5MB.';
        }
        return null;
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileStatus({ file, progress: 0, status: 'validating' });

        const errorMessage = validateFile(file);
        if (errorMessage) {
            setFileStatus({ file, progress: 0, status: 'invalid', errorMessage });
            setPreviewUrl(null);
        } else {
            setFileStatus({ file, progress: 0, status: 'idle' });
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => setPreviewUrl(e.target?.result as string);
                reader.readAsDataURL(file);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const uploadFile = async () => {
        if (!fileStatus || fileStatus.status !== 'idle') return;

        setFileStatus((prev) => (prev ? { ...prev, status: 'uploading' } : null));

        // Simulate upload process
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            setFileStatus((prev) => (prev ? { ...prev, progress: i } : null));
        }

        // Simulate success or error (80% success rate)
        const isSuccess = Math.random() < 0.8;
        setFileStatus((prev) => (prev ? { ...prev, status: isSuccess ? 'success' : 'error' } : null));
    };

    const resetFileInput = () => {
        setFileStatus(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = () => {
        resetFileInput();
    };

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 md:flex-row">
            <div className="w-full">
                <div className="rounded-lg border-2 p-8 text-center">
                    <Upload className="mx-auto h-6 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Select a file to upload</p>
                    <label
                        htmlFor="file-upload"
                        className="bg-primary hover:bg-primary/90 focus:ring-primary mt-2 inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                        Choose File
                    </label>
                    <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={onFileChange}
                        ref={fileInputRef}
                        accept={ALLOWED_FILE_TYPES.join(',')}
                    />
                </div>
                {fileStatus && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="max-w-[200px] truncate text-sm text-gray-600">{fileStatus.file.name}</span>
                            <div className="flex items-center">
                                {fileStatus.status === 'idle' && (
                                    <>
                                        <span className="mr-2 text-xs text-gray-400">Ready to upload</span>
                                        <button
                                            onClick={removeFile}
                                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                            aria-label="Remove file"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </>
                                )}{' '}
                                {fileStatus.status === 'validating' && <span className="text-xs text-gray-400">Validating...</span>}
                                {fileStatus.status === 'invalid' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                                {fileStatus.status === 'uploading' && (
                                    <div className="h-2.5 w-20 rounded-full bg-gray-200">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${fileStatus.progress}%` }}></div>
                                    </div>
                                )}
                                {fileStatus.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {fileStatus.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                            </div>
                        </div>
                        {fileStatus.status === 'invalid' && <p className="mt-1 text-xs text-red-500">{fileStatus.errorMessage}</p>}
                        {/* {fileStatus.status === 'idle' && (
                            <button
                                onClick={uploadFile}
                                className="bg-primary hover:bg-primary/90 focus:ring-primary mt-4 w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                            >
                                Upload File
                            </button>
                        )}
                        {(fileStatus.status === 'success' || fileStatus.status === 'error') && (
                            <button
                                onClick={resetFileInput}
                                className="mt-4 w-full rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Upload Another File
                            </button>
                        )} */}
                    </div>
                )}
            </div>
            {/* <div className="w-full md:w-1/2">
                <div className="flex h-full items-center justify-center rounded-lg border-2 p-4">
                    {previewUrl ? (
                        <img src={previewUrl || '/placeholder.svg'} alt="File preview" className="max-h-[300px] max-w-full object-contain" />
                    ) : fileStatus && fileStatus.file.type === 'application/pdf' ? (
                        <div className="text-center">
                            <FileIcon className="mx-auto h-16 w-16 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">PDF file selected</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">No file selected or preview not available</p>
                    )}
                </div>
            </div> */}
        </div>
    );
}
