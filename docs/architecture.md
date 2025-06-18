# 🧱 서비스 아키텍처

NestJS 기반의 기본적인 서비스 계층 구조는 아래와 같습니다:

```
[Client]
   ↓
[Controller]  - HTTP 요청 처리
   ↓
[Service]     - 비즈니스 로직 처리
   ↓
[Repository]  - 데이터베이스 접근 (TypeORM)
   ↓
[PostgreSQL]
```

- 각 도메인은 모듈 단위로 분리 (예: lesson.module.ts)
- DTO 및 Entity 구조 분리, 의존성 주입(DI) 패턴 사용
