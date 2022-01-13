type Float = number;
type Int = number;


export type Matrix3D = Float[] | {
    m00:Float;
    m01:Float;
    m02:Float;
    m03:Float;
    m10:Float;
    m11:Float;
    m12:Float;
    m13:Float;
    m20:Float;
    m21:Float;
    m22:Float;
    m23:Float;
    m30:Float;
    m31:Float;
    m32:Float;
    m33:Float;
}


export type Point2D = {
    x:Float;
    y:Float;
}


export type Position = {
    x:Float;
    y:Float;
    z:Float;
}


export type Rotation = {
    x:Float;
    y:Float;
    z:Float;
}


export type Scaling = {
    x:Float;
    y:Float;
    z:Float;
}


export type DecomposedMatrix = {
    position:Position;
    rotation:Rotation;
    scaling:Scaling;
}



export type TransformationPoint = {
    x:Float;
    y:Float;
}


export type Color = {
    mode:string;
    alphaMultiplier:Float;
}


export type AtlasSpriteInstance = {
    name:string;
    matrix3D:Matrix3D;
    decomposedMatrix:DecomposedMatrix;
    filters?:any;
}


export type SymbolInstance = {
    symbolName:string;
    instanceName:string;
    transformationPoint:Point2D;
    matrix3D:Matrix3D;
    decomposedMatrix:DecomposedMatrix;
    filters?:any;
    firstFrame?:Int;
    color?:Color;
} & ({
    symbolType: "graphic",
    firstFrame: number,
    loop: "loop", // TODO: HANDLE OTHER LOOP TYPES
} | {
    symbolType: "movieclip",
})


export type ElementInstance = {
    atlasSpriteInstance:AtlasSpriteInstance;
} | {
    symbolInstance:SymbolInstance;
}


export type Keyframe = {
    index:Int;
    duration:Int;
    elements:Array<ElementInstance>;
    name?:string;
}


export type Layer = {
    layerName:string;
    frames:Array<Keyframe>;
}


export type Timeline = {
    layers:Array<Layer>;
}


export type AnimationRoot = {
    name:string;
    symbolName:string;
    timeline:Timeline;
}


export type LibrarySymbol = {
    symbolName:string;
    timeline:Timeline;
}


export type SymbolDictionary = {
    symbols:Array<LibrarySymbol>;
}


export type Metadata = {
    framerate:Float;
}


export type AnimationJson = {
    animation:AnimationRoot;
    symbolDictionary:SymbolDictionary;
    metadata:Metadata;
}
