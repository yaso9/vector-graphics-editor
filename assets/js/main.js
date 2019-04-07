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
        stroke: '#' + data.color.toHex(),
    }));
    data.lastpathx=x;
    data.lastpathy=y;
}
function newOval() {
    data.canvas.add(new fabric.Circle({
        fill: '#' + data.color.toHex(),
        left: data.mouse.x,
        top: data.mouse.y,
        radius: 50
    }));
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

function openProperties() {
    if (data.canvas.getActiveObjects().length != 1)
        return;

    let propertiesBox = document.getElementById('properties');
    propertiesBox.innerHTML = '';

    let setColorButton = document.createElement('button');
    setColorButton.innerText = 'Set Color';
    setColorButton.addEventListener('click', () => {
        data.canvas.getActiveObject().set('fill', '#' + data.color.toHex());
        data.canvas.renderAll();
    });
    propertiesBox.appendChild(setColorButton);

    propertiesBox.style.display = 'block';

    function clickHandler() {
        setTimeout(() => {
            let found = false;
            propertiesBox.childNodes.forEach((el) => {
                if (el === document.activeElement)
                    found = true;
            });

            if (found)
                return;

            document.removeEventListener('click', clickHandler);
            propertiesBox.style.display = 'none';
        }, 10);
    }
    setTimeout(() => {
        document.addEventListener('click', clickHandler);
    }, 10);
}

function deselectTool() {
    data.tool = undefined;
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
            },
            {
                name: 'Properties',
                icon: 'properties',
                immediate: true,
                action: openProperties
            },
            {
                name: 'Deselect Tool Tool',
                icon: 'deselectTool',
                immediate: true,
                action: deselectTool
            },
            {
                name: 'Oval',
                icon: 'oval',
                immediate: false,
                action: newOval
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
        if(data.tool!==undefined && data.canvas.getActiveObjects().length == 0) {
            data.tool.action();
        }
    });
    
    data.canvas.on('mouse:move', function(e){
        mouseXY(e);
    });

    function mouseXY(e){
        data.mouse=data.canvas.getPointer(e)
    }
});