/**
 * @module crosswordDefinition
 *//** */
import {CrosswordCell} from "./crossword-cell";

/**
 * Available options for CrosswordClueDefinition
 */
export interface CrosswordClueDefinitionOptions{
    /**
     * Number of the clue.
     * Will be used to establish the order of the clues
     */
    number:number;
    /**
     * Word to answer
     */
    answer:string;
    /**
     * The start position in X axis
     */
    x:number;
    /**
     * The start position in Y axis
     */
    y:number;
    /**
     * The clue is across or down
     */
    across:boolean;
    /**
     * The clue to
     */
    clue:string;
    /**
     * Set one or more letters of the answer as hints.
     */
    hints?:number[];
}
/**
 * Definition for a clue. Could be down or across
 */
export class CrosswordClueDefinition implements CrosswordClueDefinitionOptions{
    /**
     * Number of the clue.
     * Will be used to establish the order of the clues
     */
    number:number;
    /**
     * Code for the clue.
     * Will be number+(across?"a":"d")
     */
    code?:string;
    /**
     * Word to answer
     */
    answer:string;
    /**
     * The start position in X axis
     */
    x:number;
    /**
     * The start position in Y axis
     */
    y:number;
    /**
     * The clue is across or down
     */
    across:boolean=false;
    /**
     * The clue to
     */
    clue:string;
    /**
     * Cells for which the clue pass through
     */
    cells:CrosswordCell[]=[];
    /**
     * Set one or more letters of the answer as hints.
     */
    hints?:number[]=[];
    constructor(params:CrosswordClueDefinitionOptions){
        if(params.number != undefined){
            this.number = params.number;
        }
        if(params.answer != undefined){
            this.answer = params.answer;
        }
        if(params.x != undefined){
            this.x = params.x;
        }
        if(params.y != undefined){
            this.y = params.y;
        }
        if(params.across != undefined){
            this.across = params.across;
        }
        if(params.clue != undefined){
            this.clue = params.clue;
        }
        if(params.hints != undefined){
            this.hints = params.hints;
        }
        this.code = this.number+(this.across ? "a":"d");
    }
}