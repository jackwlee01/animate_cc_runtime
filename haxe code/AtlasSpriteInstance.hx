package animation;


class AtlasSpriteInstance {

    public var instance:Instance;
    public var sprite:Sprite;
    public function new(instance:Instance) this.instance = instance;


    public static function fromJson(frameData:Frame, library:Library, element:animation.json.AnimationJson.Element, index:Int){
        var instance = new Instance(frameData, library, index);
        instance.name = element.atlasSpriteInstance.name;
        instance.id = frameData.id + "--" + frameData.instances.length;

        instance.decomposedMatrix.Position.x = element.atlasSpriteInstance.decomposedMatrix.position.x;
        instance.decomposedMatrix.Position.y = element.atlasSpriteInstance.decomposedMatrix.position.y;
        instance.decomposedMatrix.Rotation.x = element.atlasSpriteInstance.decomposedMatrix.rotation.x;
        instance.decomposedMatrix.Rotation.y = element.atlasSpriteInstance.decomposedMatrix.rotation.y;
        instance.decomposedMatrix.Rotation.z = element.atlasSpriteInstance.decomposedMatrix.rotation.z;
        instance.decomposedMatrix.Scaling.x = element.atlasSpriteInstance.decomposedMatrix.scaling.x;
        instance.decomposedMatrix.Scaling.y = element.atlasSpriteInstance.decomposedMatrix.scaling.y;
        instance.decomposedMatrix.Scaling.z = element.atlasSpriteInstance.decomposedMatrix.scaling.z;

        instance.setFilters(element.atlasSpriteInstance.filters);

        instance.matrix = Matrix.identity();

        instance.matrix._00 = element.atlasSpriteInstance.matrix3D.m00;
        instance.matrix._10 = element.atlasSpriteInstance.matrix3D.m10;
        instance.matrix._20 = element.atlasSpriteInstance.matrix3D.m30;

        instance.matrix._01 = element.atlasSpriteInstance.matrix3D.m01;
        instance.matrix._11 = element.atlasSpriteInstance.matrix3D.m11;
        instance.matrix._21 = element.atlasSpriteInstance.matrix3D.m31;

        instance.transformationPoint.x = 0;
        instance.transformationPoint.y = 0;

        var atlasSpriteInstance = new AtlasSpriteInstance(instance);
        instance.element = Element.Sprite(atlasSpriteInstance);
        instance.elementName = instance.name;

        library.addDrawable(instance);

        return instance;
    }
}
