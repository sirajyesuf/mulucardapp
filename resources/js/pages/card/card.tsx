import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

type MuluCardProps = {
    previewUrl: any;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
};

export default function MuluCard({ previewUrl, first_name, last_name, organization, job_title }: MuluCardProps) {
    return (
        <Card className="rounded-lg">
            <CardHeader className="flex h-[400px] w-full items-center justify-center rounded-lg border-none bg-white">
                <img src={previewUrl} alt="siraj yesuf" className="h-full w-full border-none object-contain" />
            </CardHeader>
            <div className="h-5 w-full bg-[#ff8c39]"></div>
            <CardContent className="border-none">
                <div className="mb-8">
                    <div className="text-xl font-bold capitalize">
                        {first_name} {last_name}
                    </div>
                    <div>
                        <p className="text-md font-bold capitalize">{organization}</p>
                        <p className="text-md font-bold capitalize">{job_title}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-4 rounded-lg bg-gray-100 p-2">
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#ff8c39]">
                            <Linkedin size={40} color="white" />
                        </div>
                        <a href="#" className="text-xl font-bold text-black">
                            Linkedin
                        </a>
                    </div>
                    <div className="flex flex-row items-center gap-4 rounded-lg bg-gray-100 p-2">
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#ff8c39]">
                            <Instagram size={40} color="white" />
                        </div>
                        <a href="#" className="text-xl font-bold text-black">
                            Facebook
                        </a>
                    </div>
                    <div className="flex flex-row items-center gap-4 rounded-lg bg-gray-100 p-2">
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#ff8c39]">
                            <Facebook size={40} color="white" />
                        </div>
                        <a href="#" className="text-xl font-bold text-black">
                            Instagram
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
