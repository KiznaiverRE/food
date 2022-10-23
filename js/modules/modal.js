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



    function showModalByScroll(){ // Вызов модалки, когда долистываем до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); // чтобы окно не всплывало каждый раз, надо обработчик после первого раза снять, {once: true} не подходит, т.к. будет отменять после первой регистрации скролла


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



export default modal;

export {closeModal, openModal};