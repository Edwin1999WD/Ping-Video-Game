let game = function() {
    let time = 50;
    let movement = 20;
    let movementBar = 20;
    let width = document.documentElement.clientWidth - movement;
    let height = document.documentElement.clientHeight - movement;
    let controlGame;
    let player1;
    let player2;
    const audioE = document.querySelector('.audioE');
    
    
  
    function start() {
        swal("Pong VideoGame" , "Retro Game by Edwin Esparza")
        .then(() => {
        swal("Instrucciones", "P1 Moves:Q=Up, A=Down, P2 Moves: O=Up, L=Down", "success");
});
        init();
        controlGame = setInterval(play, time);
    }

    function init() {
        ball.style.left = 0;
        ball.state = 1; // rigth 1, left 2
        ball.direction = 1;
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
    } 

    function stop() {
        clearInterval(controlGame);
        document.body.style.background = '#01DF01';
        

    }

    function play() {
      moveBall();
      moveBar();
      checkIfLost();
    }

    function checkIfLost() {
        if(ball.offsetLeft >= width) {
            stop();
            const win = document.getElementById('win');
            win.classList.remove('ocultar')
            win.classList.add('animate__animated' , 'animate__bounce');
            win.textContent = 'WIN PLAYER 1';
            audioE.play();
            setTimeout(function(){ swal("Press F5 to Restart") }, 3000);
        } 
        if(ball.offsetLeft <= 0) {
            stop();
            win.classList.remove('ocultar');
            win.classList.add('lose');  
            win.classList.add('animate__animated' , 'animate__bounce');
            win.textContent = 'WIN PLAYER 2' 
            audioE.play();
            setTimeout(function(){ swal("Press F5 to Restart") }, 3000);
        }
    }

    function moveBall() {
        checkStateBall();
        switch(ball.state) {
            case 1: // DERECHA, ABAJO 
            ball.style.left = (ball.offsetLeft + movement) + 'px';
            ball.style.top = (ball.offsetTop + movement) + 'px';
            break;
            case 2: // DERECHA, ARRIBA
            ball.style.left = (ball.offsetLeft + movement) + 'px';
            ball.style.top = (ball.offsetTop - movement) + 'px';
            break;
            case 3: // IZQUIERDA, ABAJO
            ball.style.left = (ball.offsetLeft - movement) + 'px';
            ball.style.top = (ball.offsetTop + movement) + 'px';
            break;
            case 4: // IZQUIERDA, ARRIBA
            ball.style.left = (ball.offsetLeft - movement) + 'px';
            ball.style.top = (ball.offsetTop - movement) + 'px';
            break;
        }
    }

    function checkStateBall() {
        if(collidePlayer2()) {
            ball.direction = 2;
            if(ball.state == 1) ball.state = 3;
            if(ball.state == 2) ball.state = 4;
        } else if(collidePlayer1()) {
            ball.direction = 1;
            if(ball.state == 3) ball.state = 1;
            if(ball.state == 4) ball.state = 2;
        }

        if(ball.direction == 1) {
            if(ball.offsetTop >= height) ball.state = 2;
            else if (ball.offsetTop <= 0) ball.state = 1;
        } else {
            if(ball.offsetTop >= height) ball.state = 4;
            else if (ball.offsetTop <= 0) ball.state = 3;
        }

    }

    function collidePlayer1() {
        if(ball.offsetLeft <= (bar1.clientWidth) &&
          ball.offsetTop >= bar1.offsetTop &&
          ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) 
        return true;
    }

    function collidePlayer2() {
        if(ball.offsetLeft >= (width-bar2.clientWidth) &&
        ball.offsetTop >= bar2.offsetTop &&
        ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight))
        return true;
    }

    function moveBar() {
        if(player1.keyPress) {
            if(player1.keyCode == 81 && bar1.offsetTop >= 0) 
                bar1.style.top = (bar1.offsetTop - movementBar) + 'px';
            if(player1.keyCode == 65 && (bar1.offsetTop + bar1.clientHeight <= height)) 
                bar1.style.top = (bar1.offsetTop + movementBar) + 'px';
        }
        if(player2.keyPress) {
            if(player2.keyCode == 79 && bar2.offsetTop >= 0) 
            bar2.style.top = (bar2.offsetTop - movementBar) + 'px';
        if(player2.keyCode == 76 && (bar2.offsetTop + bar2.clientHeight <= height)) 
            bar2.style.top = (bar2.offsetTop + movementBar) + 'px';
        }
    }

    document.onkeydown = function(e) {
        e = e || window.event;
        switch(e.keyCode) {
            case 81: // TECLA Q
            case 65: // TECLA A
            player1.keyCode = e.keyCode;
            player1.keyPress = true;
            break;
            case 79: // TECLA O
            case 76: // TECLA L
            player2.keyCode = e.keyCode;
            player2.keyPress = true;
            break;
        }
    }

    document.onkeyup = function(e) {
        if (e.keyCode == 81 || e.keyCode == 65)
            player1.keyPress = false;
        if (e.keyCode == 79 || e.keyCode == 76)
            player2.keyPress = false;

    }

    start();
}();