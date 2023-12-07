import type { Frame } from 'react-native-vision-camera';
import type { MLKitPoseDetectionLandmarkKeyType, SKRNMLKitPoseDetectionMLKPoseLandmark } from './index';
export declare type SKRNMLKitVisionCameraPluginResultPoseItem = {
    [key in MLKitPoseDetectionLandmarkKeyType]?: SKRNMLKitPoseDetectionMLKPoseLandmark;
};
/**
 * Scans frame for MLKit poses.
 */
export declare function scanSKRNMLKitPose(frame: Frame): SKRNMLKitVisionCameraPluginResultPoseItem[];
