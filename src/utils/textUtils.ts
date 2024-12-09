export const formatText = (text: string | null | undefined): string => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\\n/g, '<br>')
    .replace(/\\/g, '')
    .replace(/\n/g, '<br>');
};