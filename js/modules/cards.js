import {getResource} from '../services/services';

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
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `
            this.parent.append(element)
        }
    }



    getResource(' http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, description, price}) => { // Используем деструктуризацию, разделяем объект на переменные и присваиваем их сюда
                new Card(img, altimg, title, description, price, '.menu .container').render();
            })
        })

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, description, price}) => { // Используем деструктуризацию, разделяем объект на переменные и присваиваем их сюда
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
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>
    //         `
    //
    //         document.querySelector('.menu .container').append(element);
    //     })
    // }
}

export default cards;