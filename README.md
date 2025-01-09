# Nora Take Home Assignment

## Prerequisities
- Node.js v16+ installed

## Install dependencies
```
npm install
```

## Start the Expo server
```
npx expo start
```

You can scan the QR generated on command line from your phone to run the app (Expo Go needs to be installed for running on Android).<br/>

Alternatively, you can run it on an emulator.

## Design decisions
- Used throttling to prevent too many API requests while user enters search query. Used the Lodash library for this.
- Split the app into modular components as much as possible.
- Memoized performance intensive components to prevent unnecessary re-renders such as the component which renders a list of tracks based on search results.
- Used the Deezer Music API since it is fully public. Didn't use Spotify API since it does not provide track preview URLs since November 2024 (<a href="https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api">https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api</a>).
- Implemented types for Track, Artist and Album based on information obtained via the API call.
- Fetched tracks in a paginated fashion for better performance. More tracks will be loaded as the user scrolls down further.

## Areas for improvement
- Animations for progress bar or progress circle around the play preview button as the track progresses.
- Implementing persistence in a database for favorites.
- Advanced filtering capabilities given to user.