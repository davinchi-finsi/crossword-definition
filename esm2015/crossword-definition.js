(function(){
    var _c425 = {};
    _c425.f = {}
    // cached modules
    _c425.m = {};
    _c425.r = function(id) {
        var cached = _c425.m[id];
        // resolve if in cache
        if (cached) {
            return cached.m.exports;
        }
        var file = _c425.f[id];
        if (!file)
            return;
        cached = _c425.m[id] = {};
        cached.exports = {};
        cached.m = { exports: cached.exports };
        file(cached.m, cached.exports);
        return cached.m.exports;
    };
// default/index.js
_c425.f[0] = function(module,exports){
function __export(m) {
    for (var p in m)
        if (!exports.hasOwnProperty(p))
            exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
__export(_c425.r(1));
__export(_c425.r(2));
__export(_c425.r(3));
}
// default/crossword-cell.js
_c425.f[1] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
class CrosswordCell {
    constructor(params) {
        this.light = false;
        this.hint = false;
        if (params.x != undefined) {
            this.x = params.x;
        }
        if (params.y != undefined) {
            this.y = params.y;
        }
        if (params.crossword != undefined) {
            this.crossword = params.crossword;
        }
        if (params.light != undefined) {
            this.light = params.light;
        }
        if (params.answer != undefined) {
            this.answer = params.answer;
        }
        if (params.clueLabel != undefined) {
            this.clueLabel = params.clueLabel;
        }
        if (params.acrossClue != undefined) {
            this.acrossClue = params.acrossClue;
        }
        if (params.downClue != undefined) {
            this.downClue = params.downClue;
        }
        if (params.acrossClueLetterIndex != undefined) {
            this.acrossClueLetterIndex = params.acrossClueLetterIndex;
        }
        if (params.hint != undefined) {
            this.hint = params.hint;
        }
    }
}
exports.CrosswordCell = CrosswordCell;
}
// default/crossword-clue-definition.js
_c425.f[2] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
class CrosswordClueDefinition {
    constructor(params) {
        this.across = false;
        this.cells = [];
        this.hints = [];
        if (params.number != undefined) {
            this.number = params.number;
        }
        if (params.answer != undefined) {
            this.answer = params.answer;
        }
        if (params.x != undefined) {
            this.x = params.x;
        }
        if (params.y != undefined) {
            this.y = params.y;
        }
        if (params.across != undefined) {
            this.across = params.across;
        }
        if (params.clue != undefined) {
            this.clue = params.clue;
        }
        if (params.cells != undefined) {
            this.cells = params.cells;
        }
        if (params.hints != undefined) {
            this.hints = params.hints;
        }
        this.code = this.number + (this.across ? 'a' : 'd');
    }
}
exports.CrosswordClueDefinition = CrosswordClueDefinition;
}
// default/crossword-definition.js
_c425.f[3] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
const crossword_clue_definition_1 = _c425.r(2);
const crossword_cell_1 = _c425.r(1);
class CrosswordDefinition {
    constructor(crosswordDefinition) {
        this.acrossClues = [];
        this.downClues = [];
        this.width = crosswordDefinition.width;
        this.height = crosswordDefinition.height;
        this.matrix = this.buildMatrix();
        if (this.width === undefined || this.width === null || this.width < 0 || this.height === undefined || this.height === null || this.height < 0) {
            throw new Error('[CrosswordDefinition] The crossword bounds are invalid.');
        }
        let clueDefinitions = crosswordDefinition.acrossClues.concat(crosswordDefinition.downClues);
        for (let definitionIndex = 0; definitionIndex < clueDefinitions.length; definitionIndex++) {
            let clueDefinition = clueDefinitions[definitionIndex];
            let across = definitionIndex < crosswordDefinition.acrossClues.length;
            let clueModel = new crossword_clue_definition_1.CrosswordClueDefinition({
                number: clueDefinition.number,
                answer: clueDefinition.answer,
                x: clueDefinition.x - 1,
                y: clueDefinition.y - 1,
                across: across,
                clue: clueDefinition.clue,
                cells: [],
                hints: clueDefinition.hints
            });
            this[across ? 'acrossClues' : 'downClues'].push(clueModel);
            if (clueModel.x < 0 || clueModel.x >= this.width || clueModel.y < 0 || clueModel.y >= this.height) {
                throw new Error(`[CrosswordDefinition] Clue ${ clueModel.code } doesn't start in the bounds.`);
            }
            if (across) {
                if (clueModel.x + clueModel.answer.length > this.width) {
                    throw new Error(`[CrosswordDefinition] Clue at (${ clueModel.x },${ clueModel.y }) '${ clueModel.answer }' exceeds horizontal bounds, width of ${ this.width }.`);
                }
            } else {
                if (clueModel.y + clueModel.answer.length > this.height) {
                    throw new Error(`[CrosswordDefinition] Clue at (${ clueModel.x },${ clueModel.y }) '${ clueModel.answer }' exceeds vertical bounds, height of ${ this.height }.`);
                }
            }
            let x = clueModel.x;
            let y = clueModel.y;
            for (let letter = 0; letter < clueModel.answer.length; letter++) {
                let cell = this.matrix[y][x];
                cell.light = true;
                cell[across ? 'acrossClue' : 'downClue'] = clueModel;
                cell[across ? 'acrossClueLetterIndex' : 'downClueLetterIndex'] = letter;
                clueModel.cells.push(cell);
                if (clueModel.hints.length > 0 && clueModel.hints.indexOf(letter + 1) != -1) {
                    cell.hint = true;
                }
                if (clueModel.answer) {
                    if (cell.answer !== undefined && cell.answer !== ' ' && cell.answer !== clueModel.answer[letter]) {
                        let cellWord = cell.acrossClue.answer.split(''), cellWordLetterIndex = cell.acrossClueLetterIndex, clueWord = cell.downClue.answer.split(''), clueWordLetterIndex = cell.downClueLetterIndex;
                        cellWord.splice(cellWordLetterIndex, 0, '[');
                        cellWord.splice(cellWordLetterIndex + 2, 0, ']');
                        cellWord = cellWord.join('');
                        clueWord.splice(clueWordLetterIndex, 0, '[');
                        clueWord.splice(clueWordLetterIndex + 2, 0, ']');
                        clueWord = clueWord.join('');
                        throw new Error(`[CrosswordDefinition] Clue ${ clueModel.code } answer at (${ x + 1 }, ${ y + 1 }) is not coherent with previous clue (${ cell.acrossClue.code }) answer. ${ cellWord } doesn't match with ${ clueWord }`);
                    }
                    cell.answer = clueModel.answer[letter];
                }
                if (letter === 0) {
                    if (cell.clueLabel && cell.clueLabel !== clueModel.number) {
                        throw new Error(`[CrosswordDefinition] Clue at (${ x + 1 }, ${ y + 1 }) '${ clueModel.answer }' has a label which is inconsistent with another clue (${ cell.acrossClue.code }).`);
                    }
                    cell.clueLabel = clueModel.number;
                }
                if (across) {
                    x++;
                } else {
                    y++;
                }
            }
        }
    }
    buildMatrix() {
        let x = this.width;
        let y = this.height;
        let array = [];
        for (let rowIndex = 0; rowIndex < y; rowIndex++) {
            let row = [];
            for (let colIndex = 0; colIndex < x; colIndex++) {
                row[colIndex] = new crossword_cell_1.CrosswordCell({
                    crossword: this,
                    x: colIndex,
                    y: rowIndex
                });
            }
            array[rowIndex] = row;
        }
        return array;
    }
    toString() {
        let result = '', matrix = this.matrix;
        for (let rowIndex = 0, matrixLength = matrix.length; rowIndex < matrixLength; rowIndex++) {
            let row = matrix[rowIndex];
            result += '\n';
            for (let colIndex = 0, colsLength = row.length; colIndex < colsLength; colIndex++) {
                let col = row[colIndex];
                result += col.answer || ' ';
            }
        }
        return result;
    }
}
exports.CrosswordDefinition = CrosswordDefinition;
}
var r = _c425.r(0)
if (r){for(var i in r){ window[i] = r[i] }}
})();