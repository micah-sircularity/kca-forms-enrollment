// Local storage utility functions
export const saveFormData = (formData) => {
  localStorage.setItem('kairosApplicationForm', JSON.stringify(formData));
};

export const getFormData = () => {
  const savedData = localStorage.getItem('kairosApplicationForm');
  return savedData ? JSON.parse(savedData) : null;
};

export const clearFormData = () => {
  localStorage.removeItem('kairosApplicationForm');
};
