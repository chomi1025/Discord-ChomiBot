# 👾 Discord-ChomiBot

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-14.19.3-blue?style=flat-square&logo=discord&logoColor=white)
![Google APIs](https://img.shields.io/badge/googleapis-149.0.0-green?style=flat-square&logo=google&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.9.0-lightgrey?style=flat-square&logo=axios&logoColor=white)
![Node Cron](https://img.shields.io/badge/node--cron-4.0.6-orange?style=flat-square&logo=nodemon&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google%20Cloud%20Platform-4285F4?style=flat-square&logo=googlecloud&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-blue?style=flat-square&logo=pm2&logoColor=white)

　
---
# 🚀 Discord-ChomiBot 소개 & 핵심 기능
> 저는 실제로 모바일 게임을 하면서, 미국, 대만, 중국, 러시아 등 여러 나라 친구들과 길드 활동을 하고 있었습니다.  
> 그런데 서로 다른 시간대 때문에 이벤트를 놓치거나, 참여율이 떨어지는 일이 자주 발생했습니다.  
>  
> “디스코드에서 자동으로 알림을 주면 해결되지 않을까?” 라는 생각에서 이 프로젝트를 시작하게 되었고,  
> 단순한 알림 기능에서 시작해 불참자 관리, 랜덤 이미지 기능까지 확장하게 되었습니다.  
>  
> 실제 길드원들이 사용하면서 불편함이 줄어드는 걸 직접 확인할 수 있었고,  
> 단순 토이 프로젝트가 아닌 **실사용 서비스 형태로 발전시킬 수 있었습니다.**

---
　

- **🌐 다국적 시차 대응 자동 알림 (`Node-cron`)**
  - UTC와 현지 시간 차이로 인해 놓치기 쉬운 게임 이벤트를 `node-cron` 스케줄러를 통해 자동화했습니다.
<<<<<<< HEAD
  - 이벤트 시간을 헷갈려 하던 길드원들이 줄어들었고, 실제로 이전보다 이벤트 참여 인원이 눈에 띄게 늘어났습니다.
=======
  - 고정된 주기로 반복되는 이벤트 특성에 맞춰 타이머 기반 알림 기능을 구현했습니다.
  - 실제 길드에서 사용하면서, 이벤트 참여를 놓치는 경우가 눈에 띄게 줄어드는 효과를 확인할 수 있었습니다.
>>>>>>> 4c5d8f345f4fd19ff9f745518faed872f1c1e83e

- **📊 실시간 데이터 동기화 (`Google Sheets API`)**
  - 별도의 DB를 따로 구축하지 않고, Google Sheets를 데이터 저장소처럼 활용했습니다.
  - `googleapis`를 연동해 디스코드 명령어만으로 불참자를 바로 기록하고, 조회할 수 있도록 구현했습니다.
  - 따로 관리 페이지를 만들지 않아도 돼서, 길드원들과 간단하게 데이터를 공유하기 좋았습니다.

- **🛡️ 안정적인 서비스 운영 (`PM2` & `GCP`)**
  - GCP VM 인스턴스에서 봇을 실행해 항상 켜져 있도록 구성했습니다.
  - `PM2`를 사용해 에러로 프로세스가 종료되더라도 자동으로 다시 실행되도록 설정했습니다.

- **🧪 테스트 환경 분리**
  - 실제 사용하는 디스코드 채널과 별도로 테스트 전용 서버를 만들어 기능을 먼저 검증할 수 있도록 했습니다.
  - 덕분에 운영 중인 채널에 영향을 주지 않고 안전하게 기능을 추가할 수 있었습니다.

- **🎮 기타 기능 (Fun Features)**
  - `Axios`를 활용해 외부 API와 연동하고, 랜덤 동물 이미지를 가져오는 기능을 추가했습니다.
  - 디스코드 명령어 처리 흐름을 직접 설계하면서, 사용자 입력 → 처리 → 응답 구조를 경험했습니다.

- **🚀 CI/CD 자동 배포 (GitHub Actions)**
  - GitHub Actions를 활용해 main 브랜치에 push 시 자동으로 서버에 배포되도록 구성했습니다.
  - 배포 과정에서 간단한 검증 단계를 거친 뒤, PM2를 통해 자동으로 재시작되도록 설정했습니다.
---
　

## 🖼️ 데모 & 스크린샷

### 🔔 1. 이벤트 알림

> ⏰ 반복되는 게임 이벤트 시간을 자동으로 알려주는 기능

![image](https://github.com/user-attachments/assets/55e2e4d0-7e47-4afc-b736-9c177c871aca)

- 게임 이벤트는 N주, N회, N시와 같이 **고정된 주기로 반복되는 특징**을 가지고 있습니다.
- 이러한 반복적인 이벤트를 놓치지 않도록 **Node-cron 기능을 활용**하여 **자동 타이머 알림 기능**을 개발했습니다.

👉 [기능 상세 보기 (Wiki)](https://github.com/chomi1025/Discord-ChomiBot/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%95%8C%EB%A6%BC)


　

### ❌ 2. 불참자 등록/조회
> 📝 디스코드에서 입력하면 구글시트에 자동으로 기록되고 조회까지 가능한 기능
#### 2-1 불참자 등록(Post)

<table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img src="https://github.com/user-attachments/assets/2bf85c43-145c-4f7f-bdb8-a69f5fe09e1f" width="450" />
      </div>
    </td>
    <td align="center" style="padding: 10px;">
      <div>
        <img src="https://github.com/user-attachments/assets/bf059b73-faf2-49c7-9259-899f636ee15c" width="450" />
      </div>
    </td>
  </tr>

 <tr>
    <td align="center" style="padding-top: 10px;">
      <em>📖 디스코드에서 불참자를 작성합니다.</em>
    </td>
   <td align="center" style="padding-top: 10px;">
      <em>🚀 구글시트에 데이터값이 전송됩니다.</em>
    </td>
  </tr>

  <tr>
    <td colspan="2" align="center" style="padding-top: 10px;">
      <em>디스코드에서 명령어 입력과 동시에 구글시트에 실시간으로 작성이 이루어집니다.</em>
    </td>
  </tr>
</table>

#### 2-2 불참자 조회(Get)

<table align="center" style="margin: auto; width: 100%;">
  <tr>
      <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img src="https://github.com/user-attachments/assets/6e9494d1-f633-4fbc-9520-ddf011074137" width="450" />
      </div>
    </td>
      <td align="center" style="padding: 10px;">
      <div>
        <img src="https://github.com/user-attachments/assets/14d89eb6-b0e7-4c85-8f57-b901dd002825" width="450" />
      </div>
    </td>

  </tr>

 <tr>
    <td align="center" style="padding-top: 10px;">
      <em>🔎 구글시트에서는 탭마다 이벤트명을 적어 구분해놓습니다.</em>
    </td>
   <td align="center" style="padding-top: 10px;">
      <em>📖 명령어 이벤트를 입력시 시트에서 가장 최근 데이터값을 불러옵니다.</em>
    </td>
  </tr>

  <tr>
    <td colspan="2" align="center" style="padding-top: 10px;">
      <em> 특정 이벤트 + 최근 이벤트날짜의 불참자를 조회하는 기능입니다.</em>
    </td>
  </tr>
</table>

👉 [기능 상세 보기 (Wiki)](https://github.com/chomi1025/Discord-ChomiBot/wiki/%EB%B6%88%EC%B0%B8%EC%9E%90-%EB%93%B1%EB%A1%9D-%EC%A1%B0%ED%9A%8C)

　

### 🐶 3. 동물사진 출력기능
> 🐾 외부 API를 활용해 랜덤 이미지를 가져와 공유하는 기능
<table align="center" style="margin: auto; width: 100%;">
  <tr>
      <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img src="https://github.com/user-attachments/assets/273153b8-0b40-4e49-b2e9-901ab36ed407" width="450" />
      </div>
  </tr>

 <tr>
    <td align="center" style="padding-top: 10px;">
      <em>😺 힐링 동물을 멤버들과 공유하며 소소한 행복을 나눌 수 있습니다 💖</em>
    </td>
  </tr>
</table>

👉 [기능 상세 보기 (Wiki)](https://github.com/chomi1025/Discord-ChomiBot/wiki/%EC%82%AC%EC%A7%84-%EC%B6%9C%EB%A0%A5)

　

## 🛠️ 기술 스택 (Tech Stack)


| 분류 | 기술 스택 |
|------|-----------|
| **Backend** | Node.js (JavaScript) |
| **Libraries** | Discord.js, Google Sheets API, Node-cron, Axios |
| **Database** | Google Sheets |
| **Infra / Deployment** | GCP, PM2, GitHub Actions |

　

## 🧪 테스트 환경 분리 (Test & Production)

안정적인 개발과 테스트를 위해 아래와 같은 구조로 테스트 환경을 분리해 두었습니다.

#### 🎯 1. 실제 운영 채널

- 실사용 중인 본 디스코드 서버 채널입니다.
- 봇이 실제로 알림을 보내는 채널이며, 길드원들과의 소통도 이곳에서 이루어집니다.

![image](https://github.com/user-attachments/assets/da6ff4be-6eda-4853-aaed-1491e47340c0)

#### 🧪 2. 테스트 전용 채널

- 봇의 기능 개발 및 수정을 실험해볼 수 있는 전용 테스트 서버입니다.
- 실험용 디스코드 봇이 연결되어 있어, 본 채널에 영향을 주지 않고 자유롭게 테스트할 수 있습니다.

![image](https://github.com/user-attachments/assets/9abdb175-3cfe-4d43-868d-4f0cdb0ef0d2)

> 🧠 시차(UTC) 기반 스케줄링 특성상 충분한 검증이 필요했지만,
> 테스트 환경을 분리해 실제 운영 채널에 영향을 주지 않고 안정적으로 기능을 개선할 수 있었습니다.

　

## 🚀 설치 및 실행 방법

<details><summary>보기
</summary>

```
git clone https://github.com/yourname/project-name.git
cd Discord-ChomiBot
npm install
npm start
```

⚠️ 이 봇은 특정 Discord 채널 ID 및 토큰 설정이 필요하여, 기본 상태로는 실행되지 않습니다.
<br>
👉 실제 사용을 위해선 Channel.js 파일에서 Discord 채널설정을 추가해야 합니다.

　

### 실제 사용을 위한 필수 파일 및 설정 안내

### 1. Channel.js

- 디스코드 채널 ID를 입력하세요
- 예시 :

```js
module.exports = {
  DISCORD_CHANNEL_ID: "여기에_디스코드_채널_ID를_입력하세요",
};
```

### 2. absent/index.js

- 구글 시트 연동 코드가 포함된 파일입니다.
- 서비스 계정 키 파일 경로를 본인 환경에 맞게 수정하세요.
- 예시:

```js
const path = require("path");
const KEY_FILE_PATH = path.join(
  __dirname,
  "..",
  "config",
  "service-account.json",
);
```

### 3. config/service-account.json

- 구글 클라우드에서 생성한 서비스 계정 키(JSON) 파일입니다.
- 프로젝트 내 config 폴더에 넣어 사용합니다.
- 이 파일은 민감한 정보이므로 절대 공개 저장소에 업로드하지 마세요!

</details>

　　

## 📁 폴더구조

```bash
📦 Discord-ChomiBot
├── 📁 absent #불참자 등록/조회 기능
│ └── index.js
├── 📁 alert #이벤트 알림 개별 기능
│ └── bear.js #곰 사냥
│ └── canyon.js #협곡 전투
│ └── foundry.js #무기 공장
│ └── joe.js #미치광이 조이
│ └── kill.js #킬 이벤트
│ └── mercenary.js #용병 명예
│ └── solar.js #솔라 시티
│ └── svs.js #서버전
├── 📁 fetchImage #사진 출력 기능
│ └── cat.js #고양이
│ └── dog.js #강아지
├── 📁 config #구글 시트 연동을 위한 키 파일
│ └── service-account.json
├── eventScheduler.js #이벤트 알림 기능 종합
├── Channel.js # 디스코드 채널 ID 설정
├── bot.js # 봇 실행 메인 파일
├── .env #디스코드 토큰 환경 변수
├── package.json
└── README.md
```

　

## ✨ 회고 및 앞으로의 계획
이번 프로젝트를 통해 단순히 기능을 구현하는 것을 넘어, 실제 사용자 환경에서 동작하는 서비스를 설계하고 운영하는 경험을 할 수 있었습니다.

초기에는 이벤트 알림 기능을 구현하는 것이 목표였지만, 운영 과정에서 불참자 관리의 필요성을 느끼며 기능을 확장하게 되었고, 그 과정에서 Google Sheets를 데이터 저장소로 활용하고 디스코드 봇과 연동하는 구조를 직접 설계해볼 수 있었습니다.

또한 시차(UTC) 기반의 스케줄링과 같은 예상치 못한 문제를 겪으면서, 테스트 환경을 분리하고 충분한 검증 과정을 거치는 것이 얼마나 중요한지 체감할 수 있었습니다.

이 프로젝트를 통해 단순 개발을 넘어, 실제 사용자의 흐름을 고려한 기능 확장과 안정적인 운영 환경의 중요성을 배우게 되었고, 앞으로는 이러한 경험을 바탕으로 더 구조적인 설계와 확장성을 고려한 프로젝트를 진행해보고자 합니다.



