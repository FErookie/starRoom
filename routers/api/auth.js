const account = require('../../controller/auth');
module.exports = (router) => {
    router.post('/login', account.login);
    router.post('/register' , account.register);
};
