// src/components/Accordion.js

import React, { useState } from 'react';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='bg-white border rounded-lg shadow-sm text-sm font-normal'>
    <div className="border-b border-gray-200">
      <button type='button'
        className="w-full text-left px-4 py-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span className="text-md font-normal">{title}</span>
          <span className="text-xl">{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
    </div>
  );
};

// const Accordion = () => {
//   return (
//     <div className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
//       <AccordionItem title="Item 1">
//         <p>This is the content for item 1.</p>
//       </AccordionItem>
//       <AccordionItem title="Item 2">
//         <p>This is the content for item 2.</p>
//       </AccordionItem>
//       <AccordionItem title="Item 3">
//         <p>This is the content for item 3.</p>
//       </AccordionItem>
//     </div>
//   );
// };

export default AccordionItem;
