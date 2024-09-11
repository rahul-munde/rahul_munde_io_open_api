document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'https://api.artic.edu/api/v1/artworks';
  const imageBaseURL = 'https://www.artic.edu/iiif/2/';
  const artworksContainer = document.getElementById('artworks');

  async function fetchArtworks() {
      try {
          const response = await fetch(API_URL);
          const data = await response.json();
          const artworks = data.data.slice(0, 9); // Limiting to 9 artworks for simplicity

          artworks.forEach(artwork => {
              const artworkElement = createArtworkElement(artwork);
              artworksContainer.appendChild(artworkElement);
          });
      } catch (error) {
          console.error('Error fetching artworks:', error);
      }
  }

  function createArtworkElement(artwork) {
      const artworkDiv = document.createElement('div');
      artworkDiv.classList.add('artwork');

      const artworkImage = `${imageBaseURL}${artwork.image_id}/full/843,/0/default.jpg`;

      artworkDiv.innerHTML = `
          <img src="${artworkImage}" alt="${artwork.title}">
          <h2>${artwork.title}</h2>
          <p>Artist: ${artwork.artist_title || 'Unknown'}</p>
          <p>Date: ${artwork.date_display || 'Unknown'}</p>
      `;

      return artworkDiv;
  }

  fetchArtworks();
});
