const containers = document.querySelectorAll('.full-contain > div');

containers.forEach(container => {
    const header = container.querySelector('h3');

    header.addEventListener('click', () => {
        container.classList.toggle('active');

        containers.forEach(otherContainer => {
            if(otherContainer !== container){
                otherContainer.classList.remove('active');
            }
        });
    });
});