# Canvas 2d runtime for Animate CC Texture Atlas format

## Demos
- [Web Component](https://621c5701d3eec8a32cc85587--animate-cc-runtime.netlify.app/web-component/index.html)
- [Dynamic Content](https://621c5701d3eec8a32cc85587--animate-cc-runtime.netlify.app/dynamic-content/index.html)
- [Symbol Explorer](https://621c5701d3eec8a32cc85587--animate-cc-runtime.netlify.app/symbol-explorer/index.html)
- [DOM Renderer](https://621c580255eda7980812813d--animate-cc-runtime.netlify.app/dom/index.html)

## Web Component usage
Import the library somewhere in your index.js file:

```import "animcc"```

You can now utilise the web component in your HTML/JSX:

```
<anim-cc path='../assets/test/' clip="Scene" stage-width="550" stage-height="310" origin-x="0.5" origin-y="0.5" />
```

See the [web component example](examples/web-component/index.html) for optional attributes.

## Advanced library usage

### First initialise the animation context with a Canvas Context 2d
```
const animContext = new Canvas2dAnimationContext(ctx)
```

### Then create any libraries you want
```
const testLibrary = animContext.createLibrary('test', './test')
const monstersLibrary = animContext.createLibrary('monsters', './monsters')
```

### Load the libraries
```
await testLibrary.loadData();
await monstersLibrary.loadData();
```

### Then draw clips in your render loop
```
testLibrary.symbol("Walker_Laser").draw(frame)
monsterLibrary.symbol("win").draw(frame)
```

## Dynamically rendered content
See the [dynamic-content.ts example](examples/dynamic-content)

## Not yet supported
- The 'rotate' export option
- Tints
- Filters
- Brightness

## Building examples

```
npm install
npm run build-page
```

## Dev
Set up a simple live server with

```
npm install
npm run dev
```
