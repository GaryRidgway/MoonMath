const render = [];
let rand = null;

document.addEventListener("DOMContentLoaded", function(event) { 
    rand = randFromSeed('Alan Way');
    const base = {
        x: 200,
        y: 200,
        r: 100,
        'is-mask': true,
        svgc: 'svgc',
        stroke: '#ffffff'
    }

    const centerCircleR = base.r * .45;

    //#region arcDots
    const arc1DotsConf = {
        levels: 1,
        gap: 5,
        minsize: 0.05,
        maxsize: 2.2,
        objects: 50,
        degrees: 360,
    }

    const arc2Base = {...base};
    arc2Base.r = base.r + arc1DotsConf.gap;


    const offset = 10;
    const arc11DotsConf = {...arc1DotsConf};
    arc11DotsConf.degrees = 160;
    arc11DotsConf.objects = 25;
    arcDots(base, arc11DotsConf, offset);

    const arc12DotsConf = {...arc11DotsConf};
    arc12DotsConf.levels = 4
    arc12DotsConf.maxsize = 1
    arc12DotsConf.minsize = 0.02
    startDeg = offset +arc12DotsConf.degrees / arc12DotsConf.objects / 2; 

    arcDots(arc2Base, arc12DotsConf, startDeg);

    arcDots(base, arc11DotsConf, offset + 180);

    arcDots(arc2Base, arc12DotsConf, startDeg + 180);
    //#endregion arcDots
    
    //#region centerCircle
    render.push(new Circle(base));
    
    render.push(new Circle(base, {r: centerCircleR}));

    render.push(new Circle(base, {r: base.r * .40, fill: base.stroke}));

    render.push(new RadialSplay(
        Circle,
        {
            'is-mask': true,
            r: 1,
            fill: base.stroke
        },
        base,
        {
            r: base.r - 55,
            objCount: 2,
            rotation: 90
        }
    ));

    //#endregion centerCircle

    //#region verticalCircles

    // The actual circles of the moons.
    const yOff = 55;
    render.push(new RadialSplay(
        Moon,
        {
            'is-mask': true,
            yOffset: yOff,
            r: centerCircleR,
            fill: base.stroke
        },
        base,
        {
            r: base.r - 10,
            objCount: 2,
        }
    ));

    render.push(new RadialSplay(
        Moon,
        {
            'is-mask': true,
            r: centerCircleR + 1,
            fill: base.stroke
        },
        base,
        {
            r: base.r - 10,
            objCount: 2,
        }
    ));

    // The inside splays.
    const arc3Base = {...base};
    const arc31DotsConf = {...arc1DotsConf};

    arc3Base.r = centerCircleR - 2.4;
    arc3Base['is-mask'] = true;
    arc3Base.y = base.y + centerCircleR*2 + yOff
    
    arc31DotsConf.degrees = 99;
    arc31DotsConf.gap = -2;
    arc31DotsConf.objects = 23;
    arc31DotsConf.levels = 1;
    arc31DotsConf.maxsize = 0.7;
    arc31DotsConf.minsize = 0.004;
    arc31DotsConf.shouldReduce = false;
    arc31DotsConf.fade = true,
    arc31DotsConf.fadeOpacityStart = 0.9,
    arc31DotsConf.fadeOpacityEnd = 0.05
    rotaryOffset = 133;

    arcDots(arc3Base, arc31DotsConf, rotaryOffset);

    const arc32Base = {...arc3Base};
    const arc32DotsConf  = {...arc31DotsConf};
    arc32Base.r = arc32Base.r -2.5;

    arc32DotsConf.degrees = 104;
    arc32DotsConf.maxsize = 0.2;
    arc32DotsConf.objects = arc31DotsConf.objects + 1;
    arc32DotsConf.levels = 4;
    arc32DotsConf.fadeOpacityStart = 0.8,
    arc32DotsConf.fadeOpacityEnd = 0.05

    arcDots(arc32Base, arc32DotsConf, rotaryOffset-2.5);

    const arc33Base = {...arc3Base};
    arc33Base.y = base.y - centerCircleR*2 - yOff
    const arc34Base = {...arc32Base};
    arc34Base.y = base.y - centerCircleR*2 - yOff
    arcDots(arc33Base, arc31DotsConf, rotaryOffset + 180);
    arcDots(arc34Base, arc32DotsConf, rotaryOffset + 180-2.5);

    //#endregion verticalCircles

    //#region largeDecShapes
    render.push(new Circle(
        base,
        {
            r: base.r*.45*3
        }
    ))
    // render.push(new Circle(
    //     base,
    //     {
    //         r: base.r*.45*3 + 19
    //     }
    // ))

    // render.push(new Rect(
    //     base,
    //     {
    //         width: 217,
    //         height: 217,
    //         rotation: 45
    //     }
    // ))

    //#endregion largeDecShapes

    let decoLines = {...base};
    decoLines.x = 0;
    decoLines.y = 0;
    const length = base.r * .5;
    decoLines.x2 = decoLines.x + base.x;
    decoLines.y2 = decoLines.y + base.y + length;
    decoLines.randomness = true;

    render.push(new RadialSplay(
        Line,
        decoLines,
        {
            'is-mask': true,
            r: base.r * .45,
            x: base.x,
            y: base.y,
            objCount: 100,
            degrees: 360
        }
    ));

    render.push(new Shape(
        base,
        {
            'is-mask': true,
            pointsArray: [
                {x: 0, y: -46},
                {x: 250, y: 0},
                {x: 0, y: 46},
                {x: -250, y: 0},
            ],
            referenceOrigin: true
        }
    ));

    // let decoLines2 = {...decoLines};
    // decoLines2.x = 0;
    // decoLines2.y = 0;
    // decoLines2.x2 = decoLines2.x + base.x;
    // decoLines2.y2 = decoLines2.y + base.y + 19;
    // decoLines2.randomness = false;
    // render.push(new RadialSplay(
    //     Line,
    //     decoLines2,
    //     {
    //         'is-mask': true,
    //         r: base.r + 35,
    //         x: base.x,
    //         y: base.y,
    //         objCount: 20,
    //         degrees: 360
    //     }
    // ));

    draw();

    function draw() {
        render.forEach(function(element) {
            element.draw();
        })
    }
});