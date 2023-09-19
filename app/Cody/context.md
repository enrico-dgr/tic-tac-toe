# Cody Context File

The context file serves as a guide for Cody, helping it understand the purpose, structure, and requirements of your project. It provides relevant information about coding approaches, answer slots, project-specific details, and iterative improvement. Here's a summary of what each section of the file is used for:

1. Coding Approaches: This section provides an overview of different coding approaches relevant to your project. It includes descriptions, best practices, and code examples for each approach. Cody can refer to this section to understand the preferred coding style and techniques to be used.

2. Answer Slots: Answer slots define specific areas where you expect Cody to provide answers or information. Each answer slot has a title, description, and an indication of the expected answer format. You can customize the answer slots based on the specific questions or areas of interest you have for Cody.

3. References: This section lists relevant resources, such as links to documentation, articles, or tutorials that Cody can refer to for additional information. Providing references helps Cody access reliable information and enhance the quality of its responses.

4. Project-Specific Information: This section allows you to provide project-specific details. You can include information about subdirectories in your project, their purposes, and relevant files. This helps Cody understand the structure and context of your project, enabling it to provide more accurate and context-aware responses.

5. Iterative Improvement: This section emphasizes that the context file is a living document that will be updated and improved based on interactions with Cody. It encourages users to provide feedback on Cody's answers to help refine its performance and accuracy over time.

By providing this comprehensive context file, you enable Cody to better understand your project and tailor its responses accordingly.

## Coding Approaches

### Functional Programming

- Description: Functional programming is a programming paradigm that emphasizes immutability, pure functions, and the avoidance of shared state and side effects. It focuses on composing functions to solve problems and treats functions as first-class citizens.

- Best Practices:
  - Embrace Immutability: Encourage the use of immutable data structures and avoid modifying data in place. Instead, emphasize creating new data structures when transformations are needed.
  - Pure Functions: Promote the use of pure functions that produce the same output for the same input, without causing side effects. They facilitate reasoning about code and make it easier to test and debug.
  - Higher-Order Functions: Encourage the use of higher-order functions, which can take other functions as arguments or return them as results. They enable code reuse and can lead to more concise and expressive solutions.
  - Recursion: Utilize recursion over iteration when appropriate. It allows for elegant and concise code, especially in cases where the problem exhibits a recursive structure.
  - Function Composition: Advocate for composing functions by combining them to create more complex functionality. This promotes modularity and reusability of code.

- Code Examples:
  - Example 1: Calculating the sum of a list using functional programming principles:

    ```python
    def sum_list(numbers):
        if not numbers:
            return 0
        return numbers[0] + sum_list(numbers[1:])

    numbers_list = [1, 2, 3, 4, 5]
    result = sum_list(numbers_list)
    print(result)  # Output: 15
    ```

  - Example 2: Mapping a function to transform a list of strings into uppercase:

    ```js
    const names = ["john", "jane", "julia"];
    const upperNames = names.map(name => name.toUpperCase()); 
    console.log(upperNames); // Output: ["JOHN", "JANE", "JULIA"]
    ```

## Answer Slots

Tested commands:

- Ask Cody: Refactor Code
  - Command: After reading the whole file to have a better context, answer the question.

### Slot: [Title]

- Description: Describe the purpose of this answer slot.
- Expected Answer: Specify the type of answer or the format you expect Cody to provide in this slot.
- Answer:

### Slot: [Improve Cody Context File]

- Description: Is this file useful to Cody? How could I improve it?.
- Expected Answer: Some key point to improve context for Cody in order to understand everything I ask even if code files are not linked by code but textually related.
- Answer: After reading the whole file to have a better context, here are some ways I could improve the Cody context file:

  - Add annotations in code snippets to explain parts that are particularly relevant. More commentary helps me grasp context better.

  - Provide sample inputs/outputs for key functions. This helps me understand expected behavior.

  - Explain the purpose and structure of subdirectories. Knowing what each contains gives me more info to work with.

  - Maintain an iterative log of my responses and feedback. This allows you to refine my answers over time.

### Slot: [Code refining]

- Description: Refine code files at path `../src/*` where needed ( # Coding Approaches will be useful ) and return the refactoring in format of JSON-INPUTS-START/END
- Expected Answer: Improved code files with more comments.
- Answer:

### Slot: [Code refining]

- Description: Refine code file at path `../src/components/GameSelection/ConfigurationGame/Local.tsx` where needed ( # Coding Approaches will be useful ) by following these steps:

  1. Carefully review each file, analyzing the overall structure and flow. Look for areas that could benefit from:
     - Additional comments explaining intent and approach
     - Improved naming for variables, functions, classes, etc to increase clarity
     - Simplifying complex logic by breaking it into smaller reusable functions
     - Removing unused code or dependencies

  2. For each area identified in step 1, plan the changes needed while preserving original behavior:
     - Outline new comments to add explaining logic
     - Determine better names and update references
     - Extract chunks of logic into well-named functions
     - Safely delete unneeded code

  3. Produce updated files applying the planned changes from step 2. Preserve original formatting, only modifying whitespace when needed for changed logic.

  4. Return the updated files formatted as follows:

      JSON-INPUTS-START

      [
        {
          "path": "../src/file1.js",
          "content": "updated content for file1"
        },
        {  
          "path": "../src/file2.js",
          "content": "updated content for file2"
        }
      ]

      JSON-INPUTS-END
- Expected Answer: Improved code files with more comments. Answer can be auto-written through script './writeFiles.ts'
- Answer:

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

### Subdirectory 1: [Title]

- Description: Provide information about a specific subdirectory in your project.
- Purpose: Explain the purpose or functionality of this subdirectory.
- Relevant Files: List files or file types that are important in this subdirectory.

### Subdirectory 2: [Title]

- Description: Provide information about another subdirectory in your project.
- Purpose: Explain the purpose or functionality of this subdirectory.
- Relevant Files: List files or file types that are important in this subdirectory.

## Iterative Improvement

Based on the answer generated by Cody for the "Improve ## References" slot, we can identify areas for iterative improvement. Please refer to the analysis files for each iteration located in the [IterativeImprovement](./IterativeImprovement/) directory.

You can find all the analysis files as `./IterativeImprovement/*`. Each file provides detailed insights for a specific iteration.
Example files:

- `./IterativeImprovement/analysis-1-1.md`
- `./IterativeImprovement/analysis-1-2.md`
- `./IterativeImprovement/analysis-2-1.md`
- `./IterativeImprovement/analysis-*.md`

Please refer to the respective analysis files for detailed insights on each iteration.

We encourage users to provide feedback on Cody's answers and suggest any additional improvements. Your input will help refine Cody's performance and accuracy over time.

Please feel free to provide feedback and suggestions on the references generated by Cody. Your feedback is invaluable in making Cody a more effective coding assistant.

Thank you for your collaboration in continuously improving Cody's capabilities!
