type Float = number;
type Int = number;
type StringColor = string;


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
    mode:'Alpha'|'CA',
    alphaMultiplier:Float,
} | {
    mode: 'Brightness',
    brightness: Float,
} | {
    mode: 'Tint',
    tintColor: StringColor,
    tintMultiplier: Float,
} | {
    mode: 'Advanced'|'AD',
    redMultiplier: Float,
    greenMultiplier: Float,
    blueMultiplier: Float,
    alphaMultiplier: Float,
    redOffset: Float,
    greenOffset: Float,
    blueOffset: Float,
    alphaOffset: Float
}


export type FilterType = 'DropShadowFilter' | 'BlurFilter' | 'GlowFilter' | 'GradientGlowFilter' | 'GradientBevelFilter' | 'AdjustColorFilter'
export type Filter = FilterDropShadow|FilterBlur|FilterGlow|FilterGradientGlow|FilterGradientBevel;
export type FilterDropShadow = {
    angle: Float,
    blurX: Float,
    blurY: Float,
    color: StringColor,
    alpha: Float,
    distance: Float,
    hideObject: boolean,
    inner: boolean,
    knockout: boolean,
    quality: Int,
    strength: Float,
}
export type FilterBlur = {
    blurX: Float,
    blurY: Float,
    quality: Int,
}
export type FilterGlow = {
    blurX: Float,
    blurY: Float,
    color: StringColor,
    alpha: Float,
    quality: Int,
    strength: Float,
    knockout: boolean,
    inner: boolean,
}
export type FilterGradientGlow = {
    angle: Float,
    blurX: Float,
    blurY: Float,
    quality: Int,
    distance: Float,
    knockout: boolean,
    strength: Float,
    type: 'outer'|'inner'|'full',
    gradientEntries: Array<{
        ratio: Float,
        color: string,
        alpha: Float,
    }>
}

export type FilterGradientBevel = {
    angle: Float,
    blurX: Float,
    blurY: Float,
    quality: Int,
    distance: Float,
    knockout: boolean,
    strength: Float,
    type: 'outer'|'inner'|'full',
    gradientEntries: Array<{
        ratio: Float,
        color: string,
        alpha: Float,
    }>
}

export type FilterAdjustColor = {
    brightness: Float,
    contrast: Float,
    saturation: Float,
    hue: Float,
}

// WARNING: DUPLICATE KEYS MAY EXIST IN JSON!!!! WHY THE HECK ISN'T THIS AN ARRAY??!!
export type Filters = {
    DropShadowFilter?:FilterDropShadow,
    BlurFilter?:FilterBlur,
    GlowFilter?:FilterGlow,
    GradientGlow?:FilterGradientGlow,
    GradientBevel?:FilterGradientBevel,
    AdjustColor?:FilterAdjustColor,
}

export type AtlasSpriteInstance = {
    name:string;
    matrix3D:Matrix3D;
    decomposedMatrix:DecomposedMatrix;
    filters?:Filters;
}


export type SymbolInstance = {
    symbolName:string;
    instanceName:string;
    transformationPoint:Point2D;
    matrix3D:Matrix3D;
    decomposedMatrix:DecomposedMatrix;
    filters?:Filters;
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
    layerType?: "Clipper";
    clippedBy?: string;
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
