# Anonymous-Forum

bycrpt를 이용한 익명게시판 만들기

**22.09.06 ~ 22.09.07**

원티드 백엔드 프리온보딩 1차 과제입니다. `backend`

### 목차

[1.서비스 개요](#서비스-개요)<br>
[2.요구사항 구현 내용](#요구사항)<br>
[3.실행 방법 정리](#실행-방법-정리-🛠)<br>
[4.회고](#회고)<br>

## 🌱 서비스 개요

다음과 같은 기능을 제공하는 RESTful API 서버 개발을 목적으로 구현하였습니다.

- 익명 게시판
- 게시글에 비밀번호 설정
- 설정된 비밀번호로 수정 및 삭제 권한 부여

### ERD

<img width="1437" alt="스크린샷 2022-09-07 오후 10 03 33" src="https://user-images.githubusercontent.com/97277365/188885201-30c439c5-9d23-4cef-9f0f-07663450fb78.png">

### 기술 스택

`nodejs` `express.js` `typeorm` `mySql` `swagger` `typescript`

### git flow

`main` `develop` `feature` 세 종류의 브랜치를 기본으로 사용합니다.

1. 작업단위로 나누어진 `feature-taskname` 브랜치를 만들어 공정을 세분화하여 개발합니다.
2. 구현이 끝나면 `develop` 에 PR합니다.
3. 각 기능이 병합된 `develop` 에서 `main`로 병합합니다.
4. 병합된 `feature-taskname` 브렌치들은 삭제합니다.

## 💡 요구사항 구현 내용

### 회원 정보 관리

**게시글 작성**

1. 사용자는 제목, 내용, 비밀번호를 입력하여 게시글 작성을 시도합니다.
2. 이때 제목, 내용, 비밀번호가 정해진 규칙에 부합하지 않다면 게시글이 작성되지 않습니다. `BadRequestError`
3. 사용자가 입력한 비밀번호는 `bcrypt`를 이용해 암호화된 상태로 DB에 저장됩니다.
4. 제목은 20자 이하, 내용은 200자 이하, 비밀번호는 숫자가 1개 이상 포함된 6자이상으로 작성되야합니다.

 <img width="1423" alt="스크린샷 2022-09-07 오후 9 10 52" src="https://user-images.githubusercontent.com/97277365/188875420-e68da009-1f44-4775-9364-9ab38bd22317.png">

<img width="1440" alt="스크린샷 2022-09-07 오후 9 15 24" src="https://user-images.githubusercontent.com/97277365/188876006-111d711c-8bec-40cb-9e77-fc7a4ce07e86.png">

**게시글 불러오기**

1. 게시글은 요청 한 번에 20개씩 불러옵니다.
2. 페이지번호와 한 페이지 당 원하는 만큼 쿼리로 받아옵니다.
3. 페이지 당 게시글이 명시되지 않을 경우, 기본값은 20입니다.

<img width="1440" alt="스크린샷 2022-09-07 오후 9 22 43" src="https://user-images.githubusercontent.com/97277365/188877335-10851bd7-9800-43fa-84d0-7a287b2d51b2.png">
<img width="1440" alt="스크린샷 2022-09-07 오후 9 23 39" src="https://user-images.githubusercontent.com/97277365/188877521-9f1cb5e8-abb4-441a-b9f4-7ddfa57d01e5.png">

**특정 게시글 불러오기**

1.  요청으로 게시글의 고유 id 값을 받습니다.
2.  id에 해당하는 게시글을 검색한 후 제목과 내용만을 반환합니다.
3.  검색된 결과를 json 형식으로 반환합니다.

<img width="1440" alt="스크린샷 2022-09-07 오후 9 26 44" src="https://user-images.githubusercontent.com/97277365/188878028-2806be6d-fcd8-4c5e-b19a-fffadedac82a.png">

**특정 게시글 수정**

1.  사용자가 입력한 비밀번호를 복호화 하여 게시글의 비밀번호와 비교합니다.
2.  다르면, `ForbiddenError`를 반환합니다.
3.  수정할 제목과 내용을 받아 데이터를 최신화합니다.

<img width="1438" alt="스크린샷 2022-09-07 오후 9 30 21" src="https://user-images.githubusercontent.com/97277365/188878696-99429000-3079-4016-8896-fba57006731e.png">

**특정 게시글 삭제**

1.  사용자가 입력한 비밀번호를 복호화 하여 게시글의 비밀번호와 비교합니다.
2.  다르면, `ForbiddenError`를 반환합니다.
3.  파라미터로 받은 id에 해당하는 게시글을 삭제합니다.

<img width="1440" alt="스크린샷 2022-09-07 오후 9 32 19" src="https://user-images.githubusercontent.com/97277365/188879018-ae3baf0c-1698-48c5-8249-f510ceab15b6.png">

## 실행 방법 정리 🛠

```
npm build
npm start
```

```
npm run dev // 개발자용
```

### 커밋 컨벤션

`fix:` 버그가 발생해 코드를 고칠 때  
`feat:` 기능을 추가할 때  
`build:` 빌드할 때  
`chore:` 설정 변경 발생시(단순오타 등은 refactor 😊)  
`docs:` 문서 수정(마크다운 파일, swagger doc 등)  
`style:` 코드 스타일 수정(개행 등)  
`refactor:` 코드의 기능변화 없이 수정할 때  
`test:` 테스트파일 관련 작업(jest)

## 회고

### 이전 과제에서의 회고

[이전과제](https://github.com/RunningLearner/JWT-included-forum)

1. 시간관리를 체계적으로 하지 못했다.
2. 작업단위를 잘 나누지 못했다.
3. `Typescript`, `TypeORM`을 사용해보자.

### 이번 과제에서의 회고

1. 에러처리를 미처 놓친 부분이 있다.

- 페이지에 게시글 없을 때 에러처리 필요.
- 찾는 게시글이 없을 때 에러처리 필요.

2. `Typescript`, `TypeORM`을 사용은 했지만 너무나도 미숙해서 시간낭비가 있었다.

- 에러타입관련 try catch 숙지 필요.

3. http 에러코드 204.

- 204를 반환하도록 하고 왜 메세지가 안오는지 한참 헤매였다.

4. hash하면 늘어나요~

- DB에서 비밀번호 6자이상을 설정해 놓았지만 4자리로 입력해도 통과 가능했다.
  왜냐하면 bcrypt를 통해 해싱된 비밀번호는 엄청 길기 떄문이다.
  따라서, 해싱을 하기전의 길이로 유효성 검사를 해주어야한다.
  이것떄문에도 시간을 좀 빼았겼다.

5. async 남발

- async 자동완성으로 함수를 만들다가 await 처리하지 않아서 한참을 헤매였다.

6. 다음과제는 `Nest.js`를 써보는 것도 좋을 것 같다.

### Made By

🍀 [남승인](https://github.com/RunningLearner)
