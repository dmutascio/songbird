#import "RNAppAuthAuthorizationFlowManager.h"
#import <RCTAppDelegate.h>
#import <React/RCTLinkingManager.h>
#import <UIKit/UIKit.h>

//@interface AppDelegate : RCTAppDelegate
@interface AppDelegate : RCTAppDelegate <RNAppAuthAuthorizationFlowManager>

@property(nonatomic, weak) id<RNAppAuthAuthorizationFlowManagerDelegate>
    authorizationFlowManagerDelegate;

@end
