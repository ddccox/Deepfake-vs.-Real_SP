let player = JSON.parse(localStorage.getItem("player"));

if (!player) {

    player = {

        codename: "Guest",

        rank: "Rookie Investigator",

        xp: 0,

        level: 1,

        casesSolved: 0,

        unlockedCases: 1,

        badges: []

    };

}

function updatePlayerUI() {

    const player = JSON.parse(localStorage.getItem("player"));

    if (!player) return;

    const MAX_XP = 200;

    document.getElementById("playerCodename").textContent =
        player.codename;

    document.getElementById("xpText").textContent =
        `${player.xp} / ${MAX_XP} XP`;

    document.getElementById("xpFill").style.width =
        `${(player.xp / MAX_XP) * 100}%`;

    document.getElementById("playerBadge").textContent =
        player.badges.length
            ? player.badges.join(", ")
            : "No Badges Yet";

}