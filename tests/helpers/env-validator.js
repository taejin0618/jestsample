/**
 * 🔍 환경변수 검증 도구
 * 테스트 실행 전 필요한 환경변수가 올바르게 설정되었는지 확인
 */

const dotenv = require("dotenv");

/**
 * 🔧 환경변수 검증기 클래스
 */
class EnvironmentValidator {
  constructor() {
    this.requiredVars = [
      {
        name: "BASE_URL",
        description: "웹사이트 기본 주소",
        defaultValue: "http://localhost:3000",
        validator: (value) => this.isValidUrl(value),
        required: false,
      },
      {
        name: "API_BASE_URL",
        description: "API 서버 주소",
        defaultValue: "http://localhost:8080/api",
        validator: (value) => this.isValidUrl(value),
        required: false,
      },
      {
        name: "TEST_ENVIRONMENT",
        description: "테스트 환경 (development, staging, production)",
        defaultValue: "development",
        validator: (value) =>
          ["development", "staging", "production"].includes(value),
        required: false,
      },
      {
        name: "API_USERNAME",
        description: "API 테스트용 사용자명",
        defaultValue: "test_user",
        validator: (value) => value.length >= 3,
        required: false,
      },
      {
        name: "API_PASSWORD",
        description: "API 테스트용 비밀번호",
        defaultValue: "test_password",
        validator: (value) => value.length >= 6,
        required: false,
      },
      {
        name: "TEST_TIMEOUT",
        description: "테스트 타임아웃 (밀리초)",
        defaultValue: "30000",
        validator: (value) => !isNaN(Number(value)) && Number(value) > 0,
        required: false,
      },
    ];
  }

  /**
   * 🔍 환경변수 검증 실행
   */
  validateEnvironment() {
    // .env 파일 로드
    dotenv.config();

    const result = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    console.log("🔍 환경변수 검증 시작...");

    // .env 파일 존재 확인
    this.checkEnvFileExists(result);

    // 각 환경변수 검증
    for (const envVar of this.requiredVars) {
      this.validateEnvVar(envVar, result);
    }

    // 추가 검증
    this.performAdditionalValidation(result);

    // 결과 출력
    this.printValidationResult(result);

    return result;
  }

  /**
   * 📁 .env 파일 존재 확인
   */
  checkEnvFileExists(result) {
    try {
      const fs = require("fs");
      const path = require("path");

      const envPath = path.join(process.cwd(), ".env");

      if (!fs.existsSync(envPath)) {
        result.warnings.push(".env 파일이 없습니다");
        result.suggestions.push(
          "cp env.example .env 명령으로 .env 파일을 생성하세요"
        );
      } else {
        console.log("✅ .env 파일 발견");
      }
    } catch (error) {
      result.warnings.push(".env 파일 확인 중 오류 발생");
    }
  }

  /**
   * 🔍 개별 환경변수 검증
   */
  validateEnvVar(envVar, result) {
    const value = process.env[envVar.name];

    // 값이 없는 경우
    if (!value) {
      if (envVar.required) {
        result.errors.push(
          `필수 환경변수 '${envVar.name}'이 설정되지 않았습니다`
        );
        result.isValid = false;
      } else {
        result.warnings.push(
          `환경변수 '${envVar.name}'이 설정되지 않음 (기본값 사용: ${envVar.defaultValue})`
        );
        if (envVar.defaultValue) {
          result.suggestions.push(
            `${envVar.name}=${envVar.defaultValue} # ${envVar.description}`
          );
        }
      }
      return;
    }

    // 값 검증
    if (envVar.validator && !envVar.validator(value)) {
      result.errors.push(
        `환경변수 '${envVar.name}'의 값이 올바르지 않습니다: ${value}`
      );
      result.isValid = false;
      result.suggestions.push(
        `${envVar.name} 값을 확인하세요. ${envVar.description}`
      );
    } else {
      console.log(`✅ ${envVar.name}: ${value}`);
    }
  }

  /**
   * 🔍 추가 검증 로직
   */
  performAdditionalValidation(result) {
    // API URL과 BASE URL이 같은지 확인
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const apiUrl = process.env.API_BASE_URL || "http://localhost:8080/api";

    if (baseUrl === apiUrl) {
      result.warnings.push(
        "BASE_URL과 API_BASE_URL이 같습니다. 일반적으로 다른 주소를 사용합니다."
      );
    }

    // 타임아웃 값이 너무 작거나 큰지 확인
    const timeout = Number(process.env.TEST_TIMEOUT || "30000");
    if (timeout < 5000) {
      result.warnings.push("TEST_TIMEOUT이 너무 작습니다 (5초 이상 권장)");
    }
    if (timeout > 120000) {
      result.warnings.push("TEST_TIMEOUT이 너무 큽니다 (2분 이하 권장)");
    }

    // 개발 환경에서 프로덕션 URL 사용 경고
    const testEnv = process.env.TEST_ENVIRONMENT || "development";
    if (testEnv === "development") {
      if (baseUrl.includes("production") || baseUrl.includes("prod")) {
        result.warnings.push("개발 환경에서 프로덕션 URL을 사용하고 있습니다");
        result.suggestions.push("개발용 URL로 변경하는 것이 안전합니다");
      }
    }

    // 보안 관련 경고
    const apiPassword = process.env.API_PASSWORD || "test_password";
    if (testEnv === "production" && apiPassword === "test_password") {
      result.errors.push("프로덕션 환경에서 기본 비밀번호를 사용하고 있습니다");
      result.isValid = false;
      result.suggestions.push("보안을 위해 안전한 비밀번호로 변경하세요");
    }
  }

  /**
   * 📊 검증 결과 출력
   */
  printValidationResult(result) {
    console.log("\n📊 환경변수 검증 결과:");

    if (result.errors.length > 0) {
      console.log("\n❌ 오류:");
      result.errors.forEach((error) => console.log(`  - ${error}`));
    }

    if (result.warnings.length > 0) {
      console.log("\n⚠️  경고:");
      result.warnings.forEach((warning) => console.log(`  - ${warning}`));
    }

    if (result.suggestions.length > 0) {
      console.log("\n💡 권장사항:");
      result.suggestions.forEach((suggestion) =>
        console.log(`  - ${suggestion}`)
      );
    }

    if (result.isValid) {
      console.log("\n✅ 환경변수 검증 완료! 테스트를 시작할 수 있습니다.");
    } else {
      console.log(
        "\n❌ 환경변수 검증 실패! 위의 오류를 수정한 후 다시 시도하세요."
      );
    }
  }

  /**
   * 🌐 URL 유효성 검사
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 📝 .env 파일 생성 도우미
   */
  generateEnvFile() {
    console.log("📝 .env 파일 템플릿 생성...");

    const envContent = [
      "# 🌟 자동 생성된 환경 설정 파일",
      "# 필요에 따라 값을 수정하세요",
      "",
      ...this.requiredVars.map(
        (envVar) =>
          `${envVar.name}=${envVar.defaultValue || ""} # ${envVar.description}`
      ),
      "",
      "# 🐛 디버그 모드 (true/false)",
      "DEBUG_MODE=false",
      "",
      "# 📧 테스트용 이메일 (실제 이메일 사용 금지!)",
      "TEST_EMAIL=test@example.com",
    ].join("\n");

    return envContent;
  }
}

/**
 * 🚀 환경변수 검증 실행 함수
 */
function validateEnvironment() {
  const validator = new EnvironmentValidator();
  return validator.validateEnvironment();
}

/**
 * 📝 .env 파일 생성 함수
 */
function createEnvFile() {
  const validator = new EnvironmentValidator();
  const envContent = validator.generateEnvFile();

  try {
    const fs = require("fs");
    const path = require("path");

    const envPath = path.join(process.cwd(), ".env");

    if (fs.existsSync(envPath)) {
      console.log("⚠️  .env 파일이 이미 존재합니다");
      console.log(
        "기존 파일을 백업하고 새 파일을 생성하려면 다음 명령을 실행하세요:"
      );
      console.log("mv .env .env.backup && npm run setup:env");
      return;
    }

    fs.writeFileSync(envPath, envContent, "utf8");
    console.log("✅ .env 파일이 생성되었습니다!");
    console.log("📝 필요에 따라 값을 수정한 후 테스트를 실행하세요");
  } catch (error) {
    console.error("❌ .env 파일 생성 실패:", error);
  }
}

/**
 * 🔧 안전한 환경변수 값 반환
 */
function getSafeEnvValue(key, defaultValue = "") {
  const value = process.env[key];

  if (!value) {
    console.warn(
      `⚠️  환경변수 '${key}'가 설정되지 않음. 기본값 사용: ${defaultValue}`
    );
    return defaultValue;
  }

  return value;
}

/**
 * 🎯 테스트 실행 전 자동 검증
 */
function preTestValidation() {
  console.log("🎯 테스트 실행 전 환경 검증...");

  const result = validateEnvironment();

  if (!result.isValid) {
    console.log("\n💡 해결 방법:");
    console.log("1. .env 파일을 확인하세요");
    console.log("2. 필수 환경변수를 설정하세요");
    console.log("3. TROUBLESHOOTING.md를 참고하세요");
    return false;
  }

  return true;
}

// Export functions
module.exports = {
  EnvironmentValidator,
  validateEnvironment,
  createEnvFile,
  getSafeEnvValue,
  preTestValidation,
};
