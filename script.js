const navbar = document.querySelector('.navbars')
navbar.addEventListener('click', () => {
  navbar.classList.toggle('active');
})
const darkbtn = document.getElementById('darkbtn');
const body = document.body;
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
if (isDarkMode) {
  body.classList.add('dark-mode');
  darkbtn.checked = true;
}
darkbtn.addEventListener('change', () => {
  if (darkbtn.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
});
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) { myIndex = 1 }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 2000);
}
document.querySelectorAll('.highlight-item img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.filter = 'brightness(80%)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.filter = 'brightness(100%)';
  });
});
const api = "qPiVCsYSKYenqWMGsKrUoLDS0kNsQaZhd15naG5xGzIDm3hkU3dsxsVi"
const gallery = document.getElementById('image-gallery');
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlay-img');

const fetchImages = async (name) => {
  const url = `https://api.pexels.com/v1/search?query=${name}&per_page=40`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': api,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.photos; // Returns the photos array
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return []; 
  }
};

const displayImages = (photos) => {
  gallery.innerHTML = ''; // Clear previous images

  photos.forEach(photo => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-item');

    const img = document.createElement('img');
    img.src = photo.src.medium; 
    img.alt = photo.alt || 'Image'; 
    img.onclick = () => {
      overlay.style.display = 'flex';
      overlayImg.src = photo.src.original; 
    };

    imageContainer.appendChild(img);
    gallery.appendChild(imageContainer);
  });
};

overlay.onclick = () => {
  overlay.style.display = 'none';
};

const changeCategory = async (category) => {
  const photos = await fetchImages(category);
  if (photos.length > 0) {
    displayImages(photos);
  } else {
    console.log('No photos found.');
  }
};

// Initial load
changeCategory('nature');
