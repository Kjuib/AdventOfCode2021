import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

const state = {
    diceCount: 0,
    diceRoll: 0,
    nextPlayer: ''
};
function rollDice() {
    state.diceCount++;
    state.diceRoll++;
    if (state.diceRoll > 100) {
        state.diceRoll = 1;
    }

    return state.diceRoll;
}

function nextPlayer() {
    state.nextPlayer = (state.nextPlayer !== 'player1' ? 'player1' : 'player2');
    return state.nextPlayer;
}

function main() {
    console.time();
    const [ player1Start, player2Start ] = util.loadInput(input);

    const players = {
        'player1': {
            label: 'player1',
            location: _.parseInt(player1Start.split(' ')[4]),
            score: 0
        },
        'player2': {
            label: 'player2',
            location: _.parseInt(player2Start.split(' ')[4]),
            score: 0
        }
    };

    while (players['player1'].score < 1000 && players['player2'].score < 1000) {
        const player = players[nextPlayer()];
        const roll = rollDice() + rollDice() + rollDice();

        player.location += roll;
        player.location %= 10;
        if (player.location === 0) {
            player.location = 10;
        }
        player.score += player.location;
    }


    console.log('RESULT', _.min(_.map(players, 'score')) * state.diceCount);

    console.timeEnd();
}

main();
