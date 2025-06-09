let shutTheBox = {
    dice: document.getElementById("dice"),
    diceText: document.getElementById("dice-roll"),
    resetBtn: document.getElementById("reset-btn"),

    initFunc: function() {
        for(let i=1;i<13;i++) {
            document.getElementById(`box${i}`).addEventListener('click', () => this.flipBoxes(i));
        }
        this.dice.addEventListener('click', this.rollDice.bind(this));
        this.resetBtn.addEventListener('click', this.resetGame.bind(this));
        window.addEventListener('keydown', (event) => {
            console.log(event.key);
            if(event.key=="Shift" || event.key=="Control") { //Press shift or control to reset the game after losing or winning
                this.resetGame();
            }
            else if(event.key==" ") { //Press space to roll the dice
                this.rollDice();
            }
        });
    },
    rollDice: function() {
        this.diceText.innerHTML = "";
        let loadingDots = setInterval(() => {
            this.diceText.innerHTML += '.';
            if(this.diceText.innerHTML=="...") {
                clearInterval(loadingDots);
            }
        }, 50); //Changes the text to this with a 1/10th of a second delay to make it clear if there was a repeat number
        
        setTimeout(() => {
            let num1 = Math.floor(Math.random() * 6) + 1, num2 = Math.floor(Math.random() * 6) + 1;
            this.diceText.innerHTML = num1 + num2; //This allows for a random number 2-12, similar to a normal dice roll
        }, 200);
    },
    flipBoxes: function(index) { //Makes the boxes black if you have used them
        let boxColor = document.getElementById(`box${index}`).classList;
        boxColor = boxColor.length == 2 ? boxColor.remove("usedBox") : boxColor.add("usedBox");
    },
    resetGame: function() { //Resets the game by reverting the dice roll text and changing all of the boxes back to their orig. background color
        this.diceText.innerHTML = "[ ]";
        for(let i=1;i<13;i++) {
            document.getElementById(`box${i}`).classList.remove("usedBox");
        }
    }
};

shutTheBox.initFunc(); //Runs the function to initialize all of the event listeners