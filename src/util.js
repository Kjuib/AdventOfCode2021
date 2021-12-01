import fs from 'fs';
import _ from 'lodash';

export function loadInput(filePath, options = {}) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n');
    const filteredInput = _.filter(listInput, _.negate(_.isEmpty));

    if (options.isIntegers) {
        return _.map(filteredInput, _.parseInt);
    } else if (options.isGrid) {
        return _.map(filteredInput, (row) => {
            return _.split(row, '');
        });
    } else {
        return filteredInput;
    }
}
