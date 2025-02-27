import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { socialIconMap } from '@/lib/socialIcons';
type MuluCardProps = {
    previewUrl: any;
    previewLogo: any;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    phone: string;
    email: string;
    banner_color: string;
    links: {
        name: string;
        url: string;
        placeholder: string;
    }[];
};

export default function MuluCard({
    previewUrl,
    previewLogo,
    banner_color,
    links,
    first_name,
    last_name,
    organization,
    job_title,
    phone,
    email,
}: MuluCardProps) {
    console.log(links);
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
                        <img src={previewUrl} alt="" className="h-full w-full rounded-full border-none object-contain" />
                    </div>
                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-lg border-4 border-gray-500 bg-white">
                        <img src={previewLogo} alt="" className="h-full w-full rounded-full border-none object-contain" />
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

                <div className="flex flex-row flex-wrap items-start justify-center gap-2 border-none">
                    {links.map((link, index) => {
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
            </CardContent>
        </Card>
    );
}
