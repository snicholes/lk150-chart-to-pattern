const inputChartDiv = document.getElementById('input-chart');
const generatedPatternDiv = document.getElementById('generated-pattern');
const widthInput = document.getElementById('width-cells');
const heightInput = document.getElementById('height-cells');
const updateBtn = document.getElementById('update');
const generateBtn = document.getElementById('generate');

updateBtn.addEventListener('click', setup);
generateBtn.addEventListener('click', buildMachinePattern);

let rowCount = 1;
let colCount = 1;

function buildMachinePattern() {
    // the first row in each pair should alternate between a and b
    let currFirstRow = 'a';
    console.log('test');

    generatedPatternDiv.innerHTML = ``;

    const table = document.createElement('table');
    for (let i = rowCount - 1; i >= 0; i--) {
        const firstRow = document.createElement('tr');
        const secondRow = document.createElement('tr');
        for (let j = 0; j < colCount; j++) {
            const color = getColorFromChart(i, j);
            const posBElement = document.createElement('td');
            posBElement.classList = 'cell posB';
            const posDElement = document.createElement('td');
            posDElement.classList = 'cell posD';

            firstRow.appendChild(color === currFirstRow ? posDElement : posBElement);
            secondRow.appendChild(color === currFirstRow ? posBElement : posDElement);
        }
        const firstColor = document.createElement('td');
        firstColor.classList = 'cell';
        firstColor.innerText = `${currFirstRow.toLocaleUpperCase()}←`;
        const secondColor = document.createElement('td');
        secondColor.classList = 'cell';
        secondColor.innerText = `${(currFirstRow==='a' ? 'b' : 'a').toLocaleUpperCase()}→`;
        firstRow.appendChild(firstColor);
        secondRow.appendChild(secondColor);
        table.prepend(firstRow);
        table.prepend(secondRow);

        currFirstRow = currFirstRow === 'a' ? 'b' : 'a';
    }

    generatedPatternDiv.appendChild(table);
}

function getColorFromChart(row, col) {
    const cell = document.getElementById(`${row}-${col}`);
    return cell.classList.value.substring(5);
}

function setup() {
    rowCount = heightInput.value ? heightInput.value : 1;
    colCount = widthInput.value ? widthInput.value : 1;
    inputChartDiv.innerHTML = ``;

    const table = document.createElement('table');
    for (let i = 0; i < rowCount; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < colCount; j++) {
            const col = document.createElement('td');
            col.classList = 'cell a';
            col.id = `${i}-${j}`;
            col.addEventListener('click', switchColor);
            row.appendChild(col);
        }
        table.appendChild(row);
    }

    inputChartDiv.appendChild(table);
}

function switchColor(event) {
    let classList = event.target.classList.value;
    event.target.classList = classList === 'cell a' ? 'cell b' : 'cell a';
}