const mongoose  = require('mongoose');

mongoose.connect('mongodb://root:123senha@ds123312.mlab.com:23312/jogos', { useNewUrlParser: true });
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