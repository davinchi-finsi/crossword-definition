# crossword-definition
Lightweight and fast crossword definition generator, crossword-definition is a component that provides a easy way to generate the data model
of a crossword game board.

Based on [@dwmkerr crossword-js](https://github.com/dwmkerr/crosswords-js). Thanks!

## Features
- es2015 and UMD bundles (es5)
- Typescript sources
- Generates a complete definition of a board with info for each cell
- Control of bounds (if some word exceeds the bounds of the board)
- Control of coherence. [See the example]
- Hints letters (letters that should appear from the beginning to help to resolve the clue)
- UI agnostic

**Please note** that this component only provides the definition for the data model. The objective is provide an easy way to create
the board model that could be implemented in any UI.

If you are looking for an UI component, please go to [jq-crossword] a jquery component that uses crossword-definition

## Install
`npm i crossword-definition`

or download the [latest release](https://github.com/davinchi-finsi/crossword-definition/releases)

## Doc
For more info, please check the [docs](https://davinchi-finsi.github.io/crossword-definition/)

## Usage
### NodeJS or Bundlers (Webpack, Fusebox, Rollup, etc)
Import crossword-definition like any other module

```typescript
import {
   CrosswordCell,
   CrosswordClueDefinition,
   CrosswordDefinition
} from 'crossword-definition';
```
or
```typescript
const {
   CrosswordCell,
   CrosswordClueDefinition,
   CrosswordDefinition
} = require('crossword-definition');
```

### Browser
The namespace is `crosswordDefinition`:
```typescript
const {
   CrosswordCell,
   CrosswordClueDefinition,
   CrosswordDefinition
} = crosswordDefinition;
```

### Create the definition
If you are using Typescript you could also import the interface with the available options for `CrosswordDefinition`
```typescript
import {
   CrosswordDefinitionOptions,
   CrosswordDefinition
} from 'crossword-definition';
let crosswordOptions:CrosswordDefinitionOptions = {
    ...options
}
```
**Please note** that the `x` and `y` positions starts from 1 instead of 0, the first cell is in the `x:0` and `y:0`
```javascript
/*
*To create
*
*                   W
*   H   e   l   l   o
*   i               r
*   s               l
*   t       o   l   d
*   o
*   r
*   y
*/
let definition = new CrosswordDefinition({
    height:8,//height of the board, 8 cells
    width:5,//width of the board, 5 cells
    acrossClues:[
        {
            number:1, //number to identify the world, must be unique
            x:1,//The x position where the word starts, starting from 1
            y:2,//The y position where the word starts, starting from 1
            answer:"Hello",//the word itself
            clue:"A common greeting",//the clue
            hints:[2],//the letter 'e' is a hint. Starting from 1
        },
        {
            number:2,
            x:3,
            y:5,
            answer:"Old",
            clue:"Having lived for a long time; no longer young."
        }
    ],
    downClues:[
        {
            number:1,//this clue starts in the same cell that "Hello", so it must have the same number
            x:1,
            y:2,
            answer:"History",
            clue:"The study of past events, particularly in human affairs.",
            hints:[2,7]
        },
        {
            number:3,
            x:5,
            y:1,
            answer:"World",
            clue:"The earth is our _____"
        }
    ]
});
//toString will print the game board representation
console.log(definition.toString();
```
### How it works
`CrosswordDefinition` loop over all the definitions and creates a matrix (the board) with all the cells.

For each clue the letters are checked, the letters must be coherent and must be inside de bounds.

If all is correct, the data is attached to the corresponding cell.

The definition object should be something like:
![definition](https://www.dropbox.com/s/5tay3iv1aafovo0/example.png?raw=1)

As you can see, the definition object has the matrix with all the cells. Each cell has the clues to which it belongs (the cell may not have clues)

Also you could access the clues definition by `acrossClues` and `downClues`. Each clue has the cells that conform it

For more info about the properties, please check:
- [CrosswordDefinition doc](https://davinchi-finsi.github.io/crossword-definition/classes/crossworddefinition.crossworddefinition-1.html)
- [CrosswordClueDefinition doc](https://davinchi-finsi.github.io/crossword-definition/classes/crossworddefinition.crosswordcluedefinition.html)
- [CrosswordCell](https://davinchi-finsi.github.io/crossword-definition/classes/crossworddefinition.crosswordcell.html)


## Cell checking
### Bounds
`CrosswordDefinition` checks that all the clues starts and ends inside the bounds of the board.

If some clue is out of bounds, an error will be thrown.

The `height` must match with the longest word in down clues + the `y` position where starts.

The `width` must match with the longest word in across clues + the `x` position where starts.

**Please note** that the `x` and `y` positions starts from 1 instead of 0, the first cell is in the `x:0` and `y:0`
For example, the height specified must be 5 ("World" length is 5 and starts in the first cell)
```typescript
let definition = new CrosswordDefinition({
    width:5,
    height:4,//wrong height
    acrossClues:[
        {
            number:1,
            answer:"Hello",
            x:1,
            y:2,
            clue:"A common greeting"
        }
    ],
    downClues:[
        {
            number:2,
            answer:"World",
            x:5,
            y:1,
            clue:"The earth, together with all of its countries and peoples"
        }
    ]
});
```

This error will be thrown:
```
[CrosswordDefinition] Clue at (5,1) 'World' exceeds vertical bounds, height of 4.
```

In this example, "World" starts in the second cell, so the `height` must be 6, 5+1
```typescript
let definition = new CrosswordDefinition({
    width:5,
    height:4,//wrong height
    acrossClues:[
        {
            number:1,
            answer:"Hello",
            x:1,
            y:3,
            clue:"A common greeting"
        }
    ],
    downClues:[
        {
            number:2,
            answer:"World",
            x:5,
            y:2,//starts in the second cell
            clue:"The earth, together with all of its countries and peoples"
        }
    ]
});
```
### Coherency
`CrosswordDefinition` performs two checks:
#### Same letter for the same cell
If two clues shares cell, the letter from both clues must be the same.

This example will throw error, the position of "World" doesn't match with the acrossClue

The given coordinates:
```
            W
H   e   l   l   o
            r
            l
            d
```

The 'o' from 'World' doesn't match with the 'o' from 'Hello'
```typescript
 let definition = new CrosswordDefinition({
     width:5,
     height:5,
     acrossClues:[
         {
             number:1,
             answer:"Hello",
             x:1,
             y:2,
             clue:"A common greeting"
         }
     ],
     downClues:[
         {
             number:2,
             answer:"World",
             x:4,//wrong x, must be 5
             y:1,
             clue:"The earth, together with all of its countries and peoples"
         }
     ]
 });
 ```
This error will be thrown:
```
 [CrosswordDefinition] Clue 2d answer at (4, 2) is not coherent with previous clue (1a) answer. Hel[l]o doesn't match with W[o]rld
 ```

#### Same number in first letter cells
If two clues shares a cell and for the both of them the cell has the first letter, the number of the clue must be the same:
```typescript
let definition = new CrosswordDefinition({
  width:5,
  height:5,
  acrossClues:[
      {
          number:1,
          answer:"Hello",
          x:1,
          y:1,
          clue:"A common greeting"
      }
  ],
  downClues:[
      {
          number:2,//wrong, must be 1
          answer:"History",
          x:1,
          y:1,
          clue:"The study of past events, particularly in human affairs."
      }
  ]
});
```

This error will be thrown:
```
 [CrosswordDefinition] Clue '4d' ('History') with number '4' at (1, 2) has a label which is inconsistent with another clue '1a' (1) with number'Hello'. If two clues starts in the same cell, the 'number' option must be the same. In this case, 1
```