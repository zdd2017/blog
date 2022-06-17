const BaseController = require('../controllers/base');
const ValidatorController = require('../controllers/validator');

module.exports = function(app) {
    app.use(BaseController);
    app.use(ValidatorController);
};