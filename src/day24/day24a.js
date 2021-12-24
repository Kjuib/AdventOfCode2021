import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function run(commandList, commandNum, values, logMe) {
    for (; commandNum <= commandList.length; commandNum++) {
        let [ command, char, other ]  = _.split(commandList[commandNum], ' ');
        if (other && _.includes(_.keys(values), other)) {
            other = values[other];
        } else {
            other = _.parseInt(other);
        }

        if (command === 'inp') {
            for (let i = 9; i >= 1; i--) {
                const newValues = {
                    w: values.w,
                    x: values.x,
                    y: values.y,
                    z: values.z,
                    modelNum: values.modelNum
                };
                newValues[char] = i;
                newValues.modelNum += i;
                run(commandList, commandNum + 1, newValues, logMe);
            }

            break;
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

    if (commandNum > commandList.length && values.z < 50) {
    // if (commandNum > commandList.length) {
        console.log('values', values);
    }
    //
    // if (commandNum > commandList.length && values.z >= 2 && values.z <= 10) {
    // if (commandNum > commandList.length && values.z === 0) {
    //     console.log('values', values, logMe);
    // }
}

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
                result[addY.index] = 9 - diff;
                result[i] = 9;
            } else {
                result[addY.index] = 9;
                result[i] = 9 + diff;
            }
        }
    }

    console.log('result', result.join(''));

    test(inputLines, '99691891979938');

    console.timeEnd();
}

main();
