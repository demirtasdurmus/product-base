/** @type {import('npm-check-updates').RcOptions } */
module.exports = {
  upgrade: true,
  target: 'patch',
  packageManager: 'npm',
  packageFile: 'package.json',
  reject: (name, _semver) => {
    if (
      name.startsWith('@nx/') ||
      name.startsWith('react') ||
      name.startsWith('@testing-library/') ||
      name === 'nx'
    ) {
      return true;
    }
    return false;
  }
};
