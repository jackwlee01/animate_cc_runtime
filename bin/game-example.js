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
    get scene() {
      return this.library.scene;
    }
    draw(frame, lerp, callback) {
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
      this.filters = props.filters;
      this.color = props.color;
      this.frame = props.frame;
      this.index = this.frame.instances.length;
    }
    get prev() {
      var _a;
      const item = (_a = this.frame.prev) == null ? void 0 : _a.instances[this.index];
      return (item == null ? void 0 : item.itemName) == this.itemName ? item : void 0;
    }
    get next() {
      var _a;
      const item = (_a = this.frame.next) == null ? void 0 : _a.instances[this.index];
      return (item == null ? void 0 : item.itemName) == this.itemName ? item : void 0;
    }
    get item() {
      throw "Override item getter in base class";
    }
    draw(frame, lerp, callback) {
      this.library.scene.draw(this.item, frame, lerp, callback);
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
    draw(frame, lerp, callback) {
      if (this.behaviour.type == "graphic") {
        frame = this.behaviour.firstFrame + modWrap(frame, 1);
      }
      this.library.scene.draw(this.item, frame, lerp, callback);
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
    draw(frame, lerp, callback) {
      for (const instance of this.instances) {
        this.library.scene.draw(instance, frame, lerp, callback);
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
      this.type = props.type;
      this.clippedBy = props.clippedBy;
      this.index = this.clip.layers.length;
      this.frames = [];
      this.framesByName = {};
      this.labels = [];
    }
    createFrame(props) {
      const frame = new Frame(__spreadProps(__spreadValues({}, props), { layer: this }));
      if (this.frames.length > 0 && this.lastFrame.index + this.lastFrame.totalFrames != frame.index)
        throw "Must add next frame at previous frame.index+frame.duration";
      this.framesByName[frame.name] = frame;
      if (frame.index + frame.totalFrames > this.totalFrames)
        this.totalFrames = frame.index + frame.totalFrames;
      if (frame.labelName) {
        this.labels.push(frame);
      }
      this.clip.addFrame(frame);
      if (this.lastFrame) {
        this.lastFrame.next = frame;
        frame.prev = this.lastFrame;
      }
      this.frames.push(frame);
      return frame;
    }
    get lastFrame() {
      return this.frames[this.frames.length - 1];
    }
    get firstFrame() {
      return this.frames[0];
    }
    keyframeAt(frame) {
      frame = modWrap(frame, this.totalFrames);
      for (const keyframe of this.frames) {
        if (keyframe.index <= frame && keyframe.index + keyframe.totalFrames > frame)
          return keyframe;
      }
      return null;
    }
    draw(frame, lerp, callback) {
      var keyframe = this.keyframeAt(frame);
      if (keyframe != null) {
        this.library.scene.draw(keyframe, frame, lerp, callback);
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
    draw(frame, lerp, callback) {
      for (const layer of this.layers) {
        if (layer.totalFrames == 0)
          continue;
        var f = modWrap(frame, layer.totalFrames);
        if (layer.totalFrames >= f) {
          this.library.scene.draw(layer, frame, lerp, callback);
        }
      }
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
    getPixel(x, y, transform) {
      const point = new DOMPoint(x, y);
      const imatrix = transform.inverse();
      const local = point.matrixTransform(imatrix);
      if (local.x < 0 || local.x >= this.width)
        return null;
      if (local.y < 0 || local.y >= this.height)
        return null;
      return this.atlas.getPixel(this.x + local.x, this.y + local.y);
    }
    isSolidPixelAt(x, y, transform, alphaThreshold = 1) {
      const pixel = this.getPixel(x, y, transform);
      return pixel && pixel[3] > alphaThreshold;
    }
    draw(frame, lerp, callback) {
      this.scene.drawImage(this.atlas.image, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
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
      if (this.image.complete == false)
        throw "Image has not loaded!";
      const canvas = document.createElement("canvas");
      canvas.width = this.image.width;
      canvas.height = this.image.height;
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.drawImage(this.image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      this.pixelData = {
        ctx,
        imageData
      };
    }
    getPixel(x, y) {
      x = Math.floor(x);
      y = Math.floor(y);
      const data = this.pixelData.imageData.data;
      let i = x + y * this.pixelData.imageData.width;
      return [
        data[i * 4 + 0],
        data[i * 4 + 1],
        data[i * 4 + 2],
        data[i * 4 + 3]
      ];
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
    Layer_type: "layerType",
    Clipped_by: "clippedBy",
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
    GradientEntries: "gradientEntries",
    RedMultiplier: "redMultiplier",
    AlphaOffset: "alphaOffset",
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

  // src/core/util/createImage.ts
  var createImage = (src) => new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => {
      throw "Image did not load: " + img.src;
    };
  });

  // src/core/Library.ts
  var Library = class {
    constructor(name, path, scene) {
      this.clips = [];
      this.clipsByName = {};
      this.spritesByName = {};
      this.atlases = [];
      this.atlasesBySpriteName = {};
      this.name = name;
      this.path = path;
      this.atlases = [];
      this.scene = scene;
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
              name: layerData.layerName,
              type: layerData.layerType || "Normal",
              clippedBy: layerData.clippedBy || null
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
                    filters: elemData.filters || null,
                    matrix2d: "m00" in m ? new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31) : new Matrix2d(m[0], m[1], m[4], m[5], m[12], m[13]),
                    matrix3d: "m00" in m ? new Matrix3d(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new Matrix3d(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                    itemName: elemData.symbolName,
                    color: elemData.color || null
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
                    filters: elemData.filters || null,
                    color: null,
                    matrix2d: "m00" in m ? new Matrix2d(m.m00, m.m01, m.m10, m.m11, m.m30, m.m31) : new Matrix2d(m[0], m[1], m[4], m[5], m[12], m[13]),
                    matrix3d: "m00" in m ? new Matrix3d(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new Matrix3d(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
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
            const imagePath = this.path + `/spritemap${pendingAtlasIndex}.png`;
            const image = yield createImage(imagePath);
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

  // src/core/Scene.ts
  var Scene = class {
    constructor() {
      this.draw = null;
      this.drawImage = null;
    }
    get mouseX() {
      throw "Override mouseX in base class";
    }
    get mouseY() {
      throw "Override mouseY in base class";
    }
    createLibrary(name, path) {
      const library = new Library(name, path, this);
      return library;
    }
  };

  // src/Canvas2dScene.ts
  var Canvas2dScene = class extends Scene {
    constructor(ctx) {
      super();
      this.draw = (item, frame, lerp, callback) => {
        if (item instanceof Layer) {
          if (item.type == "Clipper") {
          } else if (item.clippedBy) {
            const clipLayer = item.clip.layersByName[item.clippedBy];
            this.pushRenderTarget();
            clipLayer.draw(frame, lerp, callback);
            this.ctx.globalCompositeOperation = "source-in";
            if (callback)
              callback(item, frame, lerp);
            else
              item.draw(frame, lerp, callback);
            this.popRenderTarget();
          } else {
            if (callback)
              callback(item, frame, lerp);
            else
              item.draw(frame, lerp, callback);
          }
        } else if (item instanceof Instance) {
          this.ctx.save();
          this.transformInstance(item, frame, lerp);
          const didPushContext = this.handleFilters(item, frame, lerp);
          this.handleColor(item, frame, lerp);
          if (callback)
            callback(item, frame, lerp);
          else
            item.draw(frame, lerp, callback);
          if (didPushContext)
            this.popRenderTarget();
          this.ctx.restore();
        } else if (item instanceof Sprite) {
          if (callback)
            callback(item, frame, lerp);
          else
            item.draw(frame, lerp, callback);
        } else {
          if (callback)
            callback(item, frame, lerp);
          else
            item.draw(frame, lerp, callback);
        }
      };
      this.drawImage = (image, sx, sy, sw, sh, rx, ry, rw, rh) => {
        this.ctx.drawImage(image, sx, sy, sw, sh, rx, ry, rw, rh);
      };
      this.canvas = ctx.canvas;
      this.stack = [ctx];
      this.pool = [];
      this._mouseX = -1;
      this._mouseY = -1;
      ctx.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    }
    onMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this._mouseX = (e.clientX - rect.left) * scaleX;
      this._mouseY = (e.clientY - rect.top) * scaleY;
    }
    get mouseX() {
      return this._mouseX;
    }
    get mouseY() {
      return this._mouseY;
    }
    getLocal(x, y) {
      const point = new DOMPoint(x, y);
      const matrix = this.ctx.getTransform();
      const imatrix = matrix.inverse();
      return point.matrixTransform(imatrix);
    }
    get ctx() {
      return this.stack[this.stack.length - 1];
    }
    pushRenderTarget() {
      const ctx = this.pool.length == 0 ? document.createElement("canvas").getContext("2d") : this.pool.pop();
      ctx.canvas.width = this.ctx.canvas.width;
      ctx.canvas.height = this.ctx.canvas.height;
      ctx.setTransform(this.ctx.getTransform());
      this.stack.push(ctx);
    }
    popRenderTarget() {
      if (this.stack.length <= 1)
        throw "Cannot pop stack";
      const ctx = this.stack.pop();
      this.ctx.save();
      this.ctx.resetTransform();
      this.ctx.drawImage(ctx.canvas, 0, 0);
      this.ctx.restore();
      this.pool.push(ctx);
    }
    handleColor(item, frame, lerp) {
      var _a, _b, _c, _d;
      if (((_a = item.color) == null ? void 0 : _a.mode) == "CA" || ((_b = item.color) == null ? void 0 : _b.mode) == "Alpha" || ((_c = item.color) == null ? void 0 : _c.mode) == "Advanced" || ((_d = item.color) == null ? void 0 : _d.mode) == "AD")
        this.ctx.globalAlpha *= item.color.alphaMultiplier;
    }
    handleFilters(item, frame, lerp) {
      if (item.filters) {
        for (let k of Object.keys(item.filters)) {
          const key = k;
          if (key == "DropShadowFilter") {
            const filter = item.filters[key];
            this.pushDropShadow(filter.color + Math.round(filter.strength * 255).toString(16), filter.blurX, Math.cos(filter.angle * Math.PI / 180) * filter.distance, Math.sin(filter.angle * Math.PI / 180) * filter.distance);
            return true;
          }
        }
      }
    }
    pushDropShadow(color, blur, offsetX = 0, offsetY = 0) {
      this.ctx.save();
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = blur;
      this.ctx.shadowOffsetX = offsetX;
      this.ctx.shadowOffsetY = offsetY;
      this.pushRenderTarget();
    }
    popDropShadow() {
      this.popRenderTarget();
      this.ctx.restore();
    }
    transformInstance(item, frame, lerp) {
      if (lerp && item.next) {
        const t = (modWrap(frame, item.totalFrames) - item.index) / item.frame.totalFrames;
        const m1 = item.matrix2d;
        const m2 = item.next.matrix2d;
        this.ctx.transform(m1.a + (m2.a - m1.a) * t, m1.b + (m2.b - m1.b) * t, m1.c + (m2.c - m1.c) * t, m1.d + (m2.d - m1.d) * t, m1.e + (m2.e - m1.e) * t, m1.f + (m2.f - m1.f) * t);
      } else {
        this.ctx.transform(item.matrix2d.a, item.matrix2d.b, item.matrix2d.c, item.matrix2d.d, item.matrix2d.e, item.matrix2d.f);
      }
    }
  };

  // src/examples/example-utils.ts
  function setupCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    var bodyRec = document.body.getBoundingClientRect();
    canvas.width = Math.min(1e3, bodyRec.width - 8);
    canvas.height = canvas.width;
    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.style.width = "" + canvas.width + "px";
    canvas.style.height = "" + canvas.height + "px";
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    return dpr;
  }

  // src/examples/game/Game.ts
  var Game = class {
    constructor(app2) {
      this.app = app2;
      this.player = null;
      this.enemies = [];
    }
    get input() {
      return this.app.input;
    }
    get libs() {
      return this.app.libs;
    }
    update() {
    }
    draw(scene) {
    }
  };

  // src/examples/game/Input.ts
  var Input = class {
    constructor(app2) {
      this.app = app2;
    }
  };

  // src/examples/game/Libs.ts
  var Libs = class {
    constructor(app2, scene) {
      this.app = app2;
      this.scene = scene;
      this.test = scene.createLibrary("test", "./test");
    }
    load() {
      return __async(this, null, function* () {
        yield this.test.loadData();
      });
    }
  };

  // src/examples/game/App.ts
  var App = class {
    constructor() {
      const canvas = document.getElementById("canvas");
      const ctx2d = canvas.getContext("2d");
      this.dpr = setupCanvas(canvas);
      this.scene = new Canvas2dScene(ctx2d);
      this.libs = new Libs(this, this.scene);
      this.input = new Input(this);
    }
    load() {
      return __async(this, null, function* () {
        yield this.libs.load();
        this.game = new Game(this);
      });
    }
    update() {
      if (this.game)
        this.game.update();
    }
    draw(scene) {
      if (this.game)
        this.game.draw(scene);
    }
  };
  var app = new App();
})();
//# sourceMappingURL=game-example.js.map