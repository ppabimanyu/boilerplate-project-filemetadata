const express = require('express')
const cors = require('cors')
const fs = require('fs/promises')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (request, response) => {
  const file = request.file
  const absolutePath = path.join(__dirname, file.path)
  const metadata = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  }

  await fs.unlink(absolutePath)
  response.json(metadata)
})


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
