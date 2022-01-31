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

  // src/core/geom/Vec2.ts
  var Vec2 = class {
    constructor(props) {
      this.x = props.x;
      this.y = props.y;
      this.data = new Float32Array([this.x, this.y]);
    }
  };

  // src/core/geom/Matrix.ts
  var Matrix = class {
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

  // src/core/Instance.ts
  var Instance = class extends Drawable {
    constructor(props) {
      super(__spreadProps(__spreadValues({}, props), {
        library: props.frame.library,
        id: `${props.frame.id}.${props.frame.instances.length}`
      }));
      this.itemName = props.itemName;
      this.matrix = props.matrix || new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      this.filters = props.filters || null;
      this.color = props.color || null;
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
      this.behaviour = props.behaviour || { type: "movieclip" };
      this.transformationPoint = props.transformationPoint || new Vec2({ x: 0, y: 0 });
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
      const clipInstance = new ClipInstance(__spreadProps(__spreadValues({}, props), { frame: this, totalFrames: this.totalFrames }));
      this.instances.push(clipInstance);
      return clipInstance;
    }
    createSpriteInstance(props) {
      const spriteInstance = new SpriteInstance(__spreadProps(__spreadValues({}, props), { frame: this, totalFrames: this.totalFrames }));
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
      this.clippedBy = props.clippedBy || null;
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
      this.clip.__addFrame(frame);
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
      this.framesByLabel = {};
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
    __addFrame(frame) {
      this.framesById[frame.id] = frame;
      if (frame.layer.totalFrames > this.totalFrames)
        this.totalFrames = frame.layer.totalFrames;
      if (frame.labelName)
        this.framesByLabel[frame.labelName] = frame;
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
      this.pixelData = props.pixelData;
    }
    getPixel(x, y) {
      x = Math.floor(x);
      y = Math.floor(y);
      let i = x + y * this.pixelData.imageData.width;
      const data = this.pixelData.imageData.data;
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
    createAtlas(props, pixelData) {
      const atlas = new Atlas(__spreadProps(__spreadValues({}, props), { library: this, pixelData }));
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
                  const instanceProps = {
                    frame,
                    name: frame.name,
                    filters: elemData.filters || null,
                    matrix: "m00" in m ? new Matrix(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new Matrix(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                    itemName: elemData.symbolName,
                    color: elemData.color || null
                  };
                  const clipInstance = frame.createClipInstance(__spreadProps(__spreadValues({}, instanceProps), {
                    transformationPoint: new Vec2(elemData.transformationPoint),
                    behaviour: elemData.symbolType == "graphic" ? { type: "graphic", loop: elemData.loop, firstFrame: elemData.firstFrame } : { type: "movieclip" }
                  }));
                } else {
                  const elemData = elemInstanceData.atlasSpriteInstance;
                  const m = elemData.matrix3D;
                  const spriteInstance = frame.createSpriteInstance({
                    name: frame.name,
                    filters: elemData.filters || null,
                    color: null,
                    matrix: "m00" in m ? new Matrix(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new Matrix(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                    itemName: elemData.name
                  });
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
            }, this.scene.getPixelData(image));
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
      this.pixelData = {};
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
    getPixelData(image) {
      if (image.complete == false)
        throw "Image has not loaded!";
      const canvas2 = document.createElement("canvas");
      canvas2.width = image.width;
      canvas2.height = image.height;
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas2.width, canvas2.height);
      return {
        ctx,
        imageData,
        image
      };
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
        const m1 = item.matrix;
        const m2 = item.next.matrix;
        this.ctx.transform(m1._00 + (m2._00 - m1._00) * t, m1._01 + (m2._01 - m1._01) * t, m1._10 + (m2._10 - m1._10) * t, m1._11 + (m2._11 - m1._11) * t, m1._30 + (m2._30 - m1._30) * t, m1._31 + (m2._31 - m1._31) * t);
      } else {
        this.ctx.transform(item.matrix._00, item.matrix._01, item.matrix._10, item.matrix._11, item.matrix._30, item.matrix._31);
      }
    }
  };

  // src/examples/example-utils.ts
  function setupCanvas(canvas2) {
    const ctx = canvas2.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    var bodyRec = document.body.getBoundingClientRect();
    canvas2.width = Math.min(1e3, bodyRec.width - 8);
    canvas2.height = canvas2.width;
    let dpr = window.devicePixelRatio || 1;
    let rect = canvas2.getBoundingClientRect();
    canvas2.style.width = "" + canvas2.width + "px";
    canvas2.style.height = "" + canvas2.height + "px";
    canvas2.width = rect.width * dpr;
    canvas2.height = rect.height * dpr;
    return dpr;
  }

  // src/examples/game/game/entities/Player.ts
  var FRICTION = 0.3;
  var MAX_SPEED = 10;
  var ACCEL = 2;
  var Player = class {
    constructor(game) {
      this.lapsed = 0;
      this.pos = { x: 100, y: 200 };
      this.vel = { x: 0, y: 0 };
      this.facing = 1;
      this.state = "static";
      this.update = () => {
        this.lapsed += 1 + Math.abs(this.vel.x / 10);
        this.vel.x *= 1 - FRICTION;
        this.vel.y *= 1 - FRICTION;
        if (this.game.input.keys.down("ArrowLeft"))
          this.vel.x = Math.max(-MAX_SPEED, this.vel.x - ACCEL);
        if (this.game.input.keys.down("ArrowRight"))
          this.vel.x = Math.min(MAX_SPEED, this.vel.x + ACCEL);
        if (this.vel.x > 0 && this.facing < 0)
          this.facing *= -1;
        if (this.vel.x < 0 && this.facing > 0)
          this.facing *= -1;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (Math.abs(this.vel.x) > 1 && this.state != "walk")
          this.changeState("walk");
        if (Math.abs(this.vel.x) <= 1 && this.state != "static")
          this.changeState("static");
      };
      this.draw = (scene) => {
        scene.ctx.save();
        scene.ctx.translate(this.pos.x, this.pos.y);
        scene.ctx.scale(this.facing * -2, 2);
        scene.draw(this.symbol, this.stateFrame.index + this.lapsed % this.stateFrame.totalFrames);
        scene.ctx.restore();
      };
      this.game = game;
    }
    changeState(state) {
      this.state = state;
      this.lapsed = 0;
    }
    get symbol() {
      return this.game.libs.test.symbol("GunnerOld");
    }
    get stateFrame() {
      return this.symbol.framesByLabel[this.state];
    }
  };

  // src/examples/game/game/Game.ts
  var Game = class {
    constructor(app2) {
      this.update = () => {
        if (this.player)
          this.player.update();
      };
      this.draw = (scene) => {
        if (this.player)
          this.player.draw(scene);
      };
      this.app = app2;
      this.player = new Player(this);
      this.enemies = [];
    }
    get input() {
      return this.app.input;
    }
    get libs() {
      return this.app.libs;
    }
  };

  // src/examples/game/Input.ts
  var Input = class {
    constructor(app2) {
      this.postupdate = () => {
        this.keys.postUpdate();
        this.mouse.postUpdate();
      };
      this.app = app2;
      this.keys = new Keys(this);
      this.mouse = new Mouse(this);
    }
  };
  var Mouse = class {
    constructor(input) {
      this.postUpdate = () => {
        for (let i = 0; i < this.buttonsReleased.length; i++)
          this.buttonsReleased[i] = false;
        for (let i = 0; i < this.buttonsPressed.length; i++)
          this.buttonsPressed[i] = false;
      };
      this.input = input;
      this.buttonsDown = [];
      this.buttonsPressed = [];
      this.buttonsReleased = [];
      input.app.scene.canvas.addEventListener("mousedown", (e) => {
        this.buttonsDown[e.button] = true;
        this.buttonsPressed[e.button] = true;
      });
      input.app.scene.canvas.addEventListener("mouseup", (e) => {
        this.buttonsDown[e.button] = false;
        this.buttonsReleased[e.button] = true;
      });
    }
    get x() {
      return this.input.app.scene.mouseX;
    }
    get y() {
      return this.input.app.scene.mouseY;
    }
  };
  var Keys = class {
    constructor(input) {
      this.postUpdate = () => {
        Object.keys(this.keysPressed).forEach((code) => this.keysPressed[code] = false);
        Object.keys(this.keysReleased).forEach((code) => this.keysReleased[code] = false);
      };
      this.down = (code) => {
        return !!this.keysDown[code];
      };
      this.pressed = (code) => {
        return !!this.keysPressed[code];
      };
      this.released = (code) => {
        return !!this.keysReleased[code];
      };
      this.input = input;
      this.keysDown = {};
      this.keysReleased = {};
      this.keysPressed = {};
      document.addEventListener("keydown", (e) => {
        this.keysDown[e.code] = true;
        this.keysPressed[e.code] = true;
      });
      document.addEventListener("keyup", (e) => {
        this.keysDown[e.code] = false;
        this.keysReleased[e.code] = true;
      });
    }
  };

  // src/examples/game/Libs.ts
  var Libs = class {
    constructor(app2, scene) {
      this.load = () => __async(this, null, function* () {
        yield this.test.loadData();
      });
      this.app = app2;
      this.test = scene.createLibrary("test", "./test");
    }
  };

  // src/examples/game/App.ts
  var App = class {
    constructor(ctx2d2) {
      this.load = () => __async(this, null, function* () {
        yield this.libs.load();
        this.game = new Game(this);
      });
      this.update = () => {
        if (!!this.game)
          this.game.update();
        this.draw();
        this.input.postupdate();
        requestAnimationFrame(this.update.bind(this));
      };
      this.draw = () => {
        this.scene.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.game)
          this.game.draw(this.scene);
      };
      this.dpr = setupCanvas(ctx2d2.canvas);
      this.scene = new Canvas2dScene(ctx2d2);
      this.libs = new Libs(this, this.scene);
      this.input = new Input(this);
      this.game = null;
      this.load();
      this.update();
    }
    get canvas() {
      return this.scene.ctx.canvas;
    }
  };

  // src/examples/game/Main.ts
  var canvas = document.getElementById("canvas");
  if (!canvas)
    throw "A canvas element is id #canvas is required";
  var ctx2d = canvas.getContext("2d");
  if (!ctx2d)
    throw "Could not get 2d canvas context";
  var app = new App(ctx2d);
})();
//# sourceMappingURL=game.js.map
