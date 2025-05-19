import React, { useState } from 'react';
import { NewsletterData } from './types';
import NewsletterForm from './components/NewsletterForm';
import NewsletterPreview from './components/NewsletterPreview';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';


const initialData: NewsletterData = {
  title: 'ZAWiW Newsletter', // Added default title
  date: new Date().toISOString().split('T')[0],
  greeting:
    'Guten Tag,',
  introduction:
    'Einleitungstext mit allgemeinen Hinweisen (ggf. Bezug aktuelles) und Highlights der unten stehenden Veranstaltungen',
  events: [],
  closingMessage:
    'Wir freuen uns auf Ihre Teilnahme an den kommenden Veranstaltungen!',
  senderName: '',
};

function App() {
  const [data, setData] = useState<NewsletterData>(initialData);
  const [openEventIndex, setOpenEventIndex] = useState<number | null>(null);
  console.log("App renders", data);
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-8">
          ZAWiW Newsletter Generator
        </h1>

        <PanelGroup direction="horizontal" className="flex-grow overflow-hidden">
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto pr-2">
              <NewsletterForm
                data={data}
                onChange={setData}
                openEventIndex={openEventIndex}
                setOpenEventIndex={setOpenEventIndex}
              />
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize" />

          <Panel defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto pl-2">
              <div className="sticky top-4">
                <NewsletterPreview data={data} focusIndex={openEventIndex} />
              </div>
            </div>
          </Panel>
        </PanelGroup>


      </div>
    </div>
  );
}

export default App;