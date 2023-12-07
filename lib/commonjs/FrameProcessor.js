"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanSKRNMLKitPose = scanSKRNMLKitPose;

/**
 * Scans frame for MLKit poses.
 */
function scanSKRNMLKitPose(frame) {
  'worklet'; // @ts-expect-error

  return __SKRNMLKitPoseDetectionVisionCameraFrameProcessorPlugin(frame);
}
//# sourceMappingURL=FrameProcessor.js.map