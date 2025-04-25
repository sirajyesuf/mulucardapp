import React, { useEffect, useState } from 'react';
import TableOfContents from '@/components/terms/TableOfContents';
import TermsHeader from '@/components/terms/TermsHeader';
import Footer from '@/components/footer';
// import PolicyHeader from '@/components/privacy/PolicyHeader';
import NavBar from "@/components/NavBar";
import PolicySection from '@/components/privacy/PolicySection';
import {ChevronUp} from 'lucide-react';   


export default function Terms() {
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

    <NavBar/>
      <TermsHeader lastUpdated="May 15, 2025" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 lg:block hidden">
            <div className="sticky top-8">
              <TableOfContents />
            </div>
          </div>
          
          <div className="lg:col-span-9">
            <PolicySection 
              id="acceptance"
              title="Acceptance of Terms"
              content={`
                <p>By accessing or using  MuluCard ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.</p>
              `}
            />

            <PolicySection 
              id="changes-to-terms"
              title="Changes to Terms"
              content={`
                <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              `}
            />

            <PolicySection 
              id="account-terms"
              title="Account Terms"
              content={`
                <p>You must provide accurate, complete, and up-to-date information for your account. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                <ul>
                  <li>You must be a human. Accounts registered by "bots" or automated methods are not permitted.</li>
                  <li>You must provide a valid email address.</li>
                  <li>You must be 13 years or older to use this Service.</li>
                  <li>You are responsible for maintaining the security of your account.</li>
                  <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                </ul>
              `}
            />

            <PolicySection 
              id="acceptable-use"
              title="Acceptable Use"
              content={`
                <p>You agree not to engage in any of the following prohibited activities:</p>
                <ul>
                  <li>Copying, distributing, or disclosing any part of the Service in any medium.</li>
                  <li>Using any automated system to access the Service.</li>
                  <li>Transmitting spam, chain letters, or other unsolicited email.</li>
                  <li>Attempting to interfere with or compromise the system integrity or security.</li>
                  <li>Impersonating another person or misrepresenting your affiliation with a person or entity.</li>
                </ul>
              `}
            />

            <PolicySection 
              id="intellectual-property"
              title="Intellectual Property"
              content={`
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of MuluCard and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
                <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MuluCard.</p>
              `}
            />

            <PolicySection 
              id="termination"
              title="Termination"
              content={`
                <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
              `}
            />

            <PolicySection 
              id="disclaimer"
              title="Disclaimer"
              content={`
                <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.</p>
                <p>MuluCard does not warrant that:</p>
                <ul>
                  <li>The Service will function uninterrupted, secure, or available at any particular time or location.</li>
                  <li>Any errors or defects will be corrected.</li>
                  <li>The Service is free of viruses or other harmful components.</li>
                  <li>The results of using the Service will meet your requirements.</li>
                </ul>
              `}
            />

            <PolicySection 
              id="limitation-liability"
              title="Limitation of Liability"
              content={`
                <p>In no event shall MuluCard, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul>
                  <li>Your access to or use of or inability to access or use the Service.</li>
                  <li>Any conduct or content of any third party on the Service.</li>
                  <li>Any content obtained from the Service.</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
              `}
            />

            <PolicySection 
              id="governing-law"
              title="Governing Law"
              content={`
                <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
              `}
            />

            <PolicySection 
              id="contact-us"
              title="Contact Us"
              content={`
                <p>If you have any questions about these Terms, please contact us at:</p>
                <div class="mt-3">
                  <p><strong>MuluCard</strong></p>
                  <p>Email: info@mulucard.com</p>
                </div>
              `}
            />
          </div>
        </div>
      </div>

      {/* <PolicyFooter /> */}

      <Footer/>

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