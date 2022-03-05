const { Router } = require('express'),
    router = Router()

router.use('/player', require('./player.route'))
router.use('/team', require('./team.route'))
router.use('/user', require('./user.route'))
router.use('/match', require('./match.route'))


module.exports = router