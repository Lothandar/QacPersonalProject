const express = require('express');

const cors = require('cors');
const playerRouter = require('./routes/player-routes');
const ChampionRouter = require('./routes/champion-routes');
const SevenBalledRouter = require('./routes/sevenBalled-routes');
const matchesRouter = require('./routes/matches-routes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/player', playerRouter);
app.use('/champ', ChampionRouter);
app.use('/7ball', SevenBalledRouter);
app.use('/match', matchesRouter);




app.listen(8080, () => {
    console.log('server running on port 8080')
});