// const { default: module } = require('@react-native-firebase/app');
// const { NativeModules } = require('react-native');

function componentToHex(c) {
    var cInt = Math.round(c);
    var hex = cInt.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

export function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
