export const shortenAddress = (address: string | undefined, chars = 4): string => {
  if (!address) return '';
  
  // Ensure the address is at least 2 * chars + 2 characters long
  if (address.length < chars * 2 + 2) return address;
  
  const start = address.substring(0, chars + 2); // +2 for "0x"
  const end = address.substring(address.length - chars);
  
  return `${start}...${end}`;
};
