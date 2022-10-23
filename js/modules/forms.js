import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Форма успешно отправлена',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item)
    })



    function bindPostData(form){ // Отвечает за привязку постинга
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
            postData('http://localhost:3000/requests', json)
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
            //         form.reset(); // Метод для очистки формы, ИЛИ можно взять инпуты из формы, перебрать и очистить
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
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>
        </div>
        `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000)
    }
}


export default forms;