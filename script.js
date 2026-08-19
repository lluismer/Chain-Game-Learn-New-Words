const usedWords = [];
let lastWord = "";
let currentTurn = "player";

function CT(){
    if (currentTurn === "player"){
        currentTurn = "ai"
    }
    else{
        currentTurn = "player"
    }
    
}

async function isRealWord(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return res.status === 200;
    } catch (error) {
        console.log("Dictionary check failed:", error);
        return false;
    }
}

async function addWord() {
    var word = document.getElementById('word').value;
    var words = document.getElementById('words');
    var feedback = document.getElementById('feedback');
    var li = document.createElement('li');
    
    if (currentTurn === "player"){
        if (word !== ''){
            if (await isRealWord(word) === true){
            if (word.charAt(0).toLowerCase() === lastWord.slice(-1).toLowerCase() || lastWord === ""){
                if (usedWords.includes(word.toLowerCase()) === false){
                    feedback.classList.remove('error');

                    feedback.textContent = ""
                    usedWords.push(word.toLowerCase())
                    lastWord = word.toLowerCase()
                    li.setAttribute("ID", 'worddesc');

                    li.innerHTML = word;
                    words.appendChild(li);
                    document.getElementById("word").value = '';

                    document.getElementById('turnIndicator').textContent = "AI is thinking...";
                    document.getElementById('turnIndicator').className = "ai-turn";
                    CT();
                    aiTurn();
                }
                else {
                    feedback.classList.add('error');
                    feedback.textContent = "Word already used"
                }
            }
            else{
                feedback.classList.add('error');
                feedback.textContent = "The starting letter of this word is different from the end letter of last word"
            }
        }
        }
        else{
            feedback.classList.add('error');
            feedback.textContent = "Word is empty"
        }
    
    }
}

function Enter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addWord();
    }
}

async function test(letter){
    const res = await fetch(`https://api.datamuse.com/words?sp=${letter}*&md=f&max=5000`);
    const data = await res.json();

    let possible = [];
    data.forEach(item => {
        const freqTag = item.tags.find(tag => tag.startsWith("f:"));
        const frequency = freqTag ? parseFloat(freqTag.split(":")[1]) : 0;
        possible.push({ word: item.word, frequency: frequency });
    });

    const available = possible.filter(w => !usedWords.includes(w.word.toLowerCase()));
    available.sort((a, b) => a.frequency - b.frequency);
    let candidates = available.slice(Math.floor(available.length * 0.2), Math.floor(available.length * 0.4));
    let pick = candidates[Math.floor(Math.random() * candidates.length)];

    return pick;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function aiTurn() {
    let lastLetter = lastWord.slice(-1).toLowerCase()
    let word = await test(lastLetter);
    var feedback = document.getElementById('feedback');
    await wait(1000);
    if (word === undefined) {
    feedback.textContent = "AI couldn't find a word you win!";
        return;
        }   
    var li = document.createElement('li');
    var words = document.getElementById('words');

    usedWords.push(word.word.toLowerCase())
    lastWord = word.word.toLowerCase()
    li.setAttribute("ID", 'worddesc');

    li.innerHTML = word.word;
    words.appendChild(li);

    CT();
    document.getElementById('turnIndicator').textContent = "Your turn";
    document.getElementById('turnIndicator').className = "player-turn";
}

document.getElementById('addBtn').addEventListener('click', addWord);

document.getElementById("word").addEventListener("keydown", Enter);
