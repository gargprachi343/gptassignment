import React, { useState, useEffect } from 'react';
import useEvents from '../../hooks/useEvents';
import { CATEGORIES } from '../../utils/constants';
import { validateEventForm } from '../../utils/validators';
import { getTodayDate } from '../../utils/dateUtils';
import Button from '../common/Button';
import Input from '../common/Input';

/**
 * Modal component for creating new events (Admin only)
 */
const CreateEventModal = ({ onClose, onSuccess }) => {
  const { createEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateEventForm(formData, CATEGORIES);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    const result = await createEvent(formData);

    if (result.success) {
      setFormData({ title: '', date: '', location: '', category: '' });
      setErrors({});
      onSuccess();
    } else {
      setErrors({ submit: result.error || 'Failed to create event' });
    }

    setSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-gray-900">
              Create New Event
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary-orange rounded p-1"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <Input
                label="Title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                required
                maxLength={500}
                placeholder="Enter event title (max 500 characters)"
              />

              <Input
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
                required
                min={getTodayDate()}
              />

              <Input
                label="Location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                required
                maxLength={255}
                placeholder="Enter event location (max 255 characters)"
              />

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-primary-red">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`
                    w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-orange
                    ${errors.category ? 'border-red-500' : 'border-gray-300'}
                  `}
                  aria-invalid={!!errors.category}
                  aria-describedby={errors.category ? 'category-error' : undefined}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p id="category-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.category}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md" role="alert">
                  <p className="text-sm text-red-800">{errors.submit}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create Event'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;

