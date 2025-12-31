/**
 * Validate event title
 * @param {string} title - Event title
 * @returns {string|null} Error message or null if valid
 */
export const validateTitle = (title) => {
  if (!title || title.trim() === '') {
    return 'Title is required';
  }
  if (title.length > 500) {
    return 'Title must be 500 characters or less';
  }
  return null;
};

/**
 * Validate event date
 * @param {string} date - Event date
 * @returns {string|null} Error message or null if valid
 */
export const validateDate = (date) => {
  if (!date) {
    return 'Date is required';
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return 'Cannot create events with past dates';
  }
  
  return null;
};

/**
 * Validate event location
 * @param {string} location - Event location
 * @returns {string|null} Error message or null if valid
 */
export const validateLocation = (location) => {
  if (!location || location.trim() === '') {
    return 'Location is required';
  }
  if (location.length > 255) {
    return 'Location must be 255 characters or less';
  }
  return null;
};

/**
 * Validate event category
 * @param {string} category - Event category
 * @param {string[]} allowedCategories - Allowed categories
 * @returns {string|null} Error message or null if valid
 */
export const validateCategory = (category, allowedCategories) => {
  if (!category) {
    return 'Category is required';
  }
  if (!allowedCategories.includes(category)) {
    return `Category must be one of: ${allowedCategories.join(', ')}`;
  }
  return null;
};

/**
 * Validate entire event form
 * @param {Object} formData - Form data object
 * @param {string[]} allowedCategories - Allowed categories
 * @returns {Object} Object with errors (empty if valid)
 */
export const validateEventForm = (formData, allowedCategories) => {
  const errors = {};
  
  const titleError = validateTitle(formData.title);
  if (titleError) errors.title = titleError;
  
  const dateError = validateDate(formData.date);
  if (dateError) errors.date = dateError;
  
  const locationError = validateLocation(formData.location);
  if (locationError) errors.location = locationError;
  
  const categoryError = validateCategory(formData.category, allowedCategories);
  if (categoryError) errors.category = categoryError;
  
  return errors;
};

