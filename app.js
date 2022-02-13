const builder = objBuilder();

const submitBtn = document.getElementById('submit');
const $city = document.getElementById('city');
const $units = document.getElementById('units');

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
        console.log('City: ' + info.name);
        console.log('Temp: ' + info.main.temp);
        console.log('feels like ' + info.main.feels_like);
        CACHE[$city.value] = new cityClimate(info);
    });
}

submitBtn.addEventListener('click', getInfo);

