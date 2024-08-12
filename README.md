# Project description
A planner application for Android and iOS.

# Project setup

## Backend setup

### Generate Spring boot project
- Generate the Spring boot project with [Spring Initializr](https://start.spring.io/) including the following dependencies:
    - Spring Web
    - Spring Data JPA
    - Spring Security
    - H2 Database (for development)
    - MySQL or PostgreSQL (for production)

## Frontend setup
- Install [Node.js](https://nodejs.org/en) v20.15.0 (LTS).
- Install [Android Studio](https://developer.android.com/studio?hl=fr) (android-studio-2024.1.1.11-windows).

### How to create a React Native app without using a Framework ?
Open your terminal or command prompt and navigate to the directory where you want to create your project.
- If you previously installed a global react-native-cli package, please remove it as it may cause unexpected issues: `npm uninstall -g react-native-cli @react-native-community/cli`.
- Create the new React Native project : `npx react-native init AwesomeProject`. Other option (with React Native Community CLI): `npx @react-native-community/cli@latest init AwesomeProject`.
- This is not necessary if you are integrating React Native into an existing application. Check this link: https://reactnative.dev/docs/integration-with-existing-apps.

Note :  To delete the new project folder with Powershell: `Remove-Item -Recurse -Force <folder>`.

### Run application on Android Emulator
- In Android Studio, go to "Virtual Device Manage" and create a new virtual device. Run this new device.
- Go to your React Native project folder (planner_app/frontend) and open a terminal.
- Launch the local development server called Metro : `npm run start` ou `npm start`.
- Or/and launch the app on a Android emulator : `npm run android` or `npx react-native run-android`.

Note : Run the command `npm run <script>` to run a specific script (`npm run` will show the possible script).

When saving a file in your text editor, Metro automatically detects the changes in Javascript, recompiles the source code and serves the "Javascript bundle" it to the Android device over a network connection.. This will automatically reload the affected parts of the user interface.

For more informations : [Get Started Without a Framework](https://reactnative.dev/docs/getting-started-without-a-framework), [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)

### Packages to install
- npm install axios
- npm install @react-navigation/native @react-navigation/stack
- npm install react-native-gesture-handler
- npm install react-native-elements

Optionnel (?) :
- npm install react-native-screens react-native-safe-area-context
- npm install @react-native-community/masked-view


# VSCode setup 
## Fundamentals
- Extension pack for Java
- Docker

## Backend tools
- Spring Boot Extension Pack

## Frontend tools
- React Native Tools
- Babel Javascript
- Flow Language Support
- ESLint
- Prettier - Javascript formatter

### Troubleshooting
Press Ctrl + Alt + P and select "Clean Java Language Server Workspace" if the following error occurs : `<file> is not on the classpath of project planner, only syntax errors are reported`