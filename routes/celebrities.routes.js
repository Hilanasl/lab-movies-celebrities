// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("./../models/Celebrity.model")

// all your routes here
router.get('/celebrities', (req, res, next) => {
    CelebrityModel.find()
        .then((data) => {
            res.render('celebrities/celebrities', {
                celebrities: data
            })
        })
        .catch((e) => console.error(e));
})

router.get('/celebrities/create', async (req, res, next) => {
    try {
        res.render('celebrities/new-celebrity')
    } catch (err) {
        next(err);
    }
})

router.post('/celebrities/create', async (req, res, next) => {
    try {
        console.log(req.body);
        await CelebrityModel.create(req.body);
        res.redirect("/celebrities")
    } catch (err) {
        next(err);
    }
})

router.get("/celebrities/delete/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        const deletedCelebrity = await CelebrityModel.findByIdAndRemove(id);
        console.log(deletedCelebrity);
        res.redirect("/celebrities");
    } catch (e) {
        next(e);
    }
});
module.exports = router;