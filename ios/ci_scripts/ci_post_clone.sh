#!/bin/sh

# Install CocoaPods and Node using Homebrew.
brew install node
brew install cocoapods

# Install dependencies you manage with npm.
cd ..
npm install
# Install dependencies you manage with CocoaPods.
cd ios/
pod install
