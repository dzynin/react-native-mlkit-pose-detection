"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLKitPoseDetectionLandmarkKeys = void 0;
exports.MLKitPoseDetector = MLKitPoseDetector;
Object.defineProperty(exports, "SKRNMLKitVisionCameraPluginResultPoseItem", {
  enumerable: true,
  get: function () {
    return _FrameProcessor.SKRNMLKitVisionCameraPluginResultPoseItem;
  }
});
exports.initializeVisionCameraFrameProcessor = initializeVisionCameraFrameProcessor;
Object.defineProperty(exports, "scanSKRNMLKitPose", {
  enumerable: true,
  get: function () {
    return _FrameProcessor.scanSKRNMLKitPose;
  }
});

var _reactNative = require("react-native");

var _FrameProcessor = require("./FrameProcessor");

const LINKING_ERROR = `The package 'react-native-mlkit-pose-detection' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const MLKitPoseDetectionLandmarkKeys = ["Nose", "LeftEyeInner", "LeftEye", "LeftEyeOuter", "RightEyeInner", "RightEye", "RightEyeOuter", "LeftEar", "RightEar", "MouthLeft", "MouthRight", "LeftShoulder", "RightShoulder", "LeftElbow", "RightElbow", "LeftWrist", "RightWrist", "LeftPinkyFinger", "RightPinkyFinger", "LeftIndexFinger", "RightIndexFinger", "LeftThumb", "RightThumb", "LeftHip", "RightHip", "LeftKnee", "RightKnee", "LeftAnkle", "RightAnkle", "LeftHeel", "RightHeel", "LeftToe", "RightToe"];
exports.MLKitPoseDetectionLandmarkKeys = MLKitPoseDetectionLandmarkKeys;
const SKRNMlkitPoseDetection = _reactNative.NativeModules.SKRNMlkitPoseDetection ? _reactNative.NativeModules.SKRNMlkitPoseDetection : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});

async function initializeVisionCameraFrameProcessor(opts) {
  return SKRNMlkitPoseDetection.initializeVisionCameraFrameProcessorWithOptions(opts || {});
}

// function multiply(a: number, b: number): Promise<number> {
//   return MlkitPoseDetection.multiply(a, b);
// }
function MLKitPoseDetector(accurate, detectionMode) {
  return global.SKRNMLKitPoseDetectionNewPoseDetector(accurate, detectionMode);
}
//# sourceMappingURL=index.js.map