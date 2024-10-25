async function fetchSuggestions(query) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&countrycodes=in`
  );
  const data = await response.json();
  return data;
}

function createAutocomplete(inputElement) {
  let currentFocus;

  inputElement.addEventListener('input', async function () {
    const val = this.value;
    closeAllLists();
    if (!val) return false;

    const suggestions = await fetchSuggestions(val);
    const suggestionBox = document.createElement('div');
    suggestionBox.setAttribute('id', this.id + '-autocomplete-list');
    suggestionBox.setAttribute('class', 'list-group position-absolute w-100');
    this.parentNode.appendChild(suggestionBox);

    suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement('a');
      suggestionItem.classList.add('list-group-item', 'list-group-item-action');
      suggestionItem.innerHTML = suggestion.display_name;
      suggestionItem.addEventListener('click', function () {
        inputElement.value = suggestion.display_name;
        document.getElementById('latitude').value = suggestion.lat;
        document.getElementById('longitude').value = suggestion.lon;
        closeAllLists();
      });
      suggestionBox.appendChild(suggestionItem);
    });
  });

  inputElement.addEventListener('keydown', function (e) {
    let x = document.getElementById(this.id + '-autocomplete-list');
    if (x) x = x.getElementsByTagName('a');
    if (e.keyCode == 40) {
      // Arrow Down
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      // Arrow Up
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      // Enter
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add('active');
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }
  }

  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName('list-group');
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inputElement) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener('click', function (e) {
    closeAllLists(e.target);
  });
}

function previewImage() {
  const file = document.getElementById('image').files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const imgPreview = document.getElementById('img-preview');
    imgPreview.src = reader.result;
    imgPreview.classList.remove('d-none');
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    const imgPreview = document.getElementById('img-preview');
    imgPreview.src = '';
    imgPreview.classList.add('d-none');
  }
}

async function useCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        document.getElementById('location').value = 'Near ' + data.display_name;
      },
      function (error) {
        console.error('Geolocation error:', error);
        alert('Geolocation error: ' + error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
function togglePriceRentFields() {
  const typeSelect = document.getElementById('type');
  const rentField = document.getElementById('rentField');
  const priceField = document.getElementById('priceField');

  if (typeSelect.value === 'rent') {
    rentField.classList.remove('d-none');
    priceField.classList.add('d-none');
  } else if (typeSelect.value === 'price') {
    priceField.classList.remove('d-none');
    rentField.classList.add('d-none');
  } else {
    rentField.classList.add('d-none');
    priceField.classList.add('d-none');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  createAutocomplete(document.getElementById('location'));
  document
    .getElementById('use-location-btn')
    .addEventListener('click', useCurrentLocation);
});
