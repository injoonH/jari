import type { UserConfig } from '@commitlint/types'

export default {
  extends: ['gitmoji'],
  rules: {
    'type-empty': [2, 'always'],
    'scope-empty': [2, 'always'],
    'subject-case': [2, 'always', 'sentence-case'],

    // https://github.com/conventional-changelog/commitlint/issues/3036
    'subject-empty': [2, 'always'],
  },
} satisfies UserConfig
