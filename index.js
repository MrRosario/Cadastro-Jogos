const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const jogoRouter = require('./routes/jogos-routes');
const porta      = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.use(jogoRouter);

app.listen(porta, () => {
    console.log(`Servidor Rodando na porta ${porta}`);
});