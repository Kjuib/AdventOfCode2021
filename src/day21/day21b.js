import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

let sNextPlayer = '';
function nextPlayer() {
    sNextPlayer = (sNextPlayer !== 'p1' ? 'p1' : 'p2');
    return sNextPlayer;
}

const diceRolls = [
    { value: 3, count: 1 },
    { value: 4, count: 3 },
    { value: 5, count: 6 },
    { value: 6, count: 7 },
    { value: 7, count: 6 },
    { value: 8, count: 3 },
    { value: 9, count: 1 },
];

function main() {
    console.time();
    const [ player1Start, player2Start ] = util.loadInput(input);

    const winningScore = 21;
    const winners = {
        p1: 0,
        p2: 0
    };

    let stateList = new Map();
    stateList.set(`${player1Start},0,${player2Start},0`, {
        p1Location: _.parseInt(player1Start.split(' ')[4]),
        p1Score: 0,
        p2Location: _.parseInt(player2Start.split(' ')[4]),
        p2Score: 0,
        count: 1
    });

    let counter = 0;
    while (stateList.size > 0) {
        counter++;
        const player = nextPlayer();
        const newStateList = new Map();
        stateList.forEach((state) => {
            _.forEach(diceRolls, (roll) => {
                let location = state[`${player}Location`] + roll.value;
                location %= 10;
                if (location === 0) {
                    location = 10;
                }
                let score = state[`${player}Score`] + location;

                if (score >= winningScore) {
                    winners[player] += (state.count * roll.count);
                    return;
                }

                const newStateCheck = {
                    p1Location: state.p1Location,
                    p1Score: state.p1Score,
                    p2Location: state.p2Location,
                    p2Score: state.p2Score,
                };
                newStateCheck[`${player}Location`] = location;
                newStateCheck[`${player}Score`] = score;

                let foundState = newStateList.get(`${newStateCheck.p1Location},${newStateCheck.p1Score},${newStateCheck.p2Location},${newStateCheck.p2Score}`);
                if (foundState) {
                    foundState.count = foundState.count + (state.count * roll.count);
                } else {
                    newStateCheck.count = (state.count * roll.count);
                    newStateList.set(`${newStateCheck.p1Location},${newStateCheck.p1Score},${newStateCheck.p2Location},${newStateCheck.p2Score}`, newStateCheck);
                }
            });

            stateList = newStateList;
        });

        console.log('size', counter, stateList.length);
        console.log('winners', winners);
    }

    console.timeEnd();
}

main();
