# 🎾 Tennis Lesson API

**NestJS 기반 테니스 레슨 예약 및 관리 시스템**

---

## ⚙️ 기술 스택

- Language: TypeScript
- Framework: NestJS
- Database: PostgreSQL
- ORM: TypeORM
- Dev Tools: ESLint, Prettier, Jest
- 운영환경: .env 설정 기반
- (확장 가능): Docker, JWT, Swagger

---

## 📁 프로젝트 구조

```
lesson-main/
├── configs/          # TypeORM 설정
├── src/              # 메인 코드
│   ├── lesson/       # 레슨 도메인
├── test/             # 테스트 코드
├── README.md
```

---

## 📡 주요 API

- **GET** `/lesson/possibleList`: 가능한 레슨 시간 조회
- **POST** `/lesson/apply`: 레슨 신청

---

## 📄 주요 문서

- [ERD 다이어그램](docs/ERD.md)
- [서비스 구조 설명](docs/architecture.md)
- [API 명세서](docs/API.md)
- [트러블슈팅 & 회고](docs/troubleshooting.md)

---

## 🚀 실행 방법

```bash
npm install
npm run seed
npm run start
```

---

## 🧠 간단 회고

NestJS의 계층 아키텍처를 학습하고, 실무 유사 구조를 직접 설계·구현함.
다양한 예약 조건 처리 및 관계형 DB 설계 경험을 얻음.
