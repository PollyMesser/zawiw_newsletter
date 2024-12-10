import React from 'react';
import { CalendarDays, Mail, User, Plus } from 'lucide-react';
import { NewsletterData, Event } from '../types';
import ExcelImport from './ExcelImport';

interface Props {
  data: NewsletterData;
  onChange: (data: NewsletterData) => void;
}

export default function NewsletterForm({ data, onChange }: Props) {
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

  const handleExcelImport = (importedEvents: Event[]) => {
    onChange({ ...data, events: [...data.events, ...importedEvents] });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Newsletter Details
        </h2>

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
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Veranstaltungen
          </h2>
          <div className="flex gap-2">
            <ExcelImport onImport={handleExcelImport} />
            <button
              onClick={addEvent}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {data.events.map((event, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Event {index + 1}</h3>
              <button
                onClick={() => removeEvent(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="px-3 py-2 border rounded-md">
                <div>
                  <input
                    type="radio"
                    id={`zawiw-${index}`}
                    name={`category-${index}`}
                    value="ZAWiW"
                    checked={event.category === 'ZAWiW'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`zawiw-${index}`}>ZAWiW</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`studiumgenerale-${index}`}
                    name={`category-${index}`}
                    value="studium generale"
                    checked={event.category === 'studium generale'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`studiumgenerale-${index}`}>
                    studium generale
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`vile-${index}`}
                    name={`category-${index}`}
                    value="ViLE-Webinare"
                    checked={event.category === 'ViLE-Webinare'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`vile-${index}`}>ViLE-webinare</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`FL-${index}`}
                    name={`category-${index}`}
                    value="Forschendes Lernen"
                    checked={event.category === 'Forschendes Lernen'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`FL-${index}`}>Forschendes Lernen</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`bürgerwissenschaften-${index}`}
                    name={`category-${index}`}
                    value="Bürgerwissenschaften"
                    checked={event.category === 'Bürgerwissenschaften'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`bürgerwissenschaften-${index}`}>
                    Bürgerwissenschaften
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`andere-${index}`}
                    name={`category-${index}`}
                    value="Andere Abteilungen Uni"
                    checked={event.category === 'Andere Abteilungen Uni'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`andere-${index}`}>
                    Andere Abteilungen Uni
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`allgemein-${index}`}
                    name={`category-${index}`}
                    value="Uni allgemein"
                    checked={event.category === 'Uni allgemein'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`allgemein-${index}`}>Uni allgemein</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`uug-${index}`}
                    name={`category-${index}`}
                    value="UUG"
                    checked={event.category === 'UUG'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`uug-${index}`}>UUG</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`extern-${index}`}
                    name={`category-${index}`}
                    value="Externe Veranstaltung"
                    checked={event.category === 'Externe Veranstaltung'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`extern-${index}`}>
                    Externe Veranstaltung
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`studien-${index}`}
                    name={`category-${index}`}
                    value="studien"
                    checked={event.category === 'studien'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`studien-${index}`}>
                    Studien / Forschungshinweise
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`muz-${index}`}
                    name={`category-${index}`}
                    value="muz"
                    checked={event.category === 'muz'}
                    onChange={(e) =>
                      updateEvent(index, { category: e.target.value })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`muz-${index}`}>Musikalisches Zentrum</label>
                </div>
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
                rows={3}
                maxLength={400}
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
                placeholder="Weiter Informationen"
                value={event.mehr_infos}
                onChange={(e) =>
                  updateEvent(index, { mehr_infos: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        ))}
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
