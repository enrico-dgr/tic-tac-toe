import fs from 'fs';
import path from 'path';

// Function to write content to a file
function writeFile(pathname: string, content: string) {
  fs.writeFileSync(pathname, content);
  console.log(`Content successfully written to ${pathname}`);
}

type Input = {
  path: string;
  content: string;
};

const inputs: Input[] = [];
const badInputs = [];

const objIsInput = (input: Input): boolean => {
  return typeof input.path === 'string' && typeof input.content === 'string';
};

const toValidPath = (pathname: string) => {
  const pathSplitted = pathname.split(/[\\/](?=[a-zA-Z0-9])/);

  const systemValidPath = path.resolve(__dirname, ...pathSplitted);

  return systemValidPath
};

const sanitizeInputPath = (input: Input) => {
  input.path = toValidPath(input.path);
};

const sanitizeInputContent = (input: Input) => {
  input.content = input.content.replace(/```([a-zA-Z]+)?/g, '');
};

const classifyAndSaveInput = (inp: any) => {
  if (objIsInput(inp)) {
    inputs.push(inp);
  } else {
    badInputs.push(inp);
  }
};

const extractInputs = () => {
  const systemValidPath = toValidPath('./context.md')

  const fileContent = fs.readFileSync(systemValidPath).toString();

  const tokenStart = 'JSON-INPUTS-START';
  const tokenEnd = 'JSON-INPUTS-END';
  const jsonStart = fileContent.indexOf(tokenStart) + tokenStart.length;
  const jsonEnd = fileContent.indexOf(tokenEnd);

  const strJson = fileContent.slice(jsonStart, jsonEnd).replace(/(\r\n|\n|\r)+/g,"");

  let extractedInputs = {};

  try {
    extractedInputs = JSON.parse(strJson);
  } catch (error) {
    const err = error as Error;

    const position = err.message.replace(/[^0-9]*([0-9]+)/, '$1');
    console.log(strJson.slice(0, Number(position)));
    console.log('\nError here')
    console.log(strJson.slice(Number(position)));

    console.error(error);
    return;
  }

  if (extractedInputs instanceof Array) {
    extractedInputs.forEach(classifyAndSaveInput);
  } else {
    console.error(
      "Cody's json inputs are not well formatted.",
      "Inputs' string: ",
      strJson
    );
  }
};

extractInputs();

// Loop through each input and write the content to the respective file
inputs.forEach((input) => {
  sanitizeInputContent(input);
  sanitizeInputPath(input);
  writeFile(input.path, input.content);
});
