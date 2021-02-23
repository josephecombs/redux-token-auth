"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invertMapKeysAndValues = void 0;
var invertMapKeysAndValues = function (stringMap) {
    var newStringMap = {};
    for (var key in stringMap) {
        var val = stringMap[key];
        newStringMap[val] = key;
    }
    return newStringMap;
};
exports.invertMapKeysAndValues = invertMapKeysAndValues;
//# sourceMappingURL=utility.js.map