const WEEKDAYS_DE = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
];

const formatDateBase = (dateStr: string | null | undefined, includeWeekday: boolean = false): string => {
  if (!dateStr || typeof dateStr !== 'string') return '';

  try {
    // Try parsing as ISO date first (YYYY-MM-DD)
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [_, year, month, day] = match;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const weekday = includeWeekday ? `${WEEKDAYS_DE[date.getDay()]}, ` : '';
      return `${weekday}${day}.${month}.${year}`;
    }

    // Try parsing as a date object
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const weekday = includeWeekday ? `${WEEKDAYS_DE[date.getDay()]}, ` : '';
      return `${weekday}${day}.${month}.${year}`;
    }
  } catch (error) {
    console.error('Error parsing date:', error);
  }

  return dateStr;
};

export const formatDate = (dateStr: string | null | undefined): string => {
  return formatDateBase(dateStr, false);
};

export const formatDateWithWeekday = (dateStr: string | null | undefined): string => {
  return formatDateBase(dateStr, true);
};

export const formatTime = (timeStr: string | null | undefined): string => {
  if (!timeStr || typeof timeStr !== 'string') return '';

  // Handle HH:mm or HH:mm:ss format
  const match = timeStr.match(/^(\d{2}):(\d{2})/);
  if (match) {
    const [_, hours, minutes] = match;
    return `${hours}:${minutes}`;
  }

  // Try parsing as a date object
  try {
    const date = new Date(`1970-01-01T${timeStr}`);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }
  } catch (error) {
    console.error('Error parsing time:', error);
  }

  return timeStr;
};