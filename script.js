const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.createElement('div');
let score = 0;

scoreElement.style.position = 'absolute';
scoreElement.style.top = '50px';
scoreElement.style.left = '50%';
scoreElement.style.transform = 'translateX(-50%)';
scoreElement.style.fontSize = '32px';
scoreElement.style.fontFamily = 'Arial, sans-serif';
scoreElement.style.color = '#fff';
scoreElement.style.backgroundColor = 'rgba(80, 220, 45, 0.33)';
scoreElement.style.padding = '2px 10px';
scoreElement.style.zIndex = '1000';
scoreElement.textContent = `Score: ${score}`;
document.body.appendChild(scoreElement);

const bestScoreElement = document.createElement('div');
let bestScore = localStorage.getItem('highScore') || 0;

scoreElement.style.left = '20px'; 
scoreElement.style.transform = 'none'; 
scoreElement.style.fontSize = '24px'; 

bestScoreElement.style.position = 'absolute';
bestScoreElement.style.top = '50px';
bestScoreElement.style.right = '20px'; 
bestScoreElement.style.fontSize = '24px'; 
bestScoreElement.style.fontFamily = 'Arial, sans-serif';
bestScoreElement.style.color = '#fff';
bestScoreElement.style.backgroundColor = 'rgba(80, 220, 45, 0.33)';
bestScoreElement.style.padding = '2px 10px';
bestScoreElement.style.zIndex = '1000';

const starIcon = document.createElement('span');
starIcon.textContent = '⭐';
starIcon.style.marginRight = '5px';
starIcon.style.fontSize = '22px';
bestScoreElement.appendChild(starIcon);

const bestScoreText = document.createElement('span');
bestScoreText.textContent = `Best: ${bestScore}`;
bestScoreElement.appendChild(bestScoreText);

document.body.appendChild(bestScoreElement);

const updateBestScore = () => {
    if (score > bestScore) {
        bestScore = score;
        bestScoreText.textContent = `Best: ${bestScore}`;
        localStorage.setItem('highScore', bestScore);
    }
};

setInterval(() => {
    updateBestScore();
}, 10);

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

let pipeCleared = false;

const loop = setInterval(() => {
    const pipeposition = pipe.offsetLeft;
    const marioposition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipeposition <= 120 && pipeposition > 10 && marioposition < 70) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipeposition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioposition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '85px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);

        // Reinicia o jogo
        document.addEventListener('keydown', restartGame);
    } else if (pipeposition < 120 && pipeposition > 0 && marioposition >= 70 && !pipeCleared) {
        // Incrementa o score quando o Mario pula o cano
        score++;
        scoreElement.textContent = `Score: ${score}`;
        pipeCleared = true;

        // Adiciona o efeito de "pulo" no score a cada 10 unidades
        if (score % 10 === 0) {
            scoreElement.style.transition = 'transform 0.2s';
            scoreElement.style.transform = 'translateX(-50%) scale(1.5)';
            setTimeout(() => {
                scoreElement.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
        }
    } else if (pipeposition <= 0) {
        pipeCleared = false; 
    }
}, 10);

const restartGame = (event) => {
    if (event.code === 'Space') {
        location.reload(); // Recarrega a página para reiniciar o jogo
    }
};

document.addEventListener('keydown', jump);
