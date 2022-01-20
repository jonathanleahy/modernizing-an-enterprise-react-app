export const formatPrice = (price) => {
  const isNegative = price < 0;
  const absolutePrice = Math.abs(price);
  const dollars = Math.floor(absolutePrice / 100);
  const cents = Math.abs(Math.round(price % 100));
  const paddedCents = String(cents).padStart(2, '0');
  const sign = isNegative ? '-' : '';
  return `$${sign}${dollars}.${paddedCents}`;
};
