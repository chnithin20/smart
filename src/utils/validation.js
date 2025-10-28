// Form validation utilities

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@((gmail|outlook|hotmail|yahoo|aol)\.com)$/i;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[+][0-9]{1,4}\d{10}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Validate vehicle number (Indian format)
 */
export const validateVehicleNumber = (vehicleNumber) => {
  // Format: XX00XX0000 or XX-00-XX-0000
  const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
  return vehicleRegex.test(vehicleNumber.replace(/[-\s]/g, ''));
};

/**
 * Validate password strength
 * Returns: { valid: boolean, strength: 'weak'|'medium'|'strong', message: string }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, strength: 'weak', message: 'Password is required' };
  }

  if (password.length < 6) {
    return { valid: false, strength: 'weak', message: 'Password must be at least 6 characters' };
  }

  let strength = 'weak';
  let score = 0;

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character variety checks
  if (/[a-z]/.test(password)) score++; // lowercase
  if (/[A-Z]/.test(password)) score++; // uppercase
  if (/[0-9]/.test(password)) score++; // numbers
  if (/[^a-zA-Z0-9]/.test(password)) score++; // special characters

  if (score >= 5) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    valid: score >= 3,
    strength,
    message: strength === 'strong' ? 'Strong password' : 
             strength === 'medium' ? 'Medium strength password' : 
             'Weak password - add more variety'
  };
};

/**
 * Validate credit card number (Luhn algorithm)
 */
export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d{13,19}$/.test(cleaned)) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate CVV
 */
export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

/**
 * Validate expiry date (MM/YY format)
 */
export const validateExpiryDate = (expiry) => {
  const cleaned = expiry.replace(/\s/g, '');
  const match = cleaned.match(/^(\d{2})\/(\d{2})$/);
  
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = parseInt('20' + match[2], 10);
  
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

/**
 * Format card number with spaces
 */
export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\s/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
};

/**
 * Format expiry date (MM/YY)
 */
export const formatExpiryDate = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
  }
  return cleaned;
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2');
  }
  return cleaned;
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true, message: '' };
};

/**
 * Validate min length
 */
export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (value.length < minLength) {
    return { valid: false, message: `${fieldName} must be at least ${minLength} characters` };
  }
  return { valid: true, message: '' };
};

/**
 * Validate max length
 */
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (value.length > maxLength) {
    return { valid: false, message: `${fieldName} must not exceed ${maxLength} characters` };
  }
  return { valid: true, message: '' };
};
