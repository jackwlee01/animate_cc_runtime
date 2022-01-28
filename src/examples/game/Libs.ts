import { Canvas2dScene } from "../../Canvas2dScene";
import { Library } from "../../core/Library";
import { App } from "./App";


export class Libs{

    private app:App

    test:Library



    constructor(app:App, scene:Canvas2dScene){
        this.app = app;

        this.test = scene.createLibrary('test', './test')
    }


    load = async () => {
        await this.test.loadData()
    }


}