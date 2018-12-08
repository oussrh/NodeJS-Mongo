const express = require("express");
const bodyParser  = require("body-parser");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json())

require("./routes/studentsRoot")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running`);
});
