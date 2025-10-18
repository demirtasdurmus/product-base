/**
 * This script is used to patch the '@nx/expo' package to work with EAS Build.
 * It is run as a eas-build-post-install script in the 'package.json' of expo app.
 * It is executed as 'node tools/scripts/eas-build-post-install.mjs <workspace root> <project root>'
 * It will create a symlink from the project's node_modules to the workspace's node_modules.
 */

import { execSync } from 'child_process';
import { existsSync, symlink } from 'fs';
import { join } from 'path';

const [workspaceRoot, projectRoot] = process.argv.slice(2);

/**
 * Build libraries that the project depends on
 */
buildLibraries(['shared']);

if (existsSync(join(workspaceRoot, 'node_modules'))) {
  console.log('Symlink already exists');
  process.exit(0);
}

symlink(join(projectRoot, 'node_modules'), join(workspaceRoot, 'node_modules'), 'dir', (err) => {
  if (err) console.log(err);
  else {
    console.log('Symlink created');
  }
});

/**
 * Build any other libraries that the project depends on
 * @param {string[]} libraryNames
 * @returns {void}
 */
function buildLibraries(libraryNames) {
  try {
    execSync(`nx run-many -t=build -p=${libraryNames.join(',')}`, {
      cwd: workspaceRoot,
      stdio: 'inherit'
    });
    console.log(`${libraryNames.join(',')} built successfully`);
  } catch (error) {
    console.error(`Failed to build ${libraryNames.join(' ')}:`, error.message);
    process.exit(1);
  }
}
