const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: "https://samples.openweathermap.org/data/2.5/"
});

class WeatherClass {
    getLondonWeather() {
        return axiosInstance.get("weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02")
        .then((response) => {
            response.data.successful = false;
            if(response.status == 200) {
                response.data.successful = true;
            }
            return response.data;
        })
        .catch((error) => {
            console.log('Tohure Err => ' + error);
        })
    }
}

module.exports = {
    WeatherClass,
};