# 🎾 Tennis Lesson API

**Tennis Lesson 스케줄링 시스템 API**  
NestJS 기반으로 개발된 테니스 레슨 예약 및 관리 시스템입니다.

---

## 📦 프로젝트 구조

```
lesson-main/
├── configs/                 # TypeORM 설정
│   └── typeorm.config.ts
├── src/                     # 메인 소스 코드
│   ├── lesson/              # 레슨 관련 기능
│   │   ├── dto/             # 데이터 전송 객체
│   │   ├── entity/          # TypeORM 엔티티
│   │   ├── lesson.controller.ts
│   │   ├── lesson.service.ts
│   │   └── ...
│   ├── app.module.ts        # 메인 모듈
│   └── main.ts              # 앱 진입점
├── test/                    # 테스트 코드
├── package.json             # 의존성 관리
└── tsconfig.json            # TypeScript 설정
```

---

## 🚀 시작하기

### 1. 요구 사항

- Node.js 14 이상
- PostgreSQL

### 2. 설치

```bash
npm install
```

### 3. 환경 설정

`typeorm.config.ts` 파일 또는 `.env` 파일에 PostgreSQL 접속 정보를 입력합니다.

### 4. 초기 데이터베이스 설정

```bash
npm run seed
```

### 5. 서버 실행

```bash
npm run start
```

---

## 📡 API 설명

### ✅ 가능한 레슨 시간 조회

- **GET** `/lesson/possibleList`
- **요청 예시**:
  ```json
  {
    "name": "김민준",
    "time": 60,
    "number": 2
  }
  ```
- **응답 예시**:
  ```json
  {
    "success": true,
    "data": [
       "2024-04-13 07:00:00",
       "2024-04-13 07:30:00"
    ]
  }
  ```

### 📝 레슨 신청

- **POST** `/lesson/apply`
- **요청 예시**:
  ```json
  {
    "userName": "소나무",
    "userPhone": "010-7777-7777",
    "coachName": "김민준",
    "dayOfWeek": ["일요일", "화요일"],
    "lessonTime": ["10:00:00", "11:00:00"],
    "startDate": "2024-04-14",
    "time": 60
  }
  ```
- **응답 예시**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "password": "zmaa",
        "lessonStartDate": "2024-04-14 09:00:00"
      }
    ]
  }
  ```

---

## 🛠 주요 기술 스택

- **NestJS**: 서버 사이드 프레임워크
- **TypeORM**: ORM (Object Relational Mapping)
- **PostgreSQL**: 데이터베이스
- **TypeScript**: 정적 타입 지원 언어

---

## 📜 라이선스

본 프로젝트는 MIT 라이선스를 따릅니다.

---

## 📬 문의

오류나 개선 요청은 [Issues](https://github.com/Jin5540/lesson/issues) 탭을 통해 남겨주세요.
