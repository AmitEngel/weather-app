const builder = objBuilder();

const submitBtn = document.getElementById('submit');
const $city = document.getElementById('city');
const $units = document.getElementById('units');
const presrntation = document.querySelector('.weather-container');

const CACHE = {};
const CACHE_REFRESH = 7;
function cityClimate(data) {
    for (let prop in data) {
        this[prop] = data[prop];
    }
    this.fetchTimestamp = new Date();
}

function getInfo(e) {
    e.preventDefault();
    if (CACHE[$city.value] && (new Date - CACHE[$city.value].fetchTimestamp) / 1000 < CACHE_REFRESH) {
        return CACHE[$city.value];
    } else {
        builder.init(API_KEY);
        builder.chooseCity($city.value);
        builder.chooseUnits($units.value);
        renderCity();
    }
}

function renderCity() {
    fetch(builder.finish()).then(data => data.json()).then(info => {
        presrntation.innerHTML=
        `
        <div class="card mt-4" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${'City: ' + info.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${'Temp: ' + info.main.temp}</h6>
    <p class="card-text">${'feels like ' + info.main.feels_like}</p>
    <a href="#" class="card-link">Card link</a>
  </div>
</div>
        `;
        console.log('City: ' + info.name);
        console.log('Temp: ' + info.main.temp);
        console.log('feels like ' + info.main.feels_like);
        CACHE[$city.value] = new cityClimate(info);
    });
}

submitBtn.addEventListener('click', getInfo);

