import { NewsletterData } from '../types';
import { formatDate, formatDateWithWeekday, formatTime } from './dateUtils';
import { formatText } from './textUtils';

const generateStyles = () => `
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
    background-color: #c3c0b4;
    color: #272725;
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
    border: 1px solid #c3c0b4;
    border-radius: 8px;
    padding: 16px;
    margin: 20px 0;
    background-color: #efebdc;
    max-width: 600px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
  }
  .event-title {
    font-weight: normal;
    font-size: 1em;
    margin-bottom: 1em;
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

const generateEventHtml = (event: Event) => `
  <div class="event-wrapper">
    <div class="event-card">
      <p>[${event.category}] ${formatDateWithWeekday(event.date)} um ${formatTime(
  event.time
)} Uhr ${formatText(event.location)}</p>
      <div class="event-title"><strong>${formatText(event.title)}</strong>${
  event.referent ? ` mit ${formatText(event.referent)}` : ''
}</div>
      <p>${formatText(event.description)}</p>
      ${
        event.zoom
          ? `<div>Zugangsdaten: <a href="${event.zoom}" target="_blank">Zoom-Link</a></div>
          <div>[Meeting-ID: ${event.meetingid} | Kenncode: ${event.kenncode} | Schnelleinwahl mobil: ${event.schnelleinwahl}]</div>`
          : ''
      }
    </div>
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
        <div class="header">
          <h1>${formatText(data.title)} ${formatDate(data.date)}</h1>
        </div>

        <div class="content">
          <p class="hello">${formatText(data.greeting)}</p><br>
          <p class="hello">${formatText(data.introduction)}</p>

          ${data.events.map(generateEventHtml).join('')}
        </div>

        <div class="footer">
          <p>${formatText(data.closingMessage)}</p>
          <p>${formatText(data.senderName)}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return template;
};