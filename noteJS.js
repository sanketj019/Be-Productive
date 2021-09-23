const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

if (window.localStorage.getItem("notes") == undefined) {
    var notes = [];
    window.localStorage.setItem("notes", JSON.stringify(notes));
}

var notesEX = window.localStorage.getItem("notes");
var notes = JSON.parse(notesEX);


class item {
    constructor(name) {
        this.createItem(name);
    }
    createItem(name) {
        var itemBox = document.createElement('div');
        itemBox.classList.add('item');

        var input = document.createElement('input');
        input.type = "text";
        input.disabled = true;
        input.value = name;
        input.classList.add('item_input');

        var edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = "Edit";
        edit.addEventListener('click', () => this.edit(input, name));

        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = "Delete";
        remove.addEventListener('click', () => this.remove(itemBox, name));

        container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name) {
        if (input.disabled == true) {
            input.disabled = !input.disabled;
        }
        else {
            input.disabled = !input.disabled;
            let indexof = notes.indexOf(name);
            notes[indexof] = input.value;
            window.localStorage.setItem("notes", JSON.stringify(notes));
        }
    }

    remove(itemBox, name) {
        itemBox.parentNode.removeChild(itemBox);
        let index = notes.indexOf(name);
        notes.splice(index, 1);
        window.localStorage.setItem("notes", JSON.stringify(notes));
    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
})

function check() {
    if (inputValue.value != "") {
        new item(inputValue.value);
        notes.push(inputValue.value);
        window.localStorage.setItem("notes", JSON.stringify(notes));
        inputValue.value = "";
    }
}


for (var v = 0; v < notes.length; v++) {
    new item(notes[v]);
}
new item("sport");