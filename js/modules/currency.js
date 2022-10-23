function currency() {
    const inputRub = document.querySelector('#rub'),
        inputUsd = document.querySelector('#usd');


    inputRub.addEventListener('input', () => {
        const request = new XMLHttpRequest();

        request.open('GET', 'js/current.json')
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send();

        request.addEventListener('load', () => {
            if (request.status === 200){ // Проверка только, что запрос успешно завершён
                console.log(request.response)
                const data = JSON.parse(request.response);
                inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // Округляем до двух знаков
            }else {
                inputUsd.value = 'Что-то пошло не так. Попробуйте позже'
            }
        })
    })
}


export default currency;