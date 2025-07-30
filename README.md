# 🎯 TypeScript + Jest + Axios 테스트 프로젝트

**개발팀을 위한 완벽한 API 테스트 환경** - 샘플 데이터로 안전하게 학습하고 실무에 바로 적용하세요!

> 💡 **이 프로젝트의 특징**
> - ✅ **TypeScript** 완전 지원으로 타입 안전성 확보
> - ✅ **샘플 데이터** 사용으로 실제 서버 없이도 학습 가능
> - ✅ **초보자 친화적** 설정으로 쉬운 시작
> - ✅ **실무 패턴** 중심의 예제 코드

## 🚀 5분 만에 시작하기

### 1️⃣ 프로젝트 설치

```bash
# 저장소 클론
git clone https://github.com/taejin0618/jestsample.git
cd jestsample

# 의존성 설치 (TypeScript 포함)
npm install
```

### 2️⃣ 첫 번째 테스트 실행

```bash
# 샘플 데이터 테스트 (가장 안전!)
npm run test tests/jest-examples/sample-data-test.test.ts

# 간단한 API 테스트
npm run test tests/jest-examples/simple-api-test.test.ts

# API 플로우 테스트 (로그인 → 여정 생성)
npm run test tests/jest-examples/simple-api-flow.test.ts
```

### 3️⃣ 순수 axios 예제 실행

```bash
# axios만 사용하는 4가지 패턴 테스트
npm run test tests/jest-examples/pure-axios.test.ts
```

## 📁 프로젝트 구조

```
📦 jestsample/
├── 🔧 설정 파일
│   ├── tsconfig.json          # TypeScript 설정 (초보자 친화적)
│   ├── jest.config.js         # Jest + TypeScript 통합 설정
│   └── package.json           # 프로젝트 의존성
│
├── 🏷️ 타입 정의
│   └── types/
│       └── api-types.ts       # API 요청/응답 타입 정의
│
├── 🧪 테스트 파일 (TypeScript)
│   └── tests/jest-examples/
│       ├── sample-data-test.test.ts      # 📊 샘플 데이터 테스트
│       ├── simple-api-test.test.ts       # 🔰 단건 API 테스트
│       ├── simple-api-flow.test.ts       # 🔄 연속 API 테스트
│       └── pure-axios.test.ts            # ⚡ 순수 axios 테스트
│
└── 📊 샘플 데이터
    └── tests/data/
        └── sample-data.ts     # 한국어 샘플 데이터 모음
```

## 🎯 테스트 파일별 특징

### 📊 `sample-data-test.test.ts` - 가장 안전한 시작점
- **특징**: 실제 네트워크 호출 없음
- **데이터**: 한국 사용자 정보 (김민수, 이영희 등)
- **학습 포인트**: 샘플 데이터 활용법, HTTP 응답 구조

```bash
npx jest tests/jest-examples/sample-data-test.test.ts
```

### 🔰 `simple-api-test.test.ts` - 단건 API 테스트
- **특징**: 샘플 데이터로 단일 API 호출 시뮬레이션
- **학습 포인트**: 기본 axios 사용법, Jest 검증

### 🔄 `simple-api-flow.test.ts` - 연속 API 테스트
- **특징**: 로그인 → 여정 생성 플로우
- **학습 포인트**: 테스트 간 데이터 공유, 실무 워크플로우

### ⚡ `pure-axios.test.ts` - 순수 axios 예제
- **특징**: 실제 인터넷 API 호출 (JSONPlaceholder)
- **4가지 패턴**: GET, POST, 순차 호출, axios 설정

## 🏷️ TypeScript 장점 활용

### 타입 안전성
```typescript
import { User, LoginResponse } from '../../types/api-types';

// 자동완성과 타입 체크 지원
const 사용자정보: User = 응답.data;
const 로그인결과: LoginResponse = 로그인응답.data;
```

### 컴파일 시점 에러 방지
```typescript
// ❌ 컴파일 에러로 미리 방지
expect(사용자정보.name).toBe(123);  // string인데 number 비교

// ✅ 올바른 사용
expect(사용자정보.name).toBe("김민수");
```

## 🧪 테스트 실행 명령어

### 개별 테스트 실행
```bash
# 샘플 데이터 테스트 (가장 빠름)
npx jest sample-data-test.test.ts

# 단건 API 테스트
npx jest simple-api-test.test.ts

# 플로우 테스트
npx jest simple-api-flow.test.ts

# 순수 axios 테스트
npx jest pure-axios.test.ts
```

### 전체 테스트 실행
```bash
# 모든 테스트 실행
npm test

# 실시간 감지 모드
npm run jest:watch

# 커버리지 리포트
npm run jest:coverage
```

## 📊 샘플 데이터의 장점

### ✅ 안전성
- 실제 서버에 부담 없음
- 인터넷 연결 불필요
- 민감한 정보 노출 위험 없음

### ⚡ 성능  
- 매우 빠른 테스트 실행 (1초 이내)
- 네트워크 지연 없음
- 100% 일관된 결과

### 🎯 학습 효과
- 실제 업무와 동일한 패턴
- 성공/실패 시나리오 모두 학습
- 점진적 난이도 조절

## 🔧 사용법 예시

### 새로운 샘플 데이터 만들기
```typescript
// tests/data/sample-data.ts에 추가
export const 내가_만든_사용자: User = {
  id: 999,
  name: "박개발",
  email: "park@company.com",
  // ... 나머지 필드
};

// 테스트에서 사용
const 응답 = HTTP응답_생성(내가_만든_사용자);
expect(응답.data.name).toBe("박개발");
```

### 실제 API와 샘플 데이터 선택 사용
```typescript
// 환경에 따라 선택
const USE_REAL_API = false;

if (USE_REAL_API) {
  const 응답 = await axios.get('https://real-api.com/users/1');
} else {
  const 응답 = 사전정의_응답.사용자조회_성공;
}
```

## 🎓 학습 순서 추천

1. **📊 `sample-data-test.test.ts`** - 샘플 데이터 이해
2. **🔰 `simple-api-test.test.ts`** - 기본 API 테스트
3. **🔄 `simple-api-flow.test.ts`** - 연속 API 테스트  
4. **⚡ `pure-axios.test.ts`** - 실제 API 호출

## 🔗 참고 자료

- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [Jest 공식 문서](https://jestjs.io/docs/getting-started)
- [Axios 공식 문서](https://axios-http.com/docs/intro)

## 🎉 완료!

TypeScript + Jest + Axios로 완벽한 API 테스트 환경이 준비되었습니다! 

**샘플 데이터로 안전하게 학습하고, 실무에 바로 적용하세요!** 🚀