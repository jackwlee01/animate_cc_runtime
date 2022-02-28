import { Drawable } from "./Drawable";
import { Frame } from "./Frame";
import { DrawableProps } from './Drawable';
import { Matrix } from "./geom/Matrix";
import { JsonColor, JsonFilters } from "./json/AnimationJson";
import { Float } from "./types/Float";
export declare type InstanceProps = Omit<DrawableProps, 'id' | 'library'> & {
    itemName: string;
    matrix?: Matrix;
    frame: Frame;
    filters?: JsonFilters | null;
    color?: JsonColor | null;
};
export declare class Instance extends Drawable {
    matrix: Matrix;
    frame: Frame;
    index: number;
    itemName: string;
    filters: JsonFilters | null;
    color: JsonColor | null;
    constructor(props: InstanceProps);
    get prev(): Instance | undefined;
    get next(): Instance | undefined;
    get item(): Drawable;
    draw(frame: Float, lerp?: boolean, callback?: (item: Drawable, frame: Float, lerp?: boolean) => void): void;
}
//# sourceMappingURL=Instance.d.ts.map