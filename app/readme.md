# Read Me

## References

- [Project Repo](https://github.com/enrico-dgr/tic-tac-toe) - Project repository

- [React documentation](https://reactjs.org/docs/getting-started.html) - Core React library docs
- [Redux documentation](https://redux.js.org/introduction/getting-started) - State management with Redux
- [React Router documentation](https://reactrouter.com/docs/en/v6/getting-started/overview) - Routing and navigation
- [Jest documentation](https://jestjs.io/docs/getting-started) - Unit testing framework
- [SudoLang](https://github.com/paralleldrive/sudolang-llm-support/tree/main) - Programming language to collaborate with AI

## Project-Specific Information

### App component  

- Description: The main entry point that initializes the Redux store, applies theme styling, and renders the GameScreen.

- Purpose: Sets up the core app infrastructure before rendering the main game interface.

- Relevant files: App.tsx, store.ts, style/  

### Game Screen component

- Description: Displays the tic-tac-toe board and handles game logic and turns. Connects to Redux to get state.

- Purpose: Provides the core game interface and gameplay functionality.

- Relevant files: screens/Game/*.tsx?, Board/*.tsx?

### Redux store

- Description: Manages app state like board, turns, theming. Allows components to update state and react to changes.

- Purpose: Centralized state management.

- Relevant files: src/redux/store.ts, src/redux/slices/*.ts

### Theme styling  

- Description: Provides light and dark theme styles that components can use dynamically.

- Purpose: Enable switching between different visual themes.

- Relevant files: useStyle.ts, src/style/*.ts

### Navigation

- Description: Routes to navigate between screens like GameScreen and HomeScreen. Stack navigator manages flow.

- Purpose: App navigation and routing.

- Relevant files: src/screens/Routing.tsx

### Services  

- Description: Handles game data and realtime communication via Socket.io. Instead normal fetch is used for user and game creation.

- Purpose: Multiplayer/SinglePlayer backend API and realtime server.

- Relevant files: services/socket, services/fetch/*.ts
