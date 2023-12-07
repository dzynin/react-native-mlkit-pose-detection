/**
 * Scans frame for MLKit poses.
 */
export function scanSKRNMLKitPose(frame) {
  'worklet'; // @ts-expect-error

  return __SKRNMLKitPoseDetectionVisionCameraFrameProcessorPlugin(frame);
}
//# sourceMappingURL=FrameProcessor.js.map