var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequire5443;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,a.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequire5443=a);var r=a("5BHcR"),o=a("b4RtA");const i=document.getElementById("canvas"),s=i.getContext("2d");var c=r.setupCanvas(i);const l=new o.SceneCanvas2d(s),d=l.createLibrary("test","../assets/test");let f=0;function u(){l.ctx.clearRect(0,0,i.width,i.height),l.ctx.save(),l.ctx.translate(i.width/2,i.height/2),l.ctx.scale(c,c),d.symbol("Scene").draw(f),l.ctx.restore(),f+=1,requestAnimationFrame(u)}!async function(){await d.loadData(),u()}();
//# sourceMappingURL=index.9e54c3d3.js.map