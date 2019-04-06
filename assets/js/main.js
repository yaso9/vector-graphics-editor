// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas and context
    let canvas = document.getElementById('main-canvas');
    let ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    // Test the canvas
    ctx.fillStyle = 'green';
    ctx.fillRect(100, 100, 500, 500);
});