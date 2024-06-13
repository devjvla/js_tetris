let board = [
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,3,3,0,0,0],
];

let TETRIS_STYLES = {
    "tetris_0": "rgb(46, 46, 46)",  // Empty
    "tetris_1": "green",            // S-Tetris
    "tetris_2": "crimson",          // Z-Tetris
    "tetris_3": "purple",           // T-Tetris
    "tetris_4": "yellow",           // O-Tetris
    "tetris_5": "cyan",             // I-Tetris
    "tetris_6": "royalblue",        // J-Tetris
    "tetris_7": "orange",           // L-Tetris
}

let isGameStarted = false;

let s_tetris = [
    [   // Position 1
        [1,0],
        [1,1],
        [0,1]
    ],
    [   // Position 2
        [0,1,1],
        [1,1,0]
    ],
    [   // Position 1
        [1,0],
        [1,1],
        [0,1]
    ],
    [   // Position 2
        [0,1,1],
        [1,1,0]
    ],
]

let z_tetris = [
    [   // Position 1
        [0,2],
        [2,2],
        [2,0]
    ],
    [   // Position 2
        [2,2,0],
        [0,2,2]
    ],
    [   // Position 1
        [0,2],
        [2,2],
        [2,0]
    ],
    [   // Position 2
        [2,2,0],
        [0,2,2]
    ]
]

let t_tetris = [
    [
        [0,3,0],
        [3,3,3],
    ],
    [
        [3,0],
        [3,3],
        [3,0],
    ],
    [
        [3,3,3],
        [0,3,0],
    ],
    [
        [0,3],
        [3,3],
        [0,3],
    ],
]

let o_tetris = [
    [
        [4,4],
        [4,4],
    ],
    [
        [4,4],
        [4,4],
    ],
    [
        [4,4],
        [4,4],
    ],
    [
        [4,4],
        [4,4],
    ],
]

let i_tetris = [
    [
        [5,5,5,5]
    ],
    [
        [5],
        [5],
        [5],
        [5],
    ],
    [
        [5,5,5,5]
    ],
    [
        [5],
        [5],
        [5],
        [5],
    ],
]

let j_tetris = [
    [
        [0,6],
        [0,6],
        [6,6]
    ],
    [
        [6,0,0],
        [6,6,6],
    ],
    [
        [6,6],
        [6,0],
        [6,0],
    ],
    [
        [6,6,6],
        [0,0,6],
    ],
]

let l_tetris = [
    [
        [7,0],
        [7,0],
        [7,7]
    ],
    [
        [0,0,7],
        [7,7,7],
    ],
    [
        [7,7],
        [0,7],
        [0,7]
    ],
    [
        [7,7,7],
        [7,0,0],
    ],
]

let pieces       = [s_tetris, z_tetris, t_tetris, o_tetris, i_tetris, j_tetris, l_tetris];
let piece_values = [1, 2, 3, 4, 5, 6, 7];

document.addEventListener("DOMContentLoaded", function() {
    // Render the Tetris board
    const boardElement = document.getElementById("board");
    boardElement.innerHTML += renderBoard();

    // Check if Left/Right Arrow Keys is pressed
    // document.onkeydown = checkDirection;

    // Start game
    // draw(z_tetris[0], 0, 4);
    gameBoardInterval();
});

function renderBoard() {
    let boardHTML = "";

    for(const [rowCount, row] of board.entries()) {
        boardHTML += `<div id='row_${rowCount}' class='boardRow'>`;

        row.forEach(value => {
            boardHTML += `<div class='rowBlock' data-status='${value}' style='background-color: ${TETRIS_STYLES[`tetris_${value}`]};'></div>`;
        });

        boardHTML += "</div>";
    };

    return boardHTML;
}

function checkDirection(e) {
    e = e || window.event;

    if(e.keyCode == "37") {
        console.log("LEFT");
    } 
    else if (e.keyCode == "39") {
        console.log("RIGHT");
    }
}

function gameBoardInterval() {
    let y_pos              = 0;
    let x_pos              = 4;
    // let random_piece_index = Math.floor(Math.random() * pieces.length)
    // let random_piece_pos   = Math.floor(Math.random() * 4);
    // let current_piece      = pieces[random_piece_index];
    let random_piece_pos   = 2
    let random_piece_index = 1
    let current_piece      = z_tetris;
    
    let interval = setInterval(function() {
        if(y_pos < board.length) {
            let piece_last_row = current_piece[random_piece_pos][current_piece[random_piece_pos].length - 1];

            // get index of non-zero
            let non_zero_idx = 0;

            for(let index = 0; index < piece_last_row.length; index++){
                if(piece_last_row[index] != 0) {
                    non_zero_idx = index;
                    break;
                }
            }

            if(current_piece[random_piece_pos].length <= (board.length - y_pos)){
                draw(current_piece[random_piece_pos], y_pos, x_pos);

                if(y_pos != (board.length - current_piece[random_piece_pos].length)){
                    setTimeout(() => {
                        undraw(current_piece[random_piece_pos], piece_values[random_piece_index], y_pos - 1, x_pos);
                    }, 500);
                }
            }
            
            // Check if piece is moved left/right/rotated
            document.onkeydown = function(e) {
                if(e.key === "ArrowLeft") {
                    if(x_pos > 0){
                        x_pos -= 1;
                    }
                } 
                else if (e.key == "ArrowRight") {
                    if(x_pos < (10 - current_piece[random_piece_pos][0].length)){
                        x_pos += 1;
                    }
                }
                else if (e.key == "z") {
                    if((random_piece_pos + 1) > 3) {
                        random_piece_pos = 0
                    }
                    else {
                        random_piece_pos += 1;
                    }
                }
            };

            y_pos++;
        }
        else {
            // random_piece_index = Math.floor(Math.random() * pieces.length)
            // current_piece      = pieces[random_piece_index];
            // random_piece_pos   = Math.floor(Math.random() * 4);
            // y_pos = 0;
            // x_pos = 4
        }
    }, 900);
}

function draw(piece, y_pos, x_pos) {
    for(let rowCount = 0; rowCount < piece.length; rowCount++) {
        for(let blockCount = 0, start_pos = x_pos; blockCount < piece[rowCount].length; blockCount++) {
            let current_block = document.getElementById(`row_${y_pos}`).children[start_pos];

            if(piece[rowCount][blockCount] != 0){
                current_block.setAttribute("data-status", piece[rowCount][blockCount]);
                current_block.setAttribute("style", `background-color: ${TETRIS_STYLES[`tetris_${piece[rowCount][blockCount]}`]};`);
            }

            start_pos++;
        }
        
        y_pos++;
    }
}

function undraw(piece, piece_value, y_pos, x_pos) {
    for(let rowCount = 0; rowCount < piece.length; rowCount++) {
        for(let blockCount = 0, start_pos = x_pos; blockCount < piece[rowCount].length; blockCount++) {
            let current_block = document.getElementById(`row_${y_pos}`).children[start_pos];

            if(current_block.getAttribute("data-status") == piece_value){
                current_block.setAttribute("data-status", 0);
                current_block.setAttribute("style", `background-color: ${TETRIS_STYLES[`tetris_${0}`]};`);
            }

            start_pos++;
        }
        
        y_pos++;
    }
}

function checkCollision(piece, y_pos, x_pos) {
    result = false;

    for(let rowCount = 0; rowCount < piece.length; rowCount++) {
        for(let blockCount = 0, start_pos = x_pos; blockCount < piece[rowCount].length; blockCount++) {
            let current_block = document.getElementById(`row_${y_pos}`).children[start_pos];

            if(piece[rowCount][blockCount] != 0){
                if(current_block.getAttribute("data-status") != 0) {
                    return true;
                }
            }            

            start_pos++;
        }
        
        y_pos++;
    }

    return result;
}