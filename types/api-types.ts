/**
 * 🎯 API 타입 정의
 *
 * 테스트에서 사용하는 API 응답과 요청의 타입을 정의합니다.
 * TypeScript의 장점을 활용해서 더 안전한 코드를 작성할 수 있어요!
 */

// 📋 공통 API 응답 타입
export interface BaseApiResponse {
  status: number;
  statusText: string;
  headers: any;
}

// 👤 사용자 정보 타입 (JSONPlaceholder API)
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// 📝 게시글 타입
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 💬 댓글 타입
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// 🔐 로그인 요청 타입 (edumanager API)
export interface LoginRequest {
  userId: string;
  password: string;
  companySeq: number;
}

// 🔑 로그인 응답 타입
export interface LoginResponse {
  success?: boolean;
  token?: string;
  access_token?: string;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// 📚 여정 생성 요청 타입
export interface JourneyCreateRequest {
  journeyNm: string;
  userId: string;
  enrollStartDate: string;
  enrollEndDate: string;
}

// 📋 여정 생성 응답 타입  
export interface JourneyCreateResponse {
  success?: boolean;
  id?: number;
  journeyId?: number;
  message?: string;
  journeyNm?: string;
}

// ⚠️ 에러 응답 타입
export interface ApiError {
  code?: string;
  message: string;
  response?: {
    status: number;
    statusText: string;
    data: any;
  };
  request?: any;
}

// 🎯 axios 요청 설정 타입
export interface ApiRequestConfig {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  headers?: {
    'Content-Type'?: string;
    'Authorization'?: string;
    'accept'?: string;
    [key: string]: any;
  };
  data?: any;
  timeout?: number;
}

// 📊 테스트 결과 타입
export interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  responseTime?: number;
}

// 🏷️ 테스트 컨텍스트 타입 (변수 공유용)
export interface TestContext {
  인증토큰?: string | null;
  토큰?: string | null;
  결과ID?: number | string | null;
  여정ID?: number | string | null;
  로그인응답데이터?: LoginResponse | null;
  여정생성응답데이터?: JourneyCreateResponse | null;
}