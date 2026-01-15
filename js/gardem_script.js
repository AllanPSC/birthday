const garden = document.getElementById('garden');
const flowerPalettes = [
    { light: '#ffb7c5', dark: '#e75480' }, { light: '#ff7f50', dark: '#cd3700' },
    { light: '#dda0dd', dark: '#8b008b' }, { light: '#fffacd', dark: '#ffd700' },
    { light: '#87cefa', dark: '#4169e1' }, { light: '#ffffff', dark: '#d3d3d3' }
];
const butterflyColors = ['#FFD700', '#FF4500', '#00BFFF', '#DA70D6', '#32CD32'];

function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');

    const depthFactor = Math.random();
    const bottomPos = -5 + ((1 - depthFactor) * 60);
    const scaleBase = 0.4 + (depthFactor * 1.1); 
    const zIndex = Math.floor(depthFactor * 1000);
    const blur = (1 - depthFactor) * 1.5;

    const height = Math.random() * 80 + 50;
    const left = Math.random() * 102 - 1;
    const palette = flowerPalettes[Math.floor(Math.random() * flowerPalettes.length)];
    const swaySpeed = Math.random() * 4 + 3;
    const swayDelay = Math.random() * -10;

    flower.style.left = left + '%';
    flower.style.bottom = bottomPos + '%';
    flower.style.transform = `scale(${scaleBase})`;
    flower.style.zIndex = zIndex;
    if(blur > 0.3 && depthFactor < 0.8) flower.style.filter = `blur(${blur}px)`;
    flower.style.animation = `sway ${swaySpeed}s ease-in-out infinite ${swayDelay}s`;
    
    const head = document.createElement('div');
    head.classList.add('flower-head');

    head.appendChild(document.createElement('div')).classList.add('center');

    const numPetals = Math.floor(Math.random() * 3) + 8;
    for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.setProperty('--color-light', palette.light);
        petal.style.setProperty('--color-dark', palette.dark);
       
        petal.style.transform = `rotate(${(360 / numPetals) * i}deg) translateY(-10px)`;
        
        head.appendChild(petal);
    }
    
    const stem = document.createElement('div');
    stem.classList.add('stem');
    stem.style.height = height + 'px';

    flower.appendChild(head);
    flower.appendChild(stem);
    garden.appendChild(flower);
}

// 250 flores para densidade
for (let i = 0; i < 250; i++) {
    createFlower();
}

// Insetos
function createInsect(type) {
    const insect = document.createElement('div');
    insect.classList.add(type);
    if (type === 'bee') {
        const body = document.createElement('div'); body.classList.add('bee-body');
        insect.appendChild(body);
        const w1 = document.createElement('div'); w1.classList.add('bee-wing', 'left');
        const w2 = document.createElement('div'); w2.classList.add('bee-wing', 'right');
        insect.appendChild(w1); insect.appendChild(w2);
    } else {
        const bColor = butterflyColors[Math.floor(Math.random() * butterflyColors.length)];
        const w1 = document.createElement('div'); w1.classList.add('wing', 'left');
        w1.style.setProperty('--wing-color', bColor);
        const w2 = document.createElement('div'); w2.classList.add('wing', 'right');
        w2.style.setProperty('--wing-color', bColor);
        insect.appendChild(w1); insect.appendChild(w2);
    }
    garden.appendChild(insect);

    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight * 0.5;
    let speedX = (Math.random() - 0.5) * (type === 'bee' ? 7 : 4);
    let speedY = (Math.random() - 0.5) * 3;

    function fly() {
        posX += speedX; posY += speedY;
        if (posX < -50 || posX > window.innerWidth + 50) speedX *= -1;
        if (posY < -50 || posY > window.innerHeight * 0.6) speedY *= -1;
        if (Math.random() > 0.98) {
             speedX += (Math.random() - 0.5) * 3; speedY += (Math.random() - 0.5) * 2;
             speedX = Math.max(Math.min(speedX, 6), -6); speedY = Math.max(Math.min(speedY, 3), -3);
        }
        insect.style.left = posX + 'px'; insect.style.top = posY + 'px';
        const directionMap = speedX > 0 ? 1 : -1;
        const rotationZ = speedY * 8; 
        insect.style.transform = `scaleX(${directionMap}) rotateZ(${rotationZ}deg)`;
        requestAnimationFrame(fly);
    }
    fly();
}
for(let i = 0; i < 8; i++) createInsect('bee');
for(let i = 0; i < 12; i++) createInsect('butterfly');

setTimeout(function() {
    alert("Você disse que eu não te mandava flores, então fiz uma jardim inteiro só para você :)");
}, 500);