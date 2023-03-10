const fs = require('fs');
const cart = require('./cart'); // Если файл модуля находится в текущей дериктории то указываем "./"

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};

let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        } else {
            let newCart = actions[action](JSON.parse(data), req); // Создадим отдельный модуль cart, в котором будут методы (add,remove..) и передаем даные которые нам приходят и req потому что в нем есть необходимая инфрмация от товара.
            fs.writeFile(file, newCart, (err) => {
                if(err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 0}');
                }
            });
        }
    });
};

module.exports = handler;