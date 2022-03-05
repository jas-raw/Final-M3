const express = require('express'),
    router =  express.Router(),
    teamCtrl = require('../controller/team.controller')

router.get('/:_id', teamCtrl.findById)
router.get('/', teamCtrl.list)
router.post('/', teamCtrl.create)
router.put('/', teamCtrl.update)
router.delete('/:_id', teamCtrl.delete)

module.exports = router