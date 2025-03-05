
document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed-select');
  const gallery = document.getElementById('gallery');
  const loading = document.getElementById('loading');

  // Fetch all dog breeds
  async function fetchBreeds() {
    loading.classList.remove('hidden');
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error fetching dog breeds:', error);
      return {};
    } finally {
      loading.classList.add('hidden');
    }
  }

  // Fetch random images for a specific breed
  async function fetchBreedImages(breed) {
    loading.classList.remove('hidden');
    gallery.innerHTML = '';
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/9`);
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error(`Error fetching images for ${breed}:`, error);
      return [];
    } finally {
      loading.classList.add('hidden');
    }
  }

  // Populate the breed select dropdown
  async function populateBreedSelect() {
    const breeds = await fetchBreeds();
    const breedNames = Object.keys(breeds);
    
    breedNames.sort().forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
      breedSelect.appendChild(option);
    });
  }

  // Display images in the gallery
  function displayImages(images) {
    gallery.innerHTML = '';
    images.forEach(imageUrl => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Dog image';
      img.addEventListener('error', () => {
        img.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
      });
      
      galleryItem.appendChild(img);
      gallery.appendChild(galleryItem);
    });
  }

  // Handle breed selection
  breedSelect.addEventListener('change', async (event) => {
    const selectedBreed = event.target.value;
    if (selectedBreed) {
      const images = await fetchBreedImages(selectedBreed);
      displayImages(images);
    } else {
      gallery.innerHTML = '';
    }
  });

  // Initialize the app
  populateBreedSelect();
});
