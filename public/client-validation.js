document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itemForm');
    const titleField = document.getElementById('title');
    const imageField = document.getElementById('image');
    const locationField = document.getElementById('location');
    const latitudeField = document.getElementById('latitude');
    const longitudeField = document.getElementById('longitude');
    const descriptionField = document.getElementById('description');
    const rentField = document.getElementById('rent');
    const priceField = document.getElementById('price');
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

    form.addEventListener('submit', (event) => {
        clearErrors();
        let hasErrors = false;
        const title = titleField.value.trim();
        const image = imageField.files[0];
        const location = locationField.value.trim();
        const latitude = latitudeField.value.trim();
        const longitude = longitudeField.value.trim();
        const description = descriptionField.value.trim();
        const routeName = form.action.split('/').pop();

        if (!title) {
            showError(titleField, 'Title is required!');
            hasErrors = true;
        } else if (title.length < 3) {
            showError(titleField, 'Title must be at least 3 characters long!');
            hasErrors = true;
        }

        if (!image) {
            showError(imageField, 'Image is required!');
            hasErrors = true;
        } else {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(image.type)) {
                showError(imageField, 'Invalid image type! Only JPEG, PNG, and GIF are allowed.');
                hasErrors = true;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (image.size > maxSize) {
                showError(imageField, 'Image size exceeds 2MB!');
                hasErrors = true;
            }
        }

        if (!location) {
            showError(locationField, 'Location is required!');
            hasErrors = true;
        }

        const latPattern = /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/;
        const lonPattern = /^-?((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)$/;
        if (!latPattern.test(latitude) || !lonPattern.test(longitude)) {
            showError(latitudeField, 'Invalid latitude or longitude format!');
            showError(longitudeField, 'Invalid latitude or longitude format!');
            hasErrors = true;
        }

        if (!description) {
            showError(descriptionField, 'Description is required!');
            hasErrors = true;
        } else if (description.length < 10) {
            showError(descriptionField, 'Description must be at least 10 characters long!');
            hasErrors = true;
        }

        if (routeName === 'house') {
            const rent = rentField.value.trim();
            if (!rent) {
                showError(rentField, 'Rent is required!');
                hasErrors = true;
            } else if (isNaN(rent) || rent <= 0) {
                showError(rentField, 'Invalid rent value!');
                hasErrors = true;
            }
        }

        if (routeName === 'market') {
            const price = priceField.value.trim();
            if (!price) {
                showError(priceField, 'Price is required!');
                hasErrors = true;
            } else if (isNaN(price) || price <= 0) {
                showError(priceField, 'Invalid price value!');
                hasErrors = true;
            }
        }

        if (hasErrors) {
            event.preventDefault();
        }
    });
});

function previewImage() {
    const file = document.getElementById('image').files[0];
    const preview = document.getElementById('img-preview');
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    }
}

function useCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById('latitude').value = position.coords.latitude;
            document.getElementById('longitude').value = position.coords.longitude;
        }, () => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}
