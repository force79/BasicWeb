document.addEventListener('DOMContentLoaded', function() {
    const directorCard = document.getElementById('directorCard');
    const managerCards = document.querySelectorAll('.manager-card');
    const teamHierarchy = document.getElementById('teamHierarchy');
    const singleManagerView = document.getElementById('singleManagerView');
    const backButton = document.getElementById('backButton');
    
    let draggedCard = null;

    // Add drag events to manager cards
    managerCards.forEach(card => {
        card.addEventListener('dragstart', function(e) {
            draggedCard = this;
            setTimeout(() => {
                this.classList.add('dragging');
            }, 0);
        });

        card.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            directorCard.classList.remove('director-highlight');
        });

        card.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const name = this.querySelector('h3').textContent;
            const role = this.querySelector('.role').textContent;
            
            document.getElementById('singleManagerImg').src = imgSrc;
            document.getElementById('singleManagerName').textContent = name;
            document.getElementById('singleManagerRole').textContent = role;
            
            teamHierarchy.style.display = 'none';
            singleManagerView.classList.add('active');
        });
    });

    // Director card as drop zone
    directorCard.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('director-highlight');
    });

    directorCard.addEventListener('dragleave', function() {
        this.classList.remove('director-highlight');
    });

    directorCard.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('director-highlight');
        
        if (draggedCard) {
            // Show single manager view
            const imgSrc = draggedCard.querySelector('img').src;
            const name = draggedCard.querySelector('h3').textContent;
            const role = draggedCard.querySelector('.role').textContent;
            
            document.getElementById('singleManagerImg').src = imgSrc;
            document.getElementById('singleManagerName').textContent = name;
            document.getElementById('singleManagerRole').textContent = role;
            
            teamHierarchy.style.display = 'none';
            singleManagerView.classList.add('active');
        }
    });

    // Back button functionality
    backButton.addEventListener('click', function() {
        singleManagerView.classList.remove('active');
        teamHierarchy.style.display = 'flex';
    });
});