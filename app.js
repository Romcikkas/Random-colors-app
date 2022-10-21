const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', e => {
    if (e.code.toLocaleLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', e => {
    const type = e.target.dataset.type
    if (type === 'lock') {
        e.target.classList.toggle('fa-lock-open');
        e.target.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClikboard(e.target.textContent)
    }

})

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF'
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return '#' + color
}

function copyToClikboard(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const button = col.querySelector('button');
        const h2 = col.querySelector('h2');
        const icon = col.querySelector('i');

        if (icon.classList.contains('fa-lock')) {
            colors.push(h2.textContent)
            return
        }

        const myRandColor = isInitial ? colors[index] ? colors[index] : generateRandomColor() : generateRandomColor();

        if (!isInitial) {
            colors.push(myRandColor)
        }

        col.style.background = myRandColor // can to be from library chroma.random()
        h2.textContent = myRandColor

        setTextColor(h2, button, myRandColor);

    });

    updateColorsHash(colors);
}

function setTextColor(h2, button, color) {
    const luminance = chroma(color).luminance()

    h2.style.color = luminance > 0.5 ? 'black' : 'white';
    button.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => col.toString().substring(1)).join('-')

}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map((color) => '#' + color)
    }
    return []
}

setRandomColors(true);