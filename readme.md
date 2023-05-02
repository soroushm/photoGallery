# React-native based App

## Getting Started

To get started with this project, simply run:

```bash
yarn install
yarn prepare
yarn dev
cd ios && pod install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn ios`

Runs the app in the iphone simulation mode.\

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn prepare`

setup recommit stage for running lint and test in order to make sure everything working fine

## task

### Create a photo gallery application

The aim of this exercise is to create a photo gallery application using React Native (not Expo!). Gallery should contain at least 100 photos.
You can use REST or GraphQL to get the data.

You should take no more than 5-6 hours to complete this task.

### Technical requirements

1. Mock the data and create API layer to retrieve the data.
2. Organize the data flow using redux-toolkit.
3. Show photo thumbnails in the single screen. The screen should be responsive.
4. Allow the user to select a photo by pressing on it and then open a modal to show the photo with original size.
5. User can add comments on a photo and edit or delete them later.
6. Solve this challenge using redux-toolkit + react-query + hooks + styled-components + typescript
