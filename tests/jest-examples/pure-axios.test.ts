/**
 * 🎯 순수 axios 호출 샘플
 *
 * Jest 없이 axios만 사용해서 API를 호출하고 응답을 확인하는 예제입니다.
 * console.log로 결과를 확인하는 가장 간단한 방법을 보여줍니다.
 *
 * 🚀 실행: npx jest tests/jest-examples/pure-axios.test.ts
 */

import axios from 'axios';

describe("🎯 순수 axios 호출 테스트", () => {
  test("axios만으로 API 호출하고 응답 확인하기", async () => {
    console.log("🚀 순수 axios 테스트 시작!");
    console.log("=".repeat(50));

    // 1단계: API 주소 설정
    const 주소 = "https://jsonplaceholder.typicode.com/users/1";
    console.log("📍 호출할 주소:", 주소);

    try {
      // 2단계: axios로 GET 요청
      console.log("\n📡 axios로 데이터 요청 중...");
      const 응답 = await axios.get(주소);

      // 3단계: 응답 상태 확인
      console.log("\n✅ 응답 성공!");
      console.log("📊 상태 코드:", 응답.status);
      console.log("📊 상태 텍스트:", 응답.statusText);

      // 4단계: 응답 헤더 확인  
      console.log("\n📋 응답 헤더:");
      console.log("Content-Type:", 응답.headers['content-type']);
      console.log("Date:", 응답.headers['date']);

      // 5단계: 응답 데이터 확인
      console.log("\n👤 사용자 정보:");
      console.log("ID:", 응답.data.id);
      console.log("이름:", 응답.data.name); 
      console.log("사용자명:", 응답.data.username);
      console.log("이메일:", 응답.data.email);
      console.log("전화번호:", 응답.data.phone);
      console.log("웹사이트:", 응답.data.website);

      // 6단계: 주소 정보 확인
      console.log("\n🏠 주소 정보:");
      console.log("거리:", 응답.data.address.street);
      console.log("도시:", 응답.data.address.city);
      console.log("우편번호:", 응답.data.address.zipcode);

      // 7단계: 회사 정보 확인
      console.log("\n🏢 회사 정보:");
      console.log("회사명:", 응답.data.company.name);
      console.log("업무:", 응답.data.company.catchPhrase);

      // 8단계: 전체 응답 데이터 JSON으로 출력
      console.log("\n📄 전체 응답 데이터 (JSON):");
      console.log(JSON.stringify(응답.data, null, 2));

      console.log("\n🎉 순수 axios 테스트 완료!");

    } catch (에러) {
      console.log("\n❌ 에러 발생:");
      console.log("에러 메시지:", 에러.message);
      
      if (에러.response) {
        console.log("서버 응답 상태:", 에러.response.status);
        console.log("서버 응답 데이터:", 에러.response.data);
      } else if (에러.request) {
        console.log("요청은 보냈지만 응답이 없음");
      } else {
        console.log("요청 설정 중 에러 발생");
      }
    }
  });

  test("POST 요청으로 새 데이터 생성하기", async () => {
    console.log("\n🚀 POST 요청 테스트 시작!");
    console.log("=".repeat(50));

    // 보낼 데이터 준비
    const 새사용자데이터 = {
      name: "김철수",
      username: "kimcs",
      email: "kimcs@example.com",
      phone: "010-1234-5678"
    };

    const 주소 = "https://jsonplaceholder.typicode.com/users";
    console.log("📍 POST 요청 주소:", 주소);
    console.log("📤 보낼 데이터:", 새사용자데이터);

    try {
      // POST 요청 보내기
      console.log("\n📡 새 사용자 생성 요청 중...");
      const 응답 = await axios.post(주소, 새사용자데이터);

      console.log("\n✅ POST 요청 성공!");
      console.log("📊 상태 코드:", 응답.status, "(201 Created)");
      
      console.log("\n👤 생성된 사용자 정보:");
      console.log("ID:", 응답.data.id);
      console.log("이름:", 응답.data.name);
      console.log("이메일:", 응답.data.email);

      console.log("\n🎉 POST 요청 테스트 완료!");

    } catch (에러) {
      console.log("\n❌ POST 요청 에러:");
      console.log("에러 메시지:", 에러.message);
    }
  });

  test("여러 API를 순차적으로 호출하기", async () => {
    console.log("\n🚀 순차 호출 테스트 시작!");
    console.log("=".repeat(50));

    try {
      // 1단계: 사용자 목록 가져오기
      console.log("1️⃣ 사용자 목록 가져오기...");
      const 사용자목록 = await axios.get("https://jsonplaceholder.typicode.com/users");
      console.log(`✅ 총 ${사용자목록.data.length}명의 사용자 발견`);

      // 2단계: 첫 번째 사용자의 게시글 가져오기
      const 첫번째사용자ID = 사용자목록.data[0].id;
      console.log(`\n2️⃣ 사용자 ${첫번째사용자ID}번의 게시글 가져오기...`);
      const 게시글목록 = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${첫번째사용자ID}`);
      console.log(`✅ 총 ${게시글목록.data.length}개의 게시글 발견`);

      // 3단계: 첫 번째 게시글의 댓글 가져오기
      const 첫번째게시글ID = 게시글목록.data[0].id;
      console.log(`\n3️⃣ 게시글 ${첫번째게시글ID}번의 댓글 가져오기...`);
      const 댓글목록 = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${첫번째게시글ID}`);
      console.log(`✅ 총 ${댓글목록.data.length}개의 댓글 발견`);

      // 4단계: 결과 요약
      console.log("\n📊 최종 결과:");
      console.log(`👤 사용자: ${사용자목록.data[0].name}`);
      console.log(`📝 게시글: "${게시글목록.data[0].title}"`);
      console.log(`💬 첫 댓글: "${댓글목록.data[0].body.substring(0, 50)}..."`);

      console.log("\n🎉 순차 호출 테스트 완료!");

    } catch (에러) {
      console.log("\n❌ 순차 호출 에러:", 에러.message);
    }
  });

  test("axios 설정 옵션 사용하기", async () => {
    console.log("\n🚀 axios 설정 옵션 테스트!");
    console.log("=".repeat(50));

    try {
      // axios 인스턴스 생성 (기본 설정 포함)
      const API클라이언트 = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        timeout: 5000,  // 5초 타임아웃
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'My-Test-App/1.0'
        }
      });

      console.log("⚙️ 사용자 정의 axios 인스턴스 생성 완료");

      // 요청 시간 측정
      const 시작시간 = Date.now();
      
      const 응답 = await API클라이언트.get('/users/2');
      
      const 끝시간 = Date.now();
      const 걸린시간 = 끝시간 - 시작시간;

      console.log("\n✅ 설정된 axios로 요청 성공!");
      console.log("⏱️ 응답 시간:", `${걸린시간}ms`);
      console.log("👤 사용자 이름:", 응답.data.name);

      console.log("\n🎉 axios 설정 테스트 완료!");

    } catch (에러) {
      console.log("\n❌ axios 설정 테스트 에러:", 에러.message);
    }
  });
});

/**
 * 📚 이 테스트에서 배운 것들:
 *
 * ✨ 순수 axios 사용법:
 * - axios.get(): GET 요청으로 데이터 가져오기
 * - axios.post(): POST 요청으로 데이터 생성하기
 * - console.log(): 결과를 콘솔에 출력하기
 *
 * 🔧 axios 고급 기능:
 * - axios.create(): 기본 설정이 포함된 인스턴스 만들기
 * - timeout: 요청 시간 제한 설정
 * - headers: 요청 헤더 커스터마이징
 *
 * 🎯 실무 활용:
 * - 순차적 API 호출 (결과를 다음 요청에 사용)
 * - 에러 처리 (try-catch)
 * - 응답 시간 측정
 * - 응답 데이터 구조 확인
 */