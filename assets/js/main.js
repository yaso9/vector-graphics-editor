function newRectangle() {
    data.canvas.add(new fabric.Rect({
        left: (data.canvasSize[0] - 100) / 2,
        top: (data.canvasSize[1] - 100) / 2,
        fill: data.foreground,
        width: 100,
        height: 100
    }));
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // App state
    window.data = {
        // ============
        // CONSTS
        // ============

        // The canvas element (in the future)
        canvas: {},

        // Size of canvas
        canvasSize: [
            document.documentElement.clientWidth - 74,
            document.documentElement.clientHeight
        ],

        // Tools
        tools: [
            {
                name: 'Rectangle',
                icon: 'rectangle',
                action: newRectangle
            }
        ],

        // ============
        // END CONSTS
        // ============

        // Colors
        foreground: fabric.Color.fromHex('000000'),
        background: fabric.Color.fromHex('FFFFFF')
    };

    // Get the canvas and context
    let canvasElement = document.getElementById('main-canvas');

    // Set the canvas size
    canvasElement.width = data.canvasSize[0];
    canvasElement.height = data.canvasSize[1];

    // Create fabric canvas
    data.canvas = new fabric.Canvas('main-canvas');

    // Add tools to the DOM
    data.tools.forEach((tool) => {
        // Create DOM node
        let el = document.createElement('div');

        // Set properties
        el.title = tool.name;
        el.style.backgroundImage = 'url(\'/assets/img/' + tool.icon + '.png\')';
        el.addEventListener('click', tool.action);
        el.classList.add('tool');

        // Add the node to the DOM
        document.getElementById('sidebar').appendChild(el);
    });
});