export function formatDateAbbreviation(date: Date): string {
  const options = {
      day: '2-digit' as const,
      month: 'short' as const,
      hour: '2-digit' as const,
      minute: '2-digit' as const,
      hour12: false as const,
  };

  const formattedDate = new Intl.DateTimeFormat('pt-br', options).format(date);
  return formattedDate.replace(',', ' -');
}