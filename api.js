var express =  require('express');
var router = express.Router();
const urls = require('./urls')

router.use('/urls', urls);

router.get('/', (req, res) => {
    res.send('Hello World!');
})

module.exports = router;