var botProd = 0.5;
var botPrice = 100;
var blenderProd = 1;
var blenderPrice = 190;
var rubberCost = 0.4;

// var declarations
const countElem = document.getElementById("count")
var currentCount = Number(document.getElementById("count").innerHTML)
var i;
var money = Number(localStorage.getItem("money"))

// setup script
setup()
update()

function update() {
    document.getElementById("rubberStock").innerHTML = Number(localStorage.getItem("rubberStock"))
    document.getElementById("money").innerHTML = Number(localStorage.getItem("money"))
    document.getElementById("count").innerHTML = Number(localStorage.getItem("count"))
    document.getElementById("botOwned").innerHTML = Number(localStorage.getItem("botCount"))
    document.getElementById("blenderOwned").innerHTML = Number(localStorage.getItem("blenderCount"))
}

function setup() {
    console.log("welcome, make some rubber and have a great day! keep an eye on here because we might make this a competition in the future!")
    document.getElementById("botPrice").innerHTML = botPrice
    document.getElementById("blenderPrice").innerHTML = blenderPrice
    if (!localStorage.getItem("newGame")) {
        localStorage.setItem("newGame", "false")
        localStorage.setItem("money", 10)
        return window.location = "/index.html"
    } else if (localStorage.getItem("newGame") == "true") {
        localStorage.setItem("newGame", "false")
        localStorage.setItem("money", 10)
        return window.location = "/index.html"
    } else {
        return;
    }
}

// keeps the upgrades running
setInterval(function () {
    for (i = 0; i < localStorage.getItem("botCount"); i++) {
        bot()
    }
    for (i = 0; i < localStorage.getItem("blenderCount"); i++) {
        blender()
    }
}, 1000)

// produce rubber bands
function produce(amount, alertOrNo) {
    console.log("cheater")
    if (isNaN(localStorage.getItem("rubberStock"))) {
        localStorage.setItem("rubberStock", 0)
    }
    if (Number(localStorage.getItem("rubberStock")) < amount * 2) {
        if (alertOrNo == 1) {
            return stop("Not enough rubber!");
        }
    } else {
        localStorage.setItem("count", Number(localStorage.getItem("count")) + 1)
        update()
        subtractRubber(amount * 2)
    }
}

// saving/reseting the game
function save(alertOrNo) {
    update()
}

function reset() {
    if (confirm('Press OK to clear your progress.')) {
        localStorage.clear()
        localStorage.setItem("newGame", "true")
        window.location = "/index.html"
    } else {
        alert("Nothing was deleted.")
        save(0)
    }
}

// subtract/add/buy rubber
function subtractRubber(inches) {
    localStorage.setItem("rubberStock", Number(localStorage.getItem("rubberStock")) - inches)
    update()
}

function addRubber(inches) {
    localStorage.setItem("rubberStock", Number(localStorage.getItem("rubberStock")) + inches)
    update()
}

function buy() {
    var amount = prompt("How much rubber should we buy?")
    if (Number(amount) == "" || !amount || isNaN(amount)) {
        return stop("Please input an amount to buy.");
    } else {
        if (!localStorage.getItem("money") || localStorage.getItem("money") < rubberCost * amount) {
            return alert("Not enough money!")
        } else {
            addRubber(Number(amount))
            localStorage.setItem("money", localStorage.getItem("money") - rubberCost * amount)
            update()
        }
    }
}

// bot upgrade
function bot() {
    produce(botProd)
}

function buyBot() {
    update()
    money = Number(localStorage.getItem("money"))
    if (money < botPrice) {
        return stop("Not enough money.")
    } else {
        localStorage.setItem("money", money - botPrice)
        localStorage.setItem("botCount", Number(localStorage.getItem("botCount")) + 1)
    }
}

// blender upgrade
function blender() {
    money = Number(localStorage.getItem("money"))
    produce(blenderProd)
}

function buyBlender() {
    update()
    money = Number(localStorage.getItem("money"))
    if (money < blenderPrice) {
        return stop("Not enough money.");
    } else {
        localStorage.setItem("money", money - blenderPrice)
        localStorage.setItem("blenderCount", Number(localStorage.getItem("blenderCount")) + 1)
    }
}

// alert() but shortened
function stop(message) {
    alert(message)
}

function sell() {
    var amount = Number(document.getElementById("count").innerHTML)
    if (!amount || amount == 0) {
        return alert("Nothing to sell!")
    } else {
        localStorage.setItem("money", Number(localStorage.getItem("money")) + amount * 1)
        localStorage.setItem("count", 0)
        update()
    }
}

var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.getElementById("produce").addEventListener("click", function () {
    produce(1)
});

document.getElementById("buy").addEventListener("click", function () {
    buy()
});

document.getElementById("sell").addEventListener("click", function () {
    sell()
});

document.getElementById("save").addEventListener("click", function () {
    save(0)
});

document.getElementById("reset").addEventListener("click", function () {
    reset()
});

document.getElementById("buyBot").addEventListener("click", function () {
    buyBot()
});

document.getElementById("buyBlender").addEventListener("click", function () {
    buyBlender()
});