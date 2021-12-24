import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function test(commandList, modelNumber) {
    const values = { w: 0, x: 0, y: 0, z: 0 };
    const inputValues = _.map(modelNumber.split(''), _.parseInt);

    for (let c = 0; c <= commandList.length; c++) {
        let [ command, char, other ]  = _.split(commandList[c], ' ');
        if (other && _.includes(_.keys(values), other)) {
            other = values[other];
        } else {
            other = _.parseInt(other);
        }

        if (command === 'inp') {
            values[char] = inputValues.shift();
        } else if (command === 'add') {
            values[char] = values[char] + other;
        } else if (command === 'mul') {
            values[char] = values[char] * other;
        } else if (command === 'div') {
            values[char] = _.floor(values[char] / other);
        } else if (command === 'mod') {
            values[char] = values[char] % other;
        } else if (command === 'eql') {
            values[char] = (values[char] === other ? 1 : 0);
        }
    }

    console.log(values);
}

function main() {
    console.time();
    const inputLines = util.loadInput(input);

    const chunks = _.chunk(inputLines, 18);

    const result = [];
    const stack = [];
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        if (_.includes(chunk, 'div z 1')) {
            const addY = _.parseInt(_.last(_.filter(chunk, (str) => _.startsWith(str, 'add y'))).split(' ')[2]);
            stack.push({ value: addY, index: i });
        } else {
            const addX = _.parseInt(chunk[5].split(' ')[2]);
            const addY = stack.pop();
            const diff = addX + addY.value;
            if (diff >= 0) {
                result[addY.index] = 1;
                result[i] = 1 + diff;
            } else {
                result[addY.index] = 1 - diff;
                result[i] = 1;
            }
        }
    }

    console.log('result', result.join(''));

    test(inputLines, '99691891979938');

    console.timeEnd();
}

main();
