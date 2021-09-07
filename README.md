# React Typescript Redux-Toolkit JWT starter

바로 사용 할 수 있는 템플릿은 아니며, 코드만 참고 바랍니다.

  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Type Script-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">

## Table of Contents

-   [Environment](#nvironment)
-   [Getting Started](#getting-started)
-   [Structure overview](#structure-overview)

## Environment

env 파일 생성 or 수정

```sh
# .env.development
REACT_APP_BASE_URL=http://
REACT_APP_API_URL=$REACT_APP_BASE_URL/api

# .env.production
REACT_APP_BASE_URL=http://
REACT_APP_API_URL=$REACT_APP_BASE_URL/api
```

## Getting Started

1. /src/features에 필요한 View를 생성
2. /src/routes.tsx에서 라우팅
3. JWT기반 로그인 후 사용하는 페이지는 AuthRoute에서 처리

```sh
# Yarn
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure overview

```
src
├── apis
├── components              // 공통 컴포넌트
├── features                // 각각 View, Component,Logic
│   ├── dashboard.tsx       // 대시보드 View
│   ├── dashboardSlice.ts   // 대시보드 상태 관리(Logic)
│   └── components
│       └── notice.tsx      // 공지사항 컴포넌트
├── requests
│   ├── authRequest.ts      // jwt setting api config
│   └── request.ts          // nomal api config
├── services
│   └── authService.ts      // 인증 서비스
├── utiles                  // 유틸리티 함수
├── routes.tsx              // 페이지 라우팅
├── .eslintrc               // eslint 설정
├── .prettierrc             // prettier 설정
├── package.json            // 패키지 관리
├── .env.development        // 개발서버 설정
├── .env.production         // 운영서버 설정
└── yarn.lock
```
