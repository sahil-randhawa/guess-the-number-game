// game values
let min = getRandomNum(1,20),
    max = getRandomNum(min+5,30),
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('play-again')){
        window.location.reload();
    }
})

//  Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess <  min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    else if(guess === winningNum){
        // game over - won
        
        gameOver(true, `${winningNum} is correct, YOU WIN!`)

    }else{
        // wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // game over - lost
            
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        }else{
            // game continues - answer wrong

            // change border color
            guessInput.style.borderColor = 'red';

            // clear input
            guessInput.value = '';

            let tip;
            if(guess<winningNum) tip ='higher';
            else tip = 'lower';
            // tell user its wrong number
            setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left. Try ${tip}.`, 'red');
        }
    }
})

// game Over
function gameOver(won, msg){

    let color;
    won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;
    // set message
    setMessage(msg, color);


    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className +='play-again';

}

// get winning num
function getRandomNum(min,max){
    // console.log(Math.floor(Math.random()*(max-min+1)+min));
    return Math.floor(Math.random()*(max-min+1)+min);
}

// set message
function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;
}