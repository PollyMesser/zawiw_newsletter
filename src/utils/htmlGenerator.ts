import { NewsletterData, Event } from '../types';
import { formatDate, formatDateWithWeekday, formatTime } from './dateUtils';
import { formatText } from './textUtils';


export const generateStyles = () => `
  body {
    font-family: Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
  }
  .header, .footer {
    text-align: center;
    padding: 20px;
    background-color: #236fa9;
    color: #f4f4f4;
  }
  .header h1 {
    font-size: 1.5em;
  }
  .content {
    padding: 20px;
  }
  .hello {
    line-height: 1.5;
  }
  .event-wrapper {
    display: flex;
    justify-content: center;
  }
  .event-card {
    border: 1px solid #b9c8d4;
    border-radius: 8px;
    padding: 16px;
    margin: 20px 0;
    background-color: #b9c8d4;
    max-width: 600px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
  }
  .event-title {
    font-weight: normal;
    font-size: 1em;
    margin-bottom: 1em;
  }
  a {
    color: blue;
    }
  .event-links {
    margin-top: 15px;
  }
  .event-links a {
    display: inline-block;
    padding: 10px 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    font-size: 1em;
    color: white;
    border-radius: 5px;
  }
  .event-link, .event-register-link {
    display: inline-block;
    padding: 10px 15px;
    margin-right: 10px;
    text-decoration: none;
    font-size: 1em;
    color: #272725;
    border-radius: 5px;
    background-color: #c3c0b4;
  }
  .event-link:hover, .event-register-link:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 600px) {
    .event-links a {
      display: block;
      width: 90%;
      margin-right: 0;
    }
  }
`;

export const generateEventHtml = (event: Event) => `
  <div class="event-wrapper">
    <div class="event-card">
    <p>${event.category?
      `[${formatCategory(event.category)}]`:''} 
      ${formatDateWithWeekday(event.date)} 
      ${event.time? `um ${formatTime(event.time)} Uhr`:''} ${formatText(event.location)}</p>
      <div class="event-title"><strong>
        ${formatText(event.title)}</strong>${event.referent ? ` mit ${formatText(event.referent)}` : ''}
      </div>
      <p>${formatText(event.description)}</p>
      ${event.zoom ? 
    (() => {
        const details = [
          event.meetingid ? `Meeting-ID: ${event.meetingid}` : '',
          event.kenncode ? `Kenncode: ${event.kenncode}` : '',
          event.schnelleinwahl ? `Schnelleinwahl mobil: ${event.schnelleinwahl}` : ''
        ].filter(Boolean).join(' | ');
        
        return `
          <div>Zugangsdaten: <a href="${event.zoom}" title="${event.zoom}" target="_blank">${event.zoom}</a></div>
          ${details ? `<div>[${details}]</div>` : ''}
        `;
      })()
    : ''}
      ${event.anmeldung? 
        `<div>Anmeldung unter: <a href="${event.anmeldung}" title="${event.anmeldung}" target="_blank">${event.anmeldung}</a></div>`
          : ''
      }
      ${event.mehr_infos? 
        `<div>Weitere Informationen: <a href="${event.mehr_infos}" title="${event.mehr_infos}" target="_blank">${event.mehr_infos}</a></div>`
          : ''
      }
    </div>
  </div>
`;

const formatCategory = (category: string): string =>
  category?.startsWith('custom:') ? category.replace('custom:', '') : category;

export const generateHeaderHtml = (data: NewsletterData): string => `
  <div class="header">
    <h1>${formatText(data.title)} ${formatDate(data.date)}</h1>
  </div>
  <div class="content">
    <p class="hello">${formatText(data.greeting)}</p><br>
    <p class="hello">${formatText(data.introduction)}</p>
  </div>
`;

export const generateFooterHtml = (data: NewsletterData): string => `
  <div class="footer">
    <p>${formatText(data.closingMessage)}</p>
    <p>${formatText(data.senderName)}</p>
  </div>
`;

export const generateNewsletterHtml = (data: NewsletterData): string => {
  const template = `
  <!DOCTYPE html>
  <html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formatText(data.title)} ${formatDate(data.date)}</title>
    <style>${generateStyles()}</style>
  </head>
  <body>
    <div class="container">
      ${generateHeaderHtml(data)}
      <div class="content">
        ${data.events.map(generateEventHtml).join('')}
      </div>
      ${generateFooterHtml(data)}
    </div>
  </body>
  </html>
`;

  return template;
};