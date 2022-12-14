function timer(id, deadline) {
    // const deadLine = '2022-12-20'; // Строка, т.к. можно сюда пихать из инпута потом

    function getTimeRemaining(endtime){

        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // Можно во втором случае не писать опять parse, т.к. при мат. операциях дата сама первратиться в милисекунды

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else {
            //Превращаем разницу в часы, минуты, секунды. Округляем и разницей от деления получаем хвосты
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor(t / 1000  % 60);
        }



        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days =  timer.querySelector('#days'),
            hours =  timer.querySelector('#hours'),
            minutes =  timer.querySelector('#minutes'),
            seconds =  timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock(); // Вызываем здесь, чтоб не ждать первый интервал, функция просто забьёт значения в вёрстку

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}


export default timer;