// get request to the server api
const getData = async (searchText, setLimit) => {
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
      displayData(data.data, setLimit);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    noResult(); // Handle any error by displaying no result message
  }
}

// display response from api
const displayData = (phones, setLimit) => {
  const phoneContainer = document.getElementById('phones-container');
  phoneContainer.innerHTML = '';
  const errorBox = document.getElementById('error-box');
  errorBox.innerHTML = '';
  const showAll = document.getElementById('show-all-container');
  if(setLimit && phones.length > 9){
    phones = phones.slice(0, 9);
    showAll.classList.remove('d-none');
  }
  else{
    showAll.classList.add('d-none');
  }
  
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

const noResult = () => {
  const phoneContainer = document.getElementById('phones-container');
  phoneContainer.innerHTML = '';
  const errorBox = document.getElementById('error-box');
  errorBox.innerHTML = '';
  const notFoundDiv = document.createElement('div');
  notFoundDiv.innerHTML = `
      <h1>No similar result found.</h1>
  `;
  errorBox.appendChild(notFoundDiv);
  toggleSpninner(false);
  const showAll = document.getElementById('show-all-container');
  showAll.classList.add('d-none');
}


document.getElementById('search-btn').addEventListener('click', function() {
  processSearch(9);
});
document.getElementById('search-text').addEventListener('keydown', function(event){
  // console.log(event.key);
  if( event.key === 'Enter'){
    processSearch(9);
  }
})

const toggleSpninner = isLoading => {
  const loader = document.getElementById('spinner');
  if(isLoading){
    loader.classList.remove('d-none');
  }
  else{
    loader.classList.add('d-none');
  }
}

document.getElementById('show-all').addEventListener('click', function(){
  processSearch();
})

const processSearch = setLimit => {
  toggleSpninner(true);
  const searchText = document.getElementById('search-text').value;
  getData(searchText, setLimit);
}