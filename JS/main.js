console.log("JS file is connected")
const musicFiles = document.querySelectorAll('.music-file');
musicFiles.forEach((musicFile) => {
    musicFile.addEventListener('dragstart', dragStart);
    musicFile.addEventListener('dragend', dragEnd);
});

const dropZones = document.querySelectorAll('.drop-zone');
dropZones.forEach((dropZone) => {
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('dragenter', dragEnter);
    dropZone.addEventListener('dragleave', dragLeave);
    dropZone.addEventListener('drop', drop);
});

let draggedItem = null;
const initialPositions = []; 
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

    
    dropZones.forEach((dropZone) => {
        const dropZoneText = dropZone.querySelector('p');
        dropZoneText.style.display = 'block'; 
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


