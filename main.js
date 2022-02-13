const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '6d7d10b2c7e8451741e63a6fbfaf6ddd';
const UNITS = {
    'Standard': 'standard',
    'Celsius': 'metric',
    'Fahrenheit': 'imperial'
}

function objBuilder() {
    let parameters = null;
    function init(apiKey) {
        parameters = {
            apiKey: apiKey
        }
    }
    function chooseCity(city) {
        parameters['q'] = city;
    }
    function chooseUnits(unit) {
        parameters['units'] = unit;
    }
    function finish() {
        const temp = parameters;
        parameters = null;
        const keyValues = Object.entries(temp);
        const keyaValuesStr = keyValues.map(kv => kv[0] + '=' + kv[1]);
        const urlStr = keyaValuesStr.join('&');
        return BASE_URL + urlStr;
    }
    return {
        init: init,
        chooseCity: chooseCity,
        chooseUnits: chooseUnits,
        finish: finish
    }
}

