"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modWrap = void 0;
function modWrap(a, b) {
    return a - b * Math.floor(a / b);
}
exports.modWrap = modWrap;
