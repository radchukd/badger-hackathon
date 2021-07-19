export const formatNumber = (
  value: number | undefined,
  style: 'decimal' | 'percent' | 'currency',
  precision = 2,
): string => {
  let opts: Intl.NumberFormatOptions = { style, maximumFractionDigits: precision };

  if (style === 'currency') opts = { ...opts, currency: 'USD' };

  return new Intl.NumberFormat('en-US', opts).format(value ?? 0);
};
