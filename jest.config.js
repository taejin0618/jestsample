module.exports = {
  // 🎯 TypeScript + Jest 설정
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // 📁 테스트 파일 패턴
  testMatch: [
    '**/tests/jest-examples/**/*.test.js',
    '**/tests/jest-examples/**/*.test.ts'
  ],
  
  // 🔧 파일 확장자와 변환 설정
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: false,
      isolatedModules: false
    }],
    '^.+\\.js$': 'babel-jest'
  },
  
  // 📊 리포트 설정
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'jest-coverage',
  coverageReporters: ['html', 'text', 'lcov'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/fixtures/',
    '/tests/helpers/'
  ],
  
  // 🆕 HTML 리포트 추가
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: 'jest-reports',
      filename: 'report.html',
      expand: true,
      hideIcon: false,
      pageTitle: '🟡 Jest + TypeScript 테스트 리포트'
    }]
  ],
  
  // ⚙️ 기타 설정
  roots: ['<rootDir>/tests'],
  testTimeout: 30000,
  setupFilesAfterEnv: [],
  
  // 🎯 TypeScript 전용 설정
  globals: {
    'ts-jest': {
      useESM: false,
      tsconfig: {
        strict: false,
        noImplicitAny: false
      }
    }
  },
  
  displayName: '🟡 Jest + TypeScript API Tests'
};