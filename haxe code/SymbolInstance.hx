package animation;


class SymbolInstance{
    
    public var symbolName:String;
    public var symbol:Symbol;
    public var symbolType:SymbolKind;
    public var instance:Instance;
    public var color:Null<Color>;
    public var loop:LoopKind;
    public var firstFrame:Null<Float>;
    public function new(instance:Instance) this.instance = instance;


    public static function fromJson(frameData:Frame, library:Library, element:animation.json.AnimationJson.Element, index:Int){
        var instance = new Instance(frameData, library, index);
                
        instance.name = element.symbolInstance.instanceName;
        instance.id = frameData.id + '--' + frameData.instances.length;
        instance.decomposedMatrix.Position.x = element.symbolInstance.decomposedMatrix.position.x;
        instance.decomposedMatrix.Position.y = element.symbolInstance.decomposedMatrix.position.y;
        instance.decomposedMatrix.Rotation.x = element.symbolInstance.decomposedMatrix.rotation.x;
        instance.decomposedMatrix.Rotation.y = element.symbolInstance.decomposedMatrix.rotation.y;
        instance.decomposedMatrix.Rotation.z = element.symbolInstance.decomposedMatrix.rotation.z;
        instance.decomposedMatrix.Scaling.x = element.symbolInstance.decomposedMatrix.scaling.x;
        instance.decomposedMatrix.Scaling.y = element.symbolInstance.decomposedMatrix.scaling.y;
        instance.decomposedMatrix.Scaling.z = element.symbolInstance.decomposedMatrix.scaling.z;
        
        instance.setFilters(element.symbolInstance.filters);

        instance.matrix = Matrix.identity();

        instance.matrix._00 = element.symbolInstance.matrix3D.m00;
        instance.matrix._10 = element.symbolInstance.matrix3D.m10;
        instance.matrix._20 = element.symbolInstance.matrix3D.m30;

        instance.matrix._01 = element.symbolInstance.matrix3D.m01;
        instance.matrix._11 = element.symbolInstance.matrix3D.m11;
        instance.matrix._21 = element.symbolInstance.matrix3D.m31;

        var symbolInstance = new SymbolInstance(instance);
        if(element.symbolInstance.color != null){
            symbolInstance.color = new Color();
            symbolInstance.color.alphaMultiplier = element.symbolInstance.color.alphaMultiplier;
            symbolInstance.color.mode = element.symbolInstance.color.mode;
        }else{
            symbolInstance.color = null;
        }
        symbolInstance.firstFrame = element.symbolInstance.firstFrame;
        //symbolInstance.instanceName = element.symbolInstance.Instance_Name;
        symbolInstance.loop = switch(element.symbolInstance.loop){
            case 'loop': Loop;
            case 'playonce': PlayOnce;
            case 'singleframe': SingleFrame;
            case 'playonceReverse': PlayOnceReverse;
            case 'loopReverse': LoopReverse;
            default: Loop;
        }
        symbolInstance.symbolName = element.symbolInstance.symbolName;
        instance.elementName = symbolInstance.symbolName;
        symbolInstance.symbolType = switch(element.symbolInstance.symbolType){
            case 'movieclip': MovieClip;
            case 'graphic': Graphic;
            default: throw("Unsupport symbol type: " + element.symbolInstance.symbolType);
        }

        // HACKY FIX
        //symbolInstance.transformationPoint.x = element.symbolInstance.transformationPoint.x;
        //symbolInstance.transformationPoint.y = element.symbolInstance.transformationPoint.y;
        instance.transformationPoint.x = Reflect.field(element.symbolInstance.transformationPoint, 'x');
        instance.transformationPoint.y = Reflect.field(element.symbolInstance.transformationPoint, 'y');

        instance.element = Element.Symbol(symbolInstance);
        instance.elementName = symbolInstance.symbolName;
        
        library.addDrawable(instance);
        return instance;
    }

}