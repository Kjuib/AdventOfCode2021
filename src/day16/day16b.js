import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.txt';

function decode(binaryStr) {
    const version = binaryStr.substring(0, 3);
    const type = binaryStr.substring(3, 6);
    const rest = binaryStr.substring(6);

    if (type === '100') {
        let key = '1';
        let current = rest;
        let value = '';

        do {
            key = current.substring(0, 1);
            value += current.substring(1, 5);
            current = current.substring(5);
        } while (key === '1')

        const binaryValue = _.parseInt(value, 2);

        return {
            value: value,
            binaryValue: binaryValue,
            leftOvers: current
        };
    } else {
        const lengthTypeId = rest.substring(0, 1);
        let leftOvers;
        let results = [];
        if (lengthTypeId === '0') {
            const subLength = _.parseInt(rest.substring(1, 16), 2);
            let rest002 = rest.substring(16, 16 + subLength);
            leftOvers = rest.substring(16 + subLength);
            do {
                let result = decode(rest002);
                results.push(result.binaryValue);
                rest002 = result.leftOvers;
            } while (!_.isEmpty(rest002));
        } else {
            const subPackets = _.parseInt(rest.substring(1, 12), 2);

            let rest002 = rest.substring(12);
            for (let i = 0; i < subPackets; i++) {
                let result = decode(rest002);
                results.push(result.binaryValue);
                rest002 = result.leftOvers;
            }
            leftOvers = rest002;
        }

        let result = {
            leftOvers: leftOvers
        }
        if (type === '000') {
            result.binaryValue = _.sum(results);
        } else if (type === '001') {
            result.binaryValue = _.reduce(results, (acc, current) => {
                return acc * current;
            }, 1);
        } else if (type === '010') {
            result.binaryValue = _.min(results);
        } else if (type === '011') {
            result.binaryValue = _.max(results);
        } else if (type === '101') {
            result.binaryValue = results[0] > results[1] ? 1 : 0;
        } else if (type === '110') {
            result.binaryValue = results[0] < results[1] ? 1 : 0;
        } else if (type === '111') {
            result.binaryValue = results[0] === results[1] ? 1 : 0;
        }

        return result;
    }

}

function main() {
    const inputLine = util.loadInput(input)[0];
    // const inputLine = 'C200B40A82';
    // const inputLine = '04005AC33890';
    // const inputLine = '880086C3E88112';
    // const inputLine = 'CE00C43D881120';
    // const inputLine = 'D8005AC2A8F0';
    // const inputLine = 'F600BC2D8F';
    // const inputLine = '9C005AC2F8F0';
    // const inputLine = '9C0141080250320F1802104A08';

    const hexDigits = inputLine.split('');
    const binaryStr = _.map(hexDigits, (d) => {
        return _.padStart(_.parseInt(d, 16).toString(2), 4, '0');
    }).join('');

    const result = decode(binaryStr);
    console.log('result', result);
}

main();
