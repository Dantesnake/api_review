const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'ruta protegida de prueba',
            user: req.user
        }
    })
})

module.exports = router
