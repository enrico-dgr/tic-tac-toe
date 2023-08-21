<!-- omit in toc -->
# Design

- [Prototypes](#prototypes)
- [Tech Stack](#tech-stack)
- [Samples](#samples)

## Prototypes

1. User Interface:
   - Clean and intuitive layout: Opt for a minimalist design with easily recognizable symbols or icons representing the Xs and Os.
   - Responsive design: Ensure that the game interface adapts seamlessly to different screen sizes, providing an optimal experience on both web and smartphone platforms.

2. Game Modes Selection:
   - Clear mode selection screen: Create a visually appealing screen where players can choose between single-player, local multiplayer, or online multiplayer modes.
  
3. Single-Player Mode:
   - Difficulty levels: Implement multiple difficulty options (easy, medium, hard) to cater to players of different skill levels.
   - AI opponent feedback: Provide visual cues or animations indicating the AI's move or thought process during gameplay.

4. Multiplayer Modes:
   - Local multiplayer interface: Design a split-screen view that allows players sitting side by side to interact with their respective sections of the board.
   - Online multiplayer lobby system: Develop a user-friendly lobby where players can create/join rooms and invite friends for real-time matches over the internet.

5. Customizable Rules:
  While this feature requires more in-depth consideration based on specific rule variations desired, here are some general suggestions:
    - Rule selection menu: Create an interface where users can customize various aspects such as board size, win conditions (e.g., diagonal wins allowed), additional symbols beyond Xs and Os (e.g., emojis).
    - Save/load custom rulesets: Enable users to save their preferred rule configurations so they can be reused later or shared with others.

## Tech Stack

1. Front-end Development:  
    React Native with Expo

2. User Interface Libraries/Frameworks:  
    React Native UI components

3. Game Logic and State Management:  
    Redux for managing game state and logic across different screens/components.

4. Networking and Real-time Multiplayer Functionality:  
    Socket.io for real-time communication between players.
  
5. AI Opponent in Single-Player Mode:  
    Implementing an AI opponent can be done using algorithms such as Minimax with Alpha-Beta Pruning for optimal move selection.

6. Cross-platform Compatibility:  
    To ensure compatibility across web and smartphone platforms, you can use tools/frameworks that support cross-platform development such as React Native (JavaScript-based) or Flutter (Dart-based).

7. Backend Development/Server-side Technologies (for online multiplayer mode):
     - Node.js with Express framework for handling API requests and server-side business logic.
     - MySQL for database storage of player profiles, game history, etc.

## Samples

```text
TicTacToeGame
├── app
│   ├── components
│   │   └── ...
│   ├── screens
│   │   └── ...
│   
├── server 
|     ├── minimax.ts (Minimax algorithm implementation)
|     ├── server.ts (Express server file)
|
├── package.json
└── tsconfig.json

```

1. React Native with Expo and TypeScript Setup:
   - Install Expo globally: `npm install -g expo-cli`
   - Create a new project with TypeScript template: `expo init --template expo-template-blank-typescript TicTacToeGame`
   - Navigate into the project directory: `cd TicTacToeGame`

2. Redux Setup with TypeScript in React Native (Expo):
   - Inside your React Native project directory (`TicTacToeGame`), install Redux and its dependencies along with types for TypeScript:

     ```text
     yarn add redux react-redux @types/react-redux
     ```

3. Express Server and MySQL Database Integration using Socket.io using TypeScript:

    ```typescript
    import express from 'express';
    import mysql from 'mysql';
    import { createServer } from 'http';
    import { Server, Socket } from 'socket.io';

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer);

    // Configure MySQL connection details
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database_name'
    });

    // Connect to MySQL database
    connection.connect((err) => {
      if (err) throw err;
      
      console.log('Connected to MySQL database!');
    });
    ```

    1. Minimax Algorithm Implementation in TypeScript within the server folder:

        ```typescript
        // Define your minimax algorithm implementation here

        function minimax(board: any[], depth: number, isMaximizingPlayer: boolean): number {
          // Implement the logic for minimizing or maximizing player moves based on board state
          
        }

        export default minimax;
        ```

    2. Socket.io Integration (TypeScript) within the server folder:

        ```bash
        # Install socket.io-client package along with its type definitions using npm
        npm install --save socket.io-client @types/socket.io-client
        ```

    3. Continue with the rest of the Express Server and MySQL Database Integration steps:

         ```typescript

         io.on('connection', (socket: Socket) => {
            // Handle socket events here
            
         });

         app.get('/', (req, res) => {
            // Handle API requests here
           
         });

         httpServer.listen(3000, () => {
            console.log('Server running on port 3000');
         });
         ```
