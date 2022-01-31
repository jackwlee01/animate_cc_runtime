import { App } from "./App";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
if(!canvas) throw("A canvas element is id #canvas is required")

const ctx2d = canvas.getContext('2d')
if(!ctx2d) throw("Could not get 2d canvas context")

const app = new App(ctx2d);
