import type { NativeFrameWrapper } from 'react-native-native-video';
export { scanSKRNMLKitPose, SKRNMLKitVisionCameraPluginResultPoseItem } from './FrameProcessor';
export declare const MLKitPoseDetectionLandmarkKeys: readonly ["Nose", "LeftEyeInner", "LeftEye", "LeftEyeOuter", "RightEyeInner", "RightEye", "RightEyeOuter", "LeftEar", "RightEar", "MouthLeft", "MouthRight", "LeftShoulder", "RightShoulder", "LeftElbow", "RightElbow", "LeftWrist", "RightWrist", "LeftPinkyFinger", "RightPinkyFinger", "LeftIndexFinger", "RightIndexFinger", "LeftThumb", "RightThumb", "LeftHip", "RightHip", "LeftKnee", "RightKnee", "LeftAnkle", "RightAnkle", "LeftHeel", "RightHeel", "LeftToe", "RightToe"];
export declare type MLKitPoseDetectionLandmarkKeyType = (typeof MLKitPoseDetectionLandmarkKeys)[number];
export declare function initializeVisionCameraFrameProcessor(opts?: {
    accurate?: boolean;
    detectionMode?: 'stream' | 'image';
}): Promise<boolean>;
export interface Position3D {
    x: number;
    y: number;
    // z: number;
}
export interface SKRNMLKitPoseDetectionMLKPoseLandmark {
    // inFrameLikelihood: number;
    position: Position3D;
    type: MLKitPoseDetectionLandmarkKeyType;
}
export interface SKRNMLKitPoseDetectionMLKPose {
    landmarks(): SKRNMLKitPoseDetectionMLKPoseLandmark[];
    landmarkOfType(type: MLKitPoseDetectionLandmarkKeyType): SKRNMLKitPoseDetectionMLKPoseLandmark;
}
export interface SKRNMLKitPoseDetector {
    process(frame: NativeFrameWrapper): SKRNMLKitPoseDetectionMLKPose[];
}
export declare function MLKitPoseDetector(accurate?: boolean, detectionMode?: 'stream' | 'single'): SKRNMLKitPoseDetector;
