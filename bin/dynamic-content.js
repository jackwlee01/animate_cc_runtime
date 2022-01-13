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

  // src/examples/example-utils.ts
  function setupCanvas(canvas2) {
    const ctx2 = canvas2.getContext("2d");
    ctx2.imageSmoothingEnabled = true;
    ctx2.imageSmoothingQuality = "high";
    var bodyRec = document.body.getBoundingClientRect();
    canvas2.width = Math.min(1e3, bodyRec.width - 8);
    canvas2.height = canvas2.width;
    let dpr2 = window.devicePixelRatio || 1;
    let rect = canvas2.getBoundingClientRect();
    canvas2.style.border = "2px solid gray";
    canvas2.style.width = "" + canvas2.width + "px";
    canvas2.style.height = "" + canvas2.height + "px";
    canvas2.width = rect.width * dpr2;
    canvas2.height = rect.height * dpr2;
    return dpr2;
  }

  // src/core/Drawable.ts
  var Drawable = class {
    constructor(props) {
      this.totalFrames = 1;
      this.name = props.name;
      this.id = props.id;
      this.totalFrames = props.totalFrames;
      this.library = props.library;
    }
    visit(frame, callback) {
    }
    draw(frame, callback) {
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
      this.position = props.position;
      this.scale = props.scale;
      this.rotation = props.rotation;
      this.frame = props.frame;
      this.index = this.frame.instances.length;
    }
    get item() {
      throw "Override item getter in base class";
    }
    draw(frame, callback) {
      this.library.context.draw(this.item, frame, callback);
    }
    visit(frame, callback) {
      callback(this, frame);
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
    draw(frame, callback) {
      for (const instance of this.instances) {
        this.library.context.draw(instance, frame, callback);
      }
    }
    visit(frame, callback) {
      callback(this, frame);
      for (const instance of this.instances) {
        instance.visit(frame, callback);
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
      const frame = new Frame(__spreadProps(__spreadValues({}, props), { layer: this }));
      this.frames.push(frame);
      this.framesByName[frame.name] = frame;
      if (frame.index + frame.totalFrames > this.totalFrames)
        this.totalFrames = frame.index + frame.totalFrames;
      if (frame.labelName) {
        this.labels.push(frame);
      }
      this.clip.addFrame(frame);
      return frame;
    }
    keyframeAt(frame) {
      frame = modWrap(frame, this.totalFrames);
      for (const keyframe of this.frames) {
        if (keyframe.index <= frame && keyframe.index + keyframe.totalFrames > frame)
          return keyframe;
      }
      return null;
    }
    draw(frame, callback) {
      var keyframe = this.keyframeAt(frame);
      if (keyframe != null) {
        this.library.context.draw(keyframe, frame, callback);
      }
    }
    visit(frame, callback) {
      callback(this, frame);
      var keyframe = this.keyframeAt(frame);
      if (keyframe != null) {
        keyframe.visit(frame, callback);
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
    addFrame(frame) {
      this.framesById[frame.id] = frame;
      if (frame.layer.totalFrames > this.totalFrames)
        this.totalFrames = frame.layer.totalFrames;
    }
    draw(frame, callback) {
      for (const layer of this.layers) {
        if (layer.totalFrames == 0)
          continue;
        var f = modWrap(frame, layer.totalFrames);
        if (layer.totalFrames >= f) {
          this.library.context.draw(layer, frame, callback);
        }
      }
    }
    visit(frame, callback) {
      callback(this, frame);
      for (const layer of this.layers) {
        if (layer.totalFrames == 0)
          continue;
        var f = modWrap(frame, layer.totalFrames);
        if (layer.totalFrames >= f)
          layer.visit(frame, callback);
      }
    }
  };

  // src/core/geom/Vec3.ts
  var Vec3 = class {
    constructor(props) {
      this.x = props.x;
      this.y = props.y;
      this.z = props.z;
      this.data = new Float32Array([this.x, this.y, this.z]);
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
    draw(frame, callback) {
    }
    visit(frame, callback) {
      callback(this, frame);
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
    SPRITE: "sprite",
    SPRITES: "sprites",
    ATLAS: "atlas"
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
              const frame = layer.createFrame({
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
                    name: frame.name,
                    totalFrames: frame.totalFrames
                  };
                  const instanceProps = {
                    frame,
                    matrix2d: new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31),
                    position: new Vec3(elemData.decomposedMatrix.position),
                    scale: new Vec3(elemData.decomposedMatrix.scaling),
                    rotation: new Vec3(elemData.decomposedMatrix.rotation),
                    itemName: elemData.symbolName
                  };
                  const clipInstance = frame.createClipInstance(__spreadProps(__spreadValues(__spreadValues({}, drawableProps), instanceProps), {
                    transformationPoint: new Vec2(elemData.transformationPoint),
                    behaviour: elemData.symbolType == "graphic" ? { type: "graphic", loop: elemData.loop, firstFrame: elemData.firstFrame } : { type: "movieclip" }
                  }));
                } else {
                  const elemData = elemInstanceData.atlasSpriteInstance;
                  const m = elemData.matrix3D;
                  const drawableProps = {
                    name: frame.name,
                    totalFrames: frame.totalFrames
                  };
                  const instanceProps = {
                    frame,
                    matrix2d: new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31),
                    position: new Vec3(elemData.decomposedMatrix.position),
                    scale: new Vec3(elemData.decomposedMatrix.scaling),
                    rotation: new Vec3(elemData.decomposedMatrix.rotation),
                    itemName: elemData.name
                  };
                  const spriteInstance = frame.createSpriteInstance(__spreadValues(__spreadValues({}, drawableProps), instanceProps));
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

  // src/Canvas2dAnimationContext.ts
  var Canvas2dAnimationContext = class extends AnimationContext {
    constructor(ctx2) {
      super();
      this.draw = (item, frame, callback) => {
        if (item instanceof Instance) {
          this.ctx.save();
          this.ctx.transform(item.matrix2d.a, item.matrix2d.b, item.matrix2d.c, item.matrix2d.d, item.matrix2d.e, item.matrix2d.f);
          if (callback)
            callback(item, frame);
          else
            item.draw(frame, callback);
          this.ctx.restore();
        } else if (item instanceof Sprite) {
          if (callback)
            callback(item, frame);
          this.ctx.drawImage(item.atlas.image, item.x, item.y, item.width, item.height, 0, 0, item.width, item.height);
        } else {
          if (callback)
            callback(item, frame);
          else
            item.draw(frame, callback);
        }
      };
      this.ctx = ctx2;
    }
  };

  // src/examples/dynamic-content.ts
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var dpr = setupCanvas(canvas);
  var animContext = new Canvas2dAnimationContext(ctx);
  var hatsLibrary = animContext.createLibrary("hats", "./hats");
  function init() {
    return __async(this, null, function* () {
      yield hatsLibrary.loadData();
      let frame = 0;
      let hat = 3;
      let showSpriteBorders = false;
      let eyes = 1;
      document.onkeydown = (e) => {
        switch (e.key) {
          case "ArrowUp":
            hat++;
            break;
          case "ArrowDown":
            hat--;
            break;
          case "ArrowLeft":
            eyes--;
            break;
          case "ArrowRight":
            eyes++;
            break;
          case " ":
            showSpriteBorders = !showSpriteBorders;
            break;
        }
        hat = modWrap(hat, 4);
        eyes = modWrap(eyes, 2);
      };
      function drawWithLogic(item, frame2) {
        if (item instanceof Clip) {
          item.draw(frame2, drawWithLogic);
        } else if (item instanceof Layer) {
          if (item.name == "layer_eye") {
            item.draw(eyes, drawWithLogic);
          } else {
            item.draw(frame2, drawWithLogic);
          }
        } else if (item instanceof Frame) {
          item.draw(frame2, drawWithLogic);
        } else if (item instanceof Instance) {
          if (item.frame.layer.name == "layer_hat") {
            hatsLibrary.symbol("Hat_" + hat).draw(frame2, drawWithLogic);
          } else {
            item.draw(frame2, drawWithLogic);
          }
        } else if (item instanceof Sprite) {
          item.draw(frame2);
          if (showSpriteBorders) {
            ctx.strokeStyle = "#CC0000";
            ctx.strokeRect(0, 0, item.width, item.height);
          }
        }
      }
      function update() {
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = "#333333";
        ctx.font = "36px sans-serif";
        ctx.fillText("Up/Down: Change hat", 20, 50);
        ctx.fillText("Left/Right: Change eyes", 20, 100);
        ctx.fillText("Spacebar: Toggle debug border", 20, 150);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(dpr, dpr);
        ctx.save();
        ctx.translate(-100, 0);
        hatsLibrary.symbol("Walker_Laser").draw(frame, drawWithLogic);
        ctx.restore();
        ctx.save();
        ctx.translate(100, 0);
        hatsLibrary.symbol("Walker_Nose").draw(frame, drawWithLogic);
        ctx.restore();
        ctx.restore();
        frame++;
        requestAnimationFrame(update);
      }
      update();
    });
  }
  init();
})();
//# sourceMappingURL=dynamic-content.js.map
