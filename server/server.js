require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./api/user/model/index')
const Role = db.role

// Configuration de la bdd

mongoose.set('useCreateIndex', true)
mongoose
        .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: false,  })
        .then(() => {
            console.log('Connectée a la db')
        })
        .catch(err => {
            console.log('error :', { database_error: err})
            process.exit()
        })

// Cors
app.use(cors({
    origin: process.env.URL
}))

// Body Parser
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(morgan('dev'))

app.get('/', (req, res) => {
    console.log('hello')
})

const userRoutes = require("./api/user/route/user"); //bring in our user routes
app.use("/user", userRoutes);


app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

  initial()