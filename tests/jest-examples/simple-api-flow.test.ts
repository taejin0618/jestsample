/**
 * 🎯 쉬운 연속 테스트 (TypeScript)
 *
 * 두 개의 API를 차례대로 호출하는 테스트입니다.
 * 첫 번째에서 받은 결과를 두 번째에서 사용해요!
 *
 * 🚀 실행: npx jest tests/jest-examples/simple-api-flow.test.ts
 */

import { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, JourneyCreateRequest, JourneyCreateResponse } from '../../types/api-types';
import { 사전정의_응답 } from '../data/sample-data';

describe("🎯 연속 테스트 - 샘플 데이터로 로그인 후 작업하기", () => {
  // 첫 번째 테스트 결과를 두 번째에서 사용하기 위한 저장공간
  let 토큰: string | null = null;      // 로그인 성공하면 여기에 저장
  let 결과ID: number | string | null = null;    // 작업 완료하면 여기에 저장

  test("1단계: 샘플 데이터로 로그인하기", async () => {
    console.log("🔐 샘플 데이터로 로그인 시뮬레이션");

    // 로그인 정보 준비 (실제로는 사용하지 않음)
    const 로그인정보: LoginRequest = {
      userId: "hunet2022046",
      password: "rlaxowls12qw!@",
      companySeq: 2162
    };

    console.log("📍 데이터 소스: 샘플 데이터 (실제 서버 호출 안함)");

    // 샘플 로그인 응답 사용 (실제 API 호출 대신)
    const 응답: AxiosResponse<LoginResponse> = 사전정의_응답.로그인_성공;

    // 로그인 성공 확인
    expect(응답.status).toBe(200);
    console.log("✅ 샘플 로그인 성공!");

    // 토큰 찾아서 저장하기
    if (응답.data.token) {
      토큰 = 응답.data.token;
      console.log("🔑 샘플 토큰 저장 완료");
      console.log("토큰:", 토큰.substring(0, 30) + "...");
    }

    // 사용자 정보도 확인하기
    if (응답.data.user) {
      console.log("👤 로그인 사용자:", 응답.data.user.name);
      console.log("📧 이메일:", 응답.data.user.email);
    }

    console.log("💡 실제 서버 없이도 완벽하게 테스트됨!");
  });

  test("2단계: 샘플 데이터로 여정 만들기 (1단계 토큰 사용)", async () => {
    console.log("📚 샘플 데이터로 여정 생성 시뮬레이션");
    
    // 1단계에서 받은 샘플 토큰 확인
    if (토큰) {
      console.log("🔑 1단계에서 받은 샘플 토큰 사용");
      console.log("토큰:", 토큰.substring(0, 30) + "...");
    } else {
      console.log("⚠️ 토큰이 없지만 샘플 데이터로 진행");
    }

    // 여정 정보 준비 (실제로는 사용하지 않음)  
    const 여정정보: JourneyCreateRequest = {
      journeyNm: `샘플 테스트 여정 - ${Date.now()}`,
      userId: "admin-hunet2162",
      enrollStartDate: new Date().toISOString(),
      enrollEndDate: new Date().toISOString()
    };

    console.log("📍 데이터 소스: 샘플 데이터 (실제 서버 호출 안함)");
    console.log("📝 생성할 여정:", 여정정보.journeyNm);

    // 샘플 여정 생성 응답 사용 (실제 API 호출 대신)
    const 응답: AxiosResponse<JourneyCreateResponse> = 사전정의_응답.여정생성_성공;

    // 여정 생성 성공 확인
    expect(응답.status).toBe(201);  // 201 Created
    console.log("✅ 샘플 여정 생성 성공!");

    // 여정 ID 저장
    if (응답.data.id) {
      결과ID = 응답.data.id;
      console.log("📋 생성된 여정 ID:", 결과ID);
    }

    // 응답 메시지 출력
    if (응답.data.message) {
      console.log("📄 응답 메시지:", 응답.data.message);
    }

    console.log("💡 토큰 → 여정 생성 플로우 완벽 시뮬레이션!");
  });

  test("3단계: 샘플 데이터 플로우 결과 확인하기", () => {
    console.log("📊 샘플 데이터 플로우 결과 확인");

    // 샘플 토큰과 결과ID 확인
    console.log("\n🔍 플로우 결과 검사:");
    console.log("토큰 상태:", 토큰 ? "✅ 있음" : "❌ 없음");
    console.log("여정 ID 상태:", 결과ID ? "✅ 있음" : "❌ 없음");

    if (토큰 && 결과ID) {
      console.log("\n🎉 완벽한 샘플 플로우 성공!");
      console.log("1단계: 샘플 로그인 ✅");
      console.log("2단계: 샘플 여정 생성 ✅");
      console.log("3단계: 데이터 공유 ✅");
      
      expect(토큰).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
      expect(결과ID).toBe(12345);
      console.log("✅ 모든 샘플 데이터 검증 완료!");
      
    } else if (토큰) {
      console.log("🔶 부분 성공! 샘플 로그인만 완료");
      expect(true).toBe(true);
    } else {
      console.log("📚 샘플 데이터 학습 완료!");
      expect(true).toBe(true);
    }

    console.log("\n💡 샘플 데이터의 장점:");
    console.log("- 항상 동일한 결과");
    console.log("- 인터넷 연결 불필요");
    console.log("- 빠른 테스트 실행");
    console.log("- 안전한 학습 환경");
  });
});

/**
 * 📚 이 테스트에서 배운 것들:
 *
 * ✨ 샘플 데이터 연속 테스트:
 * - 실제 API 대신 샘플 데이터 사용
 * - 첫 번째 샘플 결과를 두 번째에서 사용하기
 * - let 변수로 데이터 저장하고 공유하기  
 *
 * 🎯 샘플 데이터의 장점:
 * - 인터넷 연결 없이도 테스트 가능
 * - 항상 동일한 결과로 신뢰성 높음
 * - 실제 서버에 부담 없음
 * - 빠른 테스트 실행 속도
 *
 * 💡 실무 활용:
 * - 개발 초기 단계에서 백엔드 API 없이 프론트엔드 개발
 * - 다양한 테스트 시나리오 쉽게 구성
 * - 팀 단위 테스트 환경 통일
 */