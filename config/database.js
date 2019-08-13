const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jogos', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('autoIndex', false);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Servidor conectado ao Mongodb')
});
db.on('error', (err) => {
    console.log(err)
});
db.on('disconnected', () => {  
  console.log('Mongoose conexao desconectada'); 
});

module.exports = mongoose;