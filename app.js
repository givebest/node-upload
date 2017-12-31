let express = require('express')
let multer = require('multer')


let app = express()
app.use(express.static(__dirname));

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

let upload = multer({storage: storage});
// let upload = multer({ dest: 'upload/' })

app.post('/upload', function (req, res, next) {
  upload.single('file')(req, res, function (err) {

    res.send('Got a POST request');
    if (err) {
      console.log('error', err);
      return;
    }

    console.log(req.file);
    res.send(JSON.stringify(req.file));
  });
});


app.set('port', process.env.PORT || 9009);

app.listen(app.get('port'), function () {
  console.log('http://localhost:' + app.get('port'));
});
