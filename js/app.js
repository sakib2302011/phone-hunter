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
    // console.log(phone);
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
      <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
          <!-- Button trigger modal -->
          <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
           See details
          </button>
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


/*  ------------------- Phone details --------------- */
const loadPhoneDetails = async id => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = data => {
  console.log(data);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = data.name ;

  const sensors = data.mainFeatures.sensors.map(sensor => sensor).join(', ');

  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <h5><b>Release:</b> ${data.
      releaseDate ? data.releaseDate : 'Upcoming'} </h5>
    <h6><b>Chipset:</b> ${data.mainFeatures.chipSet} </h6>
    <h6><b>Memory:</b> ${data.mainFeatures.memory} </h6>
    <h6><b>Storage:</b> ${data.mainFeatures.storage
    } </h6>
    <h6><b>Display Size:</b> ${data.mainFeatures.displaySize} </h6>
    <h6><b>Bluetooth:</b> ${data.others.Bluetooth ? data.others.Bluetooth : ''} </h6>
    <h6><b>GPS:</b> ${data.others.GPS ? data.others.GPS : ''} </h6>
    <h6><b>NFC:</b> ${data.others.NFC ? data.others.NFC : ''} </h6>
    <h6><b>Radio:</b> ${data.others.Radio ? data.others.Radio : ''} </h6>
    <h6><b>USB:</b> ${data.others.USB ? data.others.USB : ''} </h6>
    <h6><b>WLAN:</b> ${data.others.WLAN ? data.others.WLAN : ''} </h6>

  `
}