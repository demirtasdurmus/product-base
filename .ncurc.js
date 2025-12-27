/** @type {import('npm-check-updates').RcOptions } */
module.exports = {
  upgrade: true,
  target: 'patch',
  packageManager: 'pnpm',
  packageFile: 'package.json',
  reject: (name, _semver) => {
    if (
      name.startsWith('@nx/') ||
      name.startsWith('react') ||
      name.startsWith('@testing-library/') ||
      name === 'nx' ||
      name === '@types/react'
    ) {
      return true;
    }
    return false;
  }
};
