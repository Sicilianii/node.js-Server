const fs = require('fs');
const express = require('express'); // Подключаем модуль express...
const router = express.Router();
const handler = require('./handler');  // Модуль с методами 

router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data)=> {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        } else {
            res.send(data);
        }
    });
});

// '/' - в роутерах корневой пакой является сам роутер.

router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
}); 

router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', 'server/db/userCart.json');
}); 