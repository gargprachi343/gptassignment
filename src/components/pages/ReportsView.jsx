import React, { useState } from 'react';

const ReportsView = () => {
  const [reports] = useState([
    { id: 1, title: 'Monthly Event Summary', date: 'Dec 2025', status: 'Ready' },
    { id: 2, title: 'Attendee Analytics', date: 'Dec 2025', status: 'Processing' },
    { id: 3, title: 'Event Performance', date: 'Nov 2025', status: 'Ready' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          📄 Reports
        </h2>
        <p className="text-white text-opacity-90">Analytics and performance insights</p>
      </div>
      
      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="bg-white p-6 rounded-lg border border-gray-200 card-hover shadow-sm">
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{report.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{report.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                  report.status === 'Ready' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {report.status}
                </span>
                <button className="p-3 text-white bg-gradient-to-r from-primary-red to-secondary-orange rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsView;
