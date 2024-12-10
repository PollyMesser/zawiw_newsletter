export interface Event {
  category: string;
  title: string;
  referent: string;
  date: string;
  time: string;
  location: string;
  description: string;
  zoom: string;
  meetingid: string;
  kenncode: string;
  schnelleinwahl: string;
  anmeldung: string;
  mehr_infos: string;
}

export interface NewsletterData {
  title: string;
  date: string;
  greeting: string;
  introduction: string;
  events: Event[];
  closingMessage: string;
  senderName: string;
}