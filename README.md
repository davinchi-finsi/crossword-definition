# crossword-definition
Lightweight and fast crossword definition generator, crossword-definition is a component that provides a easy way to generate the data model
of a crossword game board.

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
For more info, please check the [doc](./docs/index.html)

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

Para cada pista se recorren las letras y se comprueba la coherencia y los límites.

Si la letra de la pista es correcta se añade a la celda correspondiente con la información relativa.

For each clue the letters are checked, the letters must be coherent and must be inside de bounds.

If all is correct, the data is attached to the corresponding cell.

The definition object should be something like:
![definition](https://www.dropbox.com/s/5tay3iv1aafovo0/example.png?raw=1)

As you can see, the definition object has the matrix with all the cells. Each cell has the clues to which it belongs (the cell may not have clues)

Also you could access the clues definition by `acrossClues` and `downClues`. Each clue has the cells that conform it

For more info about the properties, please check:
- [CrosswordDefinition doc](./docs/classes/crossworddefinition.crossworddefinition-1.html)
- [CrosswordClueDefinition doc](./docs/classes/crossworddefinition.crosswordcluedefinition)
- [CrosswordCell](./docs/classes/crossworddefinition.crossworddefinition-1)