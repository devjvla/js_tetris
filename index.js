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
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
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
    // const boardElement = document.getElementById("board");
    // boardElement.innerHTML += renderBoard();

    // Check if Left/Right Arrow Keys is pressed
    // document.onkeydown = checkDirection;

    // Start game
    // draw(z_tetris[0], 0, 4);
    // gameBoardInterval();
    startGame();
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

function drawPiece(piece, y_pos, x_pos) {
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

function plotPiece(piece, y_pos, x_pos) {
    for(let rowCount = 0; rowCount < piece.length; rowCount++) {
        for(let blockCount = 0, start_pos = x_pos; blockCount < piece[rowCount].length; blockCount++) {
            if(board[y_pos][start_pos] == 0) {
                board[y_pos][start_pos] = piece[rowCount][blockCount];
            }

            start_pos++;
        }
        
        y_pos++;
    }
}

function hasCollision(piece, y_pos, x_pos) {
    for(let rowCount = 0; rowCount < piece.length; rowCount++) {
        for(let blockCount = 0, start_pos = x_pos; blockCount < piece[rowCount].length; blockCount++) {
            if(piece[rowCount][blockCount] != 0 && board[y_pos][start_pos] != 0){
                return true;
            }

            start_pos++;
        }
        
        y_pos++;
    }

    return false;
}

function startGame() {
    const boardElement     = document.getElementById("board");
    let y_pos              = 0;
    let x_pos              = 4;
    let random_piece_index = Math.floor(Math.random() * pieces.length)
    let random_piece_pos   = Math.floor(Math.random() * 4);
    let current_piece      = pieces[random_piece_index];

    // Render board on the DOM
    let gameInterval = setInterval(() => {
        boardElement.innerHTML = renderBoard();

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

        console.log("random_piece_pos: ", random_piece_pos);

        // Draw tetris piece while it's not at the bottom of the board
        drawPiece(current_piece[random_piece_pos], y_pos, x_pos);
        
        // Check if piece fits in the remaining space
        // or if piece collides with other pieces
        if((current_piece[random_piece_pos].length == (board.length - y_pos)) ||
            // Check collision for next row
            hasCollision(current_piece[random_piece_pos], y_pos + 1, x_pos)
        ) {
            plotPiece(current_piece[random_piece_pos], y_pos, x_pos);
            
            // Reset y_pos and choose new tetris piece
            random_piece_index = Math.floor(Math.random() * pieces.length)
            current_piece      = pieces[random_piece_index];
            random_piece_pos   = Math.floor(Math.random() * 4);
            y_pos = 0;
            x_pos = 4

            // clearInterval(gameInterval);
        } else {
            y_pos++;
        }
    }, 600);
}