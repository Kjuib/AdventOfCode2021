import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.txt';

const versions = [];

function decode(binaryStr) {
    const version = binaryStr.substring(0, 3);
    versions.push(version);
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

        let literalValue = {
            value: value,
            binaryValue: binaryValue,
            leftOvers: current
        };
        return literalValue;
    } else {
        const lengthTypeId = rest.substring(0, 1);
        let leftOvers = '';
        if (lengthTypeId === '0') {
            const subLength = _.parseInt(rest.substring(1, 16), 2);
            let rest002 = rest.substring(16, 16 + subLength);
            leftOvers = rest.substring(16 + subLength);
            do {
                rest002 = decode(rest002).leftOvers;
            } while (!_.isEmpty(rest002));
        } else {
            const subPackets = _.parseInt(rest.substring(1, 12), 2);

            let rest002 = rest.substring(12);
            for (let i = 0; i < subPackets; i++) {
                rest002 = decode(rest002).leftOvers;
            }
            leftOvers = rest002;
        }

        return {
            leftOvers: leftOvers
        };
    }

}

function main() {
    const inputLine = util.loadInput(input)[0];
    // const inputLine = 'D2FE28';
    // const inputLine = '38006F45291200';
    // const inputLine = 'EE00D40C823060';
    // const inputLine = '8A004A801A8002F478';
    // const inputLine = '620080001611562C8802118E34';
    // const inputLine = 'C0015000016115A2E0802F182340';
    // const inputLine = 'A0016C880162017C3686B18A3D4780';

    const hexDigits = inputLine.split('');
    const binaryStr = _.map(hexDigits, (d) => {
        return _.padStart(_.parseInt(d, 16).toString(2), 4, '0');
    }).join('');

    decode(binaryStr);

    const binaryVersions = _.map(versions, (str) => {
        return _.parseInt(str, 2);
    });

    console.log('TOTAL VERSIONS', _.sum(binaryVersions));
}

main();
