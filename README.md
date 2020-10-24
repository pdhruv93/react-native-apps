1. Start your metro server on port 8088
react-native start  --port=8088

2. Start app
react-native run-android  --port=8088



COMMON ACTIONS AND LINKS
======================================
1. ADB error on emulator when you start the app first time. Goto project root dir and then
adb reverse tcp:8088 tcp:8088


2. Some Cache issue. Goto project root dir and then
npm cache clean -f

3.* What went wrong:
Execution failed for task ':app:processDebugResources'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade
   > Unable to delete directory 'C:\dhruv-react-native-workspace\atatime\android\app\build\generated\not_namespaced_r_class_sources\debug\r\androidx\lifecycle' after 10 attempts


Goto project root dir
cd android
gradlew clean
cd ..
react-native run-android  --port=8088



4. JVM agrs
add this entry in gradle.properties
org.gradle.jvmargs=-Xmx4608m


5. Some multiDexEnabled error
Addd multiDexEnabled true
in build.gradle

 defaultConfig {
        applicationId "com.atatime"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
    }


6. Facebook Login Android
https://www.youtube.com/watch?v=lptfpgnwuZM&t=285s

7. Signed APK for Android in React-native
https://reactnative.dev/docs/signed-apk-android

8. Build .aab: gradlew bundleRelease
Build .apk: gradlew assembleRelease
