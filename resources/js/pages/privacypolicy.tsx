import { Link } from '@inertiajs/react';
import { CreditCard, ChevronUp } from 'lucide-react';
import PolicySection from '@/components/privacy/PolicySection';
import TableOfContents from '@/components/privacy/TableOfContents';
import PolicyHeader from '@/components/privacy/PolicyHeader';
import PolicyFooter from '@/components/privacy/PolicyFooter';
import { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import NavBar from "@/components/NavBar";


export default function PrivacyPolicy() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <CreditCard className="h-6 w-6" />
              <span className="font-semibold text-lg">Digital Card</span>
            </Link>
            <Link 
              href="/" 
              className="px-4 py-1.5 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div> */}
      <NavBar />

      <PolicyHeader lastUpdated="May 15, 2025" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 lg:block hidden">
            <div className="sticky top-8">
              <TableOfContents />
            </div>
          </div>
          
          <div className="lg:col-span-9">
            <PolicySection 
              id="introduction"
              title="Introduction"
              content={`
                <p>Welcome to MuluCard ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital business card service.</p>
                <p>Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agree to be bound by all terms of this Privacy Policy. If you do not agree with our policies, please do not access or use our service.</p>
              `}
            />

            <PolicySection 
              id="information-collection"
              title="Information We Collect"
              content={`
                <p>We collect information in the following ways:</p>
                <h4 class="font-medium text-gray-900 mt-4 mb-2">Information You Provide to Us:</h4>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>Personal identification information (name, email address, phone number, professional title)</li>
                  <li>Professional information (company name, job title, industry)</li>
                  <li>Profile images and other media you choose to include in your digital business card</li>
                  <li>Social media handles and professional links</li>
                  <li>Any other information you choose to include in your digital business card</li>
                </ul>
                <h4 class="font-medium text-gray-900 mt-4 mb-2">Information Automatically Collected:</h4>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>Usage data (how you interact with our service)</li>
                  <li>Device information (browser type, IP address, device type)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Analytics data regarding how your digital business card is viewed and accessed by recipients</li>
                </ul>
              `}
            />

            <PolicySection 
              id="information-usage"
              title="How We Use Your Information"
              content={`
                <p>We use the information we collect for various purposes, including:</p>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>Providing, maintaining, and improving our service</li>
                  <li>Creating and updating your digital business card</li>
                  <li>Processing transactions and sending related information</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Sending you technical notices, updates, security alerts, and administrative messages</li>
                  <li>Providing customer support</li>
                  <li>Monitoring usage patterns and analyzing trends</li>
                  <li>Personalizing and improving your experience</li>
                  <li>Complying with legal obligations</li>
                </ul>
                <p>We may also use your information to contact you about our own services that may be of interest to you. You may opt out of such communications at any time.</p>
              `}
            />

            <PolicySection 
              id="information-sharing"
              title="Information Sharing and Disclosure"
              content={`
                <p>We may share your information in the following circumstances:</p>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>With Your Consent:</strong> We may share your information when you direct us to do so.</li>
                  <li><strong>Business Card Recipients:</strong> The information you include in your digital business card will be shared with those whom you share your digital business card.</li>
                  <li><strong>Service Providers:</strong> We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                </ul>
                <p>We do not sell your personal information to third parties.</p>
              `}
            />

            <PolicySection 
              id="data-storage"
              title="Data Storage and Security"
              content={`
                <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please understand that no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                <p>Your data is stored on secure servers and is only accessible by authorized personnel. We retain your information for as long as your account is active or as needed to provide you services, comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
              `}
            />

            <PolicySection 
              id="user-rights"
              title="Your Rights"
              content={`
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>The right to access personal information we hold about you</li>
                  <li>The right to request correction of inaccurate personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict or object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
              `}
            />

            <PolicySection 
              id="childrens-privacy"
              title="Children's Privacy"
              content={`
                <p>Our service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information as quickly as possible. If you believe we have inadvertently collected personal information from a child under 13, please contact us immediately.</p>
              `}
            />

            <PolicySection 
              id="changes"
              title="Changes to This Privacy Policy"
              content={`
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
              `}
            />

            <PolicySection 
              id="contact"
              title="Contact Us"
              content={`
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <div class="mt-3">
                  <p><strong>Digital Business Card</strong></p>
                  <p>Email: privacy@digitalbusinesscard.com</p>
                  <p>Address: 123 Business Street, Suite 500, San Francisco, CA 94103</p>
                </div>
              `}
            />
          </div>
        </div>
      </div>

      {/* <PolicyFooter /> */}
      <Footer />

      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
};