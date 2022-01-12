import { Drawable } from "../core";

type Float = number;

export type Context = { draw:(drawable:Drawable, frame:Float)=>void }

