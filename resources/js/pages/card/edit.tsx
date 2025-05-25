import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { socialIconMap } from '@/lib/socialIcons';
import MuluCard from '@/pages/card/card';
import { type BreadcrumbItem, type Card as CardType, type DaySchedule, type Gallery, type Service, type SharedData,type Image, type Link as LinkType } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Check, Clock, Copy, LoaderCircle, PlusCircle, ShieldAlert, Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Link } from '@inertiajs/react'


interface CardForm {
    banner: Image;  
    avatar: Image;
    logo: Image;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string;
    phone: string;
    banner_color: string;
    links: LinkType[];
    location: string | null;
    address: string | null;
    headline: string;
    business_hours: DaySchedule[] | null;
    galleries: Gallery[];
    services: Service[];
    business_hours_enabled: boolean;
    [key: string]: any; 
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Edit Card', href: '' },
];

export default function EditCard({ card }: { card: CardType }) {
    const props = usePage<SharedData>().props;
    const auth = props.auth;
    const activePlan = auth.activePlan;
    const serviceLimit = activePlan?.plan?.number_of_service ?? 0;
    const galleryLimit = activePlan?.plan?.number_of_gallery ?? 0;
    const cardSocialLinks = props.cardSocialLinks;
    const existingLinksMap = new Map(
        (card.links || []).map((link) => [link.name, link.url])
    );

    // Get all social links that exist in the card
    const existingLinks = cardSocialLinks.filter(linkName => existingLinksMap.has(linkName));
    
    // Add the rest to removedLinks
    const initialRemovedLinks = cardSocialLinks.filter(linkName => !existingLinksMap.has(linkName));

    const [removedLinks, setRemovedLinks] = useState<string[]>(initialRemovedLinks);

    const removeLinkItem = (name: string) => {
        setData(
            'links',
            data.links.filter((link: LinkType) => link.name !== name),
        );
        setRemovedLinks([...removedLinks, name]);
    };

    const addBackLink = (name: string) => {
        const newLink = {
            name: name,
            url: '',
            placeholder: `https://${name.toLowerCase()}.com/your-profile`,
        };
        setData('links', [...data.links, newLink]);
        setRemovedLinks(removedLinks.filter(link => link !== name));
    };

    const links = existingLinks.map((linkName) => ({
        name: linkName,
        url: existingLinksMap.get(linkName) || '',
        placeholder: `https://${linkName.toLowerCase()}.com/your-profile`,
    }));

    useState<string[]>(initialRemovedLinks);

    const colors = ['#3a59ae', '#a580e5', '#6dd3c7', '#3bb55d', '#ffc631', '#ff8c39', '#ea3a2e', '#ee85dd', '#4a4a4a'];

    console.log(card);  

    const timeOptions: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            timeOptions.push(`${formattedHour}:${formattedMinute}`);
        }
    }

    const { data, setData, post, processing, errors } = useForm<CardForm>({
        banner: card.banner,
        avatar: card.avatar,
        logo: card.logo,
        first_name: card.first_name,
        last_name: card.last_name,
        organization: card.organization,
        job_title: card.job_title,
        email: card.email,
        phone: card.phone,
        banner_color: card.banner_color,
        links: links,
        location: card.location,
        address: card.address,
        headline: card.headline,
        galleries: card.galleries?.length > 0 ? card.galleries : [],
        services: card.services?.length > 0 ? card.services : [],
        business_hours_enabled: card.business_hours_enabled,
        business_hours: card.business_hours || [
            { id: crypto.randomUUID(), day: 'Monday', isOpen: true, open: '09:00', close: '17:00' },
            { id: crypto.randomUUID(), day: 'Tuesday', isOpen: true, open: '09:00', close: '17:00' },
            { id: crypto.randomUUID(), day: 'Wednesday', isOpen: true, open: '09:00', close: '17:00' },
            { id: crypto.randomUUID(), day: 'Thursday', isOpen: true, open: '09:00', close: '17:00' },
            { id: crypto.randomUUID(), day: 'Friday', isOpen: true, open: '09:00', close: '17:00' },
            { id: crypto.randomUUID(), day: 'Saturday', isOpen: false, open: '09:00', close: '17:00' },
            { id: crypto.randomUUID(), day: 'Sunday', isOpen: false, open: '09:00', close: '17:00' }
        ]
    });


    const hasTabError = (prefixes: string[], errors: Partial<Record<string, string>>) => {
        return Object.keys(errors).some(key =>
            prefixes.some(prefix => key.startsWith(prefix))
        );
    };

    const DisplayError = hasTabError(['avatar.file', 'banner.file', 'banner.path','logo.file'], errors);

    
    const personalInformationError = hasTabError(
        ['first_name', 'last_name', 'organization', 'job_title', 'email', 'phone','headline'],
        errors
    );
    
    const linksError = hasTabError(
        ['links.0', 'links.1', 'links.2', 'links.3', 'links.4', 'links.5'],
        errors
    );
    
    const locationError = hasTabError(['address', 'location'], errors);
    
    const galleryError = hasTabError(['galleries.0', 'galleries.1', 'galleries.2'], errors);
    
    const serviceError = hasTabError(['services.0', 'services.1', 'services.2'], errors);
    
    const businessHoursError = hasTabError(['business_hours.0', 'business_hours.1', 'business_hours.2'], errors);


    const copyToAllDays = (day: DaySchedule) => {
        const updatedSchedule = data.business_hours.map((item) => ({
            ...item,
            open: day.open,
            close: day.close,
        }));
        setData('business_hours', updatedSchedule);
    };

    const updateTimeSlot = (day: DaySchedule, field: 'open' | 'close', value: string) => {
        const updatedSchedule = data.business_hours.map((item) => {
            if (item.id === day.id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setData('business_hours', updatedSchedule);
    };

    const toggleDayOpen = (day: DaySchedule) => {
        const updatedSchedule = data.business_hours.map((item) => {
            if (item.id === day.id) {
                return { ...item, isOpen: !item.isOpen };
            }
            return item;
        });
        setData('business_hours', updatedSchedule);
    };

    const handleGalleryFileChange = (id: string, file: File | null) => {
        const newGallery = data.galleries.map((item: Gallery) => {
            if (item.id === id) {
                return { ...item, file, path: file ? URL.createObjectURL(file) : null };
            }
            return item;
        });
        setData('galleries', newGallery);
    };

    const handleServiceFileChange = (id: string, file: File | null) => {
        const newService = data.services.map((item: Service) => {
            if (item.id === id) {
                return { 
                    ...item, 
                    file, 
                    path: file ? URL.createObjectURL(file) : null
                };
            }
            return item;
        });
        console.log(newService);
        setData('services', newService);
    };

    const handleServiceDescriptionChange = (id: string, description: string) => {
        const newService = data.services.map((item: Service) => {
            if (item.id === id) {
                return { 
                    ...item, 
                    description
                };
            }
            return item;
        });
        setData('services', newService);
    };

    const handleServiceNameChange = (id: string, name: string) => {
        const newService = data.services.map((item: Service) => {
            if (item.id === id) {
                return { 
                    ...item, 
                    name
                };
            }
            return item;
        });
        setData('services', newService);
    };

    const handleDescriptionChange = (id: string, description: string) => {
        const newGallery = data.galleries.map((item: Gallery) => {
            if (item.id === id) {
                return { ...item, description };
            }
            return item;
        });
        setData('galleries', newGallery);
    };

    const addMoreItem = () => {
        setData('galleries', [...data.galleries, { id: crypto.randomUUID(), file: null, path: null, description: '' }]);
    };

    const addMoreServiceItem = () => {
        setData('services', [...data.services, { 
            id: crypto.randomUUID(), 
            file: null, 
            path: null, 
            name: '', 
            description: ''
        }]);
    };

    const removeGalleryItem = (id: string) => {
        // if (data.galleries.length > 1) {
            setData(
                'galleries',
                data.galleries.filter((item: Gallery) => item.id !== id),
            );
        // }
    };

    const removeServiceItem = (id: string) => {
        // if (data.services.length > 1) {
            setData(
                'services',
                data.services.filter((item: Service) => item.id !== id),
            );
        // }
    };

    const removeGalleryFile = (id: string) => {
        setData(
            'galleries',
            data.galleries.map((item: Gallery) => {
                if (item.id === id) {
                    return { ...item, file: null, path: null };
                }
                return item;
            }),
        );
    };

    const removeServiceFile = (id: string) => {
        setData(
            'services',
            data.services.map((item: Service) => {
                if (item.id === id) {
                    return { ...item, file: null, path: null };
                }
                return item;
            }),
        );
    };

    const handleFileChange = (field: 'avatar' | 'logo' | 'banner') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(field, { file, path: URL.createObjectURL(file) });
        }
    };

    const handleBusinessHoursToggle = (checked: boolean) => {
        setData('business_hours_enabled', checked);
        if (!checked) {
            // When disabled, set business_hours to empty array
            setData('business_hours', []);
        } else {
            // When enabled, restore the previous business hours or use default
            setData('business_hours', card.business_hours || [
                { id: crypto.randomUUID(), day: 'Monday', isOpen: true, open: '09:00', close: '17:00' },
                { id: crypto.randomUUID(), day: 'Tuesday', isOpen: true, open: '09:00', close: '17:00' },
                { id: crypto.randomUUID(), day: 'Wednesday', isOpen: true, open: '09:00', close: '17:00' },
                { id: crypto.randomUUID(), day: 'Thursday', isOpen: true, open: '09:00', close: '17:00' },
                { id: crypto.randomUUID(), day: 'Friday', isOpen: true, open: '09:00', close: '17:00' },
                { id: crypto.randomUUID(), day: 'Saturday', isOpen: false, open: '09:00', close: '17:00' },
                { id: crypto.randomUUID(), day: 'Sunday', isOpen: false, open: '09:00', close: '17:00' }
            ]);
        }
    };

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('card.update', card.id), {
            onSuccess: () => {
                toast.success('Card updated successfully!');
            },
            onError: (errors) => {
                toast.error('Failed to update card. Please check the form for errors.');
                console.log('Update errors:', errors);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeFile = (field: 'avatar' | 'logo' | 'banner') => {
        setData(field, { file: null, path: null });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Card" />
            <form onSubmit={submit} className="min-h-screen">

                <div className="m-2 flex flex-row justify-between rounded-lg border-2 p-2 shadow-none">
                    <Link className="cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg px-4 py-1 text-white font-bold" href={route('card.show', card.id)}>
                        Cancel
                    </Link>

                    <Button variant="outline" type="submit" className="cursor-pointer bg-green-600 text-white" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Update Card
                    </Button>
                </div>
                <div className="m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5">
                    <div className="col-span-2 hidden h-[820px] rounded-lg border-none border-red-500 p-0 shadow-none md:block">
                        <ScrollArea className="h-[800px] cursor-pointer rounded-md border-1">
                            <MuluCard
                                avatar={data.avatar}
                                logo={data.logo}
                                first_name={data.first_name}
                                last_name={data.last_name}
                                organization={data.organization}
                                job_title={data.job_title}
                                phone={data.phone}
                                email={data.email}
                                banner_color={data.banner_color}
                                links={data.links}
                                address={data.address}
                                location={data.location}
                                headline={data.headline}
                                galleries={data.galleries}
                                services={data.services}
                                business_hours={data.business_hours}
                                business_hours_enabled={data.business_hours_enabled}
                                banner={data.banner}
                                url={data.url}
                            />
                        </ScrollArea>
                    </div>

                    <div className="col-span-3 border-none p-2">
                        <Tabs defaultValue="display">
                            <TabsList className="flex h-auto w-full flex-row flex-wrap justify-around">
                                <TabsTrigger value="display">
                                    {
                                        DisplayError ? (
                                            <span className="text-red-500">
                                                Display
                                                </span>
                                        ) : (
                                            <span className="">Display</span>
                                        )
                                    }

                                </TabsTrigger>
                                <TabsTrigger value="personal_information">
                                    
                                    {
                                        personalInformationError ? (
                                            <span className="text-red-500">
                                                Information
                                                </span>
                                        ) : (
                                            <span className=""> Information</span>
                                        )
                                    }
                                </TabsTrigger>
                                <TabsTrigger value="links">
                                    
                                    {
                                        linksError ? (
                                            <span className="text-red-500">
                                                Social Links
                                                </span>
                                        ) : (
                                            <span className=""> Social Links</span>
                                        )
                                    }
                                </TabsTrigger>
                                <TabsTrigger value="location">
                                    
                                    {
                                        locationError ? (
                                            <span className="text-red-500">
                                                Location
                                                </span>
                                        ) : (
                                            <span className=""> Location</span>
                                        )
                                    }
                                </TabsTrigger>
                                <TabsTrigger value="business_hours">
                                    
                                    {
                                        businessHoursError ? (
                                            <span className="text-red-500">
                                                Business Hours
                                                </span>
                                        ) : (
                                            <span className=""> Business Hours</span>
                                        )
                                    }
                                </TabsTrigger>
                                <TabsTrigger value="service">
                                    
                                    {
                                        serviceError ? (
                                            <span className="text-red-500">
                                                Services
                                                </span>
                                        ) : (
                                            <span className=""> Services</span>
                                        )
                                    }
                                </TabsTrigger>
                                <TabsTrigger value="gallery">
                                    
                                    {
                                        galleryError ? (
                                            <span className="text-red-500">
                                                Galleries
                                                </span>
                                        ) : (
                                            <span className=""> Galleries</span>
                                        )
                                    }
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="display">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Display</CardTitle>
                                        <CardDescription>Update your display settings here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="banner-upload" className="text-sm font-medium text-black">
                                                Upload Your Banner <span className="text-red-500 text-lg">*</span>
                                            </Label>
                                            {data.banner.path ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.banner.path.split('/').pop() || 'Existing Banner'}</span>
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFile('banner')}>
                                                        <X className="h-4 w-4" />
                                                        <span className="sr-only">Remove file</span>
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <Input
                                                        id="banner-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('banner')}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => document.getElementById('banner-upload')?.click()}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Upload className="h-4 w-4" />
                                                        Select Image
                                                    </Button>
                                                </div>
                                            )}
                                            <InputError message={errors['banner.file'] || errors['banner.path']} className="mt-2" />
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="avatar-upload" className="text-sm font-medium text-black">
                                                Upload Your Avatar <span className="text-red-500 text-lg">*</span>
                                            </Label>
                                            {data.avatar.path ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.avatar.path.split('/').pop() || 'Existing Avatar'}</span>
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFile('avatar')}>
                                                        <X className="h-4 w-4" />
                                                        <span className="sr-only">Remove file</span>
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <Input
                                                        id="avatar-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('avatar')}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Upload className="h-4 w-4" />
                                                        Select Image
                                                    </Button>
                                                </div>
                                            )}
                                            <InputError message={errors['avatar.file'] || errors['avatar.path']} className="mt-2" />
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="logo-upload" className="text-sm font-medium text-black">
                                                Upload Your Logo <span className="text-red-500 text-lg">*</span>
                                            </Label>
                                            {data.logo.path ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.logo.path.split('/').pop() || 'Existing Logo'}</span>
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFile('logo')}>
                                                        <X className="h-4 w-4" />
                                                        <span className="sr-only">Remove file</span>
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <Input
                                                        id="logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange('logo')}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => document.getElementById('logo-upload')?.click()}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Upload className="h-4 w-4" />
                                                        Select Image
                                                    </Button>
                                                </div>
                                            )}
                                            <InputError message={errors['logo.file'] || errors['logo.path']} className="mt-2" />
                                        </div>

                                        <div className="flex flex-row flex-wrap gap-2 rounded-lg border-2 p-2">
                                            {colors.map((color, index) => (
                                                <div key={index} className="cursor-pointer rounded-full border-2 p-2">
                                                    <div className="flex items-center space-x-2">
                                                        <div
                                                            className="flex h-10 w-10 items-center justify-center rounded-full"
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => setData('banner_color', color)}
                                                        >
                                                            {color === data.banner_color && <Check color="white" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="personal_information">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal</CardTitle>
                                        <CardDescription>Update your personal information here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* <div className="space-y-1">
                                            <Label htmlFor="cardname">Card Name</Label>
                                            <Input
                                                id="cardname"
                                                value={data.cardname}
                                                onChange={(e) => setData('cardname', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.cardname} className="mt-2" />
                                        </div> */}
                                        <div className="grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="fname">First Name <span className="text-red-500 text-lg">*</span></Label>
                                                <Input
                                                    id="fname"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.first_name} className="mt-2" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="lname">Last Name <span className="text-red-500 text-lg">*</span></Label>
                                                <Input
                                                    id="lname"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.last_name} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="organization">Organization <span className="text-red-500 text-lg">*</span></Label>
                                                <Input
                                                    id="organization"
                                                    value={data.organization}
                                                    onChange={(e) => setData('organization', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.organization} className="mt-2" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="jobtitle">Job Title <span className="text-red-500 text-lg">*</span></Label>
                                                <Input
                                                    id="jobtitle"
                                                    value={data.job_title}
                                                    onChange={(e) => setData('job_title', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.job_title} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="phone">Phone <span className="text-red-500 text-lg">*</span></Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.phone} className="mt-2" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="email">Email <span className="text-red-500 text-lg">*</span></Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.email} className="mt-2" />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="headline">Headline <span className="text-red-500 text-lg">*</span></Label>
                                            <Textarea
                                                id="headline"
                                                className="h-30 w-full"
                                                placeholder="Enter your headline text"
                                                value={data.headline}
                                                onChange={(e) => setData('headline', e.target.value)}
                                            />
                                            <InputError message={errors.headline} className="mt-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="links">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Links</CardTitle>
                                        <CardDescription>Update your social media links.</CardDescription>

                                        {removedLinks.length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="mb-2 text-sm font-medium">Removed Links</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {removedLinks.map((linkName) => (
                                                        <Button
                                                            key={linkName}
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => addBackLink(linkName)}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <PlusCircle className="h-4 w-4" />
                                                            {linkName}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {data.links.map((link, index) => {
                                            const Icon = socialIconMap[link.name.toLowerCase()] || null;
                                            return (
                                                <div key={index} className="space-y-2 rounded-lg border-2 border-dashed p-2">
                                                    <div className="text-md flex h-[50px] flex-row items-center justify-between border-none px-4 font-bold">
                                                        <div className="flex items-center gap-2">
                                                            {Icon && <Icon className="h-6 w-6" />}
                                                            {link.name}
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeLinkItem(link.name)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <X className="h-5 w-5" />
                                                            <span className="sr-only">Remove</span>
                                                        </Button>
                                                    </div>
                                                    <Input
                                                        type="url"
                                                        className="h-[50px] w-full"
                                                        placeholder={link.placeholder}
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const updatedLinks = [...data.links];
                                                            updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };
                                                            setData('links', updatedLinks);
                                                        }}
                                                        disabled={processing}
                                                    />
                                                    <InputError message={errors[`links.${index}.url`]} className="mt-2" />
                                                </div>
                                            );
                                        })}

                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="location">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Location</CardTitle>
                                        <CardDescription>Update your address and location details.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.address} className="mt-2" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="business_hours">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Business Hours</CardTitle>
                                                <CardDescription>Update the operating hours for your organization.</CardDescription>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="business-hours-toggle"
                                                    checked={data.business_hours_enabled}
                                                    // onCheckedChange={handleBusinessHoursToggle}
                                                    onCheckedChange={(checked) => setData('business_hours_enabled', checked)}

                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {data.business_hours_enabled ? (
                                            data.business_hours?.map((day: DaySchedule, index) => (
                                                <div key={day.id} className="rounded-lg border p-4">
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <Switch
                                                                id={`${day.id}-toggle`}
                                                                checked={day.isOpen}
                                                                onCheckedChange={() => toggleDayOpen(day)}
                                                            />
                                                            <Label htmlFor={`${day.id}-toggle`} className="text-lg font-medium">
                                                                {day.day}
                                                            </Label>
                                                        </div>
                                                        {day.isOpen && (
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => copyToAllDays(day)}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <Copy className="h-4 w-4 md:hidden" />
                                                                    <span className="hidden md:inline">Apply to all days</span>
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {day.isOpen ? (
                                                        <div className="space-y-3">
                                                            <div className="flex flex-row items-center gap-2 md:flex-row">
                                                                <div className="flex items-center">
                                                                    <Clock className="text-muted-foreground mr-2 hidden h-4 w-4 md:block" />
                                                                    <Select
                                                                        value={day.open}
                                                                        onValueChange={(value) => updateTimeSlot(day, 'open', value)}
                                                                    >
                                                                        <SelectTrigger className="w-[100px] md:w-[150px]">
                                                                            <SelectValue placeholder="Opening time" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {timeOptions.map((time) => (
                                                                                <SelectItem key={`open-${time}`} value={time}>
                                                                                    {time}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <span className="text-muted-foreground">to</span>
                                                                <div className="flex items-center">
                                                                    <Select
                                                                        value={day.close}
                                                                        onValueChange={(value) => updateTimeSlot(day, 'close', value)}
                                                                    >
                                                                        <SelectTrigger className="w-[100px] md:w-[150px]">
                                                                            <SelectValue placeholder="Closing time" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {timeOptions.map((time) => (
                                                                                <SelectItem key={`close-${time}`} value={time}>
                                                                                    {time}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                            {errors[`business_hours.${index}.open`] && errors[`business_hours.${index}.close`] ? (
                                                                <InputError
                                                                    message={`Please select both opening and closing time for ${day.day}`}
                                                                    className="mt-2"
                                                                />
                                                            ) : (
                                                                <>
                                                                    {errors[`business_hours.${index}.open`] && (
                                                                        <InputError message={errors[`business_hours.${index}.open`]} className="mt-2" />
                                                                    )}
                                                                    {errors[`business_hours.${index}.close`] && (
                                                                        <InputError message={errors[`business_hours.${index}.close`]} className="mt-2" />
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted-foreground italic">Closed</div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center text-muted-foreground">
                                                Business hours are disabled. Enable the toggle above to set your business hours.
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="service">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Services</CardTitle>
                                        <CardDescription>Update your services.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-6">
                                            {data.services.map((item, index) => (
                                                <Card key={item.id} className="relative">
                                                    <CardContent className="p-6">
                                                        {/* {data.services.length > 1 && ( */}
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="absolute top-2 right-2"
                                                                onClick={() => removeServiceItem(item.id)}
                                                            >
                                                                <X className="h-5 w-5" />
                                                                <span className="sr-only">Remove</span>
                                                            </Button>
                                                        {/* )} */}
                                                        <div className="space-y-4">
                                                            <div>
                                                                <div className="flex flex-col gap-2">
                                                                    {item.path ? (
                                                                        <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                                            <span className="flex-1 truncate">{item.path.split('/').pop()}</span>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                onClick={() => removeServiceFile(item.id)}
                                                                            >
                                                                                <X className="h-4 w-4" />
                                                                                <span className="sr-only">Remove file</span>
                                                                            </Button>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex items-center">
                                                                            <Input
                                                                                id={`image-${item.id}`}
                                                                                type="file"
                                                                                accept="image/*"
                                                                                className="hidden"
                                                                                onChange={(e) => {
                                                                                    const file = e.target.files?.[0] || null;
                                                                                    handleServiceFileChange(item.id, file);
                                                                                }}
                                                                            />
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                onClick={() => document.getElementById(`image-${item.id}`)?.click()}
                                                                                className="flex items-center gap-2"
                                                                            >
                                                                                <Upload className="h-4 w-4" />
                                                                                Select Image
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                    <InputError message={errors[`services.${index}.file`] || errors[`services.${index}.path`]} className="mt-2" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Label htmlFor={`name-${item.id}`} className="mb-2 block">
                                                                    Name
                                                                </Label>
                                                                <Input
                                                                    id={`name-${item.id}`}
                                                                    placeholder="Name"
                                                                    value={item.name}
                                                                    onChange={(e) => handleServiceNameChange(item.id, e.target.value)}
                                                                />
                                                                <InputError message={errors[`services.${index}.name`]} className="mt-2" />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor={`description-${item.id}`} className="mb-2 block">
                                                                    Description
                                                                </Label>
                                                                <Textarea
                                                                    id={`description-${item.id}`}
                                                                    placeholder="Enter a description for this service"
                                                                    value={item.description}
                                                                    onChange={(e) => handleServiceDescriptionChange(item.id, e.target.value)}
                                                                    className="min-h-24"
                                                                />
                                                                <InputError message={errors[`services.${index}.description`]} className="mt-2" />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                            <div className="flex flex-col gap-4 sm:flex-row">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addMoreServiceItem}
                                                    className="flex items-center gap-2"
                                                    disabled={data.services.length >= serviceLimit}
                                                >
                                                    <PlusCircle className="h-5 w-5" />
                                                    Add More
                                                </Button>
                                                {data.services.length >= serviceLimit && (
                                                    <div className="flex items-center gap-2 text-yellow-600">
                                                        <ShieldAlert className="h-4 w-4" />
                                                        <span>Service limit reached. Upgrade your plan to add more services.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="gallery">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Galleries</CardTitle>
                                        <CardDescription>Update your gallery images and descriptions.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-6">
                                            {data.galleries.map((item, index) => (
                                                <Card key={item.id} className="relative">
                                                    <CardContent className="p-6">
                                                        {/* {data.galleries.length > 1 && ( */}
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="absolute top-2 right-2"
                                                                onClick={() => removeGalleryItem(item.id)}
                                                            >
                                                                <X className="h-5 w-5" />
                                                                <span className="sr-only">Remove</span>
                                                            </Button>
                                                        {/* )} */}
                                                        <div className="space-y-4">
                                                            <div>
                                                                <Label htmlFor={`image-${item.id}`} className="mb-2 block">
                                                                    Image {index + 1}
                                                                </Label>
                                                                <div className="flex flex-col gap-2">
                                                                    {item.path ? (
                                                                        <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                                            <span className="flex-1 truncate">
                                                                                {item.file instanceof File ? item.file.name : 'Existing Image'}
                                                                            </span>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                onClick={() => removeGalleryFile(item.id)}
                                                                            >
                                                                                <X className="h-4 w-4" />
                                                                                <span className="sr-only">Remove file</span>
                                                                            </Button>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex items-center">
                                                                            <Input
                                                                                id={`image-${item.id}`}
                                                                                type="file"
                                                                                accept="image/*"
                                                                                className="hidden"
                                                                                onChange={(e) => {
                                                                                    const file = e.target.files?.[0] || null;
                                                                                    handleGalleryFileChange(item.id, file);
                                                                                }}
                                                                            />
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                onClick={() => document.getElementById(`image-${item.id}`)?.click()}
                                                                                className="flex items-center gap-2"
                                                                            >
                                                                                <Upload className="h-4 w-4" />
                                                                                Select Image
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <InputError message={errors[`galleries.${index}.file`] || errors[`galleries.${index}.path`]} className="mt-2" />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor={`description-${item.id}`} className="mb-2 block">
                                                                    Description
                                                                </Label>
                                                                <Textarea
                                                                    id={`description-${item.id}`}
                                                                    placeholder="Enter a description for this image"
                                                                    value={item.description}
                                                                    onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                                                                    className="min-h-24"
                                                                />
                                                                <InputError message={errors[`galleries.${index}.description`]} className="mt-2" />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                            <div className="flex flex-col gap-4 sm:flex-row">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addMoreItem}
                                                    className="flex items-center gap-2"
                                                    disabled={data.galleries.length >= galleryLimit}
                                                >
                                                    <PlusCircle className="h-5 w-5" />
                                                    Add More
                                                </Button>
                                                {data.galleries.length >= galleryLimit && (
                                                    <div className="flex items-center gap-2 text-yellow-600">
                                                        <ShieldAlert className="h-4 w-4" />
                                                        <span>Gallery limit reached. Upgrade your plan to add more images.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
