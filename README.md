# Canvas 2d runtime for Animate CC Texture Atlas format

## Examples
- [Minimal](./bin/minimal.html)
- [Dynamic content](./bin/dynamic-content.html)
- [Symbol explorer](./bin/symbol-explorer.html)

## Building examples

```
npm install
npm run build-page
```

## Dev
Sets up a simple live server with

```
npm install
npm run dev
```

## Instructions to export atlas
1. Open any XLF file in the fla folder
2. Put any symbols you wish to export into the \_\_export\_\_ symbol in the library
3. Right click on \_\_export\_\_ and then Generate Texture Atlas
4. Select ../bin/${LIBRARY_NAME} as the path (just browse to the bin folder)
5. Hit export

## General library usage

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

### For dynamically rendered content
See examples

## Not yet supported
- The 'rotate' export option
- Tints
- Filters
- Brightness
