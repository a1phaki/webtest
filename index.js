import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, FieldValue, getDocs, getDoc  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyBTCMwDV5ERZbUL716SH_HAkCf1d2sKTHA",
    authDomain: "webtest-6f33d.firebaseapp.com",
    databaseURL: "https://webtest-6f33d-default-rtdb.firebaseio.com",
    projectId: "webtest-6f33d",
    storageBucket: "webtest-6f33d.appspot.com",
    messagingSenderId: "37272451939",
    appId: "1:37272451939:web:87db02f10baf4eb2b5f156",
    measurementId: "G-NMY13VPYVR"
  };
  // 初始化 Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const login = document.getElementById("login");


  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // 註冊成功，您可以在此處處理成功後的操作，例如將用戶信息保存到資料庫中
            const user = userCredential.user;
            console.log('註冊成功')
        })
        .catch((error) => {
            // 註冊失敗，處理錯誤
            signIn(email,password)
        });
  }
  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // 登入成功，您可以在此處處理成功後的操作，例如將用戶信息保存到本地存儲或導航到其他頁面
            const user = userCredential.user;
            console.log('登入成功')
        })
        .catch((error) => {
            // 登入失敗，處理錯誤
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Sign-in failed:", errorMessage);
        });
}
  login.addEventListener("submit",(e) => {
    e.preventDefault();

    const email = document.querySelector(".email").value;
    const password = 12345678;
    signUp(email,password)
  })
  // 获取 Firestore 数据库的实例
  const db = getFirestore(app);

  const question = document.querySelector(".question");
  const paginationContainer = document.querySelector(".pagination");
  
  // 定義一個對象來存儲選擇的分數
  const scores = {};
  
  async function readQuestions(page, pageSize) {
    try {
      let str= "";
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
  
      for (let i = start + 1; i <= end; i++) {
        const docId = `question${i}`;
        const docSnapshot = await getDoc(doc(db, "question", docId));
  
        if (docSnapshot.exists()) {
          console.log(`Document ID: ${docId}`);
          const selectionCollectionRef = collection(doc(db, "question", docId), "selection");
          const selectionQuerySnapshot = await getDocs(selectionCollectionRef);
  
          const selectionDataArray = [];
          let selection = ""
          selectionQuerySnapshot.forEach((selectionDoc) => {
            console.log(`Selection ID: ${selectionDoc.id}`);
            console.log("Selection data:", selectionDoc.data());
            // 將選擇的分數添加到scores對象中
            scores[selectionDoc.id] = selectionDoc.data().score;
            selection += `<div>${selectionDoc.data().description}</div>`
          });
          console.log(selection)
          str += `<div class="my-4"> 
                    <p>${docId}</p>
                    <div class="row g-5 row-cols-2 mb-4">
                      ${selection}
                    </div>
                    <div class="row row-cols-5 g-3">
                      <div class="col">
                        <div class="btn btn-outline-info btn-lg">2</div>
                      </div>
                      <div class="col">
                        <div class="btn btn-outline-info btn-lg">1</div>
                      </div>
                      <div class="col">
                        <div class="btn btn-outline-info btn-lg">0</div>
                      </div>
                      <div class="col">
                        <div class="btn btn-outline-info btn-lg">1</div>
                      </div>
                      <div class="col">
                        <div class="btn btn-outline-info btn-lg">2</div>
                      </div>
                    </div>
                  </div>`
        } else {
          console.log(`Document ${docId} does not exist.`);
        }
  
      }
      question.innerHTML = str;
  
      // 清空分頁按鈕容器
      paginationContainer.innerHTML = "";
  
      // 呈現分頁按鈕
      renderPaginationButtons(page, pageSize);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
  
  // 呈現分頁按鈕
  function renderPaginationButtons(page, pageSize) {
    const totalPages = Math.ceil(20 / pageSize); // 假設共有20筆資料
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        readQuestions(i, pageSize);
      });
      paginationContainer.appendChild(pageButton);
    }
  }
  
  // 記錄每個選擇的分數
  
  
  // 調用函數，顯示第1頁，每頁顯示5個問題
  readQuestions(1, 5);

// 添加 question1 文档到 question 集合下

// async function addQuestionAndSelection() {
//   try {
//     // 添加 question1 文档到 question 集合下
//     const questionDocRef = doc(db, "question", "question15");
//     await setDoc(questionDocRef, {});

//     // 添加 selection1 文档到 selection 集合下
//     const selection1Ref = doc(db, "question/question20/selection", "selection1");
//     await setDoc(selection1Ref, {
//       description: "您心胸開闊，厭倦乏味的例行公事。您討厭缺乏激動人心的精神啟發的情況。 例如：即使您是一個外向的人，您的精力不是因為與人相處而高漲，而是因為學習，無論是了解他們的真實面貌，理解不同的觀點，還是通過刺激的對話互相挑戰。",
//       score: 0,
//       type: "Ne"
//     });

//     // 添加 selection2 文档到 selection 集合下
//     const selection2Ref = doc(db, "question/question20/selection", "selection2");
//     await setDoc(selection2Ref, {
//       description: "您喜歡做出選擇，這樣您就可以開始工作了。您從許多不同的角度看待情況，並注意您的內在世界受到了什麼影響。 例如：您擅長隨時投入開始工作，但有時您會過於迅速地下結論，而沒有充分探索其他選擇。",
//       score: 0,
//       type: "Ni"
//     });

    
//     console.log("Documents added successfully.");
//   } catch (error) {
//     console.error("Error adding documents: ", error);
//   }
// }

// // 调用添加 question1 文档的函数
// addQuestionAndSelection();
  


