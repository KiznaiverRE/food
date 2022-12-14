/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function calcTotal(){
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = '___';
            result.classList.remove()
            return;
        }

        if (sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }


    calcTotal();

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function getStaticInfo(selector, activeClass){
        const elements = document.querySelectorAll(`${selector}`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                    e.target.classList.add(activeClass);
                });

                calcTotal();
            })
        })

    }


    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfo(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {



            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
                input.value = removeNotNums(input.value);
            }else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class Card {
        constructor(img, alt, subtitle, text, price, parentSelector, ...classses) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.text = text;
            this.price = price;
            this.classes = classses;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = +this.price * +this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if (this.classes.length === 0){
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            }else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
                    <img src=${this.img} alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                    </div>
            `
            this.parent.append(element)
        }
    }



    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)(' http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, description, price}) => { // ???????????????????? ????????????????????????????????, ?????????????????? ???????????? ???? ???????????????????? ?? ?????????????????????? ???? ????????
                new Card(img, altimg, title, description, price, '.menu .container').render();
            })
        })

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, description, price}) => { // ???????????????????? ????????????????????????????????, ?????????????????? ???????????? ???? ???????????????????? ?? ?????????????????????? ???? ????????
    //             new Card(img, altimg, title, description, price, '.menu .container').render();
    //         })
    //     })






    // getResource(' http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data){
    //     data.forEach(({img, altimg, title, description, price}) => {
    //         const element = document.createElement('div');
    //
    //         element.classList.add('menu__item');
    //
    //         element.innerHTML = `
    //                 <img src=${img} alt="${altimg}">
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${description}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">????????:</div>
    //                     <div class="menu__item-total"><span>${price}</span> ??????/????????</div>
    //                 </div>
    //         `
    //
    //         document.querySelector('.menu .container').append(element);
    //     })
    // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/currency.js":
/*!********************************!*\
  !*** ./js/modules/currency.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function currency() {
    const inputRub = document.querySelector('#rub'),
        inputUsd = document.querySelector('#usd');


    inputRub.addEventListener('input', () => {
        const request = new XMLHttpRequest();

        request.open('GET', 'js/current.json')
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send();

        request.addEventListener('load', () => {
            if (request.status === 200){ // ???????????????? ????????????, ?????? ???????????? ?????????????? ????????????????
                console.log(request.response)
                const data = JSON.parse(request.response);
                inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // ?????????????????? ???? ???????? ????????????
            }else {
                inputUsd.value = '??????-???? ?????????? ???? ??????. ???????????????????? ??????????'
            }
        })
    })
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (currency);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: '?????????? ?????????????? ????????????????????',
        failure: '??????-???? ?????????? ???? ??????...'
    }

    forms.forEach(item => {
        bindPostData(item)
    })



    function bindPostData(form){ // ???????????????? ???? ???????????????? ????????????????
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            // statusMessage.src = message.loading;
            statusMessage.setAttribute('src', message.loading);
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentHTML('afterend', statusMessage);
            //
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            //
            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8')

            const formData = new FormData(form);

            // const obj = {}
            // formData.forEach(function (value, key ){
            //     obj[key] = value;
            // })


            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json; charset=utf-8'
            //     },
            //     body: JSON.stringify(obj)
            // })
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                // .then(data => data.text())
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })

            // request.addEventListener('load', () => {
            //     if (request.status === 200){
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset(); // ?????????? ?????? ?????????????? ??????????, ?????? ?????????? ?????????? ???????????? ???? ??????????, ?????????????????? ?? ????????????????
            //         statusMessage.remove();
            //     }else {
            //         showThanksModal(message.failure);
            //     }
            // })
        })
    }


    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
                <div data-close="" class="modal__close">??</div>
                <div class="modal__title">${message}</div>
        </div>
        `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000)
    }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalBtn = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalBtn.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId))
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.classList.contains('modal__close')){
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });



    function showModalByScroll(){ // ?????????? ??????????????, ?????????? ?????????????????????? ???? ??????????
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); // ?????????? ???????? ???? ?????????????????? ???????????? ??????, ???????? ???????????????????? ?????????? ?????????????? ???????? ??????????, {once: true} ???? ????????????????, ??.??. ?????????? ???????????????? ?????????? ???????????? ?????????????????????? ??????????????


// const btn = document.querySelector('.header__link');
// btn.addEventListener('click',  (e) => {
//     console.log(e.target);
//     e.target.style.background = 'red';
// });
//
// const obj = {
//     num: 5,
//     sayNumber: function () {
//         const say = () => {
//             console.log(this);
//         };
//
//         say();
//     }
// }
//
// obj.sayNumber();
//
//
// const double = a => a * 2;
//
// console.log(double(4))
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);


    function HideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    HideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item,i) => {
                if (target == item){
                    HideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // const deadLine = '2022-12-20'; // ????????????, ??.??. ?????????? ???????? ???????????? ???? ???????????? ??????????

    function getTimeRemaining(endtime){

        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // ?????????? ???? ???????????? ???????????? ???? ???????????? ?????????? parse, ??.??. ?????? ??????. ?????????????????? ???????? ???????? ???????????????????????? ?? ??????????????????????

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else {
            //???????????????????? ?????????????? ?? ????????, ????????????, ??????????????. ?????????????????? ?? ???????????????? ???? ?????????????? ???????????????? ????????????
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
        updateClock(); // ???????????????? ??????????, ???????? ???? ?????????? ???????????? ????????????????, ?????????????? ???????????? ???????????? ???????????????? ?? ??????????????

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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url,data) => { // ?????????????? ???????? Function Expresssion. ?????????? ???????????????? ???????????? ???? ???????????????? ???????????? ???? ????????????
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=utf-8' //???????? ?????? ???????????????? ??????????????, ?????? ???????????????? ?????? ?? ?????????????? JSON, ?? ?????????????? ?????????? ???????????????????? ??????????????????, ???????????????? ???? ??????????????????
        },
        body: data
    }); // ???????????? ???????????? ?? ?????? ???? ?????????? ????????????????????????, ???????????? ???????????????? ????????????, ?????????????? ???????????????????????? ???? fetch

    return await res.json(); // ?????? ???????????????????????? ????????????, ?????????? ???????? ????????????, ???????? ??????????????????
}

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`) // ???????????? ???????????????? ?????????? ????????????, ???????? ????????????????????????, ???????????????????? ???????????????? throw
    }

    return await res.json(); // ?????? ?????????????????? ???? ?????????????? JSON
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_currency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/currency */ "./js/modules/currency.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


;









window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal',modalTimerId), 4000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_currency__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])('.timer', '2023-2-1');

});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map