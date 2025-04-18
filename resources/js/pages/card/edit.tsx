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
import BusinessHoursPreview from '@/components/business-hours'; // Assuming this is the path
import { type BreadcrumbItem, type Card as CardType, type DaySchedule, type Gallery, type Image, type Service } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, Clock, Copy, LoaderCircle, PlusCircle, Upload, X } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Edit Card', href: '' },
];

interface EditCardProps {
    card: CardType;
}

export default function EditCard({ card }: EditCardProps) {

    console.log(card);
    const colors = ['#3a59ae', '#a580e5', '#6dd3c7', '#3bb55d', '#ffc631', '#ff8c39', '#ea3a2e', '#ee85dd', '#4a4a4a'];

    const timeOptions: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            timeOptions.push(`${formattedHour}:${formattedMinute}`);
        }
    }

    const { data, setData, put, processing, errors } = useForm<CardType>({
        id: card.id,
        url: card.url,
        banner: card.banner || { file: null, path: null },
        cardname: card.cardname || '',
        avatar: card.avatar || { file: null, path: null },
        logo: card.logo || { file: null, path: null },
        first_name: card.first_name || '',
        last_name: card.last_name || '',
        organization: card.organization || '',
        job_title: card.job_title || '',
        email: card.email || '',
        phone: card.phone || '',
        banner_color: card.banner_color || colors[0],
        links: card.links || [
            { name: 'website', url: '', placeholder: 'https://example.com' },
            { name: 'facebook', url: '', placeholder: 'https://facebook.com/example' },
            { name: 'twitter', url: '', placeholder: 'https://twitter.com/example' },
            { name: 'instagram', url: '', placeholder: 'https://instagram.com/example' },
            { name: 'linkedin', url: '', placeholder: 'https://linkedin.com/example' },
            { name: 'youtube', url: '', placeholder: 'https://youtube.com/example' },
        ],
        location: card.location || '',
        address: card.address || '',
        headline: card.headline || '',
        galleries: card.galleries?.length > 0 ? card.galleries : [{ id: crypto.randomUUID(), file: null, path: null, description: '' }],
        services: card.services?.length > 0 ? card.services : [{ id: crypto.randomUUID(), file: null, path: null, name: '', description: '' }],
        business_hours: card.business_hours?.length > 0 ? card.business_hours : [
            { id: crypto.randomUUID(), day: 'Monday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Tuesday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Wednesday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Thursday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Friday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Saturday', isOpen: false, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Sunday', isOpen: false, open: '03:00', close: '11:00' },
        ],
        total_views: card.total_views,
        total_saves: card.total_saves,
        qr_code: card.qr_code || '',
        status: card.status || false,
    });

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
                return { ...item, file, path: file ? URL.createObjectURL(file) : null };
            }
            return item;
        });
        setData('services', newService);
    };

    const handleServiceDescriptionChange = (id: string, description: string) => {
        const newService = data.services.map((item: Service) => {
            if (item.id === id) {
                return { ...item, description };
            }
            return item;
        });
        setData('services', newService);
    };

    const handleServiceNameChange = (id: string, name: string) => {
        const newService = data.services.map((item: Service) => {
            if (item.id === id) {
                return { ...item, name };
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
        setData('services', [...data.services, { id: crypto.randomUUID(), file: null, path: null, name: '', description: '' }]);
    };

    const removeItem = (id: string) => {
        if (data.galleries.length > 1) {
            setData('galleries', data.galleries.filter((item: Gallery) => item.id !== id));
        }
    };

    const removeServiceItem = (id: string) => {
        if (data.services.length > 1) {
            setData('services', data.services.filter((item: Service) => item.id !== id));
        }
    };

    const removeGalleryFile = (id: string) => {
        setData('galleries', data.galleries.map((item: Gallery) => {
            if (item.id === id) {
                return { ...item, file: null, path: null };
            }
            return item;
        }));
    };

    const removeServiceFile = (id: string) => {
        setData('services', data.services.map((item: Service) => {
            if (item.id === id) {
                return { ...item, file: null, path: null };
            }
            return item;
        }));
    };

    const handleFileChange = (field: 'avatar' | 'logo' | 'banner') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(field, { file, path: URL.createObjectURL(file) });
        }
    };

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        put(route('card.update', card.id), {
            onSuccess: () => {
                console.log('Update successful!');
            },
            onError: (errors) => {
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
                <div className="m-2 flex flex-row justify-end rounded-lg border-2 p-2 shadow-none">
                    <Button variant="outline" type="submit" className="cursor-pointer bg-green-600 text-white" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Update Card
                    </Button>
                </div>
                <div className="m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5">
                    <div className="col-span-2 hidden h-[820px] rounded-lg border-none border-red-500 p-0 shadow-xl md:block">
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
                                galleries={data.galleries} // Pass all galleries, not just filtered
                                services={data.services} // Pass all services, not just filtered
                                business_hours={data.business_hours}
                                banner={data.banner}
                            />
                        </ScrollArea>
                    </div>

                    <div className="col-span-3 border-none p-2">
                        <Tabs defaultValue="display">
                            <TabsList className="h-auto w-full flex flex-row flex-wrap justify-around">
                                <TabsTrigger value="display">Display</TabsTrigger>
                                <TabsTrigger value="personal_information">Information</TabsTrigger>
                                <TabsTrigger value="links">Social Links</TabsTrigger>
                                <TabsTrigger value="location">Location</TabsTrigger>
                                <TabsTrigger value="business_hours">Business Hours</TabsTrigger>
                                <TabsTrigger value="service">Services</TabsTrigger>
                                <TabsTrigger value="gallery">Galleries</TabsTrigger>
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
                                                Upload Your Banner
                                            </Label>
                                            {data.banner.path ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.banner.file?.name || 'Existing Banner'}</span>
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
                                            <InputError message={errors['banner.file']} className="mt-2" />
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="avatar-upload" className="text-sm font-medium text-black">
                                                Upload Your Avatar
                                            </Label>
                                            {data.avatar.path ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.avatar.file?.name || 'Existing Avatar'}</span>
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
                                            <InputError message={errors['avatar.file']} className="mt-2" />
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="logo-upload" className="text-sm font-medium text-black">
                                                Upload Your Logo
                                            </Label>
                                            {data.logo.path ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.logo.file?.name || 'Existing Logo'}</span>
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
                                            <InputError message={errors['logo.file']} className="mt-2" />
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
                                        <div className="space-y-1">
                                            <Label htmlFor="cardname">Card Name</Label>
                                            <Input
                                                id="cardname"
                                                value={data.cardname}
                                                onChange={(e) => setData('cardname', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.cardname} className="mt-2" />
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <Label htmlFor="fname">First Name</Label>
                                                <Input
                                                    id="fname"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.first_name} className="mt-2" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="lname">Last Name</Label>
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
                                                <Label htmlFor="organization">Organization</Label>
                                                <Input
                                                    id="organization"
                                                    value={data.organization}
                                                    onChange={(e) => setData('organization', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.organization} className="mt-2" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="jobtitle">Job Title</Label>
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
                                                <Label htmlFor="phone">Phone</Label>
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
                                                <Label htmlFor="email">Email</Label>
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
                                            <Label htmlFor="headline">Headline</Label>
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
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {data.links.map((link, index) => {
                                            const Icon = socialIconMap[link.name.toLowerCase()] || null;
                                            return (
                                                <div key={index} className="space-y-2 rounded-lg border-2 border-dashed p-2">
                                                    <div className="text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold">
                                                        {Icon && <Icon className="h-6 w-6" />}
                                                        {link.name}
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
                                        <CardTitle>Business Hours</CardTitle>
                                        <CardDescription>Update the operating hours for your organization.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {data.business_hours.map((day: DaySchedule, index) => (
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
                                        ))}
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
                                                        {data.services.length > 1 && (
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
                                                        )}
                                                        <div className="space-y-4">
                                                            <div>
                                                                <div className="flex flex-col gap-2">
                                                                    {item.path ? (
                                                                        <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                                            <span className="flex-1 truncate">{item.name}</span>
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
                                                                    <InputError message={errors[`services.${index}.file`]} className="mt-2" />
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
                                                >
                                                    <PlusCircle className="h-5 w-5" />
                                                    Add More
                                                </Button>
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
                                                        {data.galleries.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="absolute top-2 right-2"
                                                                onClick={() => removeItem(item.id)}
                                                            >
                                                                <X className="h-5 w-5" />
                                                                <span className="sr-only">Remove</span>
                                                            </Button>
                                                        )}
                                                        <div className="space-y-4">
                                                            <div>
                                                                <Label htmlFor={`image-${item.id}`} className="mb-2 block">
                                                                    Image {index + 1}
                                                                </Label>
                                                                <div className="flex flex-col gap-2">
                                                                    {item.path ? (
                                                                        <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                                            <span className="flex-1 truncate">{item.file instanceof File ? item.file.name : 'Existing Image'}</span>
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
                                                                </div>
                                                                <InputError message={errors[`galleries.${index}.file`]} className="mt-2" />
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
                                                <Button type="button" variant="outline" onClick={addMoreItem} className="flex items-center gap-2">
                                                    <PlusCircle className="h-5 w-5" />
                                                    Add More
                                                </Button>
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