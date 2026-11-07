/**
 * Format number into Indian Rupee format (e.g. ₹1,499)
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to standard luxury format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Calculate percentage discount
 */
export const calculateDiscount = (original: number, current: number): number => {
  if (original <= current || original === 0) return 0;
  return Math.round(((original - current) / original) * 100);
};

/**
 * Validate 6-digit Indian Pincode
 */
export const isValidIndianPincode = (pincode: string): boolean => {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
};

/**
 * Validate 10-digit Indian Mobile number
 */
export const isValidIndianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};

