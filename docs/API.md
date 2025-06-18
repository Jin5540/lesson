# 📡 Tennis Lesson API 명세서

## ✅ 가능한 레슨 시간 조회

- **URL**: `GET /lesson/possibleList`
- **설명**: 입력된 조건에 따라 예약 가능한 시간을 반환
- **요청 예시**
```json
{
  "name": "김민준",
  "time": 60,
  "number": 2
}
```
- **응답 예시**
```json
{
  "success": true,
  "data": [
    "2024-04-13 07:00:00",
    "2024-04-13 07:30:00"
  ]
}
```

---

## 📝 레슨 신청

- **URL**: `POST /lesson/apply`
- **설명**: 사용자/코치/요일을 기준으로 레슨 신청을 등록
- **요청 예시**
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
- **응답 예시**
```json
{
  "success": true,
  "message": "레슨이 신청되었습니다."
}
```
