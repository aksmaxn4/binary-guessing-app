//  COMPONENTS

const minNum = document.getElementById('min-number')
const maxNum = document.getElementById('max-number')
const userGuess = document.getElementById('user-guess')
const startBtn = document.getElementById('start')
const checkBtn = document.getElementById('check')
const output = document.querySelector('.output')
const hint = document.querySelector('.hint')
const usedNumbers = document.querySelector('.used-numbers')
const rulesContainer = document.querySelector('.rules-container')
const guessingField = document.querySelector('.guessing-field')
const startAgainBtn = document.getElementById('start-again')
const startAgainDiv = document.querySelector('.start-again')
const rules = document.querySelector('.rules')
const radios = document.querySelectorAll('input[type=radio]')
const computerGuess = document.querySelector('.computers-guess')
const lowerBtn = document.getElementById('lower')
const higherBtn = document.getElementById('higher')
const correctBtn = document.getElementById('correct')
const mode2 = document.querySelector('.mode-2')
const checkBtnDiv = document.querySelector('.check-btn')
const hintsBtns = document.getElementById('buttons-hints')
const labelUserGuess = document.getElementById('label-user-guess')
// VARIABLES

var numberToGuess = null;
var minComputer = null;
var maxComputer = null;
var middle = null;
var gameMode = 1;
var numbersUsed = []

// FUNCTIONS

const init = () => {
    minNum.value = ''
    maxNum.value = ''
    output.innerText = ''
    hint.innerText = ''
    userGuess.value = ''
    usedNumbers.innerText = ''
    mode2.classList.add('hidden')
    guessingField.classList.add('hidden')
    rulesContainer.classList.remove('hidden')
    checkBtn.classList.remove('hidden')
    startAgainDiv.classList.add('hidden')
    checkBtnDiv.classList.remove('hidden')
    showHigherLowerButtons()
    labelUserGuess.innerHTML = 'Input your guess '
    numbersUsed = []
}

function hideRulesField(){
    rulesContainer.classList.add('hidden')
    mode2.classList.remove('hidden')
    output.classList.add('hidden')
}

function guessUsersNumber(min,max){
    if(min > max){
        output.classList.remove('hidden')
        output.innerText = 'Min number cannot be greater than max number'
        return;
    }
    if(!min || !max){
        output.classList.remove('hidden')
        output.innerText = 'Input both min and max numbers'
        return;
    }
    hideRulesField()
    middle = Math.ceil((max - min + 1) / 2) + min - 1
    if(min !== max){
        computerGuess.innerText = `Is your number ${middle}?`
    }
    
}

function createRandomNumber(min,max){
    if(min > max || min == max){
        output.innerText = 'Min number cannot be greater than or even to max number'
        output.classList.remove('hidden')
        return;
    }
    if(!min || !max){
        output.innerText = 'Input both min and max numbers'
        output.classList.remove('hidden')
        return;
    }
    if(minNum)
    output.innerText = ''
    hint.innerText = ''
    usedNumbers.innerText = ''
    guessingField.classList.remove('hidden')
    rulesContainer.classList.add('hidden')
    numberToGuess = randomInt(min,max)
    labelUserGuess.innerText += `from ${min} to ${max}`
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const giveHint = (numberToGuess, usersInput) => {
    if(usersInput < minNum.value || usersInput > maxNum.value){
        hint.innerText = 'Input a number in a given range!'
        return;
    }
    if(usersInput > numberToGuess){
        numbersUsed.push(usersInput)
        hint.innerText = '\tYou are guessing too high. The hidden number is smaller'
        usedNumbers.innerText = `Used numbers: ${numbersUsed}`
        return;
    }
    if(usersInput < numberToGuess){
        numbersUsed.push(usersInput)
        hint.innerText = 'You are guessing to low. The hidden number is bigger'
        usedNumbers.innerText = `Used numbers: ${numbersUsed}`
        return
    }
    if(usersInput == numberToGuess){
        hint.innerText = `Congrats! You have found the hidden number. It was equal to ${numberToGuess}! \n It took ${numbersUsed.length + 1} tries but you succeded! `
        startAgainDiv.classList.remove('hidden')
        checkBtnDiv.classList.add('hidden')
        return;
    }
}

const hideHigherLowerButtons = () => {
    higherBtn.style.display = 'none'
    lowerBtn.style.display = 'none'
    correctBtn.style.display = 'none'
}

const showHigherLowerButtons = () => {
    higherBtn.style.display = 'inline-block'
    lowerBtn.style.display = 'inline-block'
    correctBtn.style.display = 'inline-block'
}

// LISTENERS

startBtn.addEventListener('click', () => {
    if(gameMode == 1){
        createRandomNumber(+minNum.value, +maxNum.value)
    }
    if(gameMode == 2){
        minComputer = +minNum.value
        maxComputer = +maxNum.value
        guessUsersNumber(minComputer, maxComputer)
    }
})   

checkBtn.addEventListener('click', () => {
    if(!userGuess.value){
        alert('Input a number')
        return;
    }
    giveHint(numberToGuess, +userGuess.value)
})

startAgainBtn.addEventListener('click', () => {
    init()
    startAgainDiv.classList.add('hidden')
})

radios.forEach(el => el.addEventListener('change', (element) => {
    if(element.target.value == 1){
        rules.innerText = 'Computer thinks a number in a given range. User should guess the number with hints lower/higher.'
        init()
        gameMode = 1;
    }
    if(element.target.value == 2){
        rules.innerText = 'User thinks a number in a given range. Computer should guess the number with the user\'s hints lower/higher.'
        init()
        gameMode = 2;
    }
}))

lowerBtn.addEventListener('click', () => {
    if(minComputer + 1 == maxComputer){
        computerGuess.innerText = 'Seems like the only number left is ' + minComputer
        maxComputer = minComputer
        middle = minComputer
        return
    }
    if(minComputer + 1 == middle){
        middle = minComputer
        maxComputer = minComputer
        computerGuess.innerText = 'Seems like the only number left is ' + middle
        return
    }    
    if(maxComputer !== middle){
        maxComputer = middle - 1
    }
    if(minComputer == middle || maxComputer == middle){
        computerGuess.innerText = 'Seems like the only number left is ' + middle
        return;
    } 
    
    guessUsersNumber(minComputer, maxComputer)
    
})

higherBtn.addEventListener('click', () => {
    if(minComputer + 1 == maxComputer){
        computerGuess.innerText = 'Seems like the only number left is ' + maxComputer
        minComputer = maxComputer
        middle = minComputer
        return
    }
    if(maxComputer - 1 == middle){
        middle = maxComputer
        minComputer = maxComputer
        computerGuess.innerText = 'Seems like the only number left is ' + middle
        return
    }

    if(minComputer !== middle){
        minComputer = middle + 1
    } 
    if(minComputer == middle || maxComputer == middle){
        computerGuess.innerText = 'Seems like the only number left is ' + middle
        return;
    }
    
    
    guessUsersNumber(minComputer, maxComputer)    
})

correctBtn.addEventListener('click', () => {
    computerGuess.innerText = `Good for me:) \n Your number was ${middle}`
    hideHigherLowerButtons()
    startAgainDiv.classList.remove('hidden')
})
