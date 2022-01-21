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
      this.matrix3d = props.matrix3d;
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

  // src/core/util/math.ts
  function modWrap(a, b) {
    return a - b * Math.floor(a / b);
  }

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
        frame2 = this.behaviour.firstFrame + modWrap(frame2, 1);
      }
      this.library.context.draw(this.item, frame2, callback, lerp);
    }
    visit(frame2, callback) {
      if (this.behaviour.type == "graphic") {
        frame2 = this.behaviour.firstFrame + modWrap(frame2, 1);
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

  // src/core/geom/Matrix3d.ts
  var Matrix3d = class {
    constructor(_00, _01, _02, _03, _10, _11, _12, _13, _20, _21, _22, _23, _30, _31, _32, _33) {
      this._00 = _00;
      this._01 = _01;
      this._02 = _02;
      this._03 = _03;
      this._10 = _10;
      this._11 = _11;
      this._12 = _12;
      this._13 = _13;
      this._20 = _20;
      this._21 = _21;
      this._22 = _22;
      this._23 = _23;
      this._30 = _30;
      this._31 = _31;
      this._32 = _32;
      this._33 = _33;
      this.data = new Float32Array([
        _00,
        _01,
        _02,
        _03,
        _10,
        _11,
        _12,
        _13,
        _20,
        _21,
        _22,
        _23,
        _30,
        _31,
        _32,
        _33
      ]);
    }
  };

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
                    matrix3d: "m00" in m ? new Matrix3d(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new Matrix3d(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
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
                    matrix3d: "m00" in m ? new Matrix3d(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new Matrix3d(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
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
          this.pushElem("layer", item.name, item.id);
          if (callback)
            callback(item, frame2, lerp);
          else
            item.draw(frame2, callback, lerp);
          this.pop();
        } else if (item instanceof Frame) {
          this.pushElem("frame", item.name, item.id);
          if (callback)
            callback(item, frame2, lerp);
          else
            item.draw(frame2, callback, lerp);
          this.pop();
        } else if (item instanceof SpriteInstance) {
          this.pushElem("sprite", item.name, item.id);
          this.transformInstance(item, frame2, lerp);
          if (callback)
            callback(item, frame2, lerp);
          else
            item.draw(frame2, callback, lerp);
          this.pop();
        } else if (item instanceof ClipInstance) {
          this.pushElem("clip", item.name, item.id);
          this.transformInstance(item, frame2, lerp);
          if (callback)
            callback(item, frame2, lerp);
          else
            item.draw(frame2, callback, lerp);
          this.pop();
        } else if (item instanceof Sprite) {
          this.current.style.width = item.width + "px";
          this.current.style.height = item.height + "px";
          this.current.style.backgroundImage = `url(${item.atlas.image.src})`;
          this.current.style.backgroundPosition = `${-item.x}px ${-item.y}px`;
        } else {
          if (callback)
            callback(item, frame2, lerp);
          else
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
    pushElem(type, name, id) {
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
    pop() {
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
    pushTranslate(x, y) {
      this.pushElem("transform", "translate", "__transform__");
      this.current.style.transform = `translate(${x}, ${y})`;
    }
    pushScale(x, y) {
      this.pushElem("transform", "scale", "__scale__");
      this.current.style.transform = `scale(${x}, ${y})`;
    }
    pushRotation(z) {
      this.pushElem("transform", "rotation", "__rotation__");
      this.current.style.transform = `rotate(${z})`;
    }
    transformInstance(item, frame2, lerp) {
      const m = item.matrix3d;
      this.current.style.transform = `matrix3d(${m._00}, ${m._01}, ${m._02}, ${m._03}, ${m._10}, ${m._11}, ${m._12}, ${m._13}, ${m._20}, ${m._21}, ${m._22}, ${m._23}, ${m._30}, ${m._31}, ${m._32}, ${m._33})`;
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
  var play = true;
  var swap = false;
  var btnPause = document.getElementById("btn-pause");
  var btnSwap = document.getElementById("btn-swap");
  btnPause.onclick = () => {
    play = !play;
    btnPause.innerText = play ? "Pause" : "Play";
    let gunInput2 = document.getElementById("gun-input");
    if (gunInput2) {
      gunInput2.focus();
    }
  };
  btnSwap.onclick = () => {
    swap = !swap;
  };
  var gunInput = document.createElement("input");
  gunInput.id = "gun-input";
  gunInput.value = "GUN!!!!";
  gunInput.style.boxShadow = "0px 3px 8px rgb(0 0 0 / 40%)";
  gunInput.style.position = "absolute";
  gunInput.style.top = "-10px";
  gunInput.style.left = "-100px";
  gunInput.style.width = "150px";
  gunInput.style.height = "30px";
  var shellInput = document.createElement("input");
  shellInput.type = "checkbox";
  shellInput.id = "shell-input";
  shellInput.style.position = "absolute";
  shellInput.style.width = "30px";
  shellInput.style.height = "30px";
  shellInput.style.transform = "translate(-50%, -50%)";
  shellInput.checked = true;
  function drawWithLogic(item, frame2, lerp) {
    if (swap && item.name == "Shell") {
      animContext.current.appendChild(shellInput);
    } else if (swap && item.name == "stardude_assets/StarGuyGun") {
      animContext.current.appendChild(gunInput);
    } else {
      item.draw(frame2, drawWithLogic, lerp);
    }
  }
  function update() {
    if (play) {
      animContext.clear();
      animContext.pushTranslate("0px", "10px");
      animContext.pushScale("1", "1");
      animContext.pushRotation("0deg");
      testLibrary.symbol("StarDude").draw(frame, drawWithLogic);
      animContext.pop();
      animContext.pop();
      animContext.pop();
      animContext.pushTranslate("100px", "10px");
      animContext.pushScale("1", "1");
      animContext.pushRotation("0deg");
      testLibrary.symbol("Walker_Laser_Rotating").draw(frame, drawWithLogic);
      animContext.pop();
      animContext.pop();
      animContext.pop();
      frame += 1;
    }
    requestAnimationFrame(update);
  }
  init();
})();
//# sourceMappingURL=dom.js.map
