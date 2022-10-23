const postData = async (url,data) => { // Функция типа Function Expresssion. Будет отвечать именно за отправку данных на сервер
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=utf-8' //пока тут статично указано, что передаём все в формате JSON, в будущем можем передавать аргументы, влияющие на заголовки
        },
        body: data
    }); // Делаем запрос и тут же будем обрабатывать, внутрь помещаем промис, который возвращается от fetch

    return await res.json(); // Это возвращается ПРОМИС, здесь тоже ставим, чтоб дожидался
}

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`) // Внутрь помещаем текст ошибки, чтоб использовать, используем оператор throw
    }

    return await res.json(); // Тут переводим из формата JSON
};

export {postData, getResource};