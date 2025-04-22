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

const AccountDetails = ({ name, account_number, account_holder }: Bank) => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setHasCopied(true);
            toast.success(`${label} copied to clipboard`);

            setTimeout(() => {
                setHasCopied(false);
            }, 2000);
        });
    };

    return (
        <div className="bg-secondary/50 space-y-4 rounded-xl p-4">
            
            <h3 className="text-muted-foreground text-sm font-medium">Transfer to this account</h3>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-muted-foreground text-xs">Bank</p>
                        <p className="font-medium">{name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-muted-foreground text-xs">Account Number</p>
                        <p className="font-medium">{account_number}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleCopy(account_number, 'Account number')}
                        className="hover:bg-muted rounded-md p-1.5 transition-colors"
                        aria-label="Copy account number"
                    >
                        {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="text-muted-foreground h-4 w-4" />}
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-muted-foreground text-xs">Account Holder</p>
                        <p className="font-medium">{account_holder}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleCopy(account_holder, 'Account holder')}
                        className="hover:bg-muted rounded-md p-1.5 transition-colors"
                        aria-label="Copy account holder name"
                    >
                        {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="text-muted-foreground h-4 w-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface BankLogoProps {
    bankName: string;
}

const BankLogo: React.FC<BankLogoProps> = ({ bankName }) => {
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

    return (
        <div className={`${getBankColor(bankName)} flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-white`}>
            {getInitials(bankName)}
        </div>
    );
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
                        <BankLogo bankName={selectedBank.name} />
                        <div>
                            <p className="font-medium">{selectedBank.name}</p>
                            <p className="text-muted-foreground text-sm">Account ending in {selectedBank.account_number.slice(-4)}</p>
                        </div>
                    </div>
                ) : (
                    <span className="text-muted-foreground">Select your bank</span>
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
                                    selectedBank?.account_number === bank.account_number ? 'bg-primary/5' : '',
                                )}
                                onClick={() => {
                                    onSelectBank(bank);
                                    setIsOpen(false);
                                }}
                            >
                                <BankLogo bankName={bank.name} />
                                <div className="flex-1">
                                    <p className="font-medium">{bank.name}</p>
                                    <p className="text-muted-foreground text-sm">Account ending in {bank.account_number.slice(-4)}</p>
                                </div>
                                {selectedBank?.account_number === bank.account_number && <Check className="text-primary h-5 w-5" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface PaymentLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const PaymentLayout: React.FC<PaymentLayoutProps> = ({ children, className }) => {
    return (
        <div className="from-background to-secondary/50 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br p-4 md:p-8">
            <div className={cn('glass-card animate-scale-in w-full max-w-lg rounded-2xl p-6 md:p-8', className)}>{children}</div>
        </div>
    );
};

// import { BanknoteIcon, Building, Building2, CreditCard, Landmark, Wallet, WalletCards } from 'lucide-react';

// const SupportedBanks = () => {
//     const supportedBanks = [
//         { name: 'Chase', icon: <Building className="h-6 w-6" /> },
//         { name: 'Bank of America', icon: <Landmark className="h-6 w-6" /> },
//         { name: 'Wells Fargo', icon: <CreditCard className="h-6 w-6" /> },
//         { name: 'Citibank', icon: <Wallet className="h-6 w-6" /> },
//         { name: 'Capital One', icon: <Building2 className="h-6 w-6" /> },
//         { name: 'Discover', icon: <BanknoteIcon className="h-6 w-6" /> },
//         { name: 'TD Bank', icon: <WalletCards className="h-6 w-6" /> },
//     ];

//     return (
//         <div className="space-y-2">
//             <p className="text-sm text-gray-500">Supported banks</p>
//             <div className="flex flex-wrap items-center gap-4">
//                 {supportedBanks.map((bank) => (
//                     <div key={bank.name} className="flex flex-col items-center">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">{bank.icon}</div>
//                         <span className="mt-1 text-xs">{bank.name}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TransactionCodeInputProps {
    value: string;
    onChange: (value: string) => void;
    onComplete?: () => void;
    className?: string;
}

export const TransactionCodeInput: React.FC<TransactionCodeInputProps> = ({ value, onChange, onComplete, className }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only alphanumeric characters
        const newValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        onChange(newValue);

        // Call onComplete if the transaction code has enough characters (e.g., 8-12)
        if (newValue.length >= 8 && onComplete) {
            onComplete();
        }
    };

    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor="transaction-code" className="text-foreground/90 text-sm font-medium">
                Transaction Reference Code
            </Label>
            <Input
                id="transaction-code"
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter reference code (e.g., TXN12345678)"
                className={cn('input-highlight py-6 text-base font-medium tracking-wide transition-all', isFocused ? 'scale-[1.01]' : '', className)}
                maxLength={16}
            />
            <p className="text-muted-foreground text-xs">Enter the transaction reference code from your bank transfer</p>
        </div>
    );
};

const Index = () => {
    const { props } = usePage();
    const { auth } = usePage<SharedData>().props;
    const banks = props.banks as Bank[];
    const plan = props.plan as Plan;

    type PaymentForm = {
        bank: Bank;
        transactionCode: string;
        email: string;
    };
    const { data, setData, post, errors } = useForm<PaymentForm>({
        bank: banks[0],
        transactionCode: '',
        email: auth.user.email,
    });

    function onSelectBank(bank: Bank) {
        setData('bank', bank);
    }

    // const [selectedBank, setSelectedBank] = useState(banks[0]);
    // const [transactionCode, setTransactionCode] = useState('');
    // const [email, setEmail] = useState(User.email);
    // const [isProcessing, setIsProcessing] = useState(false);
    // const [showPromoCodeInput, setShowPromoCodeInput] = useState(false);
    // const [promoCode, setPromoCode] = useState('');
    // const [discount, setDiscount] = useState(0);

    const baseAmount = plan.price;
    const paymentAmount = baseAmount;

    // const handlePromoCodeApply = () => {
    //     if (!promoCode) {
    //         toast.error('Please enter a promotion code');
    //         return;
    //     }

    //     // Simulate promotion code validation
    //     if (promoCode.toLowerCase() === 'stripe25') {
    //         const newDiscount = baseAmount * 0.25;
    //         setDiscount(newDiscount);
    //         toast.success('Promotion code applied successfully!');
    //     } else {
    //         toast.error('Invalid promotion code');
    //     }
    // };

    const handlePayment = () => {
        post(route('checkout.order', { plan: plan }), {
            onSuccess: () => {
                toast.success('Payment successful. wait for approval');
            },
            onError: (error) => {
                toast.error(error.message);
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
                    {/* <p className="mt-1 text-sm text-gray-500">${(paymentAmount / 12).toFixed(2)} / month billed annually</p> */}
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

                {/* <Separator className="my-6" /> */}

                {/* <div className="flex items-center justify-between">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-medium">Birr {baseAmount}</span>
                </div> */}
                {/*
                {discount > 0 && (
                    <div className="mt-2 flex items-center justify-between text-green-600">
                        <span className="font-medium">Discount</span>
                        <span className="font-medium">-${discount}</span>
                    </div>
                )} */}
                {/*
                {showPromoCodeInput ? (
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                            <Input
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Enter promotion code"
                                className="flex-1"
                            />
                            <Button onClick={handlePromoCodeApply} variant="outline" className="ml-2" size="sm">
                                Apply
                            </Button>
                            <Button onClick={() => setShowPromoCodeInput(false)} variant="ghost" size="sm" className="ml-1 p-1">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">Try "STRIPE25" for 25% off</p>
                    </div>
                ) : (
                    <button onClick={() => setShowPromoCodeInput(true)} className="mt-4 self-start text-sm text-blue-600 hover:text-blue-800">
                        Add promotion code
                    </button>
                )} */}

                <Separator className="my-6" />

                <div className="flex items-center justify-between font-medium">
                    <span>Total due today</span>
                    <span>Birr {paymentAmount}</span>
                </div>
            </div>

            {/* Right column - Payment form */}
            <div className="flex flex-col bg-gray-50 p-6 md:w-1/2 md:p-12 border-none">
                <h1 className="mb-6 text-xl font-semibold">Pay with Bank Transfer</h1>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Bank Information</Label>
                        <BankSelector banks={banks} selectedBank={data.bank} onSelectBank={onSelectBank} />
                    </div>

                    <div className="space-y-2 rounded-md border bg-white p-4">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Account Number</span>
                            <span className="text-sm font-medium">{data.bank.account_number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Account Holder</span>
                            <span className="text-sm font-medium">{data.bank.account_holder}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Bank Name</span>
                            <span className="text-sm font-medium">{data.bank.name}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="transactionCode">Transaction Reference Code</Label>
                        <Input
                            id="transactionCode"
                            value={data.transactionCode}
                            onChange={(e) => setData('transactionCode', e.target.value)}
                            placeholder="Enter your transaction reference code"
                        />
                        <p className="text-xs text-gray-500">Enter the transaction reference code from your bank transfer.</p>
                        <InputError className="mt-2" message={errors.transactionCode} />
                    </div>

                    <Button onClick={handlePayment} className="mt-4 w-full rounded-md bg-blue-400 py-4 text-white hover:bg-blue-500">
                        Subscribe
                    </Button>

                    {/* <p className="mt-4 text-center text-xs text-gray-500">
                        By confirming your subscription, you allow Your Company to charge you for future payments in accordance with their terms. You
                        can always cancel your subscription.
                    </p> */}

                    <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
                        <span>Powered by Mulucard</span>
                        <span>•</span>
                        <button className="hover:text-gray-600">Terms</button>
                        <span>•</span>
                        <button className="hover:text-gray-600">Privacy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
