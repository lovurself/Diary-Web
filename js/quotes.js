const url = 'https://api.adviceslip.com/advice';

fetch(url)
.then(response => response.json())
.then(quote => {
    const quotes = document.querySelector('.quotes');

    quotes.innerText = `" ${quote.slip.advice} "`;
});