# 🐛 트러블슈팅 & 회고

## 주요 문제 및 해결

### 🔄 순환 참조 (Circular Dependency)
- 문제: Lesson ↔ Schedule 간 forwardRef 없을 시 NestJS 에러
- 해결: forwardRef()로 종속성 해결

### ⏰ 시간대 문제
- 문제: UTC ↔ KST 시간대 불일치
- 해결: DB는 UTC 저장, 응답 시 변환 처리

### 🧪 테스트 DB 충돌
- 문제: seed 데이터가 실 DB 덮어씀
- 해결: `.env.test` 구성 및 테스트 분리

## 💭 회고

- NestJS 구조에 익숙해졌고, 실무형 예약 시스템을 설계해보며 관계형 DB와 서비스 흐름을 직접 다뤄봄.
- 유닛 테스트와 트러블슈팅 경험이 특히 유익했음.
