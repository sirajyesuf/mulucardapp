
export default function TableOfContents() {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-usage', title: 'How We Use Your Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-storage', title: 'Data Storage and Security' },
    { id: 'user-rights', title: 'Your Rights' },
    { id: 'childrens-privacy', title: 'Children\'s Privacy' },
    { id: 'changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' },
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