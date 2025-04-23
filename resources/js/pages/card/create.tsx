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
import { type BreadcrumbItem, type DaySchedule, type Gallery, type Image, type Link, type Service, type SharedData } from '@/types';
import { Head, useForm,usePage } from '@inertiajs/react';
import { Check, Clock, Copy, LoaderCircle, PlusCircle, Upload, X ,ShieldAlert,Globe} from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    { title: 'Create Card', href: '' },
];

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
    links: Link[];
    location: string;
    address: string;
    headline: string;
    business_hours: DaySchedule[];
    galleries: Gallery[];
    services: Service[];
    [key: string]: any; // Add index signature to allow string indexing
}

export default function CreateCard() {

    const auth = usePage<SharedData>().props.auth;
    const activePlan = auth.activePlan;
    const serviceLimit = activePlan?.plan?.number_of_service ?? 0;
    const galleryLimit = activePlan?.plan?.number_of_gallery ?? 0;
    const cardSocialLinks = usePage<SharedData>().props.cardSocialLinks;
    const links =  cardSocialLinks.map((link) => ({
        name: link,
        url: '',
        placeholder: `https://${link.toLowerCase()}.com/your-profile`,
    }));


    const colors = ['#3a59ae', '#a580e5', '#6dd3c7', '#3bb55d', '#ffc631', '#ff8c39', '#ea3a2e', '#ee85dd', '#4a4a4a'];

    const timeOptions: string[] = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            timeOptions.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    const copyToAllDays = (day: DaySchedule) => {
        const updatedSchedule = data.business_hours.map((item) => {
            return {
                ...item,
                open: day.open,
                close: day.close,
            };
        });

        setData('business_hours', updatedSchedule);
    };
    const updateTimeSlot = (day: DaySchedule, field: 'open' | 'close', value: string) => {
        console.log(day, field, value);
        const updatedSchedule = data.business_hours.map((item) => {
            if (item.id === day.id) {
                if (field === 'open') {
                    return {
                        ...item,
                        open: value,
                    };
                } else if (field === 'close') {
                    return {
                        ...item,
                        close: value,
                    };
                }
            }

            return item;
        });

        setData('business_hours', updatedSchedule);
    };

    const toggleDayOpen = (day: DaySchedule) => {
        const updatedSchedule = data.business_hours.map((item) => {
            if (item.id === day.id) {
                return {
                    ...item,
                    isOpen: !item.isOpen,
                };
            }
            return item;
        });

        setData('business_hours', updatedSchedule);
    };

    const { data, setData, post, processing, errors ,transform} = useForm<CardForm>({
        banner: {
            file: null,
            path: null,
        },
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
        // constract the links from cardSocialLinks
        links: links,
        address: '',
        location: '',
        headline: '',
        galleries: [{ id: crypto.randomUUID(), file: null, path: null, description: '' }],
        services: [
            { id: crypto.randomUUID(), file: null, path: null, name: '', description: '' }
        ],
        business_hours: [
            { id: crypto.randomUUID(), day: 'Monday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Tuesday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Wednesday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Thursday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Friday', isOpen: true, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Saturday', isOpen: false, open: '03:00', close: '11:00' },
            { id: crypto.randomUUID(), day: 'Sunday', isOpen: false, open: '03:00', close: '11:00' },
        ],
    });


    // console.log(data.links)


    const hasTabError = (prefixes: string[], errors: Partial<Record<string, string>>) => {
        return Object.keys(errors).some(key =>
            prefixes.some(prefix => key.startsWith(prefix))
        );
    };

    const DisplayError = hasTabError(['avatar.file', 'banner.file', 'logo.file'], errors);

    
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
    

    console.log("personalInformationError", personalInformationError)

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

    const validItems = data.galleries.filter((item: Gallery) => item.file && item.path);
    const ValidServiceItems = data.services.filter((item: Service) => item.file && item.path);

    const handleFileChange = (field: 'avatar' | 'logo'|'banner') => (e) => {
        const file = e.target.files?.[0];

        if(field === 'banner'){
            const newBanner = {
                file: file,
                path: file ? URL.createObjectURL(file) : null,
            };

            setData('banner', newBanner);
        }

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

    const removeFile = (field: 'avatar' | 'logo' | 'banner') => {
        if (field === 'avatar') {
            setData('avatar', { file: null, path: null });
        } else if (field === 'logo') {
            setData('logo', { file: null, path: null });
        } else if (field === 'banner') {
            setData('banner', { file: null, path: null });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <form onSubmit={submit} className="min-h-screen">
                <div className="m-2 flex flex-row justify-end rounded-lg border-2 p-2 shadow-none">
                  

                    <Button variant="outline" type="submit" className="cursor-pointer bg-green-600 text-white" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create Card
                    </Button>
                </div>
                <div className="m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5">
                    <div className="col-span-2 hidden h-[820px] rounded-lg border-none border-red-500 p-0 shadow-none md:block">
                        <ScrollArea className="h-[800px] cursor-pointer rounded-md border-1">
                            <MuluCard
                                url={data.url}
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
                                galleries={validItems}
                                services={ValidServiceItems}
                                business_hours={data.business_hours}
                                banner = {data.banner}
                            />
                        </ScrollArea>
                    </div>

                    <div className="col-span-3 border-none p-2">
                        <Tabs defaultValue="display">
                            <TabsList className="h- flex h-auto w-full flex-row flex-wrap justify-around">
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
                                        <CardDescription>Make changes to your account here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">

                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="avatar-upload" className="text-sm font-medium text-black">
                                                Upload Your Banner
                                            </Label>
                                            {data.banner.file ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.banner.file.name}</span>
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
                                        {/* banner end */}
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

                                            <InputError message={errors['avatar.file']} className="mt-2" />
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-xl border-2 px-2 py-4">
                                            <Label htmlFor="avatar-upload" className="text-sm font-medium text-black">
                                                Upload Your Logo
                                            </Label>
                                            {data.logo.file ? (
                                                <div className="flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800">
                                                    <span className="flex-1 truncate">{data.logo.file.name}</span>
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

                                                    <InputError message={errors[`links.${index}.url` as keyof typeof errors]} className="mt-2" />
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
                                                                            <SelectItem key={`open-${time}`} value={time}>
                                                                                {time}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        {errors[`business_hours.${index}.open` as keyof typeof errors] &&
                                                        errors[`business_hours.${index}.close` as keyof typeof errors] ? (
                                                            <InputError
                                                                message={`please select both opening and closing time for ${day.day}`}
                                                                className="mt-2"
                                                            />
                                                        ) : (
                                                            <>
                                                                {errors[`business_hours.${index}.open` as keyof typeof errors] && (
                                                                    <InputError
                                                                        message={errors[`business_hours.${index}.open` as keyof typeof errors]}
                                                                        className="mt-2"
                                                                    />
                                                                )}
                                                                {errors[`business_hours.${index}.close` as keyof typeof errors] && (
                                                                    <InputError
                                                                        message={errors[`business_hours.${index}.close` as keyof typeof errors]}
                                                                        className="mt-2"
                                                                    />
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

                            {/* services tab start */}
                            <TabsContent value="service">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Service</CardTitle>
                                        <CardDescription>add all service</CardDescription>
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

                                                                    <InputError
                                                                        message={errors[`services.${index}.file` as keyof typeof errors]}
                                                                        className="mt-2"
                                                                    />
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

                                                                <InputError
                                                                    message={errors[`services.${index}.name` as keyof typeof errors]}
                                                                    className="mt-2"
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
                                                                <InputError
                                                                    message={errors[`services.${index}.description` as keyof typeof errors]}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}

                                            {
                                                data.services.length >= serviceLimit && (
                                                    <InputError
                                                        message={errors.services}
                                                        className="mt-2"
                                                    />
                                                )
                                            }

                                            {/* {
                                               data.services.length < serviceLimit && (

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

                                                )
                                            } */}

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
                                            <ShieldAlert className="h-8 w-8" />
                                            <span>Service limit reached. Upgrade your plan to add more services.</span>
                                            </div>
                                            )}
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
                                        <CardTitle>Gallery</CardTitle>
                                        <CardDescription>enter your pictures</CardDescription>
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
                                                                <InputError
                                                                    message={errors[`galleries.${index}.file` as keyof typeof errors]}
                                                                    className="mt-2"
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
                                                                    onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                                                                    className="min-h-24"
                                                                />
                                                                <InputError
                                                                    message={errors[`galleries.${index}.description` as keyof typeof errors]}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}

{
                                                data.galleries.length >= galleryLimit && (
                                                    <InputError
                                                        message={errors.galleries}
                                                        className="mt-2"
                                                    />
                                                )
                                            }

                                            {/* {
                                                data.galleries.length < galleryLimit && (

                                                    <div className="flex flex-col gap-4 sm:flex-row">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={addMoreItem}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <PlusCircle className="h-5 w-5" />
                                                        Add More
                                                    </Button>
                                                </div>

                                                )
                                            } */}

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
                                                        <ShieldAlert className="h-6 w-6" />
                                                        <span>Gallery limit reached. Upgrade your plan to add more images.</span>
                                                    </div>
                                                )}
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
