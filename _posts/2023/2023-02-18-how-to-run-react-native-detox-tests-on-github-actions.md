---
layout: post
title: How to run Detox tests on GitHub Actions
date: 2023-02-18 20:27:46
updated: 2023-03-01 22:28:30
excerpt: How to set up and run React Native Detox iOS and Android E2E (end-to-end) tests on GitHub Actions CI.
categories: react-native detox test github-actions ci ios android
---

This post goes over how to set up and run [React Native](https://reactnative.dev/) [Detox](https://wix.github.io/Detox/) tests on [GitHub Actions](https://github.com/features/actions):

- [Prerequisites](#prerequisites)
- [iOS](#ios)
  - [iOS Steps](#ios-steps)
  - [iOS Workflow](#ios-workflow)
- [Android](#android)
  - [Android Steps](#android-steps)
  - [Android Workflow](#android-workflow)
- [Resources](#resources)

## Prerequisites

You have a [React Native project with Detox](https://wix.github.io/Detox/docs/introduction/getting-started/) set up.

## iOS

Create a GitHub Actions workflow named `e2e-ios.yml`:

```sh
mkdir -p .github/workflows && touch .github/workflows/e2e-ios.yml
```

Name your workflow, set up the event that triggers the workflow, and create a job that runs on macOS:

```yml
name: e2e-ios
on: push
jobs:
  e2e-ios:
    runs-on: macos-latest
    steps:
      # ...
```

### iOS Steps

Check out the repository:

```yml
- name: Checkout repository
  uses: actions/checkout@v3
```

Set up Node.js:

```yml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    cache: yarn
    node-version-file: .node-version
```

If you're using [NVM](https://github.com/nvm-sh/nvm), replace `.node-version` with `.nvmrc`.

Install node_modules with Yarn:

```yml
- name: Install Yarn dependencies
  run: yarn --frozen-lockfile --prefer-offline
```

Install applesimutils with Homebrew:

```yml
- name: Install macOS dependencies
  run: |
    brew tap wix/brew
    brew install applesimutils
```

If you want to speed up the step, you can disable Homebrew's auto update and install cleanup:

```yml
env:
  HOMEBREW_NO_AUTO_UPDATE: 1
  HOMEBREW_NO_INSTALL_CLEANUP: 1
```

Set up Ruby, run bundle install, and cache gems:

```yml
- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    bundler-cache: true
```

[ruby/setup-ruby](https://github.com/ruby/setup-ruby) will get the Ruby version from `.ruby-version`.

Install and cache CocoaPods:

{% raw %}

```yml
- name: Cache CocoaPods
  id: cache-cocoapods
  uses: actions/cache@v3
  with:
    path: ios/Pods
    key: ${{ runner.os }}-pods-${{ hashFiles('ios/Podfile.lock') }}
    restore-keys: |
      ${{ runner.os }}-pods-

- name: Install CocoaPods
  if: steps.cache-cocoapods.outputs.cache-hit != 'true'
  run: cd ios ; pod install ; cd -
```

{% endraw %}

Optionally, you can [clean and build Detox framework cache](https://wix.github.io/Detox/docs/cli/rebuild-framework-cache/):

```yml
- name: Detox rebuild framework cache
  run: yarn detox rebuild-framework-cache
```

Build and cache Detox iOS (release) build:

{% raw %}

```yml
- name: Cache Detox build
  id: cache-detox-build
  uses: actions/cache@v3
  with:
    path: ios/build
    key: ${{ runner.os }}-detox-build
    restore-keys: |
      ${{ runner.os }}-detox-build

- name: Detox build
  run: yarn detox build --configuration ios.sim.release
```

{% endraw %}

This builds the iOS app using the `ios.sim.release` configuration in `.detoxrc.js`.

Run Detox tests:

```yml
- name: Detox test
  run: yarn detox test --configuration ios.sim.release --cleanup --headless --record-logs all
```

If you get the error `Exceeded timeout of 120000ms while setting up Detox environment`, then increase the [`testRunner.jest.setupTimeout`](https://wix.github.io/Detox/docs/config/testRunner/#testrunnerjestsetuptimeout-number) in `.detoxrc.js`.

If there's a failure, upload the [Detox artifacts](https://wix.github.io/Detox/docs/config/artifacts/) so you can download them after the workflow ends:

```yml
- name: Upload artifacts
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: detox-artifacts
    path: artifacts
```

### iOS Workflow

Here's the full E2E workflow for iOS (see [code](https://github.com/remarkablemark/react-native-cli-quickstart/blob/master/.github/workflows/e2e-ios.yml)):

{% raw %}

```yml
# .github/workflows/e2e-ios.yml
name: e2e-ios
on: push

jobs:
  e2e-ios:
    runs-on: macos-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          cache: yarn
          node-version-file: .node-version

      - name: Install Yarn dependencies
        run: yarn --frozen-lockfile --prefer-offline

      - name: Install macOS dependencies
        run: |
          brew tap wix/brew
          brew install applesimutils
        env:
          HOMEBREW_NO_AUTO_UPDATE: 1
          HOMEBREW_NO_INSTALL_CLEANUP: 1

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true

      - name: Cache CocoaPods
        id: cache-cocoapods
        uses: actions/cache@v3
        with:
          path: ios/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('ios/Podfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-pods-

      - name: Install CocoaPods
        if: steps.cache-cocoapods.outputs.cache-hit != 'true'
        run: cd ios ; pod install ; cd -

      - name: Detox rebuild framework cache
        run: yarn detox rebuild-framework-cache

      - name: Cache Detox build
        id: cache-detox-build
        uses: actions/cache@v3
        with:
          path: ios/build
          key: ${{ runner.os }}-detox-build
          restore-keys: |
            ${{ runner.os }}-detox-build

      - name: Detox build
        run: yarn detox build --configuration ios.sim.release

      - name: Detox test
        run: yarn detox test --configuration ios.sim.release --cleanup --headless --record-logs all

      - name: Upload artifacts
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: detox-artifacts
          path: artifacts
```

{% endraw %}

## Android

Before you start, make sure you first patch your project with the [additional Android configuration](https://wix.github.io/Detox/docs/introduction/project-setup/).

Create a GitHub Actions workflow named `e2e-android.yml`:

```sh
mkdir -p .github/workflows && touch .github/workflows/e2e-android.yml
```

Name your workflow, set up the event that triggers the workflow, and create a job that runs on macOS:

```yml
name: e2e-android
on: push
jobs:
  e2e-android:
    runs-on: macos-latest
    steps:
      # ...
```

### Android Steps

Check out the repository:

```yml
- name: Checkout repository
  uses: actions/checkout@v3
```

Set up Node.js:

```yml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    cache: yarn
    node-version-file: .node-version # .nvmrc
```

Install node_modules with Yarn:

```yml
- name: Install Yarn dependencies
  run: yarn --frozen-lockfile --prefer-offline
```

Set up Java:

```yml
- name: Setup Java
  uses: actions/setup-java@v3
  with:
    cache: gradle
    distribution: temurin
    java-version: 17
```

Build and cache Detox Android (release) build:

{% raw %}

```yml
- name: Cache Detox build
  id: cache-detox-build
  uses: actions/cache@v3
  with:
    path: ios/build
    key: ${{ runner.os }}-detox-build
    restore-keys: |
      ${{ runner.os }}-detox-build

- name: Detox build
  run: yarn detox build --configuration android.emu.release
```

{% endraw %}

This builds the Android app using the `android.emu.release` configuration in `.detoxrc.js`.

Get the Android Virtual Device (AVD) name from `.detoxrc.js`:

```yml
- name: Get device name
  id: device
  run: node -e "console.log('AVD_NAME=' + require('./.detoxrc').devices.emulator.device.avdName)" >> $GITHUB_OUTPUT
```

Run Detox tests using [reactivecircus/android-emulator-runner](https://github.com/ReactiveCircus/android-emulator-runner):

{% raw %}

```yml
- name: Detox test
  uses: reactivecircus/android-emulator-runner@v2
  with:
    api-level: 31
    arch: x86_64
    avd-name: ${{ steps.device.outputs.AVD_NAME }}
    script: yarn detox test --configuration android.emu.release --headless --record-logs all
```

{% endraw %}

Make sure not to pass the `--cleanup` option in the script or else it will [throw an error](https://github.com/wix/Detox/issues/3439#issuecomment-1147197404):

```
detox[27246] i adb: error: device 'emulator-5554' not found
```

If there's a failure, upload the [Detox artifacts](https://wix.github.io/Detox/docs/config/artifacts/) so you can download them after the workflow ends:

```yml
- name: Upload artifacts
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: detox-artifacts
    path: artifacts
```

### Android Workflow

Here's the full E2E workflow for Android (see [code](https://github.com/remarkablemark/react-native-android-detox/blob/master/.github/workflows/e2e-android.yml)):

{% raw %}

```yml
# .github/workflows/e2e-android.yml
name: e2e-android
on: push

jobs:
  e2e-android:
    runs-on: macos-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          cache: yarn
          node-version-file: .node-version

      - name: Install Yarn dependencies
        run: yarn --frozen-lockfile --prefer-offline

      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          cache: gradle
          distribution: temurin
          java-version: 17

      - name: Cache Detox build
        id: cache-detox-build
        uses: actions/cache@v3
        with:
          path: android/app/build
          key: ${{ runner.os }}-detox-build
          restore-keys: |
            ${{ runner.os }}-detox-build

      - name: Detox build
        run: yarn detox build --configuration android.emu.release

      - name: Get device name
        id: device
        run: node -e "console.log('AVD_NAME=' + require('./.detoxrc').devices.emulator.device.avdName)" >> $GITHUB_OUTPUT

      - name: Detox test
        uses: reactivecircus/android-emulator-runner@v2
        with:
          api-level: 31
          arch: x86_64
          avd-name: ${{ steps.device.outputs.AVD_NAME }}
          script: yarn detox test --configuration android.emu.release --headless --record-logs all

      - name: Upload artifacts
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: detox-artifacts
          path: artifacts
```

{% endraw %}

## Resources

- [react-native-cli-quickstart](https://github.com/remarkablemark/react-native-cli-quickstart)
- [react-native-android-detox](https://github.com/remarkablemark/react-native-android-detox)
