import { Atlas } from "../Atlas";
import { Library } from "../Library";
import { Sprite } from "../Sprite";
import { AnimationJson } from "./AnimationJson";

/*
function parseLibraryData(path:string){
    var lib = new Library({
        atlases:[]
    })

    spriteMapJsonArr.forEach(data => lib.atlases.push(parseSpriteData(library, path+data.meta. )))
}
*/

async function loadLibraryData(folder:string){
    var animationDataRequest = await fetch(folder + "/Animation.json");
    var animationData:AnimationJson = await animationDataRequest.json();

    var library = new Library();
}


//async function loadSpriteData(library:Library, path:string, )


function parseSpriteData(library:Library, imagePath:string, data:SpriteMapJson):Atlas{
    var image = new Image(data.meta.size.w, data.meta.size.h);
    image.src = imagePath;

    const atlas = new Atlas({
        app: data.meta.app,
        version: data.meta.version,
        format: data.meta.format,
        size: data.meta.size,
        resolution: data.meta.resolution,
        imagePath,
        library,
        image,
    })

    data.atlas.Sprites.forEach(data => {
        new Sprite({
            name: data.sprite.name,
            id: data.sprite.name,
            totalFrames: 0,
            library,
            atlas,
            x: data.sprite.x,
            y: data.sprite.y,
            w: data.sprite.w,
            h: data.sprite.h,
            rotated: data.sprite.rotated,
        })
    })

    return atlas;
}
