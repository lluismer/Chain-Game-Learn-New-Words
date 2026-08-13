const usedWords = [];
let lastWord = "";

function addWord() {
    var word = document.getElementById('word').value;
    var words = document.getElementById('words');
    var feedback = document.getElementById('feedback');
    var li = document.createElement('li');
    
    if (word !== ''){
       if (word.charAt(0).toLowerCase() === lastWord.slice(-1).toLowerCase() || lastWord === ""){
            if (usedWords.includes(word.toLowerCase()) === false){
                feedback.classList.remove('error');

                feedback.textContent = ""
                usedWords.push(word.toLowerCase())
                lastWord = word.toLowerCase()
                li.setAttribute("ID", 'worddesc');

                li.innerHTML =
                    word;
                words.appendChild(li);
                document.getElementById("word").value = '';
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
    else{
        feedback.classList.add('error');
        feedback.textContent = "Word is empty"
    }
    
}
function Enter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addWord();
    }
}
document.getElementById('addBtn').addEventListener('click', addWord);

document.getElementById("word").addEventListener("keydown", Enter);
