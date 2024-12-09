import React, { useState } from 'react';
import { NewsletterData } from './types';
import NewsletterForm from './components/NewsletterForm';
import NewsletterPreview from './components/NewsletterPreview';

const initialData: NewsletterData = {
  title: 'ZAWiW Newsletter', // Added default title
  date: new Date().toISOString().split('T')[0],
  greeting:
    'Liebe Freundinnen und Freunde des ZAWiW, \nliebe Mitglieder und Teilnehmende beim studium generale und den ViLE-Webinaren,',
  introduction:
    'Einleitungstext mit allgemeinen Hinweisen (ggf. Bezug aktuelles) und Highlights der unten stehenden Veranstaltungen',
  events: [],
  closingMessage:
    'Wir freuen uns mit Ihnen auf viele spannende Veranstaltungen! \n\nHerzlichst',
  senderName: '',
};

function App() {
  const [data, setData] = useState<NewsletterData>(initialData);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Newsletter Generator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <NewsletterForm data={data} onChange={setData} />
          </div>

          <div className="space-y-6">
            <NewsletterPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;