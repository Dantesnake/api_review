const router = require('express').Router();
const Review = require('../models/Review');

router.post('/add', async(req, res) => {
    const review = new Review({
        username: req.body.username,
        videojuego: req.body.videojuego,
        review: req.body.review
    });

    try {
        const savedReview = await review.save();
        res.json({
            error: null,
            data: savedReview,
            user: req.user
        })
    } catch (error) {
        res.status(400).json({error})
    }
})
router.post('/findAll', async(req, res) => {
    try {
        const allReviews = await Review.find({});
        res.json({
            error: null,
            data: allReviews
        })
    } catch (error) {
        res.status(400).json({error})
    }

})

router.get('/findOneUser', async(req, res) => {
    try {
        const findOneReviews = await Review.find({"username":req.body.username});
        res.json({
            error: null,
            data: findOneReviews
        })
    } catch (error) {
        res.status(400).json({error})
    }

})

router.delete('/deleteReview/:id', async(req, res) => {
    const id = req.params.id
    try {
        const deleteReview = await Review.findOneAndDelete({ _id: id });
        res.json({
            error: null,
            data: deleteReview
        })
    } catch (error) {
        res.status(400).json({error})
    }
})
router.put('/update', async(req, res) => {
    try {
        const updateReview =  await Review.findOneAndUpdate(req.body);
        res.json({
            error: null,
            data: updateReview
        })
    } catch (error) {
        res.status(400).json({error})
    }

})

module.exports = router
