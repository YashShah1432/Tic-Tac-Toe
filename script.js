let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let winner = document.querySelector(".winner");
let restart = document.querySelector("#restart");
let countX = document.querySelector("#x-count");
let countO = document.querySelector("#o-count");


let winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let xWins = 0;
let oWins = 0;

let turnX = true;
for (const box of boxes) {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        }
        else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        checkWinner();
    });
}

function checkWinner() {

    let isDraw = true;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                if (pos1Val === "X") {
                    xWins++;
                    countX.textContent = xWins;
                } 
                else if (pos1Val === "O") {
                    oWins++;
                    countO.textContent = oWins;
                }
                winner.textContent = `Congratulations! ${pos1Val} Wins!`;
                winner.classList.remove("hide");
                restart.classList.remove("hide");
                reset.classList.add("hide");
                for (const box of boxes) {
                    box.disabled = true;
                }
                return;
            }
        }
    }
    boxes.disabled = true;

    for (const box of boxes) {
        if (box.innerText === "") {
            isDraw = false; // If at least one box is empty, it's not a draw
            break;
        }
    }

    if (isDraw) {
        winner.textContent = "It's a Draw!";
        winner.classList.remove("hide");
        restart.classList.remove("hide");
        reset.classList.add("hide");
    }

}


reset.addEventListener("click", () => {
    for (const box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
}); 

restart.addEventListener("click", () => {
    for (const box of boxes) {
        winner.classList.add("hide");
        restart.classList.add("hide");
        reset.classList.remove("hide");
        box.innerText = "";
        box.disabled = false;
    }
});