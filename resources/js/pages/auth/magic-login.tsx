import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

import { toast } from 'sonner';

interface LoginForm {
    email: string;
    [key: string]: string | File | null | undefined;
}

export default function MagicLogin({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
    });

    // Display success or error toasts based on status or errors
    useEffect(() => {
        if (status) {
            toast.success(status);
            reset(); // Clear form after success
        }
    }, [status, reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                // Success handling is now managed via the `status` prop
            },
            onError: (errors) => {
                // Handle non-validation errors (e.g., server issues)
                if (errors.email && !errors.email.includes('required')) {
                    toast.error(errors.email);
                }
            },
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email Address">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}