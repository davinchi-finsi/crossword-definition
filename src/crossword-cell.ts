/**
 * @module crosswordDefinition
 *//** */
import {CrosswordDefinition} from "./crossword-definition";
import {CrosswordClueDefinition} from "./crossword-clue-definition";

/**
 * Available options for CrosswordCell
 */
export interface CrosswordCellOptions{
    /**
     * X position in the matrix
     */
    x:number;
    /**
     * Y position in the matrix
     */
    y:number;
    /**
     * Parent crossword definition
     */
    crossword:CrosswordDefinition;
    /**
     * The cell is white or has content
     * @type {boolean}
     */
    light?:boolean;
    /**
     * The letter in the cell.
     * The cell could be empty
     */
    answer?:string;
    /**
     * Position of the clue label
     */
    clueLabel?:number;
    /**
     * Across clue that passes through this cell
     */
    acrossClue?:CrosswordClueDefinition;
    /**
     * Down clue that passes through this cell
     */
    downClue?:CrosswordClueDefinition;
    /**
     * The index of the letter in the cell for the across clue
     */
    acrossClueLetterIndex?:number;
    /**
     * The index of the letter in the cell for the down clue
     */
    downClueLetterIndex?:number;
    /**
     * The cell is a hint
     * @type {boolean}
     */
    hint?:boolean;
}
/**
 * Represents a cell of the clue
 */
export class CrosswordCell implements CrosswordCellOptions{
    /**
     * X position in the matrix
     */
    x:number;
    /**
     * Y position in the matrix
     */
    y:number;
    /**
     * Parent crossword definition
     */
    crossword:CrosswordDefinition;
    /**
     * The cell is white or has content
     * @type {boolean}
     */
    light?:boolean = false;
    /**
     * The letter in the cell.
     * The cell could be empty
     */
    answer?:string;
    /**
     * Position of the clue label
     */
    clueLabel?:number;
    /**
     * Across clue that passes through this cell
     */
    acrossClue?:CrosswordClueDefinition;
    /**
     * Down clue that passes through this cell
     */
    downClue?:CrosswordClueDefinition;
    /**
     * The index of the letter in the cell for the across clue
     */
    acrossClueLetterIndex?:number;
    /**
     * The index of the letter in the cell for the down clue
     */
    downClueLetterIndex?:number;
    /**
     * The cell is a hint
     * @type {boolean}
     */
    hint?:boolean=false;
    constructor(params:CrosswordCellOptions){
        if(params.x != undefined){
            this.x = params.x;
        }
        if(params.y != undefined){
            this.y = params.y;
        }
        if(params.crossword != undefined){
            this.crossword = params.crossword;
        }
        if(params.light != undefined){
            this.light = params.light;
        }
        if(params.answer != undefined){
            this.answer = params.answer;
        }
        if(params.clueLabel != undefined){
            this.clueLabel = params.clueLabel;
        }
        if(params.acrossClue != undefined){
            this.acrossClue = params.acrossClue;
        }
        if(params.downClue != undefined){
            this.downClue = params.downClue;
        }
        if(params.acrossClueLetterIndex != undefined){
            this.acrossClueLetterIndex = params.acrossClueLetterIndex;
        }
        if(params.downClueLetterIndex != undefined){
            this.downClueLetterIndex = params.downClueLetterIndex;
        }
        if(params.hint != undefined){
            this.hint = params.hint;
        }
    }
}