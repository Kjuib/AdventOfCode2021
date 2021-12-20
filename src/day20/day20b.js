import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

let defaultValue = '.';
const directions = [
    { x: -1, y: -1 },
    { x:  0, y: -1 },
    { x:  1, y: -1 },
    { x: -1, y:  0 },
    { x:  0, y:  0 },
    { x:  1, y:  0 },
    { x: -1, y:  1 },
    { x:  0, y:  1 },
    { x:  1, y:  1 },
];

function getValue(char) {
    return char === '#' ? '1' : '0';
}

function processImage(imageList, key) {
    const newImageList = {};

    const xMin = _.min(_.map(imageList, 'x'));
    const xMax = _.max(_.map(imageList, 'x'));
    const yMin = _.min(_.map(imageList, 'y'));
    const yMax = _.max(_.map(imageList, 'y'));

    for (let yy = yMin - 1; yy <= yMax + 1; yy++) {
        for (let xx = xMin - 1; xx <= xMax + 1; xx++) {
            const binaryStr = _.reduce(directions, (acc, point) => {
                return acc + (_.get(imageList, `[${xx + point.x},${yy + point.y}].value`, getValue(defaultValue)));
            }, '');
            const binary = _.parseInt(binaryStr, 2);
            const newChar = key[binary];
            newImageList[`${xx},${yy}`] = {
                x: xx,
                y: yy,
                char: newChar,
                value: getValue(newChar)
            }
        }
    }

    return newImageList;
}

function main() {
    console.time();
    const [ key, ...imageRaw ] = util.loadInput(input);

    let imageList = _.reduce(imageRaw, (acc, line, indexY) => {
        _.forEach(_.split(line, ''), (char, indexX) => {
            acc[`${indexX},${indexY}`] = {
                x: indexX,
                y: indexY,
                char: char,
                value: getValue(char)
            };
        });

        return acc;
    }, {});

    // util.printGridList(imageList);

    for (let i = 0; i < 50; i++) {
        imageList = processImage(imageList, key);
        if (key[0] === '#') {
            defaultValue = (defaultValue === '.' ? '#' : '.');
        }
        // util.printGridList(imageList);
    }

    const counts = _.countBy(imageList, 'char');
    console.log('SCORE', counts['#']);

    console.timeEnd();
}

main();
