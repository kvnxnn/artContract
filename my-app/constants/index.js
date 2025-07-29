export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const formatBalance = (balance, decimals = 2) => {
  if (!balance) return "";
  const [integerPart, decimalPart] = balance.split(".");
  return `${integerPart}.${decimalPart.slice(0, decimals)}`;
};

export const formatAddress = address => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
