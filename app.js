const express = require("express");
const app = express();

const appUrl = "https://josikbot-dprhq.run.goorm.io";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/image", express.static(__dirname + "/static/images"));

app.get("/keyboard", (req, res) => {
  console.log("req:\n", req);
  const data = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleImage: {
            imageUrl: "/image/MenuJan.png",
            altText: "hello I'm Ryan",
          },
        },
      ],
    },
  };

  res.json(data);
});

// TODO: 프로토타입에 outputs 추가 작업
// const dataTemplate = {
// 	version: "2.0",
// 	template: {
// 	  outputs: []
// 	}
// }

const returnImageMenu = (req, res) => {
  const dataTemplate = {
    version: "2.0",
    template: {
      outputs: [],
    },
  };

  console.log("returnImageMenu : ", req.body.action.params.menu_image_date);
  const simpleImage = {
    imageUrl: appUrl + "/image/MenuJan.png",
    altText: "1월 조식 메뉴 이미지",
  };

  dataTemplate.template.outputs.push({ simpleImage });

  res.json(dataTemplate);
};

const returnTextMenu = (req, res) => {
  const dataTemplate = {
    version: "2.0",
    template: {
      outputs: [],
    },
  };

  console.log("returnTextMenu : ", req.body.action.params.menu_date);
  // TODO: array 형태의 menu 를 .join(',')
  const param = req.body.action.params;
  const date = param.menu_date;

  const menuText = "삼각김밥,샌드위치,컵과일";
  const simpleText = { text: `${date} 메뉴는 ${menuText}입니다.` };

  dataTemplate.template.outputs.push({ simpleText });

  res.json(dataTemplate);
};

const returnError = (res) => {
  // TODO: quickReplies 추가하기
  const dataTemplate = {
    version: "2.0",
    template: {
      outputs: [],
    },
  };

  const simpleText = { text: "잘못된 요청입니다." };
  dataTemplateTe.template.outputs.push(simpleText);
  res.json(dataTemplate);
};

app.post("/menu/:type", (req, res) => {
  //TODO: type(image, text)에 따른 분기 처리
  const type = req.params.type;
  const utterance = req.body.userRequest.utterance;
  const param = req.body.action.params;
  const date = param.menu_image_date || param.menu_date;

  console.log("utterance: ", utterance);
  console.log("param: ", param);
  console.log("date: ", date, "\n");

  switch (type) {
    case "image":
      returnImageMenu(req, res);
      return;
    case "text":
      returnTextMenu(req, res);
      return;
    default:
      returnError(res);
      return;
  }

  // const data = {
  // 	version: "2.0",
  // 	template: {
  // 		"outputs": [
  // 			{
  // 				"simpleImage": {
  // 					"imageUrl": appUrl + '/image/MenuJan.png',
  // 					"altText": "1월 조식 메뉴 이미지"
  // 				}
  // 			}
  // 		]
  // 	}
  //   };
  // res.json(data)
});

app.listen(3000, () => console.log("josickBot Server On 3000 Port"));
