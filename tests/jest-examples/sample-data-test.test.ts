/**
 * 🎯 샘플 데이터 테스트 (TypeScript)
 *
 * 실제 API 호출 대신 샘플 데이터를 사용하는 테스트입니다.
 * 인터넷 연결 없이도 안전하게 학습할 수 있어요!
 *
 * 🚀 실행: npx jest tests/jest-examples/sample-data-test.test.ts
 */

import { AxiosResponse } from 'axios';
import { User } from '../../types/api-types';
import { 
  샘플_사용자, 
  샘플_사용자목록, 
  사전정의_응답,
  HTTP응답_생성 
} from '../data/sample-data';

describe("🎯 샘플 데이터 테스트", () => {
  test("샘플 사용자 데이터 확인하기", () => {
    console.log("🚀 샘플 데이터 테스트 시작!");
    console.log("=".repeat(50));

    // 1단계: 샘플 데이터 가져오기 (실제 API 호출 대신)
    const 사용자정보: User = 샘플_사용자;
    console.log("📍 데이터 소스: 샘플 데이터 (실제 API 아님)");

    // 2단계: 데이터가 있는지 확인하기
    expect(사용자정보).toBeDefined();
    console.log("✅ 샘플 데이터 로드 성공!");

    // 3단계: 사용자 정보 보기
    console.log("\n👤 샘플 사용자 정보:");
    console.log("─".repeat(30));
    console.log("이름:", 사용자정보.name);
    console.log("사용자명:", 사용자정보.username);
    console.log("이메일:", 사용자정보.email);
    console.log("전화번호:", 사용자정보.phone);
    console.log("웹사이트:", 사용자정보.website);
    console.log("도시:", 사용자정보.address.city);
    console.log("회사명:", 사용자정보.company.name);

    // 4단계: 데이터 검증하기
    expect(사용자정보.name).toBe("김민수");
    expect(사용자정보.email).toBe("kimms@example.com");
    expect(사용자정보.address.city).toBe("서울");
    expect(사용자정보.company.name).toBe("테크스타트업");
    console.log("✅ 모든 샘플 데이터 검증 완료!");

    // 5단계: 타입 검증하기
    expect(typeof 사용자정보.id).toBe("number");
    expect(typeof 사용자정보.name).toBe("string");
    expect(typeof 사용자정보.email).toBe("string");
    console.log("✅ 데이터 타입도 올바릅니다!");

    console.log("\n🎉 샘플 데이터 테스트 완료!");
  });

  test("HTTP 응답 형태 샘플 데이터 테스트", () => {
    console.log("\n🚀 HTTP 응답 형태 테스트 시작!");
    console.log("=".repeat(50));

    // 1단계: HTTP 응답 형태로 만든 샘플 데이터 가져오기
    const 가짜_HTTP_응답 = 사전정의_응답.사용자조회_성공;
    console.log("📍 가짜 HTTP 응답 생성 완료");

    // 2단계: HTTP 응답 구조 확인하기
    expect(가짜_HTTP_응답.status).toBe(200);
    expect(가짜_HTTP_응답.statusText).toBe("OK");
    expect(가짜_HTTP_응답.data).toBeDefined();
    console.log("✅ HTTP 응답 구조 검증 완료!");

    // 3단계: 응답 정보 출력하기
    console.log("\n📊 가짜 HTTP 응답 정보:");
    console.log("상태 코드:", 가짜_HTTP_응답.status);
    console.log("상태 텍스트:", 가짜_HTTP_응답.statusText);
    console.log("Content-Type:", 가짜_HTTP_응답.headers['content-type']);

    // 4단계: 응답 데이터 확인하기
    const 응답데이터: User = 가짜_HTTP_응답.data;
    console.log("\n👤 응답 데이터:");
    console.log("이름:", 응답데이터.name);
    console.log("이메일:", 응답데이터.email);

    expect(응답데이터.name).toBe("김민수");
    console.log("✅ 응답 데이터 검증 완료!");

    console.log("\n🎉 HTTP 응답 형태 테스트 완료!");
  });

  test("여러 사용자 목록 샘플 데이터 테스트", () => {
    console.log("\n🚀 사용자 목록 테스트 시작!");
    console.log("=".repeat(50));

    // 1단계: 사용자 목록 샘플 데이터 가져오기
    const 사용자목록: User[] = 샘플_사용자목록;
    console.log("📍 샘플 사용자 목록 로드");

    // 2단계: 목록 크기 확인하기
    expect(사용자목록.length).toBeGreaterThan(0);
    console.log(`✅ 총 ${사용자목록.length}명의 사용자 발견`);

    // 3단계: 각 사용자 정보 출력하기
    console.log("\n👥 사용자 목록:");
    사용자목록.forEach((사용자, 인덱스) => {
      console.log(`${인덱스 + 1}. ${사용자.name} (${사용자.email})`);
      console.log(`   회사: ${사용자.company.name}, 도시: ${사용자.address.city}`);
      
      // 각 사용자 데이터 검증
      expect(사용자.name).toBeDefined();
      expect(사용자.email).toBeDefined();
      expect(사용자.company.name).toBeDefined();
    });

    console.log("✅ 모든 사용자 데이터 검증 완료!");

    // 4단계: 특정 사용자 찾기
    const 김민수 = 사용자목록.find(사용자 => 사용자.name === "김민수");
    const 이영희 = 사용자목록.find(사용자 => 사용자.name === "이영희");

    expect(김민수).toBeDefined();
    expect(이영희).toBeDefined();
    console.log("✅ 특정 사용자 검색 성공!");

    console.log("\n🎉 사용자 목록 테스트 완료!");
  });

  test("사용자 지정 샘플 데이터 만들기", () => {
    console.log("\n🚀 사용자 지정 데이터 테스트!");
    console.log("=".repeat(50));

    // 1단계: 새로운 샘플 데이터 직접 만들기
    const 내가_만든_사용자: User = {
      id: 999,
      name: "박개발",
      username: "parkdev",
      email: "parkdev@mycompany.com",
      phone: "010-5555-1234",
      website: "parkdev.portfolio.com",
      address: {
        street: "판교역로 235",
        suite: "개발타워 15층",
        city: "성남",
        zipcode: "13494",
        geo: {
          lat: "37.3957",
          lng: "127.1116"
        }
      },
      company: {
        name: "나의개발회사",
        catchPhrase: "코드로 세상을 바꾸자!",
        bs: "풀스택 개발 서비스"
      }
    };

    console.log("📝 새로운 사용자 데이터 생성 완료");

    // 2단계: HTTP 응답 형태로 감싸기
    const 내가_만든_HTTP_응답 = HTTP응답_생성(내가_만든_사용자, 200, "OK");
    
    console.log("\n📊 내가 만든 HTTP 응답:");
    console.log("상태:", 내가_만든_HTTP_응답.status);
    console.log("데이터:", 내가_만든_HTTP_응답.data.name);

    // 3단계: 검증하기
    expect(내가_만든_HTTP_응답.status).toBe(200);
    expect(내가_만든_HTTP_응답.data.name).toBe("박개발");
    expect(내가_만든_HTTP_응답.data.company.name).toBe("나의개발회사");
    console.log("✅ 사용자 지정 데이터 검증 완료!");

    // 4단계: 실제 사용 예시
    console.log("\n🎯 실제 테스트에서 사용하는 방법:");
    console.log("1. 샘플 데이터를 만들고");
    console.log("2. HTTP 응답 형태로 감싸고");
    console.log("3. expect()로 검증하면 끝!");

    console.log("\n🎉 사용자 지정 데이터 테스트 완료!");
  });
});

/**
 * 📚 이 테스트에서 배운 것들:
 *
 * ✨ 샘플 데이터의 장점:
 * - 인터넷 없이도 테스트 가능
 * - 항상 동일한 결과로 안정적인 테스트
 * - 테스트 속도가 매우 빠름
 * - 실제 서버에 영향 없음
 *
 * 🔧 샘플 데이터 사용법:
 * - 미리 정의된 데이터 import해서 사용
 * - HTTP응답_생성() 함수로 실제 API 응답 형태 만들기
 * - 타입스크립트로 데이터 구조 안전하게 보장
 *
 * 🎯 실무 활용:
 * - 개발 초기 단계에서 API 서버 없이 프론트엔드 개발
 * - 다양한 테스트 시나리오 쉽게 만들기
 * - 에러 상황도 샘플 데이터로 쉽게 테스트
 */