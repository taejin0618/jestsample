# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 프로젝트의 코드 작업을 할 때 참고하는 가이드 문서입니다.

## 🎯 프로젝트 목적

이 프로젝트는 **개발팀을 위한 Axios + Jest 테스트 프로젝트**입니다. API 테스트를 효율적으로 작성하고 관리할 수 있도록 직관적인 함수명과 실제 API 연동 패턴을 제공합니다.

## 📚 핵심 명령어

### 기본 API 테스트
```bash
# 기본 API 테스트 (권장)
npm run test:basic-api

# 호환성을 위한 기존 명령어
npm run test:basic
```

### 실제 API 예제 (edumanager)
```bash
# 간단한 axios 플로우: 로그인 → 여정 생성 (권장)
npm run test:api-workflow

# 호환성을 위한 기존 명령어
npm run test:workflow
```

### 샘플 테스트
```bash
# 샘플 테스트 실행
npm run test:sample
```

### Jest 테스트 실행
```bash
# 모든 테스트 실행
npm test

# 개별 테스트 실행
npm run test:watch        # 파일 변경 감지 모드
npm run test:coverage     # 코드 커버리지 리포트
npm run test:report       # 테스트 리포트 생성
```

### 프로젝트 설정
```bash
# 완전 자동 설정 (권장)
npm run setup

# 환경변수 설정
npm run setup:env
npm run validate:env
```

## 🏗️ 프로젝트 아키텍처

### 📁 디렉토리 구조
```
tests/
├── jest-examples/         # 🟡 Jest + axios 테스트
│   ├── beginner-step0.test.js                 # 🟡 Jest + axios 기초 학습
│   ├── sample.test.js                         # 🟡 간단한 테스트 샘플
│   └── simple-edumanager-flow.test.js         # 🟡 Jest API 플로우 테스트
└── helpers/               # 🛠️ 공통 헬퍼 함수
    └── env-validator.js   # 🔧 환경변수 검증 도구
```

### 🎨 테스트 유형

- 🟡 **노란색**: 순수 axios/Jest (Node.js만 사용, 가장 빠름)

### 🔧 주요 도구

#### 헬퍼 함수
- `env-validator.js` - 환경변수 검증 및 설정 도구

#### 설정
- `jest.config.js` - Jest 테스트 프레임워크 설정

### 🔄 실제 API 연동

#### edumanager API 플로우
1. **로그인 API**: 인증 토큰 획득
2. **여정 생성**: 비즈니스 워크플로우 생성
3. **데이터 추출**: JSON 응답에서 변수로 값 추출

```javascript
// 예시 패턴:
const loginResponse = await axios.post('/login', loginData);
const authToken = loginResponse.data.token;  // 토큰 추출

const journeyResponse = await axios.post('/journey', journeyData);  
const journeyId = journeyResponse.data.id;   // 여정 ID 추출
```

### 💡 기본 기능

1. **기본 API 테스트**: axios HTTP 요청 테스트 (Jest 환경)

### ⚡ 테스트 프레임워크

#### Jest + axios - 순수 API 테스트
- **장점**: 가장 빠른 실행 속도, Node.js 기본 환경, 간단한 설정
- **추천**: API 테스트, 로직 검증, 빠른 피드백이 필요한 경우

## 🎓 개발자 가이드

### 코드 구조 이해하기

이 프로젝트 작업 시 다음 핵심 패턴에 집중하세요:

#### 테스트 파일 구성
- **jest-examples/**: Jest + axios 테스트 예제
- **helpers/**: 공통 헬퍼 함수

#### 실제 API 연동
프로젝트는 실제 edumanager API를 사용하여 실제 환경 패턴을 보여줍니다:
- 로그인으로 인증 토큰 획득
- 토큰을 사용해 여정/과정 생성
- 다음 단계를 위해 응답 값을 변수로 추출

### 개발을 위한 빠른 시작

1. **최초 설정**: `npm run setup`
2. **기본 테스트 실행**: `npm run test:basic-api`
3. **사용 가능한 모든 명령어 확인**: package.json의 scripts 섹션 참조
4. **새 테스트 추가**: 기존 예제의 패턴을 따라 작성

### 주요 문서

- **README.md**: 빠른 시작 가이드  
- **jest-examples/ 폴더**: 테스트 예제 파일

### 중요 참고사항

- 이 프로젝트는 실용성과 유지보수성을 우선시합니다
- 에러 처리는 개발 편의를 위해 설계되었으며, 필요시 프로덕션 수준으로 개선 가능합니다
- 모든 예제는 오프라인에서 작동합니다 (실제 서버 연결 없이도 테스트 가능)
- 한국어 개발팀을 위해 전체적으로 한국어 주석이 포함되어 있습니다
- Jest + axios 조합으로 가장 빠르고 간단한 API 테스트 작성에 집중합니다

## 📝 작업 메모리

- to memorize