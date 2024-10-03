export const truncateString = (str: string, maxLength: number = 40): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };