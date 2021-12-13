import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function print(dots) {
    const maxX = _.max(_.map(dots, 'x'));
    const maxY = _.max(_.map(dots, 'y'));

    let str = '';
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            if (_.find(dots, { x: x, y: y })) {
                str += '#';
            } else {
                str += '.';
            }
            str += ' ';
        }
        str += '\n';
    }

    console.log(str);
}

function fold(dots, strFold) {
    const [ direction, strFoldValue ] = _.last(strFold.split(' ')).split('=');
    const foldValue = _.parseInt(strFoldValue);

    const newDots = _.map(dots, (dot) => {
        if (dot[direction] > foldValue) {
            const newDot = _.cloneDeep(dot);
            newDot[direction] = foldValue - (newDot[direction] - foldValue)
            return newDot;
        } else {
            return dot;
        }
    });

    const uniqueDots = _.uniqBy(newDots, JSON.stringify);

    return uniqueDots;
}

function main() {
    const inputLines = util.loadInput(input);

    const inputDots = _.filter(inputLines, (line) => {
        return !_.startsWith(line, 'fold');
    });
    const inputFolds = _.filter(inputLines, (line) => {
        return _.startsWith(line, 'fold');
    });

    let dots = _.map(inputDots, (dotStr) => {
        const [ strX, strY ] = dotStr.split(',');

        return {
            x: _.parseInt(strX),
            y: _.parseInt(strY)
        };
    });

    // print(dots);

    _.forEach(inputFolds, (strFold) => {
        dots = fold(dots, strFold);
        // print(dots);
    });

    console.log('====================================================================================================');
    print(dots);
}

main();
