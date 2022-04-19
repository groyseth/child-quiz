const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://groyseth:groyseth@cluster0.89osj.mongodb.net/TestQuiz?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,    
});

module.exports = mongoose.connection;