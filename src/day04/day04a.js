import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function checkBoard(board) {
    for (let y = 0; y < 5; y++) {
        let count = 0;
        for (let x = 0; x < 5; x++) {
            if (board[x][y] === '*') {
                count++;
            }
        }
        if (count === 5) {
            return true;
        }
    }

    for (let x = 0; x < 5; x++) {
        let count = 0;
        for (let y = 0; y < 5; y++) {
            if (board[x][y] === '*') {
                count++;
            }
        }
        if (count === 5) {
            return true;
        }
    }

    return false;
}

function main() {
    const inputLines = util.loadInput(input);

    const called = inputLines.shift();
    const boards001 = _.chunk(inputLines, 5);

    const randomNumbers = _.split(called, ',');
    let boards = _.map(boards001, (board) => {
        return _.map(board, (line) => {
            return _.compact(_.split(line, ' '));
        });
    });

    let winner = null;
    let lastNum = null;
    turn:
    for (let i = 0; i < randomNumbers.length; i++) {
        const call = randomNumbers[i];

        console.log('call', call);

        boards = _.map(boards, (board) => {
            return _.map(board, (line) => {
                return _.map(line, (num) => {
                    if (num === call) {
                        return '*';
                    } else {
                        return num;
                    }
                });
            });
        });

        for (let c = 0; c < boards.length; c++) {
            const board = boards[c];
            if (checkBoard(board)) {
                winner = board;
                lastNum = call;
                break turn;
            }
        }
    }

    console.log('winner', winner, lastNum);

    const score = _.reduce(winner, (acc, line) => {
        return acc + _.reduce(line, (acc2, num) => {
            if (num !== '*') {
                acc2 += _.parseInt(num);
            }
            return acc2
        }, 0);
    }, 0);

    console.log('score', score);
    console.log('lastNum', lastNum);
    console.log('FINAL SCORE', score * _.parseInt(lastNum));
}

main();
