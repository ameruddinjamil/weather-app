console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = search.value;

    message.textContent = 'Loading..';
    message2.textContent = '';

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = '';
                message2.textContent = data.error;
            } else {
                message.textContent = `Location: ${data.location}`;
                message2.textContent = `Temperature: ${data.temperature}`;
            }
        })
    });
});