# Node.js upload
----

## Express + Multer

`Node.js` 上传文件 demo，基于 [Express](https://github.com/expressjs/express) 和 [Multer](https://github.com/expressjs/multer) 。

### app.js

```js
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

app.post('/upload', function (req, res, next) {
  upload.single('file')(req, res, function (err) {
    if (err) {
      console.log('error', err);
      return;
    }

    res.send(JSON.stringify(req.file));
    console.log(req.file);
  });
});


app.set('port', process.env.PORT || 9009);

app.listen(app.get('port'), function () {
  console.log('http://localhost:' + app.get('port'));
});
```

### index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="renderer" content="webkit">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <title>Node.js upload</title>
  <meta name="description" content="">
</head>

<body>
  <form id="upload" method="POST" action="/upload" enctype="multipart/form-data">
    <p>
      <label for="file">File:</label>
      <input type="file" name="file" required/>
    </p>
    <p>
      <input type="submit" name="submit" value="Submit" />
    </p>
  </form>

  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
  <script>
    $(function () {
      $('#upload').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
          type: 'POST',
          url: '/upload',
          data: formData,
          contentType: false,
          processData: false
        }).done(function () {
          alert('Done');
          console.log('done');
        }).fail(function (err) {
          console.log(err);
        })
      });
    });
  </script>
</body>
</html>
```
## License

[MIT] © 2017 [givebest](https://github.com/givebest)



