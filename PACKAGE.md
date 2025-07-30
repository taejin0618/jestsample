# 📦 Package.json 가이드

이 문서는 `axios-jest-testing` 프로젝트의 package.json 파일에 대한 상세한 설명입니다.

## 📋 기본 정보

| 항목 | 값 | 설명 |
|------|-----|------|
| **name** | `axios-jest-testing` | 프로젝트명 |
| **version** | `1.0.0` | 현재 버전 |
| **description** | `개발팀을 위한 Axios + Jest 테스트 환경` | 프로젝트 설명 |
| **license** | `MIT` | 오픈소스 라이선스 |
| **author** | `테스트 자동화 프로젝트` | 작성자 |

## 🏃‍♂️ NPM Scripts 가이드

### 🧪 테스트 실행 명령어

#### 기본 테스트 명령어
```bash
npm test                    # 모든 Jest 테스트 실행
npm run test:watch         # 파일 변경 감지 모드로 테스트 실행
npm run test:coverage      # 코드 커버리지 리포트 생성
npm run test:report        # 테스트 실행 + HTML 리포트 생성
```

#### 개별 테스트 명령어
```bash
npm run test:basic-api     # 기본 API 테스트만 실행 (Jest) - 권장
npm run test:api-workflow  # 워크플로우 API 테스트만 실행 (Jest) - 권장  
npm run test:sample        # 샘플 테스트만 실행 (Jest)
npm run test:basic         # 기본 API 테스트 (호환성)
npm run test:workflow      # 워크플로우 API 테스트 (호환성)
```

### ⚙️ 설정 및 환경 명령어

```bash
npm run setup              # 전체 프로젝트 설정 (의존성 설치 + 환경변수 설정)
npm run setup:env          # 환경변수 파일(.env) 생성
npm run validate:env       # 환경변수 설정 검증
```

## 📚 의존성 패키지 분석

### 🔧 운영 의존성 (dependencies)

| 패키지 | 버전 | 용도 |
|--------|------|------|
| **axios** | `^1.11.0` | HTTP 클라이언트 라이브러리 - API 요청/응답 처리 |
| **dotenv** | `^16.3.0` | 환경변수 관리 - .env 파일 로딩 |

### 🛠️ 개발 의존성 (devDependencies)

| 패키지 | 버전 | 용도 |
|--------|------|------|
| **jest** | `^30.0.5` | JavaScript 테스트 프레임워크 |
| **jest-html-reporters** | `^3.1.7` | Jest 테스트 결과를 HTML로 생성 |
| **@types/jest** | `^30.0.0` | Jest TypeScript 타입 정의 |
| **@types/node** | `^20.19.9` | Node.js TypeScript 타입 정의 |

## 🎯 키워드 (Keywords)

프로젝트의 핵심 특징을 나타내는 키워드들:

- `axios` - HTTP 클라이언트
- `jest` - 테스트 프레임워크  
- `testing` - 테스팅 도구
- `automation` - 자동화
- `beginner-friendly` - 초보자 친화적

## 💻 시스템 요구사항

### Node.js 버전
```json
"engines": {
  "node": ">=18.0.0"
}
```

**최소 Node.js 18.0.0** 이상이 필요합니다.

## 🔍 Scripts 상세 분석

### 1. 기본 테스트 Scripts

```json
"test": "jest"
```
- 모든 Jest 테스트 파일을 실행
- `*.test.js` 또는 `*.spec.js` 파일들을 자동 감지

```json
"test:watch": "jest --watch"
```
- 파일 변경을 감지하여 자동으로 테스트 재실행
- 개발 중 실시간 피드백에 유용

```json
"test:coverage": "jest --coverage"
```
- 코드 커버리지 리포트 생성
- `jest-coverage/` 폴더에 HTML 리포트 생성

### 2. 프로젝트 설정 Scripts

```json
"setup": "npm install && npm run setup:env"
```
- 전체 프로젝트 초기 설정
- 의존성 설치 → 환경변수 설정 순서로 실행

```json
"setup:env": "node -e \"const {createEnvFile} = require('./tests/helpers/env-validator'); createEnvFile();\""
```
- `.env` 파일 자동 생성
- `env-validator.js` 헬퍼 함수 사용

### 3. 개별 테스트 Scripts

```json
"test:basic-api": "echo '🟡 [Jest 실행] 기본 API 테스트'; jest tests/jest-examples/basic-api"
```
- 기본 API 테스트만 실행 (권장 명령어)
- `tests/jest-examples/basic-api.test.js` 파일 대상

```json
"test:api-workflow": "echo '🟡 [Jest 실행] 워크플로우 API 테스트'; jest tests/jest-examples/api-workflow"
```
- 워크플로우 API 테스트만 실행 (권장 명령어)  
- `tests/jest-examples/api-workflow.test.js` 파일 대상

```json
"test:sample": "echo '🟡 [Jest 실행] 샘플 테스트'; jest tests/jest-examples/sample"
```
- 샘플 테스트만 실행
- `tests/jest-examples/sample.test.js` 파일 대상

```json
"test:basic": "echo '🟡 [Jest 실행] 기본 API 테스트'; jest tests/jest-examples/basic-api"
"test:workflow": "echo '🟡 [Jest 실행] 워크플로우 API 테스트'; jest tests/jest-examples/api-workflow"
```
- 기존 호환성을 위한 명령어들

## 🚀 실행 예시

### 새 프로젝트 설정
```bash
# 1. 전체 설정 (한 번만)
npm run setup

# 2. 기본 테스트 실행 (권장)
npm run test:basic-api

# 3. 워크플로우 테스트 실행
npm run test:api-workflow

# 4. 모든 테스트 실행
npm test
```

### 개발 중 테스트
```bash
# 파일 변경 감지 모드로 테스트
npm run test:watch

# 커버리지 확인
npm run test:coverage
```

## 📊 리포트 생성

### HTML 테스트 리포트
```bash
npm run test:report
```

생성되는 리포트:
- 📂 **Jest HTML 리포트**: `jest-reports/report.html`
- 📊 **커버리지 리포트**: `jest-coverage/index.html`

## 🔧 버전 관리 정책

- **Axios**: `^1.11.0` - 주요 버전 유지, 마이너 업데이트 허용
- **Jest**: `^30.0.5` - 최신 버전 사용으로 성능 최적화
- **Node.js**: `>=18.0.0` - 최신 ECMAScript 기능 활용

## 💡 개발 팁

### 새로운 테스트 추가 시
1. `tests/jest-examples/` 폴더에 `*.test.js` 파일 생성
2. package.json에 개별 실행 script 추가 (선택사항)
3. `npm test`로 전체 테스트 확인

### 의존성 추가 시
```bash
# 운영 의존성
npm install [package-name] --save

# 개발 의존성
npm install [package-name] --save-dev
```

---

## 📝 요약

이 package.json은 **Jest + Axios 기반의 API 테스트 환경**을 제공합니다:

- ✅ **간단한 설정**: `npm run setup` 한 번으로 모든 설정 완료
- ✅ **다양한 테스트 옵션**: 개별/전체/감시 모드 지원
- ✅ **시각적 리포트**: HTML 기반 테스트 결과 확인
- ✅ **초보자 친화적**: 명확한 명령어와 한국어 메시지