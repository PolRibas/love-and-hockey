import { useState } from 'react';

interface TabProps {
  tabs: string[];
  children: React.ReactNode[];
}

const Tabs = ({ tabs, children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg py-2 max-w-5xl w-full z-10">
      <div className="flex justify-center mb-4 border-b w-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 w-full ${
              index === activeTab ? 'text-blue-500 border-b-2 border-blue-500 font-bold' : 'text-gray-700'
            } focus:outline-none`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-4 px-8">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
