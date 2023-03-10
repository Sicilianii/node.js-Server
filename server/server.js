// Перед стартом проекта, запустить терминал: npm init --yes //
// Сервер использует Express: npm i express //

const fs = require('fs');
const express = require('express'); // Подключаем модуль express...
const app = express();
const cart = require('./cartRouter');  // ПОдключаем роутер

// app.get(); - Получаем инфорацию с сервера(запрос корзины)
// app.post(); - Отправляем на сервер обьект(добавляем товар в корзину)
// app.put(); - Редактируем обьект на сервере(уменьшаем или увеличиваем количества)
// app.delete(); - удаляем обьект

/* ============ REST API ============ */

const port = process.env.PORT || 3000 // значение окружения, для определения порта.
// Назначить новое значение порта через npm: set PORT=5000 ...

app.listen(port, () => console.log(`Listen port ${port}`));

app.use(express.json()); // use - это посредник, который подсказывает серверу, какие данные и в каком формате приходят на сервер. json() - преобразует поступающие файлы в формат json.

app.use('/', express.static('Copm')); // статичные файлы проекта

app.use('/api/cart', cart);  // Всегда когда на сервере обращаются к /api/cart, используй роутер cart.

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data)=> {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        } else {
            res.send(data);
        }
    });
});


// ЗАПУСТИТЬ СЕРВЕР: node server/server.js ...
