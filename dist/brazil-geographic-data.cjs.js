'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var fs = require('fs');
var path = require('path');
var util = require('util');

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
}

const URL = 'https://sidra.ibge.gov.br/Territorio/Unidades';

const request = (level = 1) => __awaiter(undefined, void 0, Promise, function* () {
    const response = yield axios.get(URL, {
        data: {
            nivel: level
        }
    });
    return response.data;
});

const write = util.promisify(fs.writeFile);
const parse = (data) => {
    try {
        return JSON.stringify(data, null, 2);
    }
    catch (error) {
        throw error;
    }
};
const save = (path$$1, data) => __awaiter(undefined, void 0, void 0, function* () {
    const string = yield parse(data);
    const filename = path.resolve(__dirname, '../', path$$1);
    const options = {
        enconding: 'utf8',
        mode: 0o666,
        flag: 'w'
    };
    yield write(filename, string, options);
});

const sleep = (time) => new Promise((resolve$$1) => setTimeout(resolve$$1, time));

const generate = (min, max) => {
    const numbers = [...Array(max - min)].map((_, index) => index + min);
    return numbers;
};

const getLevel = (level, delay = 0) => __awaiter(undefined, void 0, void 0, function* () {
    try {
        yield sleep(delay * 10);
        const response = yield request(level);
        return {
            id: response.Nivel.Id,
            name: response.Nivel.Nome
        };
    }
    catch (error) {
        return null;
    }
});
const getLevels = () => __awaiter(undefined, void 0, void 0, function* () {
    const requests = generate(0, 999).map(getLevel);
    const responses = yield Promise.all(requests);
    const levels = [...responses].filter((level) => !!level);
    yield save('./content/levels.json', levels);
});
getLevels();
