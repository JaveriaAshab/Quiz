const startbutton = document.querySelector(".start");
const infobox = document.querySelector(".infobox");
const exitbtn = infobox.querySelector(".buttons .quit");
const continuebtn = infobox.querySelector(".buttons .restart");
const quizbox = document.querySelector(".quizbox");
const optionlist = document.querySelector(".optionlist");
const timeCount = quizbox.querySelector(".timer .timersec");
const TimeLine = quizbox.querySelector(".time-line");
const TimeOver = quizbox.querySelector(".timetext");

startbutton.onclick = ()=>{
    infobox.classList.add("activeInfo");
}
exitbtn.onclick = ()=>{
    infobox.classList.remove("activeInfo");
}
continuebtn.onclick = ()=>{
    infobox.classList.remove("activeInfo");
    quizbox.classList.add("activeQuiz");
    ShowQuestions(0);
    QueCounter(1);
    startTimer(30);
    startTimerLine(0);
}

let timeValue = 30;
let questionCount = 0;
let questionNumber = 1;
let counter;
let counterLine;
let widthValue = 0;
let userScore = 0;

const resultBox = document.querySelector(".resultbox");
const restartquiz = resultBox.querySelector(".buttons .restart");
const quitquiz = resultBox.querySelector(".buttons .quit");

restartquiz.onclick= ()=>{
    quizbox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    timeValue = 30;
    questionCount = 0;
    questionNumber = 1;
    widthValue = 0;
    userScore = 0;
    ShowQuestions(questionCount);
    QueCounter(questionNumber);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(0);
    nextbtn.style.display = "none";
    TimeOver.textContent = "Time Left";
}

quitquiz.onclick = () =>{
    window.location.reload();
}

const nextbtn = document.querySelector(".nextbtn");
const bottomQuesCounter = quizbox.querySelector(".totalques");

nextbtn.onclick = ()=>{
    if(questionCount < questions.length - 1){
        questionCount++;
        questionNumber++;
        ShowQuestions(questionCount);
        QueCounter(questionNumber);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        nextbtn.style.display = "none";
        TimeOver.textContent = "Time Left";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

function ShowQuestions(index){
    const que_text = document.querySelector(".que-text");
    let que_tag = '<span>'+questions[index].numb + ". " + questions[index].question +'</span>';
    let opt_tag = '<div class="options">'+ questions[index].options[0] +'<span></span></div>'
                  + '<div class="options">'+ questions[index].options[1] +'<span></span></div>'
                  + '<div class="options">'+ questions[index].options[2] +'<span></span></div>'
                  + '<div class="options">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    optionlist.innerHTML = opt_tag;
    const option = optionlist.querySelectorAll(".options");
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent; 
    let CorrectAns = questions[questionCount].answer;
    let alloptions = optionlist.children.length;
    if(userAns == CorrectAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        console.log("Answer is correct");
        console.log("Your correct answers = " + userScore);
    }
    else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        console.log("Answer is incorrect");
        for (i = 0; i < alloptions; i++) {
            if(optionlist.children[i].textContent == CorrectAns){
                optionlist.children[i].setAttribute("class", "options correct");
                optionlist.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    for (let i = 0; i < alloptions; i++) {
        optionlist.children[i].classList.add("disabled");
    }
    nextbtn.style.display = "block";
}

function showResultBox(){
    infobox.classList.remove("activeInfo");
    quizbox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".scoretext");
    if(userScore > 3){
        let scoreTag = '<span>Congrats, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> questions right.</span>'
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>Well, You only got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> questions right.</span>'
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>You lack GK & got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> questions right.</span>'
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addzero = timeCount.textContent;
            timeCount.textContent = "0" + addzero;
        }
        if(time < 0){
            clearInterval(counter);
            // timeCount.textContent = "00";
            TimeOver.textContent = "Time Over";

            let CorrectAns = questions[questionCount].answer;
            let alloptions = optionlist.children.length;

            for (let i = 0; i < alloptions; i++) {
                if(optionlist.children[i].textContent == CorrectAns){
                    optionlist.children[i].setAttribute("class", "options correct");
                    optionlist.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < alloptions; i++) {
                optionlist.children[i].classList.add("disabled");
            }
            nextbtn.style.display = "block";
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 58);
    function timer(){
        time += 1;
        TimeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function QueCounter(index){
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottomQuesCounter.innerHTML  = totalQuesCountTag;
}