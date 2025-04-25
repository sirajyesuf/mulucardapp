import { Shield } from 'lucide-react';

interface PolicyHeaderProps {
  lastUpdated: string;
}

export default function PolicyHeader({ lastUpdated }: PolicyHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center">
          {/* <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
          </div> */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            We care about your privacy and want to be transparent about how we handle your information. 
            This policy explains what data we collect and how we use it.
          </p>
          <div className="mt-6 text-gray-500 text-sm">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
};