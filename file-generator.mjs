#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import * as readline from 'node:readline/promises'

/**
 * Step 1: import fs and readline modules for the script
 * Step 2: create readline interface for input and output
 * Step 3: using readline methods, ask user for filename
   Step 4: v1: using readline methods, ask user for function name
           v2: using readline methods, ask user for content type, i.e. function, class, or something else.
   Step 5: Close readline interface
   Step 6: Using fs methods, create file with required description and boilerplate content.
   Step 7: Let the user know that the required processes have been run and the files created.
   Step 8: Exit
*/

const getUserInput = async () => {
  const projectName = await rl.question('Please enter the name of the project where the boilerplate should be generated:\n');

  const fileName = await rl.question('Please enter the name of the file for which boilerplate should be generated:\n');

  const functionName = await rl.question('Please enter the name of the function for which boilerplate content should be generated:\n');

  return { projectName, fileName, functionName }
}

const generateFilePath = (projectName, fileName) => {
  const filePath = new URL(`./../../pycharm-projects/cs-162-assignments/project-${projectName}-jawkha/${fileName}`, import.meta.url).pathname
  return filePath
}

const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content)
}

const generateFileContent = (functionName) => `# Author: Jawad Khawaja
# GitHub username: jawkha
# Date: ${new Date().toLocaleString('us')}
# Description: Takes a number time_in_seconds (t), calculates the
#               distance_in_meters (d) an object has fallen during
#               this time using the formula:
#                   d = (1/2)(g)(t)**2
#               where g represents the acceleration_due_to_gravity
#               in meters per second per second and equals 9.8.
#               Returns distance_in_meters.


def ${functionName}():
    """
    Docstring here
    """
    # Function Body Line 1
    # Function Body Line 2
    # Function Body Line 3

    return 'function_return_value'
`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const { projectName, fileName, functionName } = await getUserInput()
const filePath = generateFilePath(projectName, fileName)
const content = generateFileContent(functionName)
createFile(filePath, content)

const absoluteFilePath = path.resolve('./../../pycharm-projects/cs-162-assignments', `project-${projectName}-jawkha/`)

rl.on('close', () => {
  console.log(`The required file ${fileName} with boilerplate content has been created as ${absoluteFilePath}`)
  process.exit(0)
})

rl.close()
