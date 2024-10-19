document.addEventListener('DOMContentLoaded', () => {
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
  const formGroupElements = form.querySelectorAll('.form-group, .mb-3');

  function showError(element, message) {
    const formGroup = element.closest('.form-group, .mb-3');
    let feedback = formGroup.querySelector('.invalid-feedback');

    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      formGroup.appendChild(feedback);
    }

    feedback.textContent = message;
    element.classList.add('is-invalid');
  }

  function clearErrors() {
    formGroupElements.forEach(group => {
      const feedback = group.querySelector('.invalid-feedback');
      if (feedback) {
        feedback.textContent = '';
        feedback.classList.remove('d-block');
      }
      group.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid');
      });
    });
  }

  function validateField(field, conditions) {
    for (const [check, message] of conditions) {
      if (!check()) {
        showError(field, message);
        return false;
      }
    }
    return true;
  }

  form.addEventListener('submit', event => {
    clearErrors();
    let hasErrors = false;
    const routeName = form.action.split('/').pop();

    hasErrors |= !validateField(fields.title, [
      [() => fields.title.value.trim() !== '', 'Title is required!'],
      [() => fields.title.value.length >= 3, 'Title must be at least 3 characters long!'],
    ]);

    const image = fields.image.files[0];
    hasErrors |= !validateField(fields.image, [
      [() => image !== undefined, 'Image is required!'],
      [() => ['image/jpeg', 'image/png', 'image/gif'].includes(image.type), 'Invalid image type! Only JPEG, PNG, and GIF are allowed.'],
      [() => image.size <= 2 * 1024 * 1024, 'Image size exceeds 2MB!'],
    ]);

    hasErrors |= !validateField(fields.location, [
      [() => fields.location.value.trim() !== '', 'Location is required!'],
    ]);

    const latPattern = /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/;
    const lonPattern = /^-?((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)$/;
    hasErrors |= !validateField(fields.latitude, [
      [() => latPattern.test(fields.latitude.value.trim()), 'Invalid latitude format!'],
    ]);
    hasErrors |= !validateField(fields.longitude, [
      [() => lonPattern.test(fields.longitude.value.trim()), 'Invalid longitude format!'],
    ]);

    hasErrors |= !validateField(fields.description, [
      [() => fields.description.value.trim() !== '', 'Description is required!'],
      [() => fields.description.value.length >= 10, 'Description must be at least 10 characters long!'],
    ]);

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

    if (hasErrors) {
      event.preventDefault();
    } else {
      document.getElementById('submitButton').classList.add('d-none');
      document.getElementById('loadingSpinner').classList.remove('d-none');
    }
  });
});
