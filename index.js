let data = [];
const el1 = document.querySelectorAll(".IE");
const el2 = document.querySelectorAll(".NS");
const el3 = document.querySelectorAll(".FT");
const el4 = document.querySelectorAll(".JP");
const btn = document.querySelector(".btn");
console.log(el1,el2,el3,el4);
const result = document.querySelector(".result");

el1.forEach(function(item,index){
  item.addEventListener("click",function(){
    data[0] = item.value; 
  })
})

el2.forEach(function(item,index){
  item.addEventListener("click",function(){
    data[1] = item.value; 
  })
})


el3.forEach(function(item,index){
  item.addEventListener("click",function(){
    data[2] = item.value; 
  })
})

el4.forEach(function(item,index){
  item.addEventListener("click",function(){
    data[3] = item.value; 
  })
})

btn.addEventListener("click",function(){
  let str = "";
  data.forEach(function(item,index){
    str += item;
  })
  result.innerHTML = `<p>${str}</p>`
})


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, FieldValue, getDocs, getDoc  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

  // 获取 Firestore 数据库的实例
  const db = getFirestore(app);

  const question = document.querySelector(".question") 
  async function readQuestions() {
  try {

    let str= "";

    for (let i = 1; i <= 20; i++) {
      const docId = `question${i}`;
      // 获取 "question{i}" 文档的快照
      const docSnapshot = await getDoc(doc(db, "question", docId));

      if (docSnapshot.exists()) {
        console.log(`Document ID: ${docId}`);
        // 获取每个文档下的 "selection" 子集合的快照
        const selectionCollectionRef = collection(doc(db, "question", docId), "selection");
        const selectionQuerySnapshot = await getDocs(selectionCollectionRef);
        // 遍历每个子集合文档

        const selectionDataArray = [];
        let selection = ""
        selectionQuerySnapshot.forEach((selectionDoc) => {
          console.log(`Selection ID: ${selectionDoc.id}`);
          console.log("Selection data:", selectionDoc.data());
          selection += `<div class="col-6">${selectionDoc.data().description}</div>`
        });
        console.log(selection)
        str += `<p>${docId}</p>
                <div class="row">
                  ${selection}
                </div>`
      } else {
        console.log(`Document ${docId} does not exist.`);
      }

    }
    question.innerHTML = str;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// 调用读取数据的函数
readQuestions();

// 添加 question1 文档到 question 集合下

// async function addQuestionAndSelection() {
//   try {
//     // 添加 question1 文档到 question 集合下
//     const questionDocRef = doc(db, "question", "question20");
//     await setDoc(questionDocRef, {});

//     // 添加 selection1 文档到 selection 集合下
//     const selection1Ref = doc(db, "question/question20/selection", "selection1");
//     await setDoc(selection1Ref, {
//       description: "Description for selection1",
//       score: 0,
//       type: "Ne"
//     });

//     // 添加 selection2 文档到 selection 集合下
//     const selection2Ref = doc(db, "question/question20/selection", "selection2");
//     await setDoc(selection2Ref, {
//       description: "Description for selection2",
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
  


