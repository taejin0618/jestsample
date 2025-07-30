/**
 * 🎯 샘플 데이터 모음
 *
 * 실제 API 호출 대신 사용할 샘플 데이터들입니다.
 * 테스트용이므로 실제 서버 없이도 안전하게 학습할 수 있어요!
 */

import { User, Post, Comment, LoginResponse, JourneyCreateResponse } from '../../types/api-types';

// 👤 샘플 사용자 데이터
export const 샘플_사용자: User = {
  id: 1,
  name: "김민수",
  username: "kimms", 
  email: "kimms@example.com",
  phone: "010-1234-5678",
  website: "kimms.github.io",
  address: {
    street: "테헤란로 123",
    suite: "에이스타워 10층",
    city: "서울",
    zipcode: "06234",
    geo: {
      lat: "37.5665",
      lng: "126.9780"
    }
  },
  company: {
    name: "테크스타트업",
    catchPhrase: "혁신적인 기술로 세상을 바꾸자",
    bs: "AI 기반 솔루션 개발"
  }
};

// 👥 샘플 사용자 목록
export const 샘플_사용자목록: User[] = [
  샘플_사용자,
  {
    id: 2,
    name: "이영희",
    username: "leeyh",
    email: "leeyh@example.com", 
    phone: "010-9876-5432",
    website: "leeyh.blog.com",
    address: {
      street: "강남대로 456",
      suite: "비즈타워 5층",
      city: "서울",
      zipcode: "06123",
      geo: {
        lat: "37.4979",
        lng: "127.0276"
      }
    },
    company: {
      name: "디자인스튜디오",
      catchPhrase: "아름다운 디자인으로 감동을",
      bs: "UI/UX 디자인 서비스"
    }
  }
];

// 📝 샘플 게시글 데이터
export const 샘플_게시글목록: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "TypeScript와 Jest로 API 테스트하기",
    body: "TypeScript를 사용하면 타입 안전성을 확보하면서 더 좋은 테스트 코드를 작성할 수 있습니다."
  },
  {
    userId: 1, 
    id: 2,
    title: "axios로 HTTP 요청 쉽게 하기",
    body: "axios는 Promise 기반의 HTTP 클라이언트로, 브라우저와 Node.js에서 모두 사용할 수 있습니다."
  }
];

// 💬 샘플 댓글 데이터
export const 샘플_댓글목록: Comment[] = [
  {
    postId: 1,
    id: 1,
    name: "좋은 글이네요!",
    email: "user1@example.com",
    body: "TypeScript를 배우고 있는데 정말 도움이 되는 글입니다. 감사합니다!"
  },
  {
    postId: 1,
    id: 2, 
    name: "질문있어요",
    email: "user2@example.com",
    body: "Jest 설정할 때 주의할 점이 있나요? 초보자도 쉽게 따라할 수 있을까요?"
  }
];

// 🔐 샘플 로그인 응답 데이터
export const 샘플_로그인_성공: LoginResponse = {
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_token_for_testing",
  message: "로그인 성공",
  user: {
    id: "hunet2022046",
    name: "테스트 사용자",
    email: "test@hunet.co.kr"
  }
};

export const 샘플_로그인_실패: LoginResponse = {
  success: false,
  message: "아이디 또는 비밀번호가 올바르지 않습니다."
};

// 📚 샘플 여정 생성 응답 데이터
export const 샘플_여정생성_성공: JourneyCreateResponse = {
  success: true,
  id: 12345,
  journeyId: 12345,
  message: "여정 생성 완료",
  journeyNm: "TypeScript 학습 여정"
};

export const 샘플_여정생성_실패: JourneyCreateResponse = {
  success: false,
  message: "권한이 없습니다."
};

// 🎯 테스트 시나리오별 데이터
export const 테스트시나리오 = {
  // ✅ 성공 케이스
  성공: {
    사용자조회: 샘플_사용자,
    사용자목록: 샘플_사용자목록,
    게시글목록: 샘플_게시글목록,
    댓글목록: 샘플_댓글목록,
    로그인: 샘플_로그인_성공,
    여정생성: 샘플_여정생성_성공
  },
  
  // ❌ 실패 케이스
  실패: {
    로그인: 샘플_로그인_실패,
    여정생성: 샘플_여정생성_실패
  }
};

// 📊 HTTP 응답 형태로 감싸는 헬퍼 함수
export const HTTP응답_생성 = (data: any, status: number = 200, statusText: string = "OK") => ({
  data,
  status,
  statusText,
  headers: {
    'content-type': 'application/json',
    'date': new Date().toISOString()
  },
  config: {},
  request: {}
});

// 🚀 빠른 사용을 위한 사전 정의된 응답들
export const 사전정의_응답 = {
  사용자조회_성공: HTTP응답_생성(샘플_사용자),
  사용자목록_성공: HTTP응답_생성(샘플_사용자목록),
  게시글목록_성공: HTTP응답_생성(샘플_게시글목록),
  댓글목록_성공: HTTP응답_생성(샘플_댓글목록),
  로그인_성공: HTTP응답_생성(샘플_로그인_성공),
  로그인_실패: HTTP응답_생성(샘플_로그인_실패, 401, "Unauthorized"),
  여정생성_성공: HTTP응답_생성(샘플_여정생성_성공, 201, "Created"),
  여정생성_실패: HTTP응답_생성(샘플_여정생성_실패, 403, "Forbidden")
};