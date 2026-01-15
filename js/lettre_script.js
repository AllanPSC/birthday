const envelope = document.querySelector('.envelope');
const heartSeal = document.querySelector('.heart-seal');
const botaoSurpresa = document.querySelector('.buton2');
let timeoutId;
let isOpened = false;
envelope.addEventListener('mouseover', () => {
    clearTimeout(timeoutId);
    heartSeal.style.opacity = 0;

    if (!isOpened) {
        isOpened = true;

        setTimeout(() => {
            botaoSurpresa.classList.add('show');
        }, 3500);
    }
});

envelope.addEventListener('mouseout', () => {
    timeoutId = setTimeout(() => {
        heartSeal.style.opacity = 1;
    }, 1500); 
});
heartSeal.style.transition = 'opacity 0.3s ease';