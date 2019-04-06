// App state
let state = {
    foreground: fabric.Color.fromHex('000000'),
    background: [fabric.Color.fromHex('FFFFFF')]
};

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas and context
    let canvasElement = document.getElementById('main-canvas');

    // Set canvas size
    canvasElement.width = document.documentElement.clientWidth;
    canvasElement.height = document.documentElement.clientHeight;

    // Draw a rectangle with fabric
    let canvas = new fabric.Canvas('main-canvas');
    canvas.add(new fabric.Rect({
        left: 100,
        top: 100,
        fill: state.foreground,
        width: 100,
        height: 100,
        angle: 45
    }))
});