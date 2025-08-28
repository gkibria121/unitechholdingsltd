import React from 'react';

const PropertyInfo = ({ className, propertyDetails }) => {
  return (
    <div className={`max-w-lg sm:max-w-xl lg:max-w-4xl mx-auto p-4 ${className} col-span-2 lg:col-span-1`}>
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            AT A GLANCE
          </h2>
        </div>
        
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          {propertyDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <dt className="flex items-center text-xl text-gray-500 dark:text-gray-400 mr-4">
                <span aria-hidden="true">{detail.icon}</span>
              </dt>
              <dd className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                {detail.label}
              </dd>
              <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default PropertyInfo;
