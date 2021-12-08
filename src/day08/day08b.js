import * as util from '../util.js';
import _ from 'lodash';

// const inputFile = 'input.test.txt';
const inputFile = 'input.txt';

function contains(numMap1, numMap2) {
    return _.intersection(numMap1.segments, numMap2.segments).length === numMap2.code.length;
}

function getValue(code, input) {
    return _.reduce(input, (acc, keyMap) => {
        if (code.length === keyMap.code.length && contains({ segments: code.split('') }, keyMap)) {
            return keyMap.value;
        }

        return acc;
    }, null);
}

function getOutput(line) {
    let [ input, output ] = line.split(' | ');
    input = input.split(' ');
    input = _.map(input, (code) => {
        return {
            code: code,
            segments: code.split(''),
            value: null
        };
    });

    // pass `easy`
    _.forEach(input, (keyMap) => {
        if (keyMap.code.length === 2) {
            keyMap.value = 1;
        } else if (keyMap.code.length === 3) {
            keyMap.value = 7;
        } else if (keyMap.code.length === 4) {
            keyMap.value = 4;
        } else if (keyMap.code.length === 7) {
            keyMap.value = 8;
        }
    });

    // pass 9
    _.forEach(input, (keyMap) => {
        if (keyMap.value === null && keyMap.code.length === 6) {
            const num4 = _.find(input, { value: 4 });
            if (contains(keyMap, num4)) {
                keyMap.value = 9;
            }
        }
    });

    // pass 3
    _.forEach(input, (keyMap) => {
        if (keyMap.value === null && keyMap.code.length === 5) {
            const num1 = _.find(input, { value: 1 });
            const num7 = _.find(input, { value: 7 });
            if (contains(keyMap, num1) && contains(keyMap, num7)) {
                keyMap.value = 3;
            }
        }
    });

    // pass 0
    _.forEach(input, (keyMap) => {
        if (keyMap.value === null && keyMap.code.length === 6) {
            const num1 = _.find(input, { value: 1 });
            const num7 = _.find(input, { value: 7 });
            if (contains(keyMap, num1) && contains(keyMap, num7)) {
                keyMap.value = 0;
            }
        }
    });

    // pass 6
    _.forEach(input, (keyMap) => {
        if (keyMap.value === null && keyMap.code.length === 6) {
            keyMap.value = 6;
        }
    });

    // pass 5
    _.forEach(input, (keyMap) => {
        if (keyMap.value === null && keyMap.code.length === 5) {
            const num6 = _.find(input, { value: 6 });
            if (contains(num6, keyMap)) {
                keyMap.value = 5;
            }
        }
    });

    // pass 2
    _.forEach(input, (keyMap) => {
        if (keyMap.value === null && keyMap.code.length === 5) {
            keyMap.value = 2;
        }
    });

    output = _.split(output, ' ');
    output = _.reduce(output, (acc, code) => {
        const value = getValue(code, input);

        return acc + value;
    }, '');

    return _.parseInt(output);
}

function main() {
    const inputLines = util.loadInput(inputFile);
    // const inputLines = [ 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf' ];

    const outputList = _.map(inputLines, (line) => {
        return getOutput(line);
    });

    const total = _.sum(outputList);

    console.log('total', total);
}

main();
