## ADDED Requirements

### Requirement: Vite 개발 서버 프록시

프론트엔드 개발 서버는 `/api/*` 요청을 `http://localhost:8080`으로 프록시해야 한다(SHALL). CORS 우회를 위해 vite.config.ts에 설정한다.

#### Scenario: API 프록시 동작

- **WHEN** 프론트엔드에서 `axios.get('/api/certs')`를 호출하면
- **THEN** `http://localhost:8080/api/certs`로 요청이 전달된다

### Requirement: axios 클라이언트

프론트엔드는 `src/lib/apiClient.ts`에 공통 axios 인스턴스를 가져야 한다(SHALL). `baseURL`은 `/api`이고 `Content-Type: application/json`을 기본 헤더로 설정한다.

#### Scenario: 공통 클라이언트 사용

- **WHEN** 모든 feature api.ts 파일이 apiClient를 import하면
- **THEN** baseURL, 헤더 설정이 자동으로 적용된다

### Requirement: Spring Boot CORS 허용

백엔드는 `http://localhost:5173`에서의 `GET`, `POST`, `PUT`, `DELETE` 요청을 허용해야 한다(SHALL).

#### Scenario: 프리플라이트 요청

- **WHEN** 브라우저가 `OPTIONS /api/certs`를 전송하면
- **THEN** `Access-Control-Allow-Origin: http://localhost:5173` 헤더가 응답에 포함된다

### Requirement: 공통 타입 정의

`src/lib/types.ts`는 프론트엔드 전체에서 사용하는 공통 타입을 정의해야 한다(SHALL).

#### Scenario: 타입 일관성

- **WHEN** CertsPage, JobsPage, ActivitiesPage가 타입을 import하면
- **THEN** 모두 동일한 `Cert`, `Job`, `JobStage`, `Activity` 타입을 사용한다

### Requirement: SideNav 라우트 연결

SideNav의 각 항목은 실제 라우트(`/app/certs`, `/app/jobs`, `/app/activities`)로 이동해야 한다(SHALL). 현재 경로와 일치하는 항목에 활성 표시가 된다.

#### Scenario: SideNav 클릭

- **WHEN** SideNav에서 "자격증"을 클릭하면
- **THEN** `/app/certs`로 이동하고 해당 항목에 활성 인디케이터가 표시된다
