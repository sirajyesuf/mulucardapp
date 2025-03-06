import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { socialIconMap } from '@/lib/socialIcons';
import MuluCard from '@/pages/card/card';
import { type BreadcrumbItem, type Gallery, type Image, type Service, type WeekSchedule } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, Clock, LoaderCircle, PlusCircle, Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];
interface CardForm {
    avatar: Image;
    logo: Image;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    email: string;
    phone: string;
    banner_color: string;
    links: {
        name: string;
        url: string;
        placeholder: string;
    }[];
    location: string;
    address: string;
    headline: string;
    business_hours: WeekSchedule[];
    galleries: Gallery[];
    services: Service[];
}

export default function CreateCard() {
    const colors = ['#3a59ae', '#a580e5', '#6dd3c7', '#3bb55d', '#ffc631', '#ff8c39', '#ea3a2e', '#ee85dd', '#4a4a4a'];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [schedule, setSchedule] = useState<WeekSchedule>({
        Monday: { isOpen: true, timeSlots: [{ open: '09:00', close: '17:00' }] },
        Tuesday: { isOpen: true, timeSlots: [{ open: '09:00', close: '17:00' }] },
        Wednesday: { isOpen: true, timeSlots: [{ open: '09:00', close: '17:00' }] },
        Thursday: { isOpen: true, timeSlots: [{ open: '09:00', close: '17:00' }] },
        Friday: { isOpen: true, timeSlots: [{ open: '09:00', close: '17:00' }] },
        Saturday: { isOpen: false, timeSlots: [{ open: '10:00', close: '15:00' }] },
        Sunday: { isOpen: false, timeSlots: [{ open: '10:00', close: '15:00' }] },
    });

    const timeOptions = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            timeOptions.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    const copyToAllDays = (fromDay: string) => {
        const daySchedule = schedule[fromDay];
        const updatedSchedule = { ...schedule };

        daysOfWeek.forEach((day) => {
            if (day !== fromDay) {
                updatedSchedule[day] = {
                    isOpen: daySchedule.isOpen,
                    timeSlots: [...daySchedule.timeSlots.map((slot) => ({ ...slot }))],
                };
            }
        });

        setSchedule(updatedSchedule);
    };
    const updateTimeSlot = (day: string, index: number, field: 'open' | 'close', value: string) => {
        const updatedTimeSlots = [...schedule[day].timeSlots];
        updatedTimeSlots[index] = {
            ...updatedTimeSlots[index],
            [field]: value,
        };

        setSchedule({
            ...schedule,
            [day]: {
                ...schedule[day],
                timeSlots: updatedTimeSlots,
            },
        });
    };

    const toggleDayOpen = (day: string) => {
        setSchedule({
            ...schedule,
            [day]: {
                ...schedule[day],
                isOpen: !schedule[day].isOpen,
            },
        });
    };

    const { data, setData, post, processing, errors } = useForm<CardForm>({
        avatar: {
            file: null,
            path: null,
        },
        logo: {
            file: null,
            path: null,
        },
        first_name: '',
        last_name: '',
        organization: '',
        job_title: '',
        phone: '',
        email: '',
        banner_color: colors[0],
        links: [
            { name: 'website', url: '', placeholder: 'https://example.com' },
            { name: 'facebook', url: '', placeholder: 'https://facebook.com/example' },
            { name: 'twitter', url: '', placeholder: 'https://twitter.com/example' },
            { name: 'instagram', url: '', placeholder: 'https://instagram.com/example' },
            { name: 'linkedin', url: '', placeholder: 'https://linkedin.com/example' },
            { name: 'youtube', url: '', placeholder: 'https://youtube.com/example' },
        ],
        address: '',
        location: '',
        headline: '',
        galleries: [{ id: crypto.randomUUID(), file: null, path: null, description: '' }],
        services: [{ id: crypto.randomUUID(), file: null, path: null, name: '', description: '' }],
    });

    const handleGalleryFileChange = (id: string, file: File | null) => {
        const newGallery = data.galleries.map((item: Gallery) => {
            if (item.id === id) {
                return {
                    ...item,
                    file,
                    path: file ? URL.createObjectURL(file) : null,
                };
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
                    path: file ? URL.createObjectURL(file) : null,
                };
            }
            return item;
        });

        setData('services', newService);
    };

    const handleServiceDescriptionChange = (id: string, description: string) => {
        const newService = data.services.map((item: Service) => {
            if (item.id === id) {
                return {
                    ...item,
                    description,
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
                    name,
                };
            }

            return item;
        });

        setData('services', newService);
    };
    const handleDescriptionChange = (id: string, description: string) => {
        const newGallery = data.galleries.map((item: Gallery) => {
            if (item.id === id) {
                return {
                    ...item,
                    description,
                };
            }

            return item;
        });

        setData('galleries', newGallery);
    };
    const addMoreItem = () => {
        setData('galleries', [...data.galleries, { id: crypto.randomUUID(), file: null, path: null, description: '' }]);
    };

    const addMoreServiceItem = () => {
        setData('services', [...data.services, { id: crypto.randomUUID(), file: null, name: '', path: null, description: '' }]);
    };

    const removeItem = (id: string) => {
        if (data.galleries.length > 1) {
            setData(
                'galleries',
                data.galleries.filter((item: Gallery) => item.id !== id),
            );
        }
    };

    const removeServiceItem = (id: string) => {
        if (data.services.length > 1) {
            setData(
                'services',
                data.services.filter((item: Service) => item.id !== id),
            );
        }
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

    const validItems = data.galleries.filter((item: Gallery) => item.file && item.path);
    const ValidServiceItems = data.services.filter((item: Service) => item.file && item.path);

    const handleFileChange = (field: 'avatar' | 'logo') => (e) => {
        const file = e.target.files?.[0];

        if (field === 'avatar') {
            const newAvatar = {
                file: file,
                path: file ? URL.createObjectURL(file) : null,
            };

            setData('avatar', newAvatar);
        }

        if (field === 'logo') {
            const newLogo = {
                file: file,
                path: file ? URL.createObjectURL(file) : null,
            };

            setData('logo', newLogo);
        }
    };

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        console.log(data);

        post(route('card.store'), {
            onSuccess: () => {
                console.log('Upload successful!');
            },
            onError: (errors) => {
                console.log('Upload errors:', errors);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeFile = (field: 'avatar' | 'logo') => {
        if (field === 'avatar') {
            setData('avatar', { file: null, path: null });
        } else {
            setData('logo', { file: null, path: null });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <form onSubmit={submit}>
                <div className="m-2 flex flex-row justify-between rounded-lg border-2 p-2 shadow-none">
                    <Button variant="destructive" className="cursor-pointer">
                        Cancel
                    </Button>

                    <Button variant="outline" type="submit" className="cursor-pointer bg-green-600 text-white" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create Card
                    </Button>
                </div>
                <div className="m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5">
                    <div className="col-span-2 hidden rounded-lg border-2 p-2 shadow-xl md:block">
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
                            // business_hours={schedule}
                            galleries={validItems}
                            services={ValidServiceItems}
                        />
                    </div>
                    <div className="col-span-3 border-none p-2">
                        <Tabs defaultValue="display">
                            <TabsList className="flex h-16 w-full flex-row flex-wrap justify-around md:h-12">
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
                                        <CardDescription>Make changes to your account here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="avatar-upload" className="text-sm font-medium text-black">
                                                Upload Your Avatar
                                            </Label>
                                            {data.avatar.file ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.avatar.file.name}</span>
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
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="avatar-upload" className="text-sm font-medium text-black">
                                                Logo Your Avatar
                                            </Label>
                                            {data.logo.file ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.logo.file.name}</span>
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFile('avatar')}>
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
                                        <CardDescription>Make changes to your account here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
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
                                            <Textarea
                                                className="h-30 w-full"
                                                placeholder="enter your headline text"
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
                                        <CardDescription>add social media links.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {data.links.map((link, index) => {
                                            const Icon = socialIconMap[link.name.toLowerCase()] || Globe;
                                            return (
                                                <div key={index} className="space-y-2 rounded-lg border-2 border-dashed p-2">
                                                    <div className="text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold">
                                                        <Icon className="h-6 w-6" />
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
                                        <CardDescription>Enter your address and location details.</CardDescription>
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
                                            <Label htmlFor="lname">Location</Label>
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
                                        <CardDescription>Set the operating hours for your organization</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {daysOfWeek.map((day) => (
                                            <div key={day} className="rounded-lg border p-4">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <Switch
                                                            id={`${day}-toggle`}
                                                            checked={schedule[day].isOpen}
                                                            onCheckedChange={() => toggleDayOpen(day)}
                                                        />
                                                        <Label htmlFor={`${day}-toggle`} className="text-lg font-medium">
                                                            {day}
                                                        </Label>
                                                    </div>
                                                    {schedule[day].isOpen && (
                                                        <div className="flex items-center gap-2">
                                                            <Button type="button" variant="outline" size="sm" onClick={() => copyToAllDays(day)}>
                                                                Apply to all days
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>

                                                {schedule[day].isOpen ? (
                                                    <div className="space-y-3">
                                                        {schedule[day].timeSlots.map((timeSlot, index) => (
                                                            <div key={index} className="flex items-center gap-2">
                                                                <div className="flex items-center">
                                                                    <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                                                                    <Select
                                                                        value={timeSlot.open}
                                                                        onValueChange={(value) => updateTimeSlot(day, index, 'open', value)}
                                                                    >
                                                                        <SelectTrigger className="w-[120px]">
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
                                                                        value={timeSlot.close}
                                                                        onValueChange={(value) => updateTimeSlot(day, index, 'close', value)}
                                                                    >
                                                                        <SelectTrigger className="w-[120px]">
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

                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    disabled={schedule[day].timeSlots.length <= 1}
                                                                ></Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-muted-foreground italic">Closed</div>
                                                )}
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* services tab start */}
                            <TabsContent value="service">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Service</CardTitle>
                                        <CardDescription>add all service</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-6">
                                            {data.services.map((item) => (
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
                                                                    {item.file ? (
                                                                        <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                                            <span className="flex-1 truncate">{item.file.name}</span>
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
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <Label htmlFor="name" className="mb-2 block">
                                                                    Name
                                                                </Label>
                                                                <Input
                                                                    id="name"
                                                                    placeholder="name"
                                                                    value={item.name}
                                                                    onChange={(e) => handleServiceNameChange(item.id, e.target.value)}
                                                                />
                                                            </div>

                                                            <div>
                                                                <Label htmlFor={`description-${item.id}`} className="mb-2 block">
                                                                    Description
                                                                </Label>
                                                                <Textarea
                                                                    id={`description-${item.id}`}
                                                                    placeholder="Enter a description for this image"
                                                                    value={item.description}
                                                                    onChange={(e) => handleServiceDescriptionChange(item.id, e.target.value)}
                                                                    className="min-h-24"
                                                                />
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

                            {/* services tab end */}

                            {/* galleries tab start  */}
                            <TabsContent value="gallery">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Location</CardTitle>
                                        <CardDescription>Enter your address and location details.</CardDescription>
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
                                                                    {item.file ? (
                                                                        <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                                            <span className="flex-1 truncate">{item.file.name}</span>
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
                            {/* galleries tab end */}
                        </Tabs>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
