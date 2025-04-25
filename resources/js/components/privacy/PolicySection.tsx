import { useEffect, useRef } from 'react';

interface PolicySectionProps {
  id: string;
  title: string;
  content: string;
}

export default function PolicySection({ id, title, content }: PolicySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (window.location.hash === `#${id}` && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [id]);

  return (
    <div id={id} ref={sectionRef} className="mb-10 scroll-mt-8 animate-fade-in">
      <div className="border-b border-gray-200 pb-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div 
        className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};