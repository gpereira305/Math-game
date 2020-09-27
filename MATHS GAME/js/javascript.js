var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//Ao clicar no botão "start-reset"
document.getElementById("start-reset").onclick =
    function () { //    Se estamos jogando

        if (playing == true) {

            location.reload(); // Recarregar a página do game
        } else {
            // Se não estamos jogando mudar para o modo jogando
            playing = true;

            // Setar a pontuação para "0"
            score = 0;
            document.getElementById("scorevalue").innerHTML = score;

            // Mostrar a caixa de contagem regressiva
            show("timeremaining");

            timeremaining = 60;

            document.getElementById("timervalue").innerHTML = timeremaining;

            //Esconder  caixa  de "game over"
            hide("gameOver");

            //   Mudar o botão para "reset"
            document.getElementById("start-reset").innerHTML = "Reiniciar Jogo";

            //  Contagem regressiva do jogo
            startCountdown();

            //   Gerar uma nova pergunta com múltiplas respostas
            generateQA();
        }
    }

//Clicando na caixa com a resposta correta
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {

        //    Checar se está jogando
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {

                //  Incrementa a pontuaçao
                score++;
                document.getElementById("scorevalue").innerHTML = score;

                //Esconder a caixa de mensagem "errado" e mostrar a "correta"
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);

                // Gerando uma nova pergunta
                generateQA();
            } else {

                //   Resposta errada
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }

}

//Inicia o contador do jogo
function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timervalue").innerHTML = timeremaining;

        // game over
        if (timeremaining == 0) {
            stopCountdown();

            //Mostrar  caixa  de "game over"
            show("gameOver");

            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Sua Pontuação é: " + score + "</p>";

            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start-reset").innerHTML = "Start Game";
        }
    }, 1000);
}


//Função pra parar o contador do jogo
function stopCountdown() {
    clearInterval(action);
}


//Funções para mostar e esconder elementos na tela do jogo
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//Gerador de perguntas e respostas
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;

    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());

    //    Preencherá uma caixa com a resposta correta
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    //    Preenchimento das demais caixas com respostas aleatórias
    var answers = [correctAnswer];
    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {

            //  Gerador de respostas erradas
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            }
            while (answers.indexOf(wrongAnswer) > -1);

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}