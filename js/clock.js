const todayDate = document.querySelector('.today');
const time = document.querySelector('.time');

const showClock = () => {
    const todayClock = new Date();
    const year = todayClock.getFullYear();
    const month = todayClock.getMonth() + 1;
    const date = todayClock.getDate();
    const day = todayClock.getDay();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const hours = String(todayClock.getHours()).padStart(2, "0");
    const minutes = String(todayClock.getMinutes()).padStart(2, "0");
    const seconds = String(todayClock.getSeconds()).padStart(2, "0");
    time.innerText = `${hours} : ${minutes} : ${seconds}`;
    todayDate.innerText = `${year}년 ${month}월 ${date}일 ${week[day]}요일`
}


showClock();
setInterval(showClock, 1000);