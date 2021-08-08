function draw(state){
    const canvas=document.getElementById("my-canvas");
    const context=canvas.getContext("2d");

    const image=state.image;


    context.strokeStyle="black";
    context.lineWidth=1;
    const width=image.width();
    const height=image.height();
    const cellSize=image.cellSize();
    const cells=image.cells();

    for(let x=0;x<width;x++){
        for(let y=0;y<height;y++){
            const index=((y*width)+x)*3;
            const color = `rgb(${cells[index + 0]}, ${cells[index + 1]}, ${cells[index + 2]})`;
            context.fillStyle=color;
            context.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
        }
    }

    for(let x=0;x<width+1;x++){
        context.beginPath();
        context.moveTo(x*cellSize,0);
        context.lineTo(x*cellSize,height*cellSize);
        context.stroke();
    }
    for (let y = 0; y < height+1; y++) {
        context.beginPath();
        context.moveTo(0, y * cellSize);
        context.lineTo(width*cellSize, y*cellSize);
        context.stroke();
    }
}

function setupCanvas(state){
    const canvas=document.getElementById("my-canvas");

    const image=state.image;
    

    function drawCell(event){
        const cellSize = image.cellSize();
        const canvas = event.target;
        const rect = canvas.getBoundingClientRect();

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        x = Math.floor(x / cellSize);
        y = Math.floor(y / cellSize);

        currentColor(state);

        image.brush(x, y, state.currentColor);

        draw(state);
    }

    canvas.addEventListener('mousedown',event=>{
        state.dragging=true;
    })

    canvas.addEventListener('mouseup', event => {
        state.dragging = false;
    })

    canvas.addEventListener('mousemove',(event)=>{ 
        if(state.dragging){
            drawCell(event);
        }
    })

    canvas.addEventListener('click', (event) => {
        drawCell(event);
    })
}

function canvasButtons(state){
    const canvas = document.getElementById("my-canvas");
    const smallButton = document.getElementById("smallCanvas");
    const mediumButton = document.getElementById("mediumCanvas");
    const largeButton = document.getElementById("largeCanvas");

    const clearButton = document.getElementById("clear");

    smallButton.addEventListener('click', (event)=>{
        if(state.canvasSize!=500){
            state.canvasSize=500;
            canvas.width=501;
            canvas.height=501;

            const widthHeight = Math.floor(state.canvasSize / state.cellSize);

            state.image.setWidth(widthHeight);
            state.image.setHeight(widthHeight);
            state.image.resize(widthHeight * widthHeight)

            setupCanvas(state);
            draw(state);
        }
    })

    mediumButton.addEventListener('click', (event) => {
        if (state.canvasSize != 750) {
            state.canvasSize = 750;
            canvas.width = 751;
            canvas.height = 751;

            const widthHeight = Math.floor(state.canvasSize / state.cellSize);

            state.image.setWidth(widthHeight);
            state.image.setHeight(widthHeight);
            state.image.resize(widthHeight * widthHeight)

            setupCanvas(state);
            draw(state);
        }
    })

    largeButton.addEventListener('click', (event) => {
        if (state.canvasSize != 1000) {
            state.canvasSize = 1000;
            canvas.width = 1001;
            canvas.height = 1001;

            const widthHeight = Math.floor(state.canvasSize / state.cellSize);
            state.image.setWidth(widthHeight);
            state.image.setHeight(widthHeight);
            state.image.resize(widthHeight*widthHeight)

            setupCanvas(state);
            draw(state);
        }
    })

    clearButton.addEventListener('click',(event)=>{
        state.image.clear();
        setupCanvas(state);
        draw(state);
    })
}

function cellButtons(state){
    const smallButton = document.getElementById("smallCell");
    const mediumButton = document.getElementById("mediumCell");
    const largeButton = document.getElementById("largeCell");

    smallButton.addEventListener('click',(event)=>{
        if(state.cellSize!=10){
            state.cellSize=10;

            state.image.setCellSize(state.cellSize);
            state.image.setWidth(state.canvasSize / state.cellSize);
            state.image.setHeight(state.canvasSize / state.cellSize);
            state.image.resize(state.image.width() * state.image.height());

            setupCanvas(state);
            draw(state);

        }
    })

    mediumButton.addEventListener('click', (event) => {
        if (state.cellSize != 25) {
            state.cellSize = 25;

            state.image.setCellSize(state.cellSize);
            state.image.setWidth(state.canvasSize / state.cellSize);
            state.image.setHeight(state.canvasSize / state.cellSize);
            state.image.resize(state.image.width() * state.image.height());

            setupCanvas(state);
            draw(state);

        }
    })

    largeButton.addEventListener('click', (event) => {
        if (state.cellSize != 50) {
            state.cellSize = 50;

            state.image.setCellSize(state.cellSize);
            state.image.setWidth(state.canvasSize/state.cellSize);
            state.image.setHeight(state.canvasSize/state.cellSize);
            state.image.resize(state.image.width()*state.image.height());
            

            setupCanvas(state);
            draw(state);

        }
    })
}

function currentColor(state){
    let red=document.getElementById("red");
    let green=document.getElementById("green");
    let blue = document.getElementById("blue");

    state.currentColor =[red.value,green.value,blue.value];
}

async function main(){
    const lib = await import("../pkg/index.js").catch(console.error);

    const image= new lib.Image(30,30,25);

    const state={
        lib:lib,
        image,
        currentColor:null,
        dragging:false,
        canvasSize:750,
        cellSize:25,
    }

    

    setupCanvas(state);

    draw(state);

    canvasButtons(state);

    cellButtons(state);
}

main();
