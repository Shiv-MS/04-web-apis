const userName = document.querySelector('#winnerName');
const saveScoreButton = document.querySelector('#saveScoreButton');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const Max_High_Scores = 5;

finalScore.innerText = mostRecentScore

userName.addEventListener('keyup', () => {
    saveScoreButton.disabled = !userName.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: userName.value
    }

    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('scoreboard.html')
}