import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type Bank, type Plan, type SharedData } from '@/types';
import { Button } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Check, ChevronDown, ChevronUp, ClipboardCopy } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import InputError from '@/components/input-error';
import { Link } from '@inertiajs/react'

interface PaymentMethodLogoProps {
    bankName: string;
    logoUrl: string | null;
}

const PaymentMethodLogo: React.FC<PaymentMethodLogoProps> = ({ bankName, logoUrl }) => {
    // Define bank logo colors
    const getBankColor = (name: string) => {
        const banks: Record<string, string> = {
            Chase: 'bg-blue-500',
            'Bank of America': 'bg-red-600',
            'Wells Fargo': 'bg-red-700',
            Citibank: 'bg-blue-600',
            'Capital One': 'bg-red-500',
            'TD Bank': 'bg-green-600',
            'US Bank': 'bg-blue-700',
        };

        return banks[name] || 'bg-gray-600';
    };

    // Get initials from bank name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (logoUrl) {
        return <img src={logoUrl} alt={bankName} className="h-10 w-10 rounded-md object-cover" />;
    }

    return <div className={`${getBankColor(bankName)} flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-white`}>{getInitials(bankName)}</div>;
};

interface BankSelectorProps {
    banks: Bank[];
    selectedBank: Bank | null;
    onSelectBank: (bank: Bank) => void;
}

export const BankSelector: React.FC<BankSelectorProps> = ({ banks, selectedBank, onSelectBank }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={toggleDropdown}
                className="border-border/60 hover:border-border focus:ring-primary/20 flex w-full items-center justify-between rounded-xl border bg-white p-4 text-left transition-all focus:ring-2 focus:outline-none"
            >
                {selectedBank ? (
                    <div className="flex items-center space-x-3">
                        <PaymentMethodLogo bankName={selectedBank.name} logoUrl={selectedBank.logo_url} />
                        <div>
                            <p className="font-medium">{selectedBank.name}</p>
                            <p className="text-muted-foreground text-sm">
                                {selectedBank.type === 'bank'
                                    ? `Bank • Account ending in ${selectedBank.account_number?.slice(-4) ?? 'N/A'}`
                                    : `Wallet • Phone ending in ${selectedBank.phone_number?.slice(-4) ?? 'N/A'}`}
                            </p>
                        </div>
                    </div>
                ) : (
                    <span className="text-muted-foreground">Select payment method</span>
                )}
                {isOpen ? <ChevronUp className="text-muted-foreground h-5 w-5" /> : <ChevronDown className="text-muted-foreground h-5 w-5" />}
            </button>

            {isOpen && (
                <div className="soft-shadow border-border/60 animate-fade-in absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg">
                    <div className="py-1">
                        {banks.map((bank: Bank) => (
                            <button
                                key={bank.id}
                                className={cn(
                                    'hover:bg-muted flex w-full items-center space-x-3 px-4 py-3 text-left transition-colors',
                                    selectedBank?.id === bank.id ? 'bg-primary/5' : '',
                                )}
                                onClick={() => {
                                    onSelectBank(bank);
                                    setIsOpen(false);
                                }}
                            >
                                <PaymentMethodLogo bankName={bank.name} logoUrl={bank.logo_url} />
                                <div className="flex-1">
                                    <p className="font-medium">{bank.name}</p>
                                    <p className="text-muted-foreground text-sm">
                                        {bank.type === 'bank' ? `Bank • Account ending in ${bank.account_number?.slice(-4) ?? 'N/A'}` : `Wallet • Phone ending in ${bank.phone_number?.slice(-4) ?? 'N/A'}`}
                                    </p>
                                </div>
                                {selectedBank?.id === bank.id && <Check className="text-primary h-5 w-5" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Index = () => {
    const { props } = usePage();
    const { auth } = usePage<SharedData>().props;
    const banks = props.banks as Bank[];
    const plan = props.plan as Plan;

    type PaymentForm = {
        payment_method_id: number | null;
        transactionCode: string;
        email: string;
    };
    const { data, setData, post, errors, processing } = useForm<PaymentForm>({
        payment_method_id: banks[0]?.id ?? null,
        transactionCode: '',
        email: auth.user.email,
    });
    const [copiedKey, setCopiedKey] = useState<'identifier' | 'holder' | null>(null);

    const selectedPaymentMethod = banks.find((method) => method.id === data.payment_method_id) ?? null;
    const canSubmit = Boolean(data.payment_method_id && data.transactionCode.trim()) && !processing;
    const identifierLabel = selectedPaymentMethod?.type === 'wallet' ? 'Phone Number' : 'Account Number';
    const identifierValue = selectedPaymentMethod?.type === 'wallet' ? selectedPaymentMethod.phone_number : selectedPaymentMethod?.account_number;

    function onSelectBank(bank: Bank) {
        setData('payment_method_id', bank.id);
    }

    const baseAmount = plan.price;
    const paymentAmount = baseAmount;

    const copyValue = (value: string | null | undefined, label: string, key: 'identifier' | 'holder') => {
        if (!value) return;
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            toast.success(`${label} copied`);
            setTimeout(() => setCopiedKey(null), 1500);
        });
    };

    const handlePayment = () => {
        if (!data.payment_method_id) {
            toast.error('Please select a payment method.');
            return;
        }

        if (!data.transactionCode.trim()) {
            toast.error('Please enter your transaction reference code.');
            return;
        }

        post(route('checkout.order', { plan: plan }), {
            onSuccess: () => {
                toast.success('Order submitted. Your subscription will be activated after approval.');
            },
            onError: (formErrors) => {
                const firstError = Object.values(formErrors)[0];
                toast.error(firstError ?? 'Please review the form and try again.');
            },
        });
    };

    return (
        <div className="container mx-auto flex min-h-screen flex-col bg-white md:flex-row">
            <Toaster richColors  />
            {/* Left column - Company and subscription info */}
            <div className="flex flex-col bg-white p-6 md:w-1/2 md:p-12">
                <div className="mb-8">
                    <Link className="flex items-center text-sm text-gray-500 hover:text-gray-700" href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <span>MuluCard</span>
                    </Link>
                </div>

                <div className="mt-4">
                    <h2 className="mb-1 text-lg font-medium">Subscribe to {plan.name} Plan</h2>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold">Birr {paymentAmount}</span>
                        <span className="ml-2 text-sm text-gray-500">per year</span>
                    </div>
                </div>

                <div className="mt-8 rounded-md border bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">{plan.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                        </div>
                        <span className="font-medium">Birr {plan.price}</span>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between font-medium">
                    <span>Total due today</span>
                    <span>Birr {paymentAmount}</span>
                </div>
            </div>

            {/* Right column - Payment form */}
            <div className="flex flex-col border-none bg-gray-50 p-6 md:w-1/2 md:p-12">
                <h1 className="mb-3 text-xl font-semibold">Pay by Transfer</h1>
                <div className="mb-6 grid gap-2 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
                    <p><span className="font-medium">1.</span> Choose a payment method</p>
                    <p><span className="font-medium">2.</span> Send the transfer</p>
                    <p><span className="font-medium">3.</span> Enter your transaction reference code</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2 rounded-md border border-gray-200 bg-white p-3">
                        <Label htmlFor="email" className="text-xs uppercase tracking-wide text-gray-500">Account Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled
                            className="bg-gray-100 text-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <BankSelector banks={banks} selectedBank={selectedPaymentMethod} onSelectBank={onSelectBank} />
                        <InputError className="mt-2" message={errors.payment_method_id} />
                    </div>

                    {selectedPaymentMethod && (
                        <div className="space-y-3 rounded-md border bg-white p-4">
                            <div className="rounded-md border border-dashed border-gray-200 bg-gray-50 p-3">
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">{identifierLabel}</span>
                                    <button
                                        type="button"
                                        onClick={() => copyValue(identifierValue, identifierLabel, 'identifier')}
                                        className="rounded p-1 hover:bg-gray-200"
                                        aria-label={`Copy ${identifierLabel}`}
                                    >
                                        {copiedKey === 'identifier' ? <Check className="h-4 w-4 text-green-600" /> : <ClipboardCopy className="h-4 w-4 text-gray-500" />}
                                    </button>
                                </div>
                                <p className="text-lg font-semibold tracking-wide">{identifierValue ?? '-'}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">{selectedPaymentMethod.type === 'wallet' ? 'Recipient Name' : 'Account Holder'}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{selectedPaymentMethod.account_holder}</span>
                                    <button
                                        type="button"
                                        onClick={() => copyValue(selectedPaymentMethod.account_holder, 'Recipient name', 'holder')}
                                        className="rounded p-1 hover:bg-gray-100"
                                        aria-label="Copy recipient name"
                                    >
                                        {copiedKey === 'holder' ? <Check className="h-4 w-4 text-green-600" /> : <ClipboardCopy className="h-4 w-4 text-gray-500" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Payment Method</span>
                                <span className="text-sm font-medium">{selectedPaymentMethod.name}</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="transactionCode">Transaction Reference Code</Label>
                        <Input
                            id="transactionCode"
                            value={data.transactionCode}
                            onChange={(e) => setData('transactionCode', e.target.value)}
                            placeholder="Use the exact transfer reference from your bank or wallet receipt"
                        />
                        <p className="text-xs text-gray-500">Use the exact transfer reference from your receipt or wallet app.</p>
                        <InputError className="mt-2" message={errors.transactionCode} />
                    </div>

                    <div className="space-y-3 rounded-md bg-white/80 p-3 md:p-0 md:bg-transparent md:sticky md:bottom-0">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2 text-sm font-medium md:hidden">
                            <span>Total due today</span>
                            <span>Birr {paymentAmount}</span>
                        </div>
                        <Button
                            onClick={handlePayment}
                            disabled={!canSubmit}
                            className={cn(
                                'mt-1 w-full rounded-md py-4 text-white',
                                canSubmit ? 'bg-blue-500 hover:bg-blue-600' : 'cursor-not-allowed bg-blue-300',
                            )}
                        >
                            {processing ? 'Submitting...' : 'Subscribe'}
                        </Button>
                        <p className="text-center text-xs text-gray-500">Your order will be reviewed after payment confirmation.</p>
                    </div>

                    <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
                        <span>Powered by Mulucard</span>
                        <span>•</span>
                        <button className="hover:text-gray-600">Terms</button>
                        <span>•</span>
                        <button className="hover:text-gray-600">Privacy</button>
                        <span>•</span>
                        <button className="hover:text-gray-600">Support</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
