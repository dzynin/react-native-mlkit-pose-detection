//
//  SKRNMLKitPoseDetectionVisionCameraFrameProcessor.m
//  react-native-mlkit-pose-detection
//
//  Created by Switt Kongdachalert on 18/1/2565 BE.
//

#import "SKRNMLKitPoseDetectionVisionCameraFrameProcessor.h"

#if HAS_VISION_CAMERA
#import <MLKitVision/MLKitVision.h>
#import <MLKitPoseDetectionCommon/MLKitPoseDetectionCommon.h>
#import <MLKitPoseDetection/MLKitPoseDetection.h>
#import <MLKitPoseDetectionAccurate/MLKitPoseDetectionAccurate.h>
// TODO: Change syntax to be similar to react-native-mlkit-face-detection
//#import <SKRNMLKitiOSPoseDetector.h>
//#import <map>
//using namespace SKRNMLKitPoseDetection;

extern NSDictionary *SKRNMLKitPoseDetectionMapStringLandmarkNamesToNativeNames;
extern NSDictionary *SKRNMLKitPoseDetectionMapNativeLandmarkNamesToStringNames;

@implementation SKRNMLKitPoseDetectionVisionCameraFrameProcessor {
    MLKPoseDetector *_poseDetector;
    BOOL canRun;
}
static SKRNMLKitPoseDetectionVisionCameraFrameProcessor *__shared_pose_frame_processor = nil;
+(SKRNMLKitPoseDetectionVisionCameraFrameProcessor *)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        __shared_pose_frame_processor = [SKRNMLKitPoseDetectionVisionCameraFrameProcessor new];
    });
    return __shared_pose_frame_processor;
}
-(void)initialize {
    canRun = YES;
}
-(void)invalidate {
    canRun = NO;
    self.poseDetector = nil;
}
-(BOOL)initializePoseDetectorWithOptions:(NSDictionary *)optionsDict {
    BOOL accurate = [optionsDict[@"accurate"] boolValue];
    BOOL detectionModeStream = [optionsDict[@"detectionMode"] isEqualToString:@"stream"];
    
    MLKCommonPoseDetectorOptions *options;
    if(accurate) {
        options = [[MLKAccuratePoseDetectorOptions alloc] init];
    }
    else {
        options = [[MLKPoseDetectorOptions alloc] init];
    }
    
    if(detectionModeStream) {
        options.detectorMode = MLKPoseDetectorModeStream;
    }
    else {
        options.detectorMode = MLKPoseDetectorModeSingleImage;
    }
    
    self.poseDetector = [MLKPoseDetector poseDetectorWithOptions:options];
    NSLog(@"initialized poseDetector %@", self.poseDetector);
    return YES;
}

-(MLKPoseDetector *)poseDetector {
    @synchronized(self) {
        return _poseDetector;
    }
}
-(void)setPoseDetector:(MLKPoseDetector *)p {
    @synchronized(self) {
        _poseDetector = p;
    }
}

-(NSArray <NSDictionary *>*)posesToBridge:(NSArray <MLKPose *>*)poses {
    NSMutableArray *ret = [NSMutableArray new];
    for(MLKPose *p in poses) {
        NSMutableDictionary *poseLandmarks = [NSMutableDictionary new];
        NSArray<MLKPoseLandmark *>*landmarks = [p landmarks];
        for(MLKPoseLandmark *l in landmarks) {
            NSLog(@"dict exists? %d", SKRNMLKitPoseDetectionMapNativeLandmarkNamesToStringNames.count);
            NSString *outType = SKRNMLKitPoseDetectionMapNativeLandmarkNamesToStringNames[l.type];
            NSDictionary *convDict = @{
                @"type": outType,
                // @"inFrameLikelihood": @(l.inFrameLikelihood),
                @"position":@{
                    @"x": @(l.position.x),
                    @"y": @(l.position.y),
                    // @"z": @(l.position.z)
                }
            };
            [poseLandmarks setObject:convDict forKey:outType];
        }
        [ret addObject:poseLandmarks];
    }
    return ret;
}

-(NSArray <NSDictionary *>*)poseResultsForVisionCameraFrame:(Frame *)frame {
    if(!self.poseDetector || !canRun) {
        NSLog(@"No Pose detector yet");
        @throw [NSError errorWithDomain:@"SKRNMLKitPoseDetection" code:404 userInfo:@{NSLocalizedDescriptionKey:@"Pose detector is not initialized yet. Call initializeVisionCameraFrameProcessorWithOptions: first"}];
    }
    MLKVisionImage *image = [[MLKVisionImage alloc] initWithBuffer:frame.buffer];
    image.orientation = frame.orientation;
    NSError *error;
    NSArray <MLKPose *>*poses = [self.poseDetector resultsInImage:image error:&error];
    if(error) {
        NSLog(@"Error processing frame %@", error);
    }
    NSLog(@"got poses, to send to bridge");
    return [self posesToBridge:poses];
}

static inline id SKRNMLKitPoseDetectionVisionCameraFrameProcessorPlugin(Frame* frame, NSArray* arguments) {
    SKRNMLKitPoseDetectionVisionCameraFrameProcessor *processor = [SKRNMLKitPoseDetectionVisionCameraFrameProcessor sharedInstance];
    return [processor poseResultsForVisionCameraFrame:frame];
}

VISION_EXPORT_FRAME_PROCESSOR(SKRNMLKitPoseDetectionVisionCameraFrameProcessorPlugin);
@end

#endif
