import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { socialIconMap } from '@/lib/socialIcons';
import { Gallery, Service, type Image } from '@/types';
import { MapPin } from 'lucide-react';

type MuluCardProps = {
    url: string;
    avatar: Image;
    logo: Image;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    headline: string;
    phone: string;
    email: string;
    banner_color: string;
    links: {
        name: string;
        url: string;
        placeholder: string;
    }[];
    address: string;
    location: string;
    galleries: Gallery[];
    services: Service[];
};

export default function MuluCard({
    avatar,
    logo,
    banner_color,
    links,
    first_name,
    last_name,
    organization,
    job_title,
    phone,
    email,
    headline,
    address,
    location,
    galleries,
    services,
}: MuluCardProps) {
    return (
        <Card className="w-full rounded-lg bg-gray-50 p-0 shadow-none">
            <CardHeader className="h-[200px] w-full rounded-lg border-none bg-gray-50 p-0">
                <div
                    className="h-[200px] w-full"
                    style={{
                        backgroundColor: banner_color,
                    }}
                ></div>
                <div className="relative -mt-14 flex flex-row justify-between border-none px-4">
                    <div className="bordr-white flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-gray-500 bg-white">
                        <img src={avatar.path} alt="" className="h-full w-full rounded-full border-none object-contain" />
                    </div>
                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-lg border-4 border-gray-500 bg-white">
                        <img src={logo.path} alt="" className="h-full w-full rounded-full border-none object-contain" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 border-none bg-gray-50 p-2">
                <div className="mb-8 flex flex-col items-center border-none">
                    <div className="font-norma flex flex-row space-x-4 text-2xl capitalize">
                        <p>{first_name}</p>

                        <p>{last_name}</p>
                    </div>
                    <div>
                        <p className="text-md font-bold capitalize">{organization}</p>
                        <p className="text-md font-bold capitalize">{job_title}</p>
                    </div>
                </div>

                <div className="font-mute p-2 text-center">{headline}.</div>

                <div className="flex flex-row flex-wrap items-start justify-center gap-2 border-none">
                    {links?.map((link, index) => {
                        const Icon = socialIconMap[link.name.toLowerCase()] || Globe; // Fallback to Globe
                        return (
                            link.url && ( // Only render if link.url is not empty
                                <div key={index} className="flex flex-row flex-wrap items-center gap-2 rounded-lg border-none p-0">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]">
                                        <a href={link.url} className="text-xl font-bold text-black">
                                            <Icon className="h-5 w-5 text-white" /> {/* Replaces size={20} and color="white" */}
                                        </a>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
                <div className="flex w-full flex-col gap-4 border-none p-2 text-center font-bold text-white capitalize">
                    <div
                        className="rounded-4xl border-none p-2"
                        style={{
                            backgroundColor: banner_color,
                        }}
                    >
                        <a href={`tel:${phone}`}>call me</a>
                    </div>
                    <div
                        className="rounded-4xl border-2 p-2"
                        style={{
                            backgroundColor: banner_color,
                        }}
                    >
                        <a href={`mailto:${email}`}>email me</a>
                    </div>
                    <div
                        className="rounded-4xl border-none p-2"
                        style={{
                            backgroundColor: banner_color,
                        }}
                    >
                        visit website
                    </div>
                </div>

                {services.length > 0 && (
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle>Our Services</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {services.map((item) => (
                                    <div key={item.id} className="space-y-2">
                                        <div className="aspect-video w-full overflow-hidden rounded-lg border bg-white">
                                            {item.path && <img src={item.path} alt={item.name} className="h-full w-full object-contain" />}
                                        </div>
                                        <div className="mt-2">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {item.description || 'No description provided'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {galleries.length > 0 && (
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle>Galleries</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {galleries.map((item) => (
                                    <div key={item.id} className="space-y-2">
                                        <div className="aspect-video w-full overflow-hidden rounded-lg border bg-white">
                                            {item.path && <img src={item.path} alt={item.description} className="h-full w-full object-contain" />}
                                        </div>
                                        <div className="mt-2">
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {item.description || 'No description provided'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="flex flex-col gap-2 rounded-lg border-none p-2 shadow-none">
                    <div className="flex items-center justify-center gap-2 p-2">
                        <MapPin className="h-8 w-8" color={banner_color} />
                        <p className="font-mute text-md">{address}</p>
                    </div>
                    <div className="cursor-pointer rounded-4xl p-2 text-center font-bold text-white" style={{ backgroundColor: banner_color }}>
                        <a href={location} className="capitalize">
                            view on google map
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
