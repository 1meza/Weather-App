const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    const { cityDetails, weather } = data;
    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;${weather.Temperature.Imperial.Unit}</span>
            /
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;${weather.Temperature.Metric.Unit}</span>
        </div>
        `;
    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let result = weather.IsDayTime ? 'img/day-sky.svg' : 'img/night-sky.svg'; 
    
    time.setAttribute('src', result);

    // remove d-none
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // local storage
    localStorage.setItem('city', city);
});

localStorage.getItem('city') && forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));

