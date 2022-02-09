const puzzleContainer = document.querySelector('#puzzle-container')
let puzzle = []
let size = 3

generatePuzzle()
randomizePuzzle()
renderPuzzle()
handleInput()

function getCol(position) {
    const col = position % size
    if (col === 0) {
        return size
    }
    return col
}

function getRow(position) {
    return Math.ceil(position / size)
}

function generatePuzzle() {
    for (let i = 1; i <= size * size; i++) {
        puzzle.push({
            value: i,
            position: i,
            x: (getCol(i) - 1) * 200,
            y: (getRow(i) - 1) * 200,
            disabled: false
        })
    }
}

function renderPuzzle() {
    puzzleContainer.innerHTML = ''
    for (let puzzleItem of puzzle) {
        if (puzzleItem.disabled == true) {
            continue
        }
        puzzleContainer.innerHTML += `
        <div class="puzzle-item" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px">
        ${puzzleItem.value}
        </div>
        `
    }
}

function randomizePuzzle() {
    const randomValues = getRandomValues()
    let i = 0
    for (let puzzleItem of puzzle) {
        puzzleItem.value = randomValues[i]
        i++
    }

    const puzzleWith9 = puzzle.find(item => item.value === size * size)
    puzzleWith9.disabled = true
}

function getRandomValues() {
    const values = []
    for (let i = 1; i <= size * size; i++) {
        values.push(i)
    }
    const randomValues = values.sort(() => Math.random() - 0.5)
    return randomValues
}

function handleInput() {
    document.addEventListener('keydown', handleKeyDown)
}

function handleKeyDown(e) {
    console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveDown()
            break
        case "ArrowRight":
            moveRight()
            break
        case "ArrowLeft":
            moveLeft()
            break
    }
    renderPuzzle()
}

function moveRight() {
    const emptyPuzzle = getEmptyPuzzle()
    const leftPuzzle = getLeftPuzzle()
    if (leftPuzzle) {
        swapPosition(emptyPuzzle, leftPuzzle, true)
    }
}
function moveLeft() {
    const emptyPuzzle = getEmptyPuzzle()
    const rightPuzzle = getRightPuzzle()
    if (rightPuzzle) {
        swapPosition(emptyPuzzle, rightPuzzle, true)
    }
}
function moveUp() {
    const emptyPuzzle = getEmptyPuzzle()
    const belowPuzzle = getBelowPuzzle()
    if(belowPuzzle){
        swapPosition(emptyPuzzle, belowPuzzle, false)
    }
}
function moveDown() {
    const emptyPuzzle = getEmptyPuzzle()
    const abovePuzzle = getAbovePuzzle()
    if(abovePuzzle){
        swapPosition(emptyPuzzle, abovePuzzle, false)
    }
}

function swapPosition(firstPuzzle, secondPuzzle, isX = false) {
    let temp = firstPuzzle.position
    firstPuzzle.position = secondPuzzle.position
    secondPuzzle.position = temp

    if (isX) {
        temp = firstPuzzle.x
        firstPuzzle.x = secondPuzzle.x
        secondPuzzle.x = temp
    }
    else {
        temp = firstPuzzle.y
        firstPuzzle.y = secondPuzzle.y
        secondPuzzle.y = temp
    }

}

function getRightPuzzle() {
    const emptyPuzzle = getEmptyPuzzle()
    const isRightEdge = getCol(emptyPuzzle.position) === size
    if (isRightEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + 1)
    return puzzle
}
function getLeftPuzzle() {
    const emptyPuzzle = getEmptyPuzzle()
    const isLeftEdge = getCol(emptyPuzzle.position) === 1
    if (isLeftEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - 1)
    return puzzle
}
function getAbovePuzzle() {
    const emptyPuzzle = getEmptyPuzzle()
    const isAboveEdge = getRow(emptyPuzzle.position) === 1
    if (isAboveEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - size)
    return puzzle
}
function getBelowPuzzle() {
    const emptyPuzzle = getEmptyPuzzle()
    const isBottomEdge = getRow(emptyPuzzle.position) === size
    if (isBottomEdge) {
        return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + size)
    return puzzle
}

function getEmptyPuzzle() {
    return puzzle.find(item => item.disabled)
}

function getPuzzleByPos(position) {
    return puzzle.find(item => item.position === position)
}