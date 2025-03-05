// Get the breed select element from the DOM
const breedSelect = document.getElementById('breed-select');

// Function to fetch the list of dog breeds from the Dog API
async function fetchBreeds() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  const breeds = data.message;

  // Loop through the breeds object and create an option for each breed
  for (const breed in breeds) {
    const option = document.createElement('option');
    option.value = breed;
    option.textContent = breed;
    breedSelect.appendChild(option);
  }
}

// Call the function to fetch breeds
fetchBreeds();

// Get the gallery element from the DOM
const gallery = document.getElementById('gallery');

// Add an event listener to the breed select element
breedSelect.addEventListener('change', async () => {
  const selectedBreed = breedSelect.value;

  if (selectedBreed) {
    // Fetch 9 random images of the selected breed from the Dog API
    const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`);
    const data = await response.json();
    const imageUrls = data.message;

    // Clear the gallery
    gallery.innerHTML = '';

    // Loop through the image URLs and create an image element for each
    imageUrls.forEach(imageUrl => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');

      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = selectedBreed;

      galleryItem.appendChild(img);
      gallery.appendChild(galleryItem);
    });
  }
});
