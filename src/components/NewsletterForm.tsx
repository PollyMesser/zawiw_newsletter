import React, { useRef, useEffect, useState } from 'react';
import { CalendarDays, Mail, User, Plus } from 'lucide-react';
import { NewsletterData, Event } from '../types';
import ExcelImport from './ExcelImport';

interface Props {
  data: NewsletterData;
  onChange: (data: NewsletterData) => void;
  openEventIndex: number | null;
  setOpenEventIndex: (index: number | null) => void;
}

export default function NewsletterForm({ data, onChange, setOpenEventIndex, openEventIndex }: Props) {
  const addEvent = () => {
    const newEvent: Event = {
      category: '',
      title: '',
      referent: '',
      date: '',
      time: '',
      location: '',
      description: '',
      zoom: '',
      meetingid: '',
      kenncode: '',
      schnelleinwahl: '',
      anmeldung: '',
      mehr_infos: ''
    };
    onChange({ ...data, events: [...data.events, newEvent] });
    setOpenEventIndex(data.events.length); // letzter Index wird geöffnet
    setShowNewsletterDetails(false);
  };

  const updateEvent = (index: number, updatedEvent: Partial<Event>) => {
    const newEvents = [...data.events];
    newEvents[index] = { ...newEvents[index], ...updatedEvent };
    onChange({ ...data, events: newEvents });
  };

  const removeEvent = (index: number) => {
    const newEvents = data.events.filter((_, i) => i !== index);
    onChange({ ...data, events: newEvents });
  };

  const moveEventUp = (index) => {
    if (index === 0) return;
    const newEvents = [...data.events];
    [newEvents[index - 1], newEvents[index]] = [newEvents[index], newEvents[index - 1]];
    onChange({ ...data, events: newEvents });
  };
  
  const moveEventDown = (index) => {
    if (index === data.events.length - 1) return;
    const newEvents = [...data.events];
    [newEvents[index], newEvents[index + 1]] = [newEvents[index + 1], newEvents[index]];
    onChange({ ...data, events: newEvents });
  };

  useEffect(() => {
  if (
    openEventIndex !== null &&
    eventRefs.current[openEventIndex] &&
    typeof window !== 'undefined'
  ) {
    eventRefs.current[openEventIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}, [openEventIndex]);

// ⬇️ NEU: zweiter Effekt für Klicks außerhalb des Kategorien-Dropdowns
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const clickedInsideAnyDropdown = categoryDropdownRefs.current.some(
      (ref) => ref && ref.contains(event.target as Node)
    );

    if (!clickedInsideAnyDropdown) {
      setOpenCategoryIndex(null);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);




  
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);
  const [showNewsletterDetails, setShowNewsletterDetails] = useState(true);
  const categoryDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  categoryDropdownRefs.current = [];
  const categories = [
                      { label: 'ZAWiW', value: 'ZAWiW' },
                      { label: 'studium generale', value: 'studium generale' },
                      { label: 'ViLE-Webinare', value: 'ViLE-Webinare' },
                      { label: 'Forschendes Lernen', value: 'Forschendes Lernen' },
                      { label: 'Bürgerwissenschaften', value: 'Bürgerwissenschaften' },
                      { label: 'Andere Abteilungen Uni', value: 'Andere Abteilungen Uni' },
                      { label: 'Uni allgemein', value: 'Uni allgemein' },
                      { label: 'UUG', value: 'UUG' },
                      { label: 'Externe Veranstaltung', value: 'Externe Veranstaltung' },
                      { label: 'studien', value: 'studien' },
                      { label: 'muz', value: 'muz' },
                    ];

  const handleExcelImport = (importedEvents: Event[]) => {
    onChange({ ...data, events: [...data.events, ...importedEvents] });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setShowNewsletterDetails(!showNewsletterDetails)}
          className="text-left w-full text-xl font-semibold flex items-center gap-2 hover:underline"
        >
          <Mail className="w-5 h-5" />
          Veranstaltungsdetails bearbeiten
        </button>

        {showNewsletterDetails && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Newsletter Titel
              </label>
              <input
                value={data.title}
                onChange={(e) => onChange({ ...data, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="z.B. ZAWiW Newsletter"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Newsletter Datum
              </label>
              <input
                type="date"
                value={data.date}
                onChange={(e) => onChange({ ...data, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Begrüßung
              </label>
              <textarea
                value={data.greeting}
                onChange={(e) => onChange({ ...data, greeting: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Einführungstext
              </label>
              <textarea
                value={data.introduction}
                onChange={(e) =>
                  onChange({ ...data, introduction: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
              />
            </div>
          </>
        )} </div>


      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Veranstaltungen
          </h2>
          <ExcelImport onImport={handleExcelImport} />
        </div>
        {data.events.map((event, index) => (
          <div key={index} 
          ref={(el) => (eventRefs.current[index] = el)}
          className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3
                className="font-medium cursor-pointer"
                onClick={() =>
                  setOpenEventIndex(openEventIndex === index ? null : index)
                }
              >
                Event {index + 1}: {event.title || 'Kein Titel'}
              </h3>
              <div className="flex flex-col items-end space-y-1">
                <button
                  onClick={() => removeEvent(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => moveEventUp(index)}
                    disabled={index === 0}
                    className="text-gray-600 hover:text-gray-800 disabled:opacity-30"
                    title="Nach oben verschieben"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveEventDown(index)}
                    disabled={index === data.events.length - 1}
                    className="text-gray-600 hover:text-gray-800 disabled:opacity-30"
                    title="Nach unten verschieben"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
            
            {openEventIndex === index && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenCategoryIndex(openCategoryIndex === index ? null : index)
                    }
                    className="w-full text-left px-3 py-2 border rounded-md bg-white hover:bg-gray-50"
                  >
                    {event.category
                      ? event.category.startsWith('custom:')
                        ? `Kategorie: ${event.category.replace('custom:', '')}`
                        : `Kategorie: ${event.category}`
                      : 'Kategorie wählen'}
                  </button>

                  {openCategoryIndex === index && (
                    <div
                      ref={(el) => (categoryDropdownRefs.current[index] = el)}
                      className="absolute z-10 bg-white border mt-1 rounded-md shadow-lg w-full max-h-64 overflow-auto"
                    >
                      {categories.map(({ label, value }) => (
                        <div
                          key={value}
                          onClick={() => {
                            updateEvent(index, { category: value });
                            setOpenCategoryIndex(null);
                          }}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          {label}
                        </div>
                      ))}

                      {/* Manuelle Kategorie-Auswahl */}
                      <div
                        onClick={() => {
                          updateEvent(index, { category: 'custom:' });
                          // dropdown bleibt offen
                        }}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      >
                        Andere Kategorie
                      </div>

                      {/* Eingabefeld nur bei custom: */}
                      {event.category?.startsWith('custom:') && (
                        <div className="border-t px-4 py-2 bg-gray-50">
                          
                          <input
                            type="text"
                            value={event.category.replace('custom:', '')}
                            onChange={(e) =>
                              updateEvent(index, {
                                category: `custom:${e.target.value}`,
                              })
                            }
                            placeholder="Kategorie eingeben"
                            className="w-full border px-2 py-1 rounded mt-1"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              

              <input
                placeholder="Titel der Veranstaltung"
                value={event.title}
                onChange={(e) => updateEvent(index, { title: e.target.value })}
                className="px-3 py-2 border rounded-md col-span-2"
              />
              <input
                placeholder="Referent*in"
                value={event.referent}
                onChange={(e) =>
                  updateEvent(index, { referent: e.target.value })
                }
                className="px-3 py-2 border rounded-md col-span-2"
              />
              <input
                type="date"
                value={event.date}
                onChange={(e) => updateEvent(index, { date: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="time"
                value={event.time}
                onChange={(e) => updateEvent(index, { time: e.target.value })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                placeholder="Ort"
                value={event.location}
                onChange={(e) =>
                  updateEvent(index, { location: e.target.value })
                }
                className="px-3 py-2 border rounded-md col-span-2"
              />
              <textarea
                placeholder="Zoom-Link"
                value={event.zoom}
                onChange={(e) => updateEvent(index, { zoom: e.target.value })}
                className="px-3 py-2 border rounded-md col-span-2"
                rows={3}
              />
              <input
                placeholder="Meeting-ID"
                value={event.meetingid}
                onChange={(e) =>
                  updateEvent(index, { meetingid: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />
              <input
                placeholder="Kenncode"
                value={event.kenncode}
                onChange={(e) =>
                  updateEvent(index, { kenncode: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />
              <input
                placeholder="Schnelleinwahl"
                value={event.schnelleinwahl}
                onChange={(e) =>
                  updateEvent(index, { schnelleinwahl: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />

              <textarea
                placeholder="Beschreibung"
                value={event.description}
                onChange={(e) =>
                  updateEvent(index, { description: e.target.value })
                }
                className="px-3 py-2 border rounded-md col-span-2"
                rows={5}
              />
              <input
                placeholder="Anmeldelink"
                value={event.anmeldung}
                onChange={(e) =>
                  updateEvent(index, { anmeldung: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />
              <input
                placeholder="Weitere Informationen"
                value={event.mehr_infos}
                onChange={(e) =>
                  updateEvent(index, { mehr_infos: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />
            </div>
            )}
            {openEventIndex === index && (
              <div className="pt-2">
                <button
                  onClick={addEvent}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Veranstaltung hinzufügen
                </button>
              </div>
              
            )}

          </div>
        ))} 

        {data.events.length === 0 && (
          <div className="pt-4">
            <button
              onClick={addEvent}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Veranstaltung hinzufügen
            </button>
          </div>
        )}


      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User className="w-5 h-5" />
          Footer Details
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Abschlussnachricht
          </label>
          <textarea
            value={data.closingMessage}
            onChange={(e) =>
              onChange({ ...data, closingMessage: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Absender
          </label>
          <input
            value={data.senderName}
            onChange={(e) => onChange({ ...data, senderName: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Ihr Name"
          />
        </div>
      </div>
    </div>
  );
}
