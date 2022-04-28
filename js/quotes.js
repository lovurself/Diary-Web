const url = 'https://api.adviceslip.com/advice';

fetch(url)
.then(response => response.json())
.then(quote => {
    const quotes = document.querySelector('.quotes');

    quotes.innerText = `" ${quote.slip.advice} "`;
});

const quoteBgArr = [
    "#FFF56D",
    "#9FB4FF",
    "#99FFCD",
    "#FFD36E",
    "#FFA8A8"
];

const quoteBox = document.querySelector('.quote_box');
quoteBox.style.backgroundColor = quoteBgArr[Math.floor(Math.random() * quoteBgArr.length)];
