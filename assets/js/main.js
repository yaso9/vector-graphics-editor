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
    let x = data.mouse.x;
    let y = data.mouse.y;
    let pathstr = "";

    if(data.lastpathstr === undefined)
    {
        data.originalpathx=x;
        data.originalpathy=y;
        data.pathcoords = [x, y];
        pathstr=data.lastpathstr='M 0 0';
    }
    else {
        data.canvas.remove(data.lastpath)
        pathstr = data.lastpathstr+' L '+(x-data.originalpathx)+' '+(y-data.originalpathy);

        if (x < data.pathcoords[0]) {
            data.pathcoords[0] = x;
        }

        if (y < data.pathcoords[1]) {
            data.pathcoords[1] = y;
        }
    }
    var path=new fabric.Path(pathstr);
    path.set({top: data.pathcoords[1], left: data.pathcoords[0], stroke: '#' + data.color.toHex(), fill: false, selectable: false});
    data.canvas.add(path);
    data.lastpathx=x;
    data.lastpathy=y;
    data.lastpathstr=pathstr;
    data.lastpath=path;
}

function newOval() {
    data.canvas.add(new fabric.Circle({
        fill: '#' + data.color.toHex(),
        left: data.mouse.x,
        top: data.mouse.y,
        radius: 50
    }));
}

function newPolygon() {
    let x = data.mouse.x;
    let y = data.mouse.y;
    let pathstr = "";

    if(data.lastpathstr === undefined)
    {
        data.originalpathx=x;
        data.originalpathy=y;
        data.pathcoords = [x, y];
        pathstr=data.lastpathstr='M 0 0';
    }
    else {
        data.canvas.remove(data.lastpath)
        pathstr = data.lastpathstr+' L '+(x-data.originalpathx)+' '+(y-data.originalpathy);

        if (x < data.pathcoords[0]) {
            data.pathcoords[0] = x;
        }

        if (y < data.pathcoords[1]) {
            data.pathcoords[1] = y;
        }
    }
    var path=new fabric.Path(pathstr);
    path.set({top: data.pathcoords[1], left: data.pathcoords[0], fill: '#' + data.color.toHex(), selectable: false});
    data.canvas.add(path);
    data.lastpathx=x;
    data.lastpathy=y;
    data.lastpathstr=pathstr;
    data.lastpath=path;
}

function openColorPicker() {
    // let colorPicker = document.getElementById('color-picker');
    // let colorTextbox = document.getElementById('color-textbox');
    //
    // colorTextbox.value = data.color.toHex();
    // colorPicker.style.display = 'block';
    //
    // function clickHandler() {
    //     setTimeout(() => {
    //         if (colorTextbox === document.activeElement)
    //             return;
    //
    //         document.removeEventListener('click', clickHandler);
    //         colorPicker.style.display = 'none';
    //     }, 10);
    // }
    // setTimeout(() => {
    //     document.addEventListener('click', clickHandler);
    // }, 10);

    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.addEventListener('change', () => {
        data.color = fabric.Color.fromHex(colorPicker.value);
    });
    colorPicker.style.display = 'none';
    document.body.appendChild(colorPicker);
    colorPicker.click();
}

function openProperties() {
    if (data.canvas.getActiveObjects().length != 1)
        return;

    let propertiesBox = document.getElementById('properties');
    propertiesBox.innerHTML = '';

    let setColorButton = document.createElement('button');
    setColorButton.innerText = 'Set Color';
    setColorButton.addEventListener('click', () => {
        data.canvas.getActiveObject().set(data.canvas.getActiveObject().type != 'path' ? 'fill' : 'stroke', '#' + data.color.toHex());
        data.canvas.renderAll();
    });
    propertiesBox.appendChild(setColorButton);

    propertiesBox.appendChild(document.createElement('br'));

    let xPosLabel = document.createElement('label');
    xPosLabel.htmlFor = 'x-pos-in';
    xPosLabel.innerText = 'X Coords: ';
    propertiesBox.appendChild(xPosLabel);
    let xPosIn = document.createElement('input');
    xPosIn.type = 'number';
    xPosIn.id = 'x-pos-in';
    xPosIn.value = data.canvas.getActiveObject().left;
    xPosIn.addEventListener('change', () => {
        data.canvas.getActiveObject().set('left', parseInt(xPosIn.value));
        data.canvas.getActiveObject().setCoords();
        data.canvas.renderAll();
    });
    propertiesBox.appendChild(xPosIn);

    propertiesBox.appendChild(document.createElement('br'));

    let yPosLabel = document.createElement('label');
    yPosLabel.htmlFor = 'y-pos-in';
    yPosLabel.innerText = 'Y Coords: ';
    propertiesBox.appendChild(yPosLabel);
    let yPosIn = document.createElement('input');
    yPosIn.type = 'number';
    yPosIn.id = 'y-pos-in';
    yPosIn.value = data.canvas.getActiveObject().top;
    yPosIn.addEventListener('change', () => {
        data.canvas.getActiveObject().set('top', parseInt(yPosIn.value));
        data.canvas.getActiveObject().setCoords();
        data.canvas.renderAll();
    });
    propertiesBox.appendChild(yPosIn);

    propertiesBox.appendChild(document.createElement('a'));

    let rotationLabel = document.createElement('label');
    rotationLabel.htmlFor = 'rotation-in';
    rotationLabel.innerText = 'Rotation: ';
    propertiesBox.appendChild(rotationLabel);
    let rotationIn = document.createElement('input');
    rotationIn.type = 'number';
    rotationIn.id = 'rotation-in';
    rotationIn.value = data.canvas.getActiveObject().get('angle');
    rotationIn.addEventListener('change', () => {
        data.canvas.getActiveObject().set('angle', parseInt(rotationIn.value));
        data.canvas.renderAll();
    });
    propertiesBox.appendChild(rotationIn);

    propertiesBox.appendChild(document.createElement('br'));

    let widthLabel = document.createElement('label');
    widthLabel.htmlFor = 'width-in';
    widthLabel.innerText = 'Width: ';
    propertiesBox.appendChild(widthLabel);
    let widthIn = document.createElement('input');
    widthIn.type = 'number';
    widthIn.id = 'width-in';
    widthIn.value = data.canvas.getActiveObject().width * data.canvas.getActiveObject().scaleX;
    widthIn.addEventListener('change', () => {
        data.canvas.getActiveObject().set('scaleX', parseInt(widthIn.value) / data.canvas.getActiveObject().width);
        data.canvas.renderAll();
    });
    propertiesBox.appendChild(widthIn);

    propertiesBox.appendChild(document.createElement('br'));

    let heightLabel = document.createElement('label');
    heightLabel.htmlFor = 'height-in';
    heightLabel.innerText = 'height: ';
    propertiesBox.appendChild(heightLabel);
    let heightIn = document.createElement('input');
    heightIn.type = 'number';
    heightIn.id = 'height-in';
    heightIn.value = data.canvas.getActiveObject().height * data.canvas.getActiveObject().scaleX;
    heightIn.addEventListener('change', () => {
        data.canvas.getActiveObject().set('scaleY', parseInt(heightIn.value) / data.canvas.getActiveObject().height);
        data.canvas.renderAll();
    });
    propertiesBox.appendChild(heightIn);

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

function saveFile() {
    let downloadLink = document.createElement('a');
    downloadLink.download = 'Vector Graphics.svg';
    downloadLink.href = URL.createObjectURL(new Blob([data.canvas.toSVG()], {type: 'text/plain'}));
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
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
            },
            {
                name: 'Save File',
                icon: 'saveFile',
                immediate: true,
                action: saveFile
            },
            {
                name: 'Polygon',
                icon: 'polygon',
                immediate: false,
                action: newPolygon
            }
        ],

        // ============
        // END CONSTS
        // ============

        //  Current mouse pointer
        mouse: undefined,
        //  Currently selected tool
        tool: undefined,
        //  In progress path coords
        lastpath: undefined,
        originalpathx: undefined,
        originalpathy: undefined,
        lastpathx: undefined,
        lastpathy: undefined,
        lastpathstr: undefined,
        pathcoords: undefined,

        selectedToolElement: undefined,

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
        el.addEventListener('click', () => {
            if(data.tool !== undefined && (data.tool.name === 'Line' || data.tool.name === 'Polygon')) {
                if (data.lastpath !== undefined)
                    data.lastpath.set('selectable', true);
                data.originalpathx = undefined;
                data.originalpathy = undefined;
                data.lastpath = undefined;
                data.lastpathx = undefined;
                data.lastpathy = undefined;
                data.lastpathstr = undefined;
                data.pathcoords = undefined;
            }

            if (data.selectedToolElement !== undefined)
                data.selectedToolElement.classList.remove('active');
            el.classList.add('active');
            data.selectedToolElement = el;

            if (tool.immediate) {
                tool.action();
                return;
            }

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