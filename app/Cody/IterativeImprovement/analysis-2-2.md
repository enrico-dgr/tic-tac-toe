# Analysis 1

Ask Cody: Refactor Code
Command: After reading the whole file and its referenced files to have a better context, answer the question.

## References

### Slot: [Improve ## References]

- Description: I need a script's template for a hook, so I can run `src/Cody/writeFiles.ts` to move your output to the correct file. Path=../src/hooks/template.ts.
- Expected Answer: A typescript template inside a json-input.
- Answer:

JSON-INPUTS-START

[{

  "path": "../src/hooks/template.ts",

  "content": "

  ```tsx
  import { useEffect } from 'react';

  /**
  * Custom hook template
  */
  const useTemplate = () => {

    useEffect(() => {
      
    }, []);

  };

  export default useTemplate;
  ```

  "
  
}]

JSON-INPUTS-END

### Evaluation

- **Accuracy**: 100% understood the logic.
- **Completeness**: 40%. Poor `content` logic and comments.
- **Formatting**: 100%. The backticks are perfect, JSON format is perfect.

To further improve Cody's performance, we can make the following updates:

- **Enhance Accuracy**:
- **Enhance Completeness**: Add more abstracted code.
- **Enhance Formatting**: Keep this JSON-INPUTS-START/END format
