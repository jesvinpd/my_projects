const question=[
    {
        question: "What is the capital of France?",
        answer: [
            {
                text: "Paris",
                correct: true
            },
            {
                text: "London",
                correct: false
            },
            {
                text: "Berlin",
                correct: false
            },
            {
                text: "Rome",
                correct: false
            }
        ]
    },
    {
        question: "What is the capital of Germany?",
        answer: [
            {
                text: "Paris",
                correct: false
            },
            {
                text: "London",
                correct: false
            },
            {
                text: "Berlin",
                correct: true
            },
            {
                text: "Rome",
                correct: false
            }
        ]
    },
    {
        question: "What is the capital of Italy?",
        answer:[
            {
                text: "Paris",
                correct: false
            },
            {
                text: "London",
                correct: false
            },
            {
                text: "Berlin",
                correct: false
            },
            {
                text: "Rome",
                correct: true
            }
        ]
    }

]
const questionElement = document.getElementById("question");
const answerBtnsElement = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextBtn.innerHTML="Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    
    currentQuestion.answer.forEach((answer)=>{
        let answerBtn=document.createElement('button')
        answerBtn.innerHTML=answer.text
        answerBtn.classList.add("btn");
        answerBtnsElement.appendChild(answerBtn);
        if(answer.correct===true){
            answerBtn.dataset.correct = answer.correct;//stored in dataset as 'true' not true, becuase dataset is an attribute
        }
        answerBtn.addEventListener('click',selectAnswer);
    })
}
function resetState(){
    answerBtnsElement.innerHTML="";
    nextBtn.style.display='none'
}

function selectAnswer(e){
    let selectedBtn=e.target;
    if(selectedBtn.dataset.correct==='true'){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerBtnsElement.children).forEach((btn)=>{
        if(btn.dataset.correct==="true"){
            btn.classList.add('correct')
        }
        btn.disabled=true;
    });
    nextBtn.style.display="block";

}
nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex<question.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
function endState(){
    resetState();
    nextBtn.style.display='block';
    nextBtn.innerHTML = "Play Again";
    questionElement.innerHTML = `You scored ${score} out of ${question.length}`;
}
function handleNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
      showQuestion();
    } else {
      endState();
    } 
}
startQuiz();
