function newRectangle() {
    data.canvas.add(new fabric.Rect({
        fill: '#' + data.color.toHex(),
        left: data.mouse.x,
        top: data.mouse.y,
        width: 100,
        height: 100
    }));
}

function newLine() {
        var x=data.mouse.x;
        var y=data.mouse.y;
    if(data.lastpathstr === undefined)
        data.lastpathstr='m '+x+' '+y+' ';
    else
        var pathstr = lastpathstr+' L '+x+' '+y
    data.canvas.add(new fabric.Path(pathstr+' z',{
        stroke: data.foreground
    }));
    data.lastpathx=x;
    data.lastpathy=y;
}

function openColorPicker() {
    let colorPicker = document.getElementById('color-picker');
    let colorTextbox = document.getElementById('color-textbox');

    colorTextbox.value = data.color.toHex();
    colorPicker.style.display = 'block';

    function clickHandler() {
        setTimeout(() => {
            if (colorTextbox === document.activeElement)
                return;

            document.removeEventListener('click', clickHandler);
            colorPicker.style.display = 'none';
        }, 10);
    }
    setTimeout(() => {
        document.addEventListener('click', clickHandler);
    }, 10);
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // App state
    window.data = {
        // ============
        // CONSTS
        // ============

        // Size of canvas
        canvasSize: [
            document.documentElement.clientWidth - 74,
            document.documentElement.clientHeight
        ],
        
        //  Current mouse pointer
        mouse: undefined,
        //  Currently selected tool
        tool: undefined,
        //  In progress path coords
        lastpathx: undefined,
        lastpathy: undefined,
        lastpathstr: undefined,

        //  In progress newLine creation

        // Tools
        tools: [
            {
                name: 'Rectangle',
                icon: 'rectangle',
                action: newRectangle,
                immediate: false
            },
            {
                name: 'Color Picker',
                icon: 'colorSelect',
                action: openColorPicker,
                immediate: true
            },
            {
                name: 'Line',
                icon: 'line',
                action: newLine,
                immediate: false
            }
        ],

        // ============
        // END CONSTS
        // ============

        // Currently selected color
        color: fabric.Color.fromHex('000000')
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
        el.addEventListener('click', tool.immediate ? tool.action : () => {
            data.tool=tool;
        });
        el.classList.add('tool');

        // Add the node to the DOM
        document.getElementById('sidebar').appendChild(el);
    });

    // Listen for the keys to delete selected items
    document.addEventListener('keydown', (key) => {
        if (key.key == "Delete" || key.key == "Backspace") {
            data.canvas.getActiveObjects().forEach((obj) => {
                data.canvas.remove(obj);
            });
            data.canvas.discardActiveObject();
        }

        if (key.key == "Enter") {
            data.color = fabric.Color.fromHex(document.getElementById('color-textbox').value);
        }
    });

    data.canvas.on('mouse:down', function(e){
        if(data.tool!==undefined)
            data.tool.action();
    });
    
    data.canvas.on('mouse:move', function(e){
        mouseXY(e);
    });

    function mouseXY(e){
        data.mouse=data.canvas.getPointer(e)
    }
});