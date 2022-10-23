
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1,
        offset = 0;

    function removeNotNums(string){
        return +string.replace(/\D/g, '');
    }

    slidesField.style.width = 100 * slides.length + '%';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        if (i == 0){
            dot.classList.add('active');
            console.log(i)
        }
        dot.setAttribute('data-slider-nav', i + 1)

        indicators.append(dot);
        dots.push(dot);
    }


    if (slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`
    }else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    next.addEventListener('click', () => {
        if (offset == removeNotNums(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        }else {
            offset += removeNotNums(width);
            slideIndex++;
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex < 10){
            current.textContent = `0${slideIndex}`
        }else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex-1].classList.add('active');
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = removeNotNums(width) * (slides.length - 1);
            slideIndex = slides.length;
        }else {
            offset -= removeNotNums(width);
            slideIndex--;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex < 10){
            current.textContent = `0${slideIndex}`
        }else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex-1].classList.add('active');
    })


    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            dots.forEach(dot => dot.classList.remove('active'));
            dot.classList.add('active');
            slideIndex = dot.getAttribute('data-slider-nav');

            offset = removeNotNums(width) * (slideIndex - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex < 10){
                current.textContent = `0${slideIndex}`
            }else {
                current.textContent = slideIndex;
            }
        })
    });
}


export default slider;