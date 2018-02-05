/**
 * @license crossword-definition v0.0.1
 * (c) 2018 Finsi, Inc.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.crosswordDefinition = {})));
}(this, (function (exports) { 'use strict';

/**
 * Represents a cell of the clue
 */
class CrosswordCell {
    constructor(params) {
        /**
         * The cell is white or has content
         * @type {boolean}
         */
        this.light = false;
        /**
         * The cell is a hint
         * @type {boolean}
         */
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
        if (params.downClueLetterIndex != undefined) {
            this.downClueLetterIndex = params.downClueLetterIndex;
        }
        if (params.hint != undefined) {
            this.hint = params.hint;
        }
    }
}

/**
 * Definition for a clue. Could be down or across
 */
class CrosswordClueDefinition {
    constructor(params) {
        /**
         * The clue is across or down
         */
        this.across = false;
        /**
         * Cells for which the clue pass through
         */
        this.cells = [];
        /**
         * Set one or more letters of the answer as hints.
         */
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
        if (params.hints != undefined) {
            this.hints = params.hints;
        }
        this.code = this.number + (this.across ? "a" : "d");
    }
}

/**
 *  Crossword definition.
 *  Creates a model for a crossword game
 *  Based on https://github.com/jweisbeck/Crossword
 *  The definition verifies the words and the bounds, ensuring the clues are coherent
 *  The instance of the class is a valid model with all the cells of the board
 *  @example
 *  ```typescript
 *  let definition = new CrosswordDefinition({
 *      width:5,
 *      height:5,
 *      acrossClues:[
 *          {
 *              number:1,
 *              answer:"Hello",
 *              x:1,
 *              y:2,
 *              clue:"A common greeting"
 *          }
 *      ],
 *      downClues:[
 *          {
 *              number:2,
 *              answer:"World",
 *              x:5,
 *              y:1,
 *              clue:"The earth, together with all of its countries and peoples"
 *          }
 *      ]
 *  });
 *  ```
 *  @example
 *  This example will throw error because the height specified must be 5 ("World" length in this case)
 *  ```typescript
 *  let definition = new CrosswordDefinition({
 *      width:5,
 *      height:4,
 *      acrossClues:[
 *          {
 *              number:1,
 *              answer:"Hello",
 *              x:1,
 *              y:2,
 *              clue:"A common greeting"
 *          }
 *      ],
 *      downClues:[
 *          {
 *              number:2,
 *              answer:"World",
 *              x:5,
 *              y:1,
 *              clue:"The earth, together with all of its countries and peoples"
 *          }
 *      ]
 *  });
 *  ```
 *  @example
 *  This example will throw error, the position of "World" doesn't match with the acrossClue
 *  This is the given coordinates:
 *  ```
 *     W
 *  Hello
 *     r
 *     l
 *     d
 *  ```
 *  The 'o' from 'World' doesn't match with 'Hello'
 *  ```typescript
 *  let definition = new CrosswordDefinition({
 *      width:5,
 *      height:5,
 *      acrossClues:[
 *          {
 *              number:1,
 *              answer:"Hello",
 *              x:1,
 *              y:2,
 *              clue:"A common greeting"
 *          }
 *      ],
 *      downClues:[
 *          {
 *              number:2,
 *              answer:"World",
 *              x:4,
 *              y:1,
 *              clue:"The earth, together with all of its countries and peoples"
 *          }
 *      ]
 *  });
 *  ```
 *  ```
 *  @example
 *  This example will also throw error, the case of the letters also must match
 *  The 'O' from 'WORLD' doesn't match in case with 'Hello'
 *  ```typescript
 *  let definition = new CrosswordDefinition({
 *      width:5,
 *      height:6,
 *      acrossClues:[
 *          {
 *              number:1,
 *              answer:"Hello",
 *              x:1,
 *              y:2,
 *              clue:"A common greeting"
 *          }
 *      ],
 *      downClues:[
 *          {
 *              number:2,
 *              answer:"WORLD",
 *              x:5,
 *              y:1,
 *              clue:"The earth, together with all of its countries and peoples"
 *          }
 *      ]
 *  });
 *  ```
 */
class CrosswordDefinition {
    constructor(crosswordDefinition) {
        /**
         * Across clues
         */
        this.acrossClues = [];
        /**
         * Down clues
         */
        this.downClues = [];
        //  Set up some data we'll store in the class.
        this.width = crosswordDefinition.width;
        this.height = crosswordDefinition.height;
        this.matrix = this.buildMatrix();
        //  Validate the bounds.
        if (this.width === undefined || this.width === null || this.width < 0 ||
            this.height === undefined || this.height === null || this.height < 0) {
            throw new Error("[CrosswordDefinition] The crossword bounds are invalid.");
        }
        //  We're going to go through the across clues, then the down clues.
        let clueDefinitions = crosswordDefinition.acrossClues.concat(crosswordDefinition.downClues);
        for (let definitionIndex = 0; definitionIndex < clueDefinitions.length; definitionIndex++) {
            //  Grab the clue and build a flag letting us know if we're across or down.
            let clueDefinition = clueDefinitions[definitionIndex];
            let across = definitionIndex < crosswordDefinition.acrossClues.length;
            //  Create a model for the clue.
            let clueModel = new CrosswordClueDefinition({
                number: clueDefinition.number,
                answer: clueDefinition.answer,
                x: clueDefinition.x - 1,
                y: clueDefinition.y - 1,
                across: across,
                clue: clueDefinition.clue,
                hints: clueDefinition.hints
            });
            this[across ? 'acrossClues' : 'downClues'].push(clueModel);
            //  The clue position must be in the bounds.
            if (clueModel.x < 0 || clueModel.x >= this.width || clueModel.y < 0 || clueModel.y >= this.height) {
                throw new Error(`[CrosswordDefinition] Clue ${clueModel.code} doesn't start in the bounds.`);
            }
            /* //  Copy over the clue definition length into the model,
             //  also keeping track of the total length.
             for(let i = 0; i < clueDefinition.length.length; i++) {
                 clueModel.length.push(clueDefinition.length[i]);
                 clueModel.totalLength += clueDefinition.length[i];
             }*/
            //  Make sure the clue is not too long.
            if (across) {
                if ((clueModel.x + clueModel.answer.length) > this.width) {
                    throw new Error(`[CrosswordDefinition] Clue at (${clueModel.x},${clueModel.y}) '${clueModel.answer}' exceeds horizontal bounds, width of ${this.width}.`);
                }
            }
            else {
                if ((clueModel.y + clueModel.answer.length) > this.height) {
                    throw new Error(`[CrosswordDefinition] Clue at (${clueModel.x},${clueModel.y}) '${clueModel.answer}' exceeds vertical bounds, height of ${this.height}.`);
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
                //letter starts with 0, hints positions starts from 1,
                if (clueModel.hints.length > 0 && (clueModel.hints.indexOf(letter + 1) != -1)) {
                    cell.hint = true;
                }
                //  If the clue has an answer we set it in the cell...
                if (clueModel.answer) {
                    //  ...but only if it is not different to an existing answer.
                    if (cell.answer !== undefined && cell.answer !== " " && cell.answer !== clueModel.answer[letter]) {
                        let cellWord = cell.acrossClue.answer.split(""), cellWordLetterIndex = cell.acrossClueLetterIndex, clueWord = cell.downClue.answer.split(""), clueWordLetterIndex = cell.downClueLetterIndex;
                        cellWord.splice(cellWordLetterIndex, 0, "[");
                        cellWord.splice(cellWordLetterIndex + 2, 0, "]");
                        cellWord = cellWord.join("");
                        clueWord.splice(clueWordLetterIndex, 0, "[");
                        clueWord.splice(clueWordLetterIndex + 2, 0, "]");
                        clueWord = clueWord.join("");
                        throw new Error(`[CrosswordDefinition] Clue ${clueModel.code} answer at (${x + 1}, ${y + 1}) is not coherent with previous clue (${cell.acrossClue.code}) answer. ${cellWord} doesn't match with ${clueWord}`);
                    }
                    cell.answer = clueModel.answer[letter];
                }
                if (letter === 0) {
                    if (cell.clueLabel && cell.clueLabel !== clueModel.number) {
                        const prevClue = cell.acrossClue || cell.downClue;
                        throw new Error(`[CrosswordDefinition] Clue '${clueModel.code}' ('${clueModel.answer}') with number '${clueModel.number}' at (${x + 1}, ${y + 1}) has a label which is inconsistent with another clue '${cell.acrossClue.code}' (${prevClue.number}) with number'${prevClue.answer}'. If two clues starts in the same cell, the 'number' option must be the same. In this case, ${prevClue.number}`);
                    }
                    cell.clueLabel = clueModel.number;
                }
                if (across) {
                    x++;
                }
                else {
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
                row[colIndex] = new CrosswordCell({
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
        let result = "", matrix = this.matrix;
        for (let rowIndex = 0, matrixLength = matrix.length; rowIndex < matrixLength; rowIndex++) {
            let row = matrix[rowIndex];
            result += "\n";
            for (let colIndex = 0, colsLength = row.length; colIndex < colsLength; colIndex++) {
                let col = row[colIndex];
                result += col.answer || " ";
            }
        }
        return result;
    }
}

/**
 * @module crosswordDefinition
 * @preferred
 */ /** */

exports.CrosswordCell = CrosswordCell;
exports.CrosswordClueDefinition = CrosswordClueDefinition;
exports.CrosswordDefinition = CrosswordDefinition;

Object.defineProperty(exports, '__esModule', { value: true });

})));
