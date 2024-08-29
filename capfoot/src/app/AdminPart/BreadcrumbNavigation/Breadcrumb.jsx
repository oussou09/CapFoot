import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="bg-white py-3 px-4 rounded shadow-sm">
      <ol role="list" className="flex space-x-4">
        <li className="flex items-center">
          <a href="/wp-admin">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
            >
                <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
                />
            </svg>
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <FiChevronRight className="w-5 h-5 text-gray-500 mx-2" />
            <a href={item.href} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
