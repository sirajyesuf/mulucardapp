export default function  TableOfContents() {
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'changes-to-terms', title: 'Changes to Terms' },
    { id: 'account-terms', title: 'Account Terms' },
    { id: 'acceptable-use', title: 'Acceptable Use' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'termination', title: 'Termination' },
    { id: 'disclaimer', title: 'Disclaimer' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'contact-us', title: 'Contact Us' },
  ];

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Table of Contents</h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a 
              href={`#${section.id}`} 
              onClick={handleClick(section.id)}
              className="text-blue-600 hover:text-blue-800 hover:underline block py-1 transition-colors"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};