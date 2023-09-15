import fs from 'fs';

// Function to write content to a file
function writeFile(path: string, content: string) {
  fs.writeFileSync(path, content);
  console.log(`Content successfully written to ${path}`);
}

// Example usage
const inputs = [
  {
    path: 'pathToATsFile.ts',
    content: '```ts\nconst example = "TypeScript code";\n```'
  },
  {
    path: 'pathToAJsFile.js',
    content: '```js\nconst example = "JavaScript code";\n```'
  },
  {
    path: 'thePathToAMdFile.md',
    content: '```markdown\n# Example\nThis is some **markdown** text.\n```'
  }
];

const extractInputs = () => {
  const fileContent = fs.readFileSync('./context.md').toString();
  // Regex to fix
  /**
   * Example text for regex:
   * Input {
      path: lofol/xd/asd.js
      content:
      ```js
      const someCode = () => {};
      const obj = {};
      ```
    }
   */
  return fileContent.matchAll(/Input *\{(\n+[\s]+[a-zA-Z0-9]+: [^\n]+)+\n+/g);
}

// Loop through each input and write the content to the respective file
inputs.forEach(input => {
  writeFile(input.path, input.content);
});