document.addEventListener('DOMContentLoaded', () => {
  // Cache form and field elements for performance
  const form = document.getElementById('itemForm');
  const fields = {
    title: document.getElementById('title'),
    image: document.getElementById('image'),
    location: document.getElementById('location'),
    latitude: document.getElementById('latitude'),
    longitude: document.getElementById('longitude'),
    description: document.getElementById('description'),
    rent: document.getElementById('rent'),
    price: document.getElementById('price'),
  };
  
  // Select all form group elements for error handling
  const formGroupElements = form.querySelectorAll('.form-group, .mb-3');

  // Function to display error messages for invalid fields
  function showError(element, message) {
    const formGroup = element.closest('.form-group, .mb-3');
    let feedback = formGroup.querySelector('.invalid-feedback');

    // Create feedback element if it doesn't exist
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      formGroup.appendChild(feedback);
    }

    feedback.textContent = message;  // Set error message
    element.classList.add('is-invalid');  // Mark the input as invalid
  }

  // Function to clear all error messages and invalid styles
  function clearErrors() {
    formGroupElements.forEach(group => {
      const feedback = group.querySelector('.invalid-feedback');
      if (feedback) {
        feedback.textContent = '';  // Clear error message
        feedback.classList.remove('d-block');  // Hide feedback
      }
      group.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid');  // Remove invalid class
      });
    });
  }

  // Function to validate an individual field against provided conditions
  function validateField(field, conditions) {
    for (const [check, message] of conditions) {
      if (!check()) {
        showError(field, message);  // Show error if check fails
        return false;
      }
    }
    return true;  // Return true if all conditions pass
  }

  // Event listener for form submission
  form.addEventListener('submit', event => {
    clearErrors();  // Clear previous errors
    let hasErrors = false;  // Flag to track validation status
    const routeName = form.action.split('/').pop();  // Get the last segment of the action URL

    // Validate title field
    hasErrors |= !validateField(fields.title, [
      [() => fields.title.value.trim() !== '', 'Title is required!'],
      [() => fields.title.value.length >= 3, 'Title must be at least 3 characters long!'],
    ]);

    // Validate image field
    const image = fields.image.files[0];
    hasErrors |= !validateField(fields.image, [
      [() => image !== undefined, 'Image is required!'],
      [() => ['image/jpeg', 'image/png', 'image/gif'].includes(image.type), 'Invalid image type! Only JPEG, PNG, and GIF are allowed.'],
      [() => image.size <= 2 * 1024 * 1024, 'Image size exceeds 2MB!'],
    ]);

    // Validate location field
    hasErrors |= !validateField(fields.location, [
      [() => fields.location.value.trim() !== '', 'Location is required!'],
    ]);

    // Validate latitude and longitude fields with regex patterns
    const latPattern = /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/;
    const lonPattern = /^-?((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)$/;
    hasErrors |= !validateField(fields.latitude, [
      [() => latPattern.test(fields.latitude.value.trim()), 'Invalid latitude format!'],
    ]);
    hasErrors |= !validateField(fields.longitude, [
      [() => lonPattern.test(fields.longitude.value.trim()), 'Invalid longitude format!'],
    ]);

    // Validate description field
    hasErrors |= !validateField(fields.description, [
      [() => fields.description.value.trim() !== '', 'Description is required!'],
      [() => fields.description.value.length >= 10, 'Description must be at least 10 characters long!'],
    ]);

    // Conditional validation based on route name
    if (routeName === 'house') {
      hasErrors |= !validateField(fields.rent, [
        [() => fields.rent.value.trim() !== '', 'Rent is required!'],
        [() => !isNaN(fields.rent.value) && fields.rent.value > 0, 'Invalid rent value!'],
      ]);
    }

    if (routeName === 'market') {
      hasErrors |= !validateField(fields.price, [
        [() => fields.price.value.trim() !== '', 'Price is required!'],
        [() => !isNaN(fields.price.value) && fields.price.value > 0, 'Invalid price value!'],
      ]);
    }

    // Prevent form submission if there are errors
    if (hasErrors) {
      event.preventDefault();
    } else {
      // Show loading spinner on successful validation
      document.getElementById('submitButton').classList.add('d-none');
      document.getElementById('loadingSpinner').classList.remove('d-none');
    }
  });
});
