module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 75], // github commit without being trucated
    'scope-enum': [
      2,
      'always',
      ['ui', 'auth', 'profile', 'landing', 'org', 'space', 'noti', 'all', 'common', 'husky', 'sidebar'],
    ],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', ['lower-case']],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'release',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'ci',
        'build',
      ],
    ],
  },
}
