const mongoose = require('mongoose');

const mongo_connect_config = {
//  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
mongoose.connect('mongodb://localhost/onetest',mongo_connect_config);
let db = mongoose.connection;

// Check DB connection
db.once('open', function(){
  console.log('App connected to MongoDB');
});

// Check for DB errors
db.on('error', function(){
  console.log(err);
})

module.eports = db

// FOR MongoDB Atlas:
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }
// module.exports = connectDB
