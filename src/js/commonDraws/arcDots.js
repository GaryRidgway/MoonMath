function arcDots(radialSplayConfig, arcDotsConfig, explicitStartDeg = 0,) {
    const levels = arcDotsConfig.levels;
    const gap = arcDotsConfig.gap;
    const minsize = arcDotsConfig.minsize;
    let StartDeg = 0;
    if (arcDotsConfig.explicitStartDeg) {
        StartDeg = arcDotsConfig.explicitStartDeg;
    }
    if (explicitStartDeg !== 0) {
        StartDeg = explicitStartDeg;
    }

    const maxsize = arcDotsConfig.maxsize;
    const fade = arcDotsConfig.fade ? arcDotsConfig : false;
    const objects = arcDotsConfig.objects;
    const increment = levels === 1 ? 0 : (maxsize - minsize) / (levels - 1);
    const degrees = arcDotsConfig.degrees;
    let shouldReduce = degrees === 360 ? 0 : 1;
    if (arcDotsConfig.shouldReduce !== undefined) {
        shouldReduce = arcDotsConfig.shouldReduce ? 1 : 0;
    }


    for(let i = 0; i < levels; i++) {

        let reduceOddsByOne = 0;
        if (degrees !== 360 && arcDotsConfig.shouldReduce === false) {
            reduceOddsByOne = 1;
        }

        let rotation = 0;
        if (shouldReduce === 1) {
            rotation = (StartDeg + (degrees/objects) * (i * 0.5)) % 360;
        }
        else {
            rotation = (StartDeg + (degrees/objects) * (i%2 * 0.5)) % 360;
        }

        // If we fade, we fade from opacity 1 - 0.2;
        let fadeInc = 0;
        let opacityStart = arcDotsConfig.fadeOpacityStart ? arcDotsConfig.fadeOpacityStart : 1;
        let opacityEnd = arcDotsConfig.fadeOpacityEnd ? arcDotsConfig.fadeOpacityEnd : 0.2;
        if (fade) {
            fadeInc = levels === 1 ? 0 : (opacityStart - opacityEnd) / (levels - 1);
        }

        let opacity = 1;
        if (fade) {
            opacity = levels === 1 ? opacityStart : opacityEnd + (fadeInc * (levels - 1 - i))
        }

        render.push(new RadialSplay(
            Circle,
            {
                'is-mask': radialSplayConfig['is-mask'],
                x:  0,
                y:  0,
                r: levels === 1 ? maxsize : minsize + (increment * (levels - 1 - i)),
                fill: radialSplayConfig.stroke,
                opacity: opacity
            },
            radialSplayConfig,
            {
                gap: gap * i,
    
                // Only reduce the objects if the arc is not 360 degrees.
                objCount: objects - (i * shouldReduce) - (i%2 * reduceOddsByOne),
                rotation: rotation,
    
                // Only reduce the draw arc degrees if the arc is not 360 degrees.
                degrees: degrees 
                - ((i * (degrees / objects)) * shouldReduce)
                - ((i%2 * (degrees / objects)) * reduceOddsByOne)
            }
        ));
    }
}
