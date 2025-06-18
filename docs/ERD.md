# 🧩 ERD (Entity Relationship Diagram)

아래는 본 프로젝트에서 사용된 주요 엔티티의 관계도입니다.

- **User**
  - id (PK), name, phone, createdAt

- **Coach**
  - id (PK), name, availableTime (1:N → LessonTime)

- **Lesson**
  - id (PK), userId (FK), coachId (FK), scheduleId (FK), time, startDate

- **Schedule**
  - id (PK), dayOfWeek (1:N → DayOfweek), lessonTime (1:N)

- **LessonTime**
  - id (PK), startTime, endTime

- **Court**
  - id (PK), name, location

- **DayOfweek**
  - id (PK), value (예: 월, 화, 수 ...)

> 시각 다이어그램은 `erd.png` 참고
