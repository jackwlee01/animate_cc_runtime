import { Float } from "../types/Float";
import { Int } from "../types/Int";
import { StringColor } from "../types/StringColor";
export declare type JsonMatrix3D = Float[] | {
    m00: Float;
    m01: Float;
    m02: Float;
    m03: Float;
    m10: Float;
    m11: Float;
    m12: Float;
    m13: Float;
    m20: Float;
    m21: Float;
    m22: Float;
    m23: Float;
    m30: Float;
    m31: Float;
    m32: Float;
    m33: Float;
};
export declare type JsonPoint2D = {
    x: Float;
    y: Float;
};
export declare type JsonPosition = {
    x: Float;
    y: Float;
    z: Float;
};
export declare type JsonRotation = {
    x: Float;
    y: Float;
    z: Float;
};
export declare type JsonScaling = {
    x: Float;
    y: Float;
    z: Float;
};
export declare type JsonDecomposedMatrix = {
    position: JsonPosition;
    rotation: JsonRotation;
    scaling: JsonScaling;
};
export declare type JsonTransformationPoint = {
    x: Float;
    y: Float;
};
export declare type JsonColor = {
    mode: 'Alpha' | 'CA';
    alphaMultiplier: Float;
} | {
    mode: 'Brightness';
    brightness: Float;
} | {
    mode: 'Tint';
    tintColor: StringColor;
    tintMultiplier: Float;
} | {
    mode: 'Advanced' | 'AD';
    redMultiplier: Float;
    greenMultiplier: Float;
    blueMultiplier: Float;
    alphaMultiplier: Float;
    redOffset: Float;
    greenOffset: Float;
    blueOffset: Float;
    alphaOffset: Float;
};
export declare type JsonFilterType = 'DropShadowFilter' | 'BlurFilter' | 'GlowFilter' | 'GradientGlowFilter' | 'GradientBevelFilter' | 'AdjustColorFilter';
export declare type JsonFilter = JsonFilterDropShadow | JsonFilterBlur | JsonFilterGlow | JsonFilterGradientGlow | JsonFilterGradientBevel;
export declare type JsonFilterDropShadow = {
    angle: Float;
    blurX: Float;
    blurY: Float;
    color: StringColor;
    alpha: Float;
    distance: Float;
    hideObject: boolean;
    inner: boolean;
    knockout: boolean;
    quality: Int;
    strength: Float;
};
export declare type JsonFilterBlur = {
    blurX: Float;
    blurY: Float;
    quality: Int;
};
export declare type JsonFilterGlow = {
    blurX: Float;
    blurY: Float;
    color: StringColor;
    alpha: Float;
    quality: Int;
    strength: Float;
    knockout: boolean;
    inner: boolean;
};
export declare type JsonFilterGradientGlow = {
    angle: Float;
    blurX: Float;
    blurY: Float;
    quality: Int;
    distance: Float;
    knockout: boolean;
    strength: Float;
    type: 'outer' | 'inner' | 'full';
    gradientEntries: Array<{
        ratio: Float;
        color: string;
        alpha: Float;
    }>;
};
export declare type JsonFilterGradientBevel = {
    angle: Float;
    blurX: Float;
    blurY: Float;
    quality: Int;
    distance: Float;
    knockout: boolean;
    strength: Float;
    type: 'outer' | 'inner' | 'full';
    gradientEntries: Array<{
        ratio: Float;
        color: string;
        alpha: Float;
    }>;
};
export declare type JsonFilterAdjustColor = {
    brightness: Float;
    contrast: Float;
    saturation: Float;
    hue: Float;
};
export declare type JsonFilters = {
    DropShadowFilter?: JsonFilterDropShadow;
    BlurFilter?: JsonFilterBlur;
    GlowFilter?: JsonFilterGlow;
    GradientGlow?: JsonFilterGradientGlow;
    GradientBevel?: JsonFilterGradientBevel;
    AdjustColor?: JsonFilterAdjustColor;
};
export declare type JsonAtlasSpriteInstance = {
    name: string;
    matrix3D: JsonMatrix3D;
    decomposedMatrix: JsonDecomposedMatrix;
    filters?: JsonFilters;
};
export declare type JsonSymbolInstance = {
    symbolName: string;
    instanceName: string;
    transformationPoint: JsonPoint2D;
    matrix3D: JsonMatrix3D;
    decomposedMatrix: JsonDecomposedMatrix;
    filters?: JsonFilters;
    firstFrame?: Int;
    color?: JsonColor;
} & ({
    symbolType: "graphic";
    firstFrame: number;
    loop: "loop";
} | {
    symbolType: "movieclip";
});
export declare type JsonElementInstance = {
    atlasSpriteInstance: JsonAtlasSpriteInstance;
} | {
    symbolInstance: JsonSymbolInstance;
};
export declare type JsonKeyframe = {
    index: Int;
    duration: Int;
    elements: Array<JsonElementInstance>;
    name?: string;
};
export declare type JsonLayer = {
    layerName: string;
    layerType?: "Clipper";
    clippedBy?: string;
    frames: Array<JsonKeyframe>;
};
export declare type JsonTimeline = {
    layers: Array<JsonLayer>;
};
export declare type JsonAnimationRoot = {
    name: string;
    symbolName: string;
    timeline: JsonTimeline;
};
export declare type JsonLibrarySymbol = {
    symbolName: string;
    timeline: JsonTimeline;
};
export declare type JsonSymbolDictionary = {
    symbols: Array<JsonLibrarySymbol>;
};
export declare type JsonMetadata = {
    framerate: Float;
};
export declare type JsonAnimationData = {
    animation: JsonAnimationRoot;
    symbolDictionary: JsonSymbolDictionary;
    metadata: JsonMetadata;
};
//# sourceMappingURL=AnimationJson.d.ts.map