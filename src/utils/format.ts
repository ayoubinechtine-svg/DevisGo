export function formatMoney(amount: number, currency = 'MAD') {
  const value = new Intl.NumberFormat('fr-MA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  const symbol = currency === 'MAD' ? 'DH' : currency;
  return `${value} ${symbol}`;
}

export function nextDocumentNumber(prefix: 'DEV' | 'FAC', existingCount: number) {
  const year = new Date().getFullYear();
  const seq = String(existingCount + 1).padStart(4, '0');
  return `${prefix}-${year}-${seq}`;
}
