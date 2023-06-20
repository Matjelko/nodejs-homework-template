const app = require('./app')

const mongoose = require('mongoose');

require('dotenv').config();

const uriDb = process.env.DB_HOST

// const connection = mongoose.connect(uriDb, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const connectionFunction = async () => {
  try{
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch(error) {
    console.log("Database connection error", error.meesage);
  }
}

app.listen(3000, function() {
  console.log("Server running. Use our API on port: 3000")
  console.log("Database connection successful")
})

connectionFunction()