const API_KEY = '2a28d16895815235bd4b496d7035c0d6';

const onGeoSuccess = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const city = document.querySelector('.city');
            const weather = document.querySelector('.weather');
            const temp = document.querySelector('.temp');
            city.innerText = data.name;
            weather.innerText = data.weather[0].main;
            temp.innerText = `${parseInt(data.main.temp)}도`

            // 날씨 아이콘
            const icons = document.querySelectorAll('[data-icon]');
            icons.forEach (icon => {
                const iconName = icon.dataset.icon;

                if (iconName === data.weather[0].main) {
                    icon.classList.remove('hidden');
                }
            })
        });
}

const onGeoError = () => {
    alert("당신의 위치를 찾지 못했어요. 위치에 대한 정보를 동의하시겠어요?");
}

// 사용자 위치 추적
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);