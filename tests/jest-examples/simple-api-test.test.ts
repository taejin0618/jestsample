/**
 * 🎯 가장 쉬운 API 테스트 (TypeScript)
 *
 * 인터넷에서 데이터를 가져와서 확인하는 테스트입니다.
 * 마치 웹사이트에서 정보를 보는 것과 같아요!
 *
 * 🚀 실행: npx jest tests/jest-examples/simple-api-test.test.ts
 */

import { AxiosResponse } from 'axios';
import { User } from '../../types/api-types';
import { 샘플_사용자, 사전정의_응답 } from '../data/sample-data';

describe("🎯 쉬운 API 테스트 (샘플 데이터 사용)", () => {
  test("샘플 데이터로 사용자 정보 가져오기", async () => {
    console.log("🚀 샘플 데이터 테스트 시작!");
    
    // 1단계: 샘플 데이터 사용 (실제 인터넷 연결 불필요!)
    console.log("📍 데이터 소스: 샘플 데이터 (안전함!)");

    // 2단계: 샘플 응답 데이터 가져오기 (실제 API 대신)
    const 응답: AxiosResponse<User> = 사전정의_응답.사용자조회_성공;
    
    // 3단계: 잘 가져왔는지 확인하기
    expect(응답.status).toBe(200);  // 200 = 성공!
    console.log("✅ 샘플 데이터 로드 성공!");

    // 4단계: 가져온 정보 보기
    const 정보: User = 응답.data;
    console.log("👤 이름:", 정보.name);
    console.log("📧 이메일:", 정보.email);
    console.log("🏢 회사:", 정보.company.name);
    console.log("📍 도시:", 정보.address.city);

    // 5단계: 정보가 제대로 있는지 확인하기
    expect(정보.name).toBeDefined();   // 이름이 있나요?
    expect(정보.email).toBeDefined();  // 이메일이 있나요?
    expect(정보.name).toBe("김민수");   // 샘플 데이터 이름 맞나요?
    expect(정보.address.city).toBe("서울");  // 도시도 맞나요?
    console.log("✅ 모든 샘플 정보가 정확해요!");
    
    console.log("\n💡 장점: 인터넷 없이도 테스트 가능!");
  });
});

/**
 * 📚 이 테스트에서 배운 것들:
 *
 * ✨ 핵심 개념:
 * - axios.get(): 인터넷에서 정보 가져오기
 * - await: 정보를 다 가져올 때까지 기다리기  
 * - expect(): 정보가 맞는지 확인하기
 *
 * 🎯 다음 단계:
 * - simple-api-flow.test.js 파일 보기
 * - 여러 단계로 이루어진 테스트 배우기
 */