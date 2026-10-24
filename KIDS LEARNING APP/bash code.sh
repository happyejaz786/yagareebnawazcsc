# Terminal commands
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init KidLearn com.kidlearn.lkg --web-dir .
npx cap add android
npx cap copy
npx cap open android
# Android Studio will open to build your ready-to-publish APK!