/* ==========================================
   SCREEN NAVIGATION
========================================== */
const screens = document.querySelectorAll(".screen");





/* ==========================================
   BUTTONS
========================================== */

const startBtn = document.getElementById("startBtn");

const aboutBtn = document.getElementById("aboutBtn");

const howBtn = document.getElementById("howBtn");

const backBtns = document.querySelectorAll(".backBtn");


/* ==========================================
   LOGIN PAGE
========================================== */

startBtn.addEventListener("click",()=>{

    showScreen("login-page");

});

const beginBtn=document.getElementById("beginBtn");

beginBtn.addEventListener("click", () => {

    const input = document.getElementById("codenameInput");

    let codename = input.value.trim();

    if (codename === "") {

        codename = "Guest";

    }

    const player = {

        codename: codename,

        rank: "Rookie Investigator",

        xp: 0,

        level: 1,

        casesSolved: 0,

        accuracy: 0,

        unlockedCases: 1,

        badges: [],

        completedCases: []

    };

    localStorage.setItem("player", JSON.stringify(player));

    startLoading();

});

aboutBtn.addEventListener("click",()=>{

    showScreen("about-page");

});


howBtn.addEventListener("click",()=>{

    showScreen("how-page");

});


backBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        showScreen("landing-page");

    });

});

/* ==========================================
   LOADING 
========================================== */

const percent =
    document.getElementById("loadingPercent");

const access =
    document.getElementById("accessGranted");

access.classList.remove("show");

function startLoading(){

const player = JSON.parse(localStorage.getItem("player"));
const codename = player ? player.codename : "Guest";

    showScreen("loading-page");

    const lines=[

        document.getElementById("line1"),
        document.getElementById("line2"),
        document.getElementById("line3"),
        document.getElementById("line4"),
        document.getElementById("line5"),
        document.getElementById("line6"),
        document.getElementById("line7")

    ];

    const messages=[

        "> Initializing AI Detection Engine...",

        "✓ Complete",

        "> Loading Investigator Profile...",

        "✓ Complete",

        `> Authenticating Agent...\n
        
        ✓ Welcome, AGENT ${codename.toUpperCase()}`,

        "> Launching Mission Control...",

        "> Mission Control Ready..."

    ];

    lines.forEach(line=>{

        line.textContent="";

        line.classList.remove("show");

    });

    const bar=document.getElementById("loadingProgress");

    bar.style.width="0%";

    messages.forEach((text,index)=>{

        setTimeout(()=>{

            lines[index].textContent=text;

            lines[index].classList.add("show");

        },index*500);

    });

    let progress=0;

    const interval=setInterval(()=>{

        progress++;

            bar.style.width = progress + "%";

            percent.textContent = progress + "%";

     if(progress >= 100){

    clearInterval(interval);

    access.classList.add("show");

   setTimeout(()=>{

    loadPlayer();

    showScreen("dashboard-page");

},1000);

}

},30);

}


/* ==========================================
   DASHBOARD
========================================== */

const case1Btn = document.getElementById("case1Btn");
const startCaseBtn = document.getElementById("startCaseBtn");
const backDashboardBtn = document.querySelector(".backDashboardBtn");

case1Btn.addEventListener("click", () => {

    showScreen("case-briefing-page");

});

backDashboardBtn.addEventListener("click", () => {

    showScreen("dashboard-page");

});

function loadDashboard() {

    const player = JSON.parse(localStorage.getItem("player"));

    if (!player) return;

    document.getElementById("playerName").textContent =
        "AGENT " + player.codename.toUpperCase();

    document.getElementById("xpText").textContent =
        `${player.xp} / 200 XP`;

    document.getElementById("xpFill").style.width =
        `${player.xp / 2}%`;

    document.getElementById("playerBadge").textContent =
        player.badges.length
            ? player.badges.join(", ")
            : "No Badges Yet";

    document.getElementById("case01Status").textContent =
        player.completedCases.includes(1)
            ? "✔ Completed"
            : "Available";

}

/* ==========================================
   INVESTIGATION PAGE//CORE FEATURE
========================================== */

startCaseBtn.addEventListener("click", () => {

    showScreen("investigation-page");

});

/* ==========================================
   CODENAME STORAGE
========================================== */


    function loadPlayer() {

    const player = JSON.parse(localStorage.getItem("player"));

    if (!player) return;

    document.getElementById("playerName").textContent =
        "AGENT " + player.codename.toUpperCase();

}

/* ==========================================
   Investigator Note Page
========================================== */

const reportNextBtn = document.getElementById("reportNextBtn");

reportNextBtn.addEventListener("click", () => {
     loadInvestigatorNote();
    showScreen("investigator-note-page");

});

const noteNextBtn = document.getElementById("noteNextBtn");

noteNextBtn.addEventListener("click", () => {

    loadMissionReward();
    showScreen("mission-reward-page");

});


const currentCase = CASES[0];

console.log(currentCase.forensicAnalysis);

const submitVerdictBtn = document.getElementById("submitVerdictBtn");

submitVerdictBtn.addEventListener("click", () => {

    if (playerAnswer === "") {

        alert("Please select either REAL or FAKE.");

        return;

    }

    loadInvestigationReport();

    showScreen("investigation-report-page");

});


const fakeBtn = document.getElementById("fakeBtn");
const realBtn = document.getElementById("realBtn");

let playerAnswer = "";

realBtn.addEventListener("click", () => {

    playerAnswer = "Real";

    realBtn.classList.add("verdict-selected");
    fakeBtn.classList.remove("verdict-selected");

});

fakeBtn.addEventListener("click", () => {

    playerAnswer = "Fake";

    fakeBtn.classList.add("verdict-selected");
    realBtn.classList.remove("verdict-selected");

});

function loadInvestigationReport() {

    const currentCase = CASES.find(
    c => c.id === 1
);

    document.querySelector(".case-title").textContent =
        `CASE 01: ${currentCase.title}`;

    document.getElementById("caseConclusion").textContent =
        currentCase.answer;

    document.getElementById("playerFinding").textContent =
        playerAnswer;

    //-------------------------------------------------
    // Forensic Analysis
    //-------------------------------------------------

    const indicatorList =
        document.getElementById("analysisIndicators");

    const descriptionBox =
        document.getElementById("analysisDescriptions");

    indicatorList.innerHTML = "";

    descriptionBox.innerHTML = "";

    currentCase.forensicAnalysis.forEach(item => {

        indicatorList.innerHTML +=
        `<li>✓ ${item.indicator}</li>`;

        descriptionBox.innerHTML +=
        `<p>${item.explanation}</p>`;

    });

    //-------------------------------------------------
    // Summary
    //-------------------------------------------------

    document.getElementById("analysisSummary").textContent =
        currentCase.summary;


}

 //-------------------------------------------------
    // Investigator Note and Mission Reward
    //-------------------------------------------------

function loadInvestigatorNote() {

    console.log("Loading Investigator Note");
    const currentCase = CASES[0];
    console.log(currentCase);
    document.getElementById("skillLearned").textContent =
        currentCase.skillLearned;
    document.getElementById("investigatorNote").textContent =
        currentCase.investigatorNote;
}

function loadMissionReward() {

    let player = JSON.parse(localStorage.getItem("player"));

    if (!player) return;

    const currentCase = CASES[0];

    // Prevent duplicate rewards
    if (!player.completedCases.includes(currentCase.id)) {

        player.xp += currentCase.xp;

        player.completedCases.push(currentCase.id);

        if (!player.badges.includes("Truth Seeker")) {

            player.badges.push("Truth Seeker");

        }

        localStorage.setItem(
            "player",
            JSON.stringify(player)
        );

    }

    document.getElementById("rewardXP").textContent =
        `+${currentCase.xp} XP Earned`;

    document.getElementById("rewardAccuracy").textContent =
        `Accuracy: ${currentCase.accuracy}%`;

    document.getElementById("rewardBadge").textContent =
        "Truth Seeker Progress +1";

}

function showScreen(screenId) {

    screens.forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const target = document.getElementById(screenId);

    if (!target) {
        console.error(`Screen "${screenId}" was not found.`);
        return;
    }

    target.classList.add("active-screen");
}


const returnDashboardBtn =
    document.getElementById("returnDashboardBtn");

returnDashboardBtn.addEventListener("click", () => {

    loadDashboard();
    showScreen("dashboard-page");

});

