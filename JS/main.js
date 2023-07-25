console.log("JS file is connected")
// Add event listeners to make the music files draggable
const musicFiles = document.querySelectorAll('.music-file');
musicFiles.forEach((musicFile) => {
    musicFile.addEventListener('dragstart', dragStart);
    musicFile.addEventListener('dragend', dragEnd);
});

// Add event listeners to make the drop zones droppable
const dropZones = document.querySelectorAll('.drop-zone');
dropZones.forEach((dropZone) => {
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('dragenter', dragEnter);
    dropZone.addEventListener('dragleave', dragLeave);
    dropZone.addEventListener('drop', drop);
});

let draggedItem = null;
const initialPositions = []; // Array to store initial positions of music files
const musicFilesContainer = document.querySelector('.music-files');

function dragStart(event) {
    draggedItem = this;
    event.dataTransfer.setDragImage(event.target.querySelector('img'), 0, 0);
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    this.classList.add('drag-over');
}

function dragLeave() {
    this.classList.remove('drag-over');
}

function drop(event) {
    event.preventDefault();
    this.appendChild(draggedItem);
    const audio = draggedItem.querySelector('audio');
    audio.play();
    this.classList.remove('drag-over');
    draggedItem = null;
}

//event listener for reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetPositions);

musicFiles.forEach((musicFile) => {
    initialPositions.push({ x: musicFile.offsetLeft, y: musicFile.offsetTop });
    musicFilesContainer.appendChild(musicFile); 
});


function resetPositions() {
    musicFiles.forEach((musicFile, index) => {
        const { x, y } = initialPositions[index];
        musicFile.style.left = x + 'px';
        musicFile.style.top = y + 'px';
        musicFilesContainer.appendChild(musicFile); 
        
        
        const audio = musicFile.querySelector('audio');
        audio.pause();
        audio.currentTime = 0; 
    });
}

dropZones.forEach((dropZone) => {
    dropZone.addEventListener('drop', drop);
});

function drop(event) {
    event.preventDefault();
    this.appendChild(draggedItem);
    const audio = draggedItem.querySelector('audio');
    audio.play();
    this.classList.remove('drag-over');
    this.querySelector('p').style.display = 'none'; 
    draggedItem = null;
}

// Your existing JavaScript code here

// Add event listener to the "Change Background" button
const changeBackgroundBtn = document.getElementById('change-background-btn');
changeBackgroundBtn.addEventListener('click', openModal);

// Add event listener to close the modal when clicking outside the modal content
const modal = document.getElementById('background-modal');
modal.addEventListener('click', closeModal);

// Prevent the modal from closing when clicking inside the modal content
const modalContent = document.querySelector('.modal-content');
modalContent.addEventListener('click', (event) => event.stopPropagation());

// Function to open the background selection modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close the background selection modal
function closeModal() {
    modal.style.display = 'none';
}

// Add event listeners to each background thumbnail
const backgroundThumbnails = document.querySelectorAll('.background-thumbnails img');
backgroundThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', changeBackground);
});

// Function to change the background of the webpage
function changeBackground(event) {
    const selectedBackground = event.target.getAttribute('src');
    document.body.style.backgroundImage = `url(${selectedBackground})`;
    closeModal(); // Close the modal after selecting the background
}
