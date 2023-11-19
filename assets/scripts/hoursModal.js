// Modal open
const modal = document.querySelector('.modal');
const wrapper = document.querySelector('.wrapper');
let modalOpen = false;

// Function open modal
function openModal(date, time) {
    modal.innerHTML = createModal(date, time);
    if(document.title === "Hours"){createDropdownMenu();}
    modal.style.display = 'block';
    setTimeout(() => {
        modalOpen = true;
    }, 200);

    wrapper.style.pointerEvents = 'none';
}

// Function close modal
function closeModal() {
    modal.innerHTML = ``;
    modal.style.display = 'none';

    wrapper.style.pointerEvents = 'auto';
}

document.addEventListener('click', function (event) {
    if (!event.composedPath().includes(modal) && modalOpen == true) {
        modalOpen = false;
        closeModal();
    }
});
