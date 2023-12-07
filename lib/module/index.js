import { NativeModules, Platform } from 'react-native';
export { scanSKRNMLKitPose, SKRNMLKitVisionCameraPluginResultPoseItem } from './FrameProcessor';
const LINKING_ERROR = `The package 'react-native-mlkit-pose-detection' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
export const MLKitPoseDetectionLandmarkKeys = ["Nose", "LeftEyeInner", "LeftEye", "LeftEyeOuter", "RightEyeInner", "RightEye", "RightEyeOuter", "LeftEar", "RightEar", "MouthLeft", "MouthRight", "LeftShoulder", "RightShoulder", "LeftElbow", "RightElbow", "LeftWrist", "RightWrist", "LeftPinkyFinger", "RightPinkyFinger", "LeftIndexFinger", "RightIndexFinger", "LeftThumb", "RightThumb", "LeftHip", "RightHip", "LeftKnee", "RightKnee", "LeftAnkle", "RightAnkle", "LeftHeel", "RightHeel", "LeftToe", "RightToe"];
const SKRNMlkitPoseDetection = NativeModules.SKRNMlkitPoseDetection ? NativeModules.SKRNMlkitPoseDetection : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
export async function initializeVisionCameraFrameProcessor(opts) {
  return SKRNMlkitPoseDetection.initializeVisionCameraFrameProcessorWithOptions(opts || {});
}
// function multiply(a: number, b: number): Promise<number> {
//   return MlkitPoseDetection.multiply(a, b);
// }
export function MLKitPoseDetector(accurate, detectionMode) {
  return global.SKRNMLKitPoseDetectionNewPoseDetector(accurate, detectionMode);
}
//# sourceMappingURL=index.js.map