// ===============================
// ELEMENTOS
// ===============================

const round = document.getElementById('round');

const simonButtons = document.getElementsByClassName('square');

const startButton = document.getElementById('startButton');

const menuButton = document.getElementById('menuButton');

const letrero = document.getElementById('letrero');

// ===============================
// CLASE SIMON
// ===============================

class Simon {

    constructor(simonButtons, startButton, round) {

        this.round = 0;

        this.userPosition = 0;

        this.totalRounds = 5;

        this.sequence = [];

        this.speed = 700;

        this.blockedButtons = true;

        this.buttons = Array.from(simonButtons);

        this.display = {
            startButton,
            round
        };

        // ===============================
        // SONIDOS
        // ===============================

        this.errorSound = new Audio('sounds/error.wav');

        this.win = new Audio('sounds/win.mp3');

        this.coin = new Audio('sounds/coin.mp3');

        this.buttonSounds = [

            new Audio('sounds/1.mp3'),

            new Audio('sounds/2.mp3'),

            new Audio('sounds/3.mp3'),

            new Audio('sounds/4.mp3'),
        ];
    }

    // ===============================
    // INICIAR
    // ===============================

    init() {

        this.display.startButton.onclick = () => this.startGame();

        menuButton.onclick = () => {

            window.location.href = "../index.html";
        };

        letrero.innerHTML = "Simon Says";
    }

    // ===============================
    // EMPEZAR JUEGO
    // ===============================

    startGame() {

        this.coin.play();

        startButton.style.display = 'none';

        round.style.display = 'block';

        letrero.innerHTML = "Simon Says";

        this.updateRound(0);

        this.userPosition = 0;

        this.sequence = this.createSequence();

        this.buttons.forEach((element, i) => {

            element.classList.remove('winner');

            element.onclick = () => this.buttonClick(i);
        });

        this.showSequence();
    }

    // ===============================
    // ACTUALIZAR RONDA
    // ===============================

    updateRound(value) {

        this.round = value;

        this.display.round.textContent = `ROUND ${this.round}`;
    }

    // ===============================
    // CREAR SECUENCIA
    // ===============================

    createSequence() {

        return Array.from(

            { length: this.totalRounds },

            () => this.getRandomColor()
        );
    }

    // ===============================
    // COLOR RANDOM
    // ===============================

    getRandomColor() {

        return Math.floor(Math.random() * 4);
    }

    // ===============================
    // CLICK BOTONES
    // ===============================

    buttonClick(value) {

        if (!this.blockedButtons) {

            this.validateChosenColor(value);
        }
    }

    // ===============================
    // VALIDAR COLOR
    // ===============================

    validateChosenColor(value) {

        if (this.sequence[this.userPosition] === value) {

            this.buttonSounds[value].play();

            if (this.round === this.userPosition) {

                this.updateRound(this.round + 1);

                this.speed /= 1.05;

                this.isGameOver();

            } else {

                this.userPosition++;
            }

        } else {

            this.gameLost();
        }
    }

    // ===============================
    // FIN JUEGO
    // ===============================

    isGameOver() {

        if (this.round === this.totalRounds) {

            this.gameWon();

        } else {

            this.userPosition = 0;

            this.showSequence();
        }
    }

    // ===============================
    // MOSTRAR SECUENCIA
    // ===============================

    showSequence() {

        this.blockedButtons = true;

        let sequenceIndex = 0;

        let timer = setInterval(() => {

            const button = this.buttons[this.sequence[sequenceIndex]];

            this.buttonSounds[this.sequence[sequenceIndex]].play();

            this.toggleButtonStyle(button);

            setTimeout(() => {

                this.toggleButtonStyle(button);

            }, this.speed / 2);

            sequenceIndex++;

            if (sequenceIndex > this.round) {

                this.blockedButtons = false;

                clearInterval(timer);
            }

        }, this.speed);
    }

    // ===============================
    // EFECTO BOTON
    // ===============================

    toggleButtonStyle(button) {

        button.classList.toggle('active');
    }

    // ===============================
    // PERDER
    // ===============================

    gameLost() {

        this.errorSound.play();

        letrero.innerHTML =
            `WRONG SEQUENCE - LEVEL ${this.round}`;

        startButton.style.display = 'block';

        round.style.display = 'none';

        this.blockedButtons = true;
    }

    // ===============================
    // GANAR
    // ===============================

    gameWon() {

        this.win.play();

        letrero.innerHTML =
            "YOU HAVE WON 🏆🏆🏆🏆🏆";

        startButton.style.display = 'block';

        round.style.display = 'none';

        this.blockedButtons = true;

        this.buttons.forEach(element => {

            element.classList.add('winner');
        });

        this.updateRound('🏆');
    }
}

// ===============================
// INICIAR JUEGO
// ===============================

const simon = new Simon(

    simonButtons,

    startButton,

    round
);

simon.init();
