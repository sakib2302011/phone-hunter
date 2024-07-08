// get request to the server api
const getData = async (searchText) => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    if (data.data.length === 0) {
      noResult();
    } else {
      displayData(data.data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    noResult(); // Handle any error by displaying no result message
  }
}

const noResult = () => {
  const errorBox = document.getElementById('error-box');
  errorBox.innerHTML = '';
  const notFoundDiv = document.createElement('div');
  notFoundDiv.innerHTML = `
      <h1>No similar result found.</h1>
  `;
  errorBox.appendChild(notFoundDiv);
}

// display response from api
const displayData = (phones) => {
  const phoneContainer = document.getElementById('phones-container');
  phoneContainer.innerHTML = '';
  const errorBox = document.getElementById('error-box');
  errorBox.innerHTML = '';
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
      <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpninner(false);
}

document.getElementById('search-btn').addEventListener('click', function() {
  toggleSpninner(true);
  const searchText = document.getElementById('search-text').value;
  getData(searchText);
});

const toggleSpninner = isLoading => {
  const loader = document.getElementById('spinner');
  if(isLoading){
    loader.classList.remove('d-none');
  }
  else{
    loader.classList.add('d-none');
  }
}
