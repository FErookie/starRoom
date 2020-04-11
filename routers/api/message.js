const mes = require('../../controller/message');
module.exports = (router) => {
    router.post('/query', mes.queryMessage);
};
