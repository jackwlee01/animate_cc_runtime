(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/core/Drawable.ts
  var Drawable = class {
    constructor(props) {
      this.totalFrames = 1;
      this.name = props.name;
      this.id = props.id;
      this.totalFrames = props.totalFrames;
      this.library = props.library;
    }
    visit(frame2, callback) {
    }
    draw(frame2, callback, lerp) {
    }
  };

  // src/core/Instance.ts
  var Instance = class extends Drawable {
    constructor(props) {
      super(__spreadProps(__spreadValues({}, props), {
        library: props.frame.library,
        id: `${props.frame.id}.${props.frame.instances.length}`
      }));
      this.itemName = props.itemName;
      this.matrix2d = props.matrix2d;
      this.frame = props.frame;
      this.index = this.frame.instances.length;
    }
    get prev() {
      var _a;
      return (_a = this.frame.prev) == null ? void 0 : _a.instances[this.index];
    }
    get next() {
      var _a;
      return (_a = this.frame.next) == null ? void 0 : _a.instances[this.index];
    }
    get item() {
      throw "Override item getter in base class";
    }
    draw(frame2, callback, lerp) {
      this.library.context.draw(this.item, frame2, callback, lerp);
    }
    visit(frame2, callback) {
      callback(this, frame2);
    }
  };

  // src/core/ClipInstance.ts
  var ClipInstance = class extends Instance {
    constructor(props) {
      super(props);
      this.behaviour = props.behaviour;
      this.transformationPoint = props.transformationPoint;
    }
    get item() {
      return this.library.clipsByName[this.itemName];
    }
    draw(frame2, callback, lerp) {
      if (this.behaviour.type == "graphic") {
        frame2 = this.behaviour.firstFrame;
      }
      this.library.context.draw(this.item, frame2, callback, lerp);
    }
    visit(frame2, callback) {
      if (this.behaviour.type == "graphic") {
        frame2 = this.behaviour.firstFrame;
      }
      callback(this, frame2);
    }
  };

  // src/core/SpriteInstance.ts
  var SpriteInstance = class extends Instance {
    constructor(props) {
      super(props);
    }
    get item() {
      return this.library.spritesByName[this.itemName];
    }
  };

  // src/core/Frame.ts
  var Frame = class extends Drawable {
    constructor(props) {
      super(__spreadProps(__spreadValues({}, props), {
        id: `${props.layer.id}.${props.index}`,
        library: props.layer.library
      }));
      this.instances = [];
      this.layer = props.layer;
      this.index = props.index;
      this.labelName = props.labelName || null;
    }
    createClipInstance(props) {
      const clipInstance = new ClipInstance(__spreadProps(__spreadValues({}, props), { frame: this }));
      this.instances.push(clipInstance);
      return clipInstance;
    }
    createSpriteInstance(props) {
      const spriteInstance = new SpriteInstance(__spreadProps(__spreadValues({}, props), { frame: this }));
      this.instances.push(spriteInstance);
      return spriteInstance;
    }
    draw(frame2, callback, lerp) {
      for (const instance of this.instances) {
        this.library.context.draw(instance, frame2, callback, lerp);
      }
    }
    visit(frame2, callback) {
      callback(this, frame2);
      for (const instance of this.instances) {
        instance.visit(frame2, callback);
      }
    }
  };

  // src/core/util.ts
  function modWrap(a, b) {
    return a - b * Math.floor(a / b);
  }

  // src/core/Layer.ts
  var Layer = class extends Drawable {
    constructor(props) {
      super(__spreadProps(__spreadValues({}, props), {
        totalFrames: 0,
        id: `${props.clip.id}.${props.name}`,
        library: props.clip.library
      }));
      this.clip = props.clip;
      this.index = this.clip.layers.length;
      this.frames = [];
      this.framesByName = {};
      this.labels = [];
    }
    createFrame(props) {
      const frame2 = new Frame(__spreadProps(__spreadValues({}, props), { layer: this }));
      if (this.frames.length > 0 && this.lastFrame.index + this.lastFrame.totalFrames != frame2.index)
        throw "Must add next frame at previous frame.index+frame.duration";
      this.framesByName[frame2.name] = frame2;
      if (frame2.index + frame2.totalFrames > this.totalFrames)
        this.totalFrames = frame2.index + frame2.totalFrames;
      if (frame2.labelName) {
        this.labels.push(frame2);
      }
      this.clip.addFrame(frame2);
      if (this.firstFrame) {
        this.firstFrame.prev = frame2;
        frame2.next = this.firstFrame;
      }
      if (this.lastFrame) {
        this.lastFrame.next = frame2;
        frame2.prev = this.lastFrame;
      }
      this.frames.push(frame2);
      return frame2;
    }
    get lastFrame() {
      return this.frames[this.frames.length - 1];
    }
    get firstFrame() {
      return this.frames[0];
    }
    keyframeAt(frame2) {
      frame2 = modWrap(frame2, this.totalFrames);
      for (const keyframe of this.frames) {
        if (keyframe.index <= frame2 && keyframe.index + keyframe.totalFrames > frame2)
          return keyframe;
      }
      return null;
    }
    draw(frame2, callback, lerp) {
      var keyframe = this.keyframeAt(frame2);
      if (keyframe != null) {
        this.library.context.draw(keyframe, frame2, callback, lerp);
      }
    }
    visit(frame2, callback) {
      callback(this, frame2);
      var keyframe = this.keyframeAt(frame2);
      if (keyframe != null) {
        keyframe.visit(frame2, callback);
      }
    }
  };

  // src/core/Clip.ts
  var Clip = class extends Drawable {
    constructor(props) {
      super(__spreadProps(__spreadValues({}, props), {
        totalFrames: 0,
        id: `${props.library.name}.clips.${props.name}`
      }));
      this.layers = [];
      this.layersById = {};
      this.layersByName = {};
      this.framesById = {};
    }
    createLayer(props) {
      const layer = new Layer(__spreadProps(__spreadValues({}, props), { clip: this }));
      this.layers.push(layer);
      this.layersById[layer.id] = layer;
      this.layersByName[layer.name] = layer;
      if (layer.totalFrames > this.totalFrames)
        this.totalFrames = layer.totalFrames;
      return layer;
    }
    addFrame(frame2) {
      this.framesById[frame2.id] = frame2;
      if (frame2.layer.totalFrames > this.totalFrames)
        this.totalFrames = frame2.layer.totalFrames;
    }
    draw(frame2, callback, lerp) {
      for (const layer of this.layers) {
        if (layer.totalFrames == 0)
          continue;
        var f = modWrap(frame2, layer.totalFrames);
        if (layer.totalFrames >= f) {
          this.library.context.draw(layer, frame2, callback, lerp);
        }
      }
    }
    visit(frame2, callback) {
      callback(this, frame2);
      for (const layer of this.layers) {
        if (layer.totalFrames == 0)
          continue;
        var f = modWrap(frame2, layer.totalFrames);
        if (layer.totalFrames >= f)
          layer.visit(frame2, callback);
      }
    }
  };

  // src/core/Sprite.ts
  var Sprite = class extends Drawable {
    constructor(props) {
      super(__spreadProps(__spreadValues({}, props), {
        totalFrames: 1,
        library: props.atlas.library,
        id: `${props.atlas.library.name}.sprites.${props.name}`
      }));
      this.x = props.x;
      this.y = props.y;
      this.width = props.width;
      this.height = props.height;
      this.rotated = props.rotated;
      this.atlas = props.atlas;
    }
    draw(frame2, callback, lerp) {
    }
    visit(frame2, callback) {
      callback(this, frame2);
    }
  };

  // src/core/geom/Vec2.ts
  var Vec2 = class {
    constructor(props) {
      this.x = props.x;
      this.y = props.y;
      this.data = new Float32Array([this.x, this.y]);
    }
  };

  // src/core/geom/Matrix2d.ts
  var Matrix2d = class {
    constructor(a, b, c, d, e, f) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
      this.f = f;
      this.data = new Float32Array([this.a, this.b, this.c, this.d, this.e, this.f]);
    }
  };

  // src/core/Atlas.ts
  var Atlas = class {
    constructor(props) {
      this.sprites = [];
      this.library = props.library;
      this.image = props.image;
      this.app = props.app;
      this.version = props.version;
      this.imagePath = props.imagePath;
      this.format = props.format;
      this.size = props.size;
      this.resolution = props.resolution;
    }
  };

  // src/core/json/utilJson.ts
  var keys = {
    SPRITE: "sprite",
    SPRITES: "sprites",
    ATLAS: "atlas",
    ANIMATION: "animation",
    ATLAS_SPRITE_instance: "atlasSpriteInstance",
    DecomposedMatrix: "decomposedMatrix",
    Frames: "frames",
    framerate: "frameRate",
    Instance_Name: "instanceName",
    Layer_name: "layerName",
    LAYERS: "layers",
    Matrix3D: "matrix3D",
    Position: "position",
    Rotation: "rotation",
    Scaling: "scaling",
    SYMBOL_DICTIONARY: "symbolDictionary",
    SYMBOL_Instance: "symbolInstance",
    SYMBOL_name: "symbolName",
    Symbols: "symbols",
    TIMELINE: "timeline",
    AN: "animation",
    AM: "alphaMultiplier",
    ASI: "atlasSpriteInstance",
    BM: "bitmap",
    C: "color",
    DU: "duration",
    E: "elements",
    FF: "firstFrame",
    FR: "frames",
    FRT: "frameRate",
    I: "index",
    IN: "instanceName",
    L: "layers",
    LN: "layerName",
    LP: "loop",
    M3D: "matrix3D",
    MD: "metadata",
    M: "mode",
    N: "name",
    POS: "position",
    S: "symbols",
    SD: "symbolDictionary",
    SI: "symbolInstance",
    SN: "symbolName",
    ST: "symbolType",
    TL: "timeline",
    TRP: "transformationPoint"
  };
  function normaliseKey(key) {
    return keys[key] || key;
  }
  function normaliseJson(data) {
    if (typeof data == "string" || typeof data == "number")
      return data;
    switch (typeof data) {
      case "string":
        return data;
      case "number":
        return data;
      case "boolean":
        return data;
      case "object":
        if (Array.isArray(data)) {
          return data.map(normaliseJson);
        } else {
          var result = {};
          Object.keys(data).forEach((key) => result[normaliseKey(key)] = normaliseJson(data[key]));
          return result;
        }
      case "bigint":
        throw "Not supported";
      case "function":
        throw "Not supported";
      case "symbol":
        throw "Not supported";
      case "undefined":
        throw "Not supported";
      default:
        throw "Unsupported";
    }
  }

  // src/core/Library.ts
  var Library = class {
    constructor(name, path, context) {
      this.clips = [];
      this.clipsByName = {};
      this.spritesByName = {};
      this.atlases = [];
      this.atlasesBySpriteName = {};
      this.name = name;
      this.path = path;
      this.atlases = [];
      this.context = context;
    }
    symbol(name) {
      if (this.clipsByName[name])
        return this.clipsByName[name];
      if (this.spritesByName[name])
        return this.spritesByName[name];
      throw "Cannot find symbol: " + name + " for library: " + this.path;
    }
    createAtlas(props) {
      const atlas = new Atlas(__spreadProps(__spreadValues({}, props), { library: this }));
      this.atlases.push(atlas);
      return atlas;
    }
    createSprite(atlas, props) {
      const sprite = new Sprite(__spreadProps(__spreadValues({}, props), { atlas }));
      atlas.sprites.push(sprite);
      this.spritesByName[sprite.name] = sprite;
      this.atlasesBySpriteName[sprite.name] = atlas;
      return sprite;
    }
    createClip(props) {
      const clip = new Clip(__spreadProps(__spreadValues({}, props), { library: this }));
      this.clips.push(clip);
      this.clipsByName[clip.name] = clip;
      return clip;
    }
    loadData() {
      return __async(this, null, function* () {
        const animJsonPath = this.path + "/Animation.json";
        const animFetchResult = yield fetch(animJsonPath);
        const dataRaw = yield animFetchResult.json();
        const data = normaliseJson(dataRaw);
        const spriteNames = [];
        for (const symbolData of data.symbolDictionary.symbols) {
          const clip = this.createClip({
            name: symbolData.symbolName
          });
          for (let l = symbolData.timeline.layers.length - 1; l >= 0; l--) {
            const layerData = symbolData.timeline.layers[l];
            const layer = clip.createLayer({
              name: layerData.layerName
            });
            for (const frameData of layerData.frames) {
              const frame2 = layer.createFrame({
                name: "" + frameData.index,
                totalFrames: frameData.duration,
                labelName: frameData.name,
                index: frameData.index
              });
              for (const elemInstanceData of frameData.elements) {
                if ("symbolInstance" in elemInstanceData) {
                  const elemData = elemInstanceData.symbolInstance;
                  const m = elemData.matrix3D;
                  const drawableProps = {
                    name: frame2.name,
                    totalFrames: frame2.totalFrames
                  };
                  const instanceProps = {
                    frame: frame2,
                    matrix2d: "m00" in m ? new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31) : new Matrix2d(m[0], m[1], m[4], m[5], m[12], m[13]),
                    itemName: elemData.symbolName
                  };
                  const clipInstance = frame2.createClipInstance(__spreadProps(__spreadValues(__spreadValues({}, drawableProps), instanceProps), {
                    transformationPoint: new Vec2(elemData.transformationPoint),
                    behaviour: elemData.symbolType == "graphic" ? { type: "graphic", loop: elemData.loop, firstFrame: elemData.firstFrame } : { type: "movieclip" }
                  }));
                } else {
                  const elemData = elemInstanceData.atlasSpriteInstance;
                  const m = elemData.matrix3D;
                  const drawableProps = {
                    name: frame2.name,
                    totalFrames: frame2.totalFrames
                  };
                  const instanceProps = {
                    frame: frame2,
                    matrix2d: "m00" in m ? new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31) : new Matrix2d(m[0], m[1], m[4], m[5], m[12], m[13]),
                    itemName: elemData.name
                  };
                  const spriteInstance = frame2.createSpriteInstance(__spreadValues(__spreadValues({}, drawableProps), instanceProps));
                  if (spriteNames.indexOf(spriteInstance.itemName) == -1)
                    spriteNames.push(spriteInstance.itemName);
                }
              }
            }
          }
        }
        ;
        let pendingAtlasIndex = 1;
        for (const spriteName of spriteNames) {
          if (this.atlasesBySpriteName[spriteName] == null) {
            const spriteJsonPath = this.path + `/spritemap${pendingAtlasIndex}.json`;
            const altasFetch = yield fetch(spriteJsonPath);
            const dataRaw2 = yield altasFetch.json();
            const data2 = normaliseJson(dataRaw2);
            const image = new Image(data2.meta.size.w, data2.meta.size.h);
            image.src = this.path + `/spritemap${pendingAtlasIndex}.png`;
            const atlas = this.createAtlas({
              image,
              app: data2.meta.app,
              version: data2.meta.version,
              imagePath: data2.meta.image,
              format: data2.meta.format,
              size: data2.meta.size,
              resolution: data2.meta.resolution
            });
            for (const spriteSpriteData of data2.atlas.sprites) {
              const spriteData = spriteSpriteData.sprite;
              const sprite = this.createSprite(atlas, {
                name: spriteData.name,
                x: spriteData.x,
                y: spriteData.y,
                width: spriteData.w,
                height: spriteData.h,
                rotated: spriteData.rotated
              });
              this.atlasesBySpriteName[sprite.name] = atlas;
            }
            pendingAtlasIndex++;
          }
        }
      });
    }
  };

  // src/core/AnimationContext.ts
  var AnimationContext = class {
    constructor() {
      this.draw = null;
    }
    createLibrary(name, path) {
      const library = new Library(name, path, this);
      return library;
    }
  };

  // src/index.ts
  var Layer2 = Layer;

  // src/DomAnimationContext.ts
  var DomAnimationContext = class extends AnimationContext {
    constructor(elemId) {
      super();
      this.draw = (item, frame2, callback, lerp) => {
        if (!this.container)
          return;
        if (item instanceof Layer2) {
          this.pushElem("layer", item.name);
          item.draw(frame2, callback, lerp);
          this.popElem();
        } else if (item instanceof Frame) {
          this.pushElem("frame", item.name);
          item.draw(frame2, callback, lerp);
          this.popElem();
        } else if (item instanceof SpriteInstance) {
          this.pushElem("sprite", item.name);
          this.transformInstance(item, frame2, lerp);
          item.draw(frame2, callback, lerp);
          this.popElem();
        } else if (item instanceof ClipInstance) {
          this.pushElem("clip", item.name);
          this.transformInstance(item, frame2, lerp);
          item.draw(frame2, callback, lerp);
          this.popElem();
        } else if (item instanceof Sprite) {
          this.current.style.width = item.width + "px";
          this.current.style.height = item.height + "px";
          this.current.style.backgroundImage = `url(${item.atlas.image.src})`;
          this.current.style.backgroundPosition = `${-item.x}px ${-item.y}px`;
        } else {
          item.draw(frame2, callback, lerp);
        }
      };
      this.elemId = elemId;
      this.elems = [];
      this.stack = [this.container];
    }
    get current() {
      return this.stack[this.stack.length - 1];
    }
    pushElem(type, name) {
      const elem = document.createElement("div");
      elem.className = `anim anim-${type} anim-of-${name}`;
      elem.style.position = "absolute";
      elem.style.top = "0px";
      elem.style.left = "0px";
      elem.style.width = "0px";
      elem.style.height = "0px";
      this.current.appendChild(elem);
      this.elems.push(elem);
      this.stack.push(elem);
    }
    popElem() {
      this.stack.pop();
    }
    get container() {
      return document.getElementById(this.elemId);
    }
    clear() {
      while (this.elems.length > 0) {
        const elem = this.elems.shift();
        elem.remove();
      }
    }
    transformInstance(item, frame2, lerp) {
      const m = item.matrix2d;
      this.current.style.transform = `matrix(${m.a}, ${m.b}, ${m.c}, ${m.d}, ${m.e}, ${m.f})`;
    }
  };

  // src/examples/dom.ts
  var animContext = new DomAnimationContext("anim");
  var testLibrary = animContext.createLibrary("test", "./test");
  function init() {
    return __async(this, null, function* () {
      yield testLibrary.loadData();
      update();
    });
  }
  var frame = 0;
  function update() {
    animContext.clear();
    testLibrary.symbol("StarDude").draw(frame);
    frame++;
    requestAnimationFrame(update);
  }
  init();
})();
//# sourceMappingURL=dom.js.map