import React, { useRef, useEffect } from 'react';
import { NewsletterData } from '../types';
import { formatDate } from '../utils/dateUtils';
import {
  generateNewsletterHtml,
  generateHeaderHtml,
  generateEventHtml,
  generateFooterHtml,
  generateStyles 
} from '../utils/htmlGenerator';

interface Props {
  data: NewsletterData;
  focusIndex: number | null;
}

export default function NewsletterPreview({ data, focusIndex }: Props) {
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    if (focusIndex !== null && eventRefs.current[focusIndex]) {
      eventRefs.current[focusIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [focusIndex]);

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
      <style dangerouslySetInnerHTML={{ __html: generateStyles() }} />

      <div className="border rounded-lg p-4 space-y-4">
        {/* Header (Begrüßung, Einführung etc.) */}
        <div dangerouslySetInnerHTML={{ __html: generateHeaderHtml(data) }} />

        {/* Einzelne Veranstaltungen */}
        {data.events.map((event, index) => (
          <div
            key={index}
            ref={(el) => (eventRefs.current[index] = el)}
            className="mb-4"
          >
            <div dangerouslySetInnerHTML={{ __html: generateEventHtml(event) }} />
          </div>
        ))}

        {/* Footer (Abschluss, Absender) */}
        <div dangerouslySetInnerHTML={{ __html: generateFooterHtml(data) }} />
      </div>
    </div>
  );
}
