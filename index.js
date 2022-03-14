const express = require('express');
const cors = require('cors');
const router = require("./routes/routes");
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const db = require('./helpers/db_connection');
const PORT = 8080;

app.use(express.json());

app.use(bodyParser.urlencoded( {extended: true} ))
// app.use(session({secret: "Shh, its a secret!"}))
app.use(cookieParser());
app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));
app.use(router);


app.all("*", (req, res) => {
    
   });



app.listen(PORT, () => console.log(`Server is alive on http://localhost:${PORT}`));
