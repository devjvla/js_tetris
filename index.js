const TETRIS_STYLES = {
    "tetris_highlight": "rgb(75, 75, 75)",
    "tetris_0": "rgb(46, 46, 46)",  // Empty
    "tetris_1": "green",            // S-Tetris
    "tetris_2": "crimson",          // Z-Tetris
    "tetris_3": "purple",           // T-Tetris
    "tetris_4": "yellow",           // O-Tetris
    "tetris_5": "cyan",             // I-Tetris
    "tetris_6": "royalblue",        // J-Tetris
    "tetris_7": "orange",           // L-Tetris
}

const s_tetris = [
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

const z_tetris = [
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

const t_tetris = [
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

const o_tetris = [
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

const i_tetris = [
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

const j_tetris = [
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

const l_tetris = [
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

const pieces = [
    s_tetris, t_tetris, z_tetris, o_tetris, j_tetris, i_tetris, l_tetris,
    l_tetris, s_tetris, t_tetris, z_tetris, o_tetris, j_tetris, i_tetris, 
    i_tetris, l_tetris, s_tetris, t_tetris, z_tetris, o_tetris, j_tetris,
];
const piece_values = [1, 2, 3, 4, 5, 6, 7];

let score = 0;
let scores = {
    "line_1": 40,
    "line_2": 100,
    "line_3": 300,
    "line_4": 1200
}

let board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
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

let y_pos              = 0;
let x_pos              = 4;
let random_piece_index = Math.floor(Math.random() * pieces.length)
let random_piece_pos   = Math.floor(Math.random() * 4);
let current_piece      = pieces[random_piece_index];

document.addEventListener("DOMContentLoaded", function() {
    // Draw tetris board
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = renderBoard();
    
    // Check if piece is moved left/right/rotated
    document.onkeydown = function(e) {
        if(e.code === "ArrowLeft") {
            if(x_pos > 0){
                if(!hasCollision(current_piece[random_piece_pos], y_pos, x_pos - 1)){
                    x_pos -= 1;
                }
            }
        } 
        else if (e.code == "ArrowRight") {
            if(x_pos < (10 - current_piece[random_piece_pos][0].length)){
                if(!hasCollision(current_piece[random_piece_pos], y_pos, x_pos + 1)){
                    x_pos += 1;
                }
            }
        }
        else if (e.code == "ArrowDown") {
            if((current_piece[random_piece_pos].length < (board.length - y_pos)) && !hasCollision(current_piece[random_piece_pos], y_pos + 1, x_pos)) {
                y_pos += 1;
            }
        }
        else if (e.code == "KeyZ" || e.code == "KeyX") {
            if(e.code == "KeyZ") {
                if((random_piece_pos + 1) > 3) {
                    if(!hasCollision(current_piece[0], y_pos, x_pos)){
                        random_piece_pos = 0
                    }
                }
                else {
                    if(!hasCollision(current_piece[random_piece_pos + 1], y_pos, x_pos)){
                        random_piece_pos += 1;
                    }
                }
            } else {
                if((random_piece_pos - 1) < 0) {
                    if(!hasCollision(current_piece[0], y_pos, x_pos)){
                        random_piece_pos = 3;
                    }
                }
                else {
                    if(!hasCollision(current_piece[random_piece_pos - 1], y_pos, x_pos)){
                        random_piece_pos -= 1;
                    }
                }
            }

            // Adjust x_pos of piece if it doesn't fit in the board
            if(current_piece[random_piece_pos][0].length > (board[y_pos].length - x_pos)){
                x_pos = board[y_pos].length - current_piece[random_piece_pos][0].length;
            }

            // Adjust y_pos of piece if it doesn't fit in the board
            if(current_piece[random_piece_pos].length > (board.length - y_pos)){
                y_pos = board.length - current_piece[random_piece_pos].length;
            }
        }
        else if (e.code == "Space") {
            let new_y_pos = hardDrop(current_piece[random_piece_pos], y_pos, x_pos);
            plotPiece(current_piece[random_piece_pos], new_y_pos, x_pos);

            resetPiece();
        }

        boardElement.innerHTML = renderBoard();
        drawPieceHighlight(current_piece[random_piece_pos], y_pos, x_pos);
        drawPiece(current_piece[random_piece_pos], y_pos, x_pos);
    };

    let gameInterval = setInterval(() => {
        boardElement.innerHTML = renderBoard();

        // Draw tetris piece while it's not at the bottom of the board
        drawPieceHighlight(current_piece[random_piece_pos], y_pos, x_pos);
        drawPiece(current_piece[random_piece_pos], y_pos, x_pos);
        
        // Check if piece fits in the remaining space or if piece collides with other pieces
        if((current_piece[random_piece_pos].length == (board.length - y_pos)) || hasCollision(current_piece[random_piece_pos], y_pos + 1, x_pos)) {
            plotPiece(current_piece[random_piece_pos], y_pos, x_pos);
            
            resetPiece();

            // Check for collision after reset. If there is a collision, the game is over. Reload the page.
            if(hasCollision(current_piece[random_piece_pos], y_pos, x_pos)){
                alert("Game Over!");
                clearInterval(gameInterval);
                window.location.reload(true);
            }
        } else {
            y_pos++;
        }
    }, 600);
});

function renderBoard() {
    let boardHTML = "";

    for(const [rowCount, row] of board.entries()) {
        boardHTML += `<div id='row_${rowCount}' class='boardRow'>`;

        row.forEach((value, index) => {
            boardHTML += `<div class='rowBlock' data-status='${value}' style='background-color: ${TETRIS_STYLES[`tetris_${value}`]};'></div>`;
        });

        boardHTML += "</div>";
    };

    return boardHTML;
}

function drawPiece(piece, y_pos, x_pos, isHighlight = false) {
    for(let rowCount = 0; rowCount < piece.length; rowCount++) {
        for(let blockCount = 0, start_pos = x_pos; blockCount < piece[rowCount].length; blockCount++) {
            let current_block = document.getElementById(`row_${y_pos}`).children[start_pos];

            if(piece[rowCount][blockCount] != 0){
                let tetris_style_value = isHighlight ? "highlight" : piece[rowCount][blockCount];
                current_block.setAttribute("data-status", tetris_style_value);
                current_block.setAttribute("style", `background-color: ${TETRIS_STYLES[`tetris_${tetris_style_value}`]};`);
            }

            start_pos++;
        }
        
        y_pos++;
    }
}

function drawPieceHighlight(piece, y_pos, x_pos) {
    let new_y_pos = hardDrop(piece, y_pos, x_pos);

    drawPiece(piece, new_y_pos, x_pos, true);
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
    // Adjust x_pos of piece if it doesn't fit in the board
    if(piece[0].length > (board[y_pos].length - x_pos)){
        x_pos = board[y_pos].length - piece[0].length;
    }

    // Adjust y_pos of piece if it doesn't fit in the board
    if(piece.length > (board.length - y_pos)){
        y_pos = board.length - piece.length;
    }

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

function hardDrop(piece, y_pos, x_pos) {
    for(let boardRow = y_pos; boardRow < board.length; boardRow++) {
        if(!(piece.length < (board.length - boardRow)) || hasCollision(piece, boardRow + 1, x_pos)) {
            return boardRow;
        }
    }

    return boardRow;
}

function clearLines() {
    const score_label = document.getElementById("score");
    let linesCount = 0;

    for(let rowCount = 0; rowCount < board.length; rowCount++) {
        if(!board[rowCount].includes(0)) {
            board.splice(rowCount, 1);
            board.unshift([0,0,0,0,0,0,0,0,0,0]);

            linesCount += 1;
        }
    }

    if(linesCount) {
        score += scores[`line_${linesCount}`];
        score_label.innerHTML = `Score: ${score}`;
    }
}

function resetPiece() {
    // Check for complete lines
    clearLines();

    // Reset y_pos and choose new tetris piece
    random_piece_index = Math.floor(Math.random() * pieces.length);
    current_piece      = pieces[random_piece_index];
    random_piece_pos   = Math.floor(Math.random() * 4);
    y_pos = 0;
    x_pos = 4;
}