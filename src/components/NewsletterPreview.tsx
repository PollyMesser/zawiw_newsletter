import React from 'react';
import { NewsletterData } from '../types';
import { formatDate } from '../utils/dateUtils';
import { generateNewsletterHtml } from '../utils/htmlGenerator';

interface Props {
  data: NewsletterData;
}

export default function NewsletterPreview({ data }: Props) {
  const downloadHtml = () => {
    const html = generateNewsletterHtml(data);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-${formatDate(data.date)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Preview</h2>
        <button
          onClick={downloadHtml}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Download HTML
        </button>
      </div>
      <div className="border rounded-lg p-4">
        <div
          dangerouslySetInnerHTML={{ __html: generateNewsletterHtml(data) }}
        />
      </div>
    </div>
  );
}