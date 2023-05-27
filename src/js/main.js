const render = [];
document.addEventListener("DOMContentLoaded", function(event) { 
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
            x:  base.x + 0,
            y:  base.y + 0,
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


    // render.push(new Circle(
    //     base,
    //     {
    //         'is-mask': false,
    //         stroke: base.stroke,
    //         y: base.y + centerCircleR*2 + yOff,
    //         r: centerCircleR + 1,
    //     }
    // ));

    //#endregion verticalCircles

    draw();

    function draw() {
        render.forEach(function(element) {
            element.draw();
        })
    }
});