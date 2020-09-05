const router = require('express').Router()

const TodoController = require('../controllers/TodoController.js')
const TodoRandomController = require('../controllers/TodoRandomController.js')
const AnimeController = require('../controllers/AnimeController.js')
const MusicController = require('../controllers/MusicController.js')
const MovieController = require('../controllers/MovieController.js')
const {authorization} = require('../middlewares/auth.js')

// router.get('/search', searchRouter)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.get('/myTodos', TodoController.getMyTodos)
router.get('/random', TodoRandomController.randomActivity)

router.get('/search/anime', AnimeController.searchAnimeByKeyword);
router.get('/search/music', MusicController.searchMusicByKeyword)
router.get('/search/movie', MovieController.searchMovieByKeyword)

router.post('/join/:id', TodoController.joinOtherUser)
router.get('/:id', TodoController.getTodo)
router.put('/:id', authorization, TodoController.updateTodo)

router.delete('/:id', authorization, TodoController.deleteTodo)


module.exports = router