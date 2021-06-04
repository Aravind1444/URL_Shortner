var express = require('express');
const { response } = require('express');
const { route } = require('./api');
const router = express.Router();
const shortid = require('shortid');
const { urls } =  require('./url_data');
router.use(express.json());


router.get('/', (req, res) => {
    const urlList = [];
    Object.keys(urls).forEach(urlId => {
        urlList.push({id: urlId, long_url: urls[urlId]})
    })
    res.send(urlList);
  });
 
router.post('/', (req, res) => {
    const long_url = req.body.long_url;
    const id = shortid.generate();
    urls[id] = long_url;
    res.status(201).send({id});
})

router.get('/:id', (req, res) => {
    const id = (req.params.id);
    const long_url = urls[id];
    if(long_url){
        res.send({
            id: id,
            long_url: long_url
        });
    }
    else{
        res.status(404).send(`error : Invalid URL id`);
    }
  });



module.exports = router;