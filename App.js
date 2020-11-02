console.log('its work');
getNotes();

const addNoteBtn = document.getElementById('addNoteBtn');

// Add A Note
addNoteBtn.addEventListener('click', function(e){
  e.preventDefault();
  let noteTxt = document.getElementById('noteTxt').value;
  let noteTitle = document.getElementById('noteTitle').value;
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    noteObject = [];
  }
  else {
    noteObject = JSON.parse(notes);
  }
  const newNote = {
    noteTitle : noteTitle,
    noteBody : noteTxt
  }
  noteObject.push(newNote);
  localStorage.setItem('notes', JSON.stringify(noteObject));
  noteTxt = '';
  noteTitle = '';
  getNotes();
})

// Get All Notes
function getNotes(){
  let notes = localStorage.getItem('notes');

  if (notes == null) {
    noteObject = [];
  }
  else {
    noteObject = JSON.parse(notes);
  }
  let html = "";

  noteObject.forEach(function(element, index){
    // console.log(element, index);
    html += `
              <div class="col-md-4 mt-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${element.noteTitle}</h5>
                    <p class="card-text">${element.noteBody}</p>
                    <button id="${index}" onclick="deleteFn(this.id)" class="btn btn-primary">Delete Note</button>
                  </div>
                </div>
              </div>
            `;
  })

  let allNotes = document.getElementById('notes');
  if (notes.length != 0){
    allNotes.innerHTML = html;
  } else {

  }
}

// Delete Note

function deleteFn(index){
  
  let notes = localStorage.getItem('notes');
  console.log(JSON.parse(notes));
  if (notes == null){
    noteObject = [];
  }
  else {
    noteObject = JSON.parse(notes);
  }

  noteObject.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(noteObject));
  getNotes();
}

// Search Function

let searchTxt = document.getElementById('serachTxt');
searchTxt.addEventListener('input', function(){
  let searchValue = searchTxt.value.toLowerCase();
  let note = document.getElementsByClassName('card');

  Array.from(note).forEach(function(element){
    let cartTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();

    if (cartTxt.includes(searchValue)){
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  })
})