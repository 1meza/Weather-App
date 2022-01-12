class Forecast {
    constructor() {
        this.key = 'APIKEYHERE';
        this.city = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weather = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city) {
            const cityDetails = await this.getCity(city);
            const weather = await this.getWeather(cityDetails.Key);
            return { cityDetails, weather };
    }
    async getCity(city) {
        const query = {
            apikey: this.key,
            q: city,
        };
        const response = await fetch(`${this.city}?${new URLSearchParams(query)}`);
        const data = await response.json();
        return data[0];
    }
    async getWeather(city) {
        const query = {
            apikey: this.key,
        };
        const response = await fetch(`${this.weather}${city}?${new URLSearchParams(query)}`);
        const data = await response.json();
        return data[0];
    }
}