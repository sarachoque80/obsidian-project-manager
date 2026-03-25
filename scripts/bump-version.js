#!/usr/bin/env node

/**
 * Version Bumping Script for Obsidian Plugin
 *
 * Usage:
 *   node scripts/bump-version.js major  # 1.0.0 -> 2.0.0
 *   node scripts/bump-version.js minor  # 1.0.0 -> 1.1.0
 *   node scripts/bump-version.js patch  # 1.0.0 -> 1.0.1
 *
 * This script updates:
 *   - package.json
 *   - manifest.json
 *   - versions.json
 *   - CHANGELOG.md (prepares new section)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const type = args[0] || 'patch';

// Valid types
const validTypes = ['major', 'minor', 'patch'];
if (!validTypes.includes(type)) {
  console.error(`❌ Invalid version type: ${type}`);
  console.error(`   Valid types: ${validTypes.join(', ')}`);
  process.exit(1);
}

// File paths
const packageJsonPath = path.join(__dirname, '../package.json');
const manifestJsonPath = path.join(__dirname, '../manifest.json');
const versionsJsonPath = path.join(__dirname, '../versions.json');
const changelogPath = path.join(__dirname, '../CHANGELOG.md');

// Read files
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const manifestJson = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf8'));
const versionsJson = JSON.parse(fs.readFileSync(versionsJsonPath, 'utf8'));

// Current version
const currentVersion = packageJson.version;
console.log(`📦 Current version: ${currentVersion}`);

// Parse version
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Bump version
let newMajor = major;
let newMinor = minor;
let newPatch = patch;

switch (type) {
  case 'major':
    newMajor = major + 1;
    newMinor = 0;
    newPatch = 0;
    break;
  case 'minor':
    newMinor = minor + 1;
    newPatch = 0;
    break;
  case 'patch':
    newPatch = patch + 1;
    break;
}

const newVersion = `${newMajor}.${newMinor}.${newPatch}`;
console.log(`🚀 New version: ${newVersion}`);

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`✅ Updated ${packageJsonPath}`);

// Update manifest.json
manifestJson.version = newVersion;
fs.writeFileSync(manifestJsonPath, JSON.stringify(manifestJson, null, 2));
console.log(`✅ Updated ${manifestJsonPath}`);

// Update versions.json
const newVersionEntry = {
  version: newVersion,
  minAppVersion: manifestJson.minAppVersion,
  date: new Date().toISOString().split('T')[0],
  // IMPORTANTE: Para Obsidian, el URL del release NO debe tener prefijo 'v'
  downloadUrl: `https://github.com/antigravity/obsidian-direct-response-pm/releases/download/${newVersion}/obsidian-direct-response-pm-${newVersion}.zip`,
  description: `Version ${newVersion}`,
  breaking: type === 'major'
};

versionsJson.versions.unshift(newVersionEntry);
versionsJson.latestVersion = newVersion;
versionsJson.lastUpdated = new Date().toISOString();
fs.writeFileSync(versionsJsonPath, JSON.stringify(versionsJson, null, 2));
console.log(`✅ Updated ${versionsJsonPath}`);

// Prepare CHANGELOG.md
const changelogContent = fs.readFileSync(changelogPath, 'utf8');
const newEntry = `\n## [${newVersion}] - ${new Date().toISOString().split('T')[0]}\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n\n### Deprecated\n- \n\n### Removed\n- \n\n### Security\n- \n`;

// Insert after the Unreleased section
const updatedChangelog = changelogContent.replace(
  '(## \[Unreleased\])',
  `## [Unreleased]\n\n### Planned\n- \n${newEntry}`
);

fs.writeFileSync(changelogPath, updatedChangelog);
console.log(`✅ Updated ${changelogPath}`);

// Update version in README.md
const readmePath = path.join(__dirname, '../README.md');
if (fs.existsSync(readmePath)) {
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  const updatedReadme = readmeContent.replace(
    /Versión actual: \d+\.\d+\.\d+/,
    `Versión actual: ${newVersion}`
  );
  fs.writeFileSync(readmePath, updatedReadme);
  console.log(`✅ Updated ${readmePath}`);
}

// Update version in README-PRODUCTION.md
const readmeProdPath = path.join(__dirname, '../README-PRODUCTION.md');
if (fs.existsSync(readmeProdPath)) {
  const readmeProdContent = fs.readFileSync(readmeProdPath, 'utf8');
  const updatedReadmeProd = readmeProdContent.replace(
    /v\d+\.\d+\.\d+/g,
    (match) => {
      // Only update version numbers that are clearly version references
      if (match === 'v1.0.0' || match.match(/v\d+\.\d+\.\d+.*current/)) {
        return `v${newVersion}`;
      }
      return match;
    }
  );
  fs.writeFileSync(readmeProdPath, updatedReadmeProd);
  console.log(`✅ Updated ${readmeProdPath}`);
}

console.log(`\n✨ Version bumped to ${newVersion}!`);
console.log(`\nNext steps:`);
console.log(`  1. Review and update CHANGELOG.md with actual changes`);
console.log(`  2. Run: npm run build`);
console.log(`  3. Test the build in Obsidian`);
console.log(`  4. Commit: git add . && git commit -m "release: ${newVersion}"`);
console.log(`  5. Tag: git tag ${newVersion}`);
console.log(`     IMPORTANTE: El tag NO debe tener prefijo 'v' para Obsidian`);
console.log(`  6. Push: git push && git push --tags`);
console.log(`  7. GitHub Actions creará el release automáticamente`);
console.log(`     El release incluirá main.js, manifest.json y styles.css como assets individuales`);
