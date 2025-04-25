import { Scale } from 'lucide-react';

interface TermsHeaderProps {
  lastUpdated: string;
}

export default function TermsHeader({ lastUpdated }: TermsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center">
          {/* <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <Scale className="h-8 w-8 text-blue-600" />
          </div> */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Please read these terms carefully before using our service. These terms outline your rights and responsibilities when using Digital Business Card.
          </p>
          <div className="mt-6 text-gray-500 text-sm">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
};