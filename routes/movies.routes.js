// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { render } = require("express/lib/response");
const MovieModel = require("./../models/movie.model");
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here
router.get('/movies', (req, res, next) => {
    MovieModel.find()
        .then((data) => {
            res.render('movies/movies', {
                movies: data
            })
        })
        .catch((e) => console.error(e));
})

router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await CelebrityModel.find();
        res.render('movies/new-movies', {
            celebrities
        })
    } catch (err) {
        next(err);
    }
});

router.post('/movies/create', async (req, res, next) => {
    try {
        console.log("this is req.body -----", req.body);
        await MovieModel.create(req.body);
        res.redirect("/movies")
    } catch (err) {
        next(err);
    }
})

router.get('/movies/:id', async (req, res, next) => {
    try {
        await MovieModel.findById(req.params.id).populate('cast')
        res.render('movies/movie-details')
    } catch (err) {
        next(err);
    }
})

router.get('/movies/:id/edit', async (req, res, next) => {
    try {
        CelebrityModel.find();
        await MovieModel.findById(req.params.id).populate("cast")
        res.render('/movies/edit-movie')
    } catch (err) {
        next(err);
    }
})

router.post('/movies/:id/edit', async (req, res, next) => {
    try {
        await MovieModel.findByIdAndUpdate(req.params.id, req.body)
            .populate("cast")
        res.redirect('/movies')
    } catch (err) {
        next(err);
    }
})

router.get("/movies/delete/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        const deletedMovies= await MovieModel.findByIdAndRemove(id);
        res.redirect("/movies");
    } catch (e) {
        next(e);
    }
});

module.exports = router;