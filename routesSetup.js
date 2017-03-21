/**
 * Created by Avalin on 16-11-2016.
 */
app.use(express.static('public'));

var router = express.Router();
router.get('/', function(){});
router.get('/frontpage', function(req, res)
{
    res.send('frontpage.html');
});
router.get('/kursus', function(req, res){});
router.get('/kurser/:id', function(req, res){});
router.get('/profile', function(req, res){});
router.get('/register', function(req, res){});
router.get('/login', function(req, res){});
router.get('/edit_profile', function(req, res){});
router.get('/kursus/:id/viewFeedback', function(req, res){});
router.get('/kursus/:id/sendFeedback', function(req, res){});
router.post('/kursus/:id/sendFeedback', function(req, res){});
router.post('/edit_profile', function(req, res){});
router.post('/login', function(req, res){});
router.post('/register', function(req, res){});
router.post('/kursus/:id/signup', function(req, res){});
router.post('/kursus/find/:name', function(req, res){});
router.post('/kursus/find', function(req, res){});
router.post('/kursus/find/:tags/:name/:lokation/:date', function(req, res){
    //Get... kurser med valgte tags
});
