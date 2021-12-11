import fs from 'fs';
import _ from 'lodash';

export function loadInput(filePath, options = {}) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n');
    const filteredInput = _.filter(listInput, _.negate(_.isEmpty));

    if (options.split) {
        return _.map(filteredInput, (row) => {
            if (options.isIntegers) {
                return _.map(_.split(row, _.isString(options.split) ? options.split : ''), _.parseInt);
            } else {
                return _.split(row, _.isString(options.split) ? options.split : '');
            }
        });
    } else if (options.isIntegers) {
        return _.map(filteredInput, _.parseInt);
    } else {
        return filteredInput;
    }
}

export function printGrid(data, separator = ' ') {
    const str = _.reduce(data, (acc, row) => {
        return acc + _.reduce(row, (acc, char) => {
            return acc + char + separator;
        }, '') + '\n';
    }, '');

    console.log(str, '\n');
}
