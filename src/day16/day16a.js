import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.txt';

function decode(str) {
    const version = str.substring(0, 3);
    const type = str.substring(3, 6);
    const rest = str.substring(6);

    if (type === '100') {
        let key = '1';
        let current = rest;
        let value = '';

        do {
            key = current.substring(0, 1);
            value += current.substring(1, 5);
            current = current.substring(5);
        } while (key === '1')

        console.log('value', value);
        const binaryValue = _.parseInt(value, 2);
        console.log('binaryValue', binaryValue);
    }

}

function main() {
    // const inputLine = util.loadInput(input)[0];
    // const inputLine = 'D2FE28';
    const inputLine = '38006F45291200';

    const hexDigits = inputLine.split('');
    const binaryStr = _.map(hexDigits, (d) => {
        return _.padStart(_.parseInt(d, 16).toString(2), 4, '0');
    }).join('');

    decode(binaryStr);
}

main();
