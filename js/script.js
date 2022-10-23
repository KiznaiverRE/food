'use strict'

import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import currency from './modules/currency';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal',modalTimerId), 4000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    currency();
    forms('form', modalTimerId);
    calc();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2023-2-1');

});


