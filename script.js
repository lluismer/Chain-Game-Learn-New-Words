function addWord() {
    var word = document.getElementById('word').value;
    var words = document.getElementById('words');
    var li = document.createElement('li');
    li.setAttribute("ID", 'worddesc');

    li.innerHTML =
        word + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
    words.appendChild(li);
    document.getElementById("word").value = '';
}

document.getElementById('addBtn').addEventListener('click', addWord);

document.getElementById("word").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addWord();
    }
});