let currentImageUrl = '';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function getDogImage() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      currentImageUrl = data.message;
      document.getElementById('dog-container').innerHTML = `
        <img src="${currentImageUrl}" width="300">
      `;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('dog-container').innerHTML = 'Failed to load image.';
    });
}

function addToFavorites() {
  if (currentImageUrl && !favorites.includes(currentImageUrl)) {
    favorites.push(currentImageUrl);
    saveFavorites();
    displayFavorites(favorites);
  }
}

function deleteFavorite(urlToDelete) {
  favorites = favorites.filter(url => url !== urlToDelete);
  saveFavorites();
  displayFavorites(favorites);
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function displayFavorites(list) {
  const container = document.getElementById('favorites-container');
  container.innerHTML = '';

  list.forEach(imgUrl => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    wrapper.style.margin = '10px';
    wrapper.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = imgUrl;
    img.width = 150;

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️ Delete';
    delBtn.style.display = 'block';
    delBtn.style.marginTop = '5px';
    delBtn.onclick = () => deleteFavorite(imgUrl);

    wrapper.appendChild(img);
    wrapper.appendChild(delBtn);
    container.appendChild(wrapper);
  });
}

function searchFavorites() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();

  const filtered = favorites.filter(url => {
    const parts = url.split('/');
    const breed = parts[parts.length - 2];
    return breed.toLowerCase().includes(keyword);
  });

  displayFavorites(filtered);
}

// Load favorites when page opens
window.onload = () => {
  displayFavorites(favorites);
};

// Add brad name display in getDogImage()
