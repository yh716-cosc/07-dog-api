// Get references to the select menu and the image element in the HTML
const breedSelect = document.getElementById('breed-select');



// Fetch the list of dog breeds from the Dog API
fetch('https://dog.ceo/api/breeds/list/all')
  .then(function(response) {
    // Convert the response to JSON
    return response.json();
  })
  .then(function(data) {
    // Get the breeds object from the data
    const breeds = data.message;

    // Loop through each breed in the object
    for (const breed in breeds) {
      // Create a new option element for each breed
      const option = document.createElement('option');
      option.value = breed; // Set the value to the breed name
      option.textContent = breed; // Set the text to the breed name

      // Add the option to the select menu
      breedSelect.appendChild(option);
    }
  });

// Listen for changes on the select menu
breedSelect.addEventListener('change', function() {
  // Get the selected breed from the menu
  const selectedBreed = breedSelect.value;

  // Build the API URL using the selected breed
  const url = `https://dog.ceo/api/breed/${selectedBreed}/images/random/9`;

  // Fetch a random image for the selected breed
  fetch(url)
    .then(function(response) {
      // Convert the response to JSON
      return response.json();
    })
    .then(function(data) {
      // Get 9 image URLs from the data
        const imageUrls = data.message;
        console.log(imageUrls); // Log the image URL to check if it's correct

      // Get the gallery element where the image will be displayed
      const gallery = document.getElementById('gallery');

      // Clear the gallery before adding the new images
      gallery.innerHTML = '';

      
      // Create a new image element for each image URL
      for (const imageUrl of imageUrls) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        // Create a new image element
        const dogImage = document.createElement('img');
        // Set the image element's src to the image URL
        dogImage.src = imageUrl;
        // Set the alt text for the image
         dogImage.alt = `Random ${selectedBreed} Dog`;

        // Add the image to the gallery item
        galleryItem.appendChild(dogImage);

        // Add the gallery item to the gallery
        gallery.appendChild(galleryItem);
      }


  });
});
