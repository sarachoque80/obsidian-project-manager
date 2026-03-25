/**
 * Release Configuration for Direct Response Project Manager
 *
 * This configuration is used for automated releases and version management.
 */

module.exports = {
  // Plugin metadata
  plugin: {
    id: 'obsidian-direct-response-pm',
    name: 'Direct Response Project Manager',
    author: 'Antigravity',
    repository: 'https://github.com/antigravity/obsidian-direct-response-pm'
  },

  // Version management
  version: {
    current: '1.0.0',
    minAppVersion: '1.5.0',
    format: 'semantic' // 'semantic' or 'calver'
  },

  // Release channels
  channels: {
    stable: {
      name: 'Stable',
      tagPrefix: 'v',
      publishToObsidian: true
    },
    beta: {
      name: 'Beta',
      tagPrefix: 'beta-',
      publishToObsidian: false
    },
    alpha: {
      name: 'Alpha',
      tagPrefix: 'alpha-',
      publishToObsidian: false
    }
  },

  // Build artifacts
  build: {
    outputDir: './dist',
    files: [
      'main.js',
      'manifest.json',
      'styles.css'
    ],
    includeInRelease: [
      'README.md',
      'LICENSE',
      'CHANGELOG.md'
    ]
  },

  // Release assets
  assets: {
    createZip: true,
    zipName: 'obsidian-direct-response-pm-{version}.zip',
    includeSourceMaps: false
  },

  // Changelog
  changelog: {
    filePath: './CHANGELOG.md',
    format: 'markdown',
    sections: [
      { type: 'Added', label: 'Added' },
      { type: 'Changed', label: 'Changed' },
      { type: 'Fixed', label: 'Fixed' },
      { type: 'Deprecated', label: 'Deprecated' },
      { type: 'Removed', label: 'Removed' },
      { type: 'Security', label: 'Security' }
    ]
  },

  // GitHub release
  github: {
    createRelease: true,
    draft: false, // Set to true to review before publishing
    prerelease: false,
    generateNotes: true,
    categories: [
      'productivity',
      'project-management',
      'calendar',
      'task-manager'
    ]
  },

  // Obsidian community plugins
  obsidian: {
    autoSubmit: false, // Requires manual submission
    submissionUrl: 'https://github.com/obsidianmd/obsidian-releases',
    screenshotsRequired: 3,
    manifestRequired: true,
    readmeRequired: true,
    licenseRequired: true
  },

  // Notifications
  notifications: {
    onRelease: [
      {
        type: 'email',
        recipients: ['dev@antigravity.com'],
        template: 'release-email'
      },
      {
        type: 'discord',
        webhook: process.env.DISCORD_WEBHOOK_URL,
        channel: 'announcements'
      }
    ]
  },

  // Validation rules
  validation: {
    requiredFiles: [
      'manifest.json',
      'main.js',
      'styles.css',
      'README.md',
      'LICENSE',
      'CHANGELOG.md'
    ],
    requiredManifestFields: [
      'id',
      'name',
      'version',
      'minAppVersion',
      'description',
      'author',
      'authorUrl'
    ],
    versionPattern: /^\d+\.\d+\.\d+$/,
    license: 'MIT'
  },

  // Branch protection
  branches: {
    main: {
      protected: true,
      requireReview: true,
      requireStatusChecks: true,
      statusChecks: [
        'build',
        'test',
        'lint'
      ]
    }
  }
};
