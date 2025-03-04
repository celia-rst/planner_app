# Project description
A planner application for Android and iOS.

# Project setup

## Backend setup

### Generate Spring boot project
- Generate the Spring boot project with [Spring Initializr](https://start.spring.io/) including the following dependencies:
    - Spring Data JPA
    - Spring Security

### Project important source files
- controller : contains REST controllers for handling HTTP requests and using the services.
- service : contains business logic and uses the repositories.
- repository : contains interfaces for data access
- model/ : contains entity classes
- pom.xml : describes the project's structure and configuration, including its dependencies, build settings, and other configurations. Dependencies are lists all the libraries that the project depends on; Maven will download these libraries from a repository and include them in the build.
- application.properties : set up a variety of configurations, such as database connections, server ports, logging levels, and more.

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
See the dependencies in the package.json in frontent/

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
- Auto Import

### Troubleshooting
- Update all the packages : `npm update`
- Reset the server cache : `npm start -- --reset-cache`
- See the outdated packages : `npm outdated`
- Update a specific package to the latest version : `npm <package>@latest`
- `<file> is not on the classpath of project planner, only syntax errors are reported` error : Press Ctrl + Shift + P and select "Clean Java Language Server Workspace".
