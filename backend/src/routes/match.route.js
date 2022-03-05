const express = require('express'),
    router =  express.Router(),
    matchCtrl = require('../controller/match.controller')

router.get('/:_id', matchCtrl.findById)
router.get('/', matchCtrl.list)
router.post('/', matchCtrl.create)
router.post('/best', matchCtrl.best)
router.post('/fans', matchCtrl.fans)
router.put('/', matchCtrl.update)
router.delete('/:_id', matchCtrl.delete)

module.exports = router