var subject = document.getElementById("subject");
var question = document.getElementById("question");
var submit = document.getElementById("submit");
var reply = document.getElementById("replies");
var commenter =document.getElementById("commenter");
var commenter_response = document.getElementById("commenter_response");
var response = document.getElementById("response");
var questionPart = document.getElementById("questionsPart");
var heading = document.getElementById("heading");
var rightContent = document.getElementById("rightContent");
var form = document.getElementById("form");
var commenterResponse = document.getElementById("commenterResponse");
var quesForm =document.getElementById("quesForm");
var search = document.getElementById("Search");
var answer_comment = document.getElementById("answer_comment");

const QUESTIONS = "questions";

let allQuestions=[];
let selectedQuestion = null;


//enable or disable btns based on input
subject.addEventListener('keyup',setSubmit);
question.addEventListener('keyup',setSubmit);
commenter.addEventListener('keyup', setSubmit);
commenter_response.addEventListener('keyup', setSubmit);






//For making submit button enable or disable
function setSubmit(){
if(subject.value!=="" && question.value!==""){
  submit.removeAttribute("disabled");
  submit.style.background = "rgb(0, 153, 255)";
}
else{
  submit.disabled = "true";
  submit.style.background="gray";
}

if(commenter.value!=="" && commenter_response.value!==""){
   response.removeAttribute("disabled");
   response.style.background = "rgb(0, 153, 255)";
}
else{
  response.disabled = "true";
  response.style.background="gray";
}

}

//New Question Display Btn
quesForm.addEventListener("click",displayQuestionForm);


//displayQuestionForm
function displayQuestionForm(){
  heading.style.display="block";
  form.style.display="block";
  commenterResponse.style.display="none";
}

//Filtering based on searching question
search.addEventListener('keyup',searchQues);

//search question
function searchQues(event){
  let keyW = event.target.value;
  questionPart.innerHTML="";
  allQuestions.forEach(item=>{
    if(item.title.includes(keyW)){
         sendToLeft(item);
    }
  })
}



//create list when starting up
function createList(){
   let questions = localStorage.getItem(QUESTIONS);
   if(questions){
     questions = JSON.parse(questions);
   }
   else{
     questions= [];
   }
   allQuestions = questions;
   questions.forEach(function(ques){
     sendToLeft(ques);
     })
}

createList();



//eventListener on submit button
submit.addEventListener("click",function(){
    
      const title = subject.value;
      const description = question.value;

    var newQuestionStructure={
      title:title,
      description:description,
      answers:[]
    }
    

    let questions = localStorage.getItem(QUESTIONS);

    if(questions){
      questions = JSON.parse(questions)
    }
    else{
      questions = [];
    }

    questions.push(newQuestionStructure);

    localStorage.setItem(QUESTIONS,JSON.stringify(questions));
    allQuestions.push(newQuestionStructure);
    sendToLeft(newQuestionStructure);


    subject.value="";
    question.value="";
    setSubmit();
    

})

//send question to left part
function sendToLeft(quest){
   const container = document.createElement("div");
   container.classList.add("question_container");

   const title = document.createElement("h3");
   const description = document.createElement("p");

   container.addEventListener('click',function(){
     handleQuestionClick(quest);
   });

   title.innerHTML = quest.title;
   description.innerHTML = quest.description;

   container.appendChild(title);
   container.appendChild(description);

   questionPart.appendChild(container);
   

}

//handle click on question container
function handleQuestionClick(quest){

  form.style.display="none";
  heading.style.display="none";
  commenterResponse.style.display="block";

  replies.innerHTML = "";

  selectedQuestion = quest;
  
  answer_comment.innerHTML="";
  
   commenter.value="";
   commenter_response.value="";
     
    setSubmit();
   
    allQuestions.forEach(item=>{
      item.answers.forEach(i=>{
        console.log(i);
      })
    })

    displayQuestion(quest);
  




}

// displaying question on right side
function displayQuestion(quest){
 let container = document.createElement("div");
 let title = document.createElement("h3");
 let description = document.createElement("p");
 let resolve_btn = document.createElement("button");

 title.innerHTML = quest.title;
 description.innerHTML = quest.description;
 resolve_btn.innerHTML = "Resolve";


 container.classList.add("question_container");
 resolve_btn.id="resolve";

 container.appendChild(title);
 container.appendChild(description);

 replies.appendChild(container);
 replies.appendChild(resolve_btn);

 

 resolve_btn.addEventListener('click',function(){
   resolveQuestion(quest);
 });
  
 let selectedQuestionIndex = allQuestions.indexOf(selectedQuestion);


 allQuestions[selectedQuestionIndex].answers.forEach(comment=>{
         if(comment.commenter_name!==""&&comment.commenter_answer!==""){
         displayReply(comment);
  } })



 response.addEventListener('click', function(){
   addReply();
 })
}

//resolve question by resolve btn
function resolveQuestion(){

    displayQuestionForm();
    
    let selectedQuestionIndex = allQuestions.indexOf(selectedQuestion);
    allQuestions.splice(selectedQuestionIndex,1);
    localStorage.setItem(QUESTIONS,JSON.stringify(allQuestions));

    questionPart.innerHTML="";

    createList();

}



//adding reply in right side by response btn
function addReply(){
   let commenter_name = commenter.value;
   let commenter_answer = commenter_response.value;

   var answer = {
     commenter_name:commenter_name,
     commenter_answer:commenter_answer
   }


   var selectedQuestionIndex = allQuestions.indexOf(selectedQuestion);
   allQuestions[selectedQuestionIndex].answers.push(answer);
   localStorage.setItem(QUESTIONS,JSON.stringify(allQuestions));

    
    answer_comment.innerHTML="";
    
    allQuestions[selectedQuestionIndex].answers.forEach(comment=>{
       if(comment.commenter_name!==""&&comment.commenter_answer!==""){
         displayReply(comment);
  }
    })

   
    

    commenter.value="";
    commenter_response.value="";
     
    setSubmit();
}

//helper function to show reply in div on right side
function displayReply(comment){

  let container = document.createElement("div");
  let title = document.createElement("h3");
  let description = document.createElement("p");

  title.innerHTML = comment.commenter_name;
  description.innerHTML = comment.commenter_answer;

  container.classList.add("question_container");

  container.appendChild(title);
  container.appendChild(description);

  answer_comment.appendChild(container); 
  
   
}







