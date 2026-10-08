const screens =
    [...document.querySelectorAll(".screen")];

let idx = 0;

const history = [];

const song =
    document.getElementById("song");


/* ================= SCREEN CHANGE ================= */

function show(name, push = true){

    const next =
        screens.find(
            s => s.dataset.name === name
        );

    if(!next) return;

    const current =
        screens[idx];

    if(
        push &&
        current &&
        current.dataset.name !== name
    ){

        history.push(
            current.dataset.name
        );

    }

    screens.forEach(
        s => s.classList.remove("active")
    );

    next.classList.add("active");

    idx =
        screens.indexOf(next);
}


/* ================= BACK ================= */

function goBack(){

    if(history.length){

        const previous =
            history.pop();

        show(
            previous,
            false
        );

    }

    else{

        show(
            "opening",
            false
        );

    }

}


/* ================= MUSIC ================= */

function startMusic(){

    song.currentTime = 0;

    song.play().catch(
        () => {}
    );

}


window.addEventListener(
    "pagehide",
    () => {

        song.pause();

        song.currentTime = 0;

    }
);


window.addEventListener(
    "beforeunload",
    () => {

        song.pause();

        song.currentTime = 0;

    }
);


/* ================= CONFETTI ================= */

function confetti(n = 45){

    for(
        let i = 0;
        i < n;
        i++
    ){

        const e =
            document.createElement("i");

        e.className =
            "confetti";

        e.style.left =
            Math.random() * 100 + "%";

        e.style.background =
            `hsl(${Math.random()*330+20},90%,70%)`;

        e.style.animationDuration =
            (3 + Math.random()*4) + "s";

        e.style.animationDelay =
            Math.random()*1.2 + "s";

        document
            .getElementById("bg")
            .appendChild(e);

        setTimeout(
            () => e.remove(),
            8000
        );

    }

}


confetti(40);


/* ================= OPENING ================= */

const env =
    document.getElementById("envelope");


document
    .getElementById("openGift")
    .onclick = () => {

        env.classList.add("open");

        startMusic();

        setTimeout(
            () => show("birthday"),
            850
        );

    };


/* ================= BIRTHDAY ================= */

document
    .getElementById("toBalloons")
    .onclick = () => {

        buildBalloons();

        show("balloons");

    };


/* ================= BALLOONS ================= */

function buildBalloons(){

    const area =
        document.getElementById(
            "balloonArea"
        );

    area.innerHTML = "";

    let count = 0;

    const colors = [

        "#ff477c",
        "#d65cff",
        "#ff6eae",
        "#f73869",
        "#a85cff",
        "#ff8db8",
        "#f02f61",
        "#c84cff"

    ];


    for(
        let i = 0;
        i < 9;
        i++
    ){

        const balloon =
            document.createElement("div");

        balloon.className =
            "balloon";

        balloon.style.setProperty(
            "--c",
            colors[
                i % colors.length
            ]
        );


        /* RANDOM POSITION */

        balloon.style.left =
            (5 + Math.random()*85)
            + "%";

        balloon.style.top =
            (5 + Math.random()*78)
            + "%";


        balloon.style.animationDelay =
            (i * .15) + "s";

        balloon.style.zIndex =
            "50";


        balloon.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                event.stopPropagation();


                if(
                    balloon.classList
                    .contains("pop")
                ){

                    return;

                }


                balloon.classList.add(
                    "pop"
                );


                count++;

                confetti(10);


                if(count === 9){

                    document
                        .getElementById(
                            "balloonHint"
                        )
                        .textContent =
                        "Beautiful! ✨";


                    setTimeout(
                        () => show("cake"),
                        650
                    );

                }

            }
        );


        area.appendChild(
            balloon
        );

    }

}


/* ================= CAKE ================= */

const cake =
    document.getElementById(
        "cake"
    );

const cakeBtn =
    document.getElementById(
        "cakeBtn"
    );


let blown = false;

let cut = false;


cakeBtn.onclick = () => {


    /* FIRST CLICK */

    if(!blown){

        blown = true;

        document
            .querySelector(
                "#cake .flame"
            )
            .style.display =
            "none";


        document
            .getElementById(
                "cakeHint"
            )
            .textContent =
            "Candle blown! 🎉 Now cut the cake!";


        cakeBtn.textContent =
            "CUT CAKE";

    }


    /* SECOND CLICK */

    else if(!cut){

        cut = true;

        cake.classList.add(
            "cut"
        );

        confetti(35);


        document
            .getElementById(
                "cakeHint"
            )
            .textContent =
            "Cake cut! 🎂 Enjoy your special moment!";


        cakeBtn.textContent =
            "CONTINUE";

    }


    /* THIRD CLICK */

    else{

        show("choice");

    }

};


/* ================= CHOICE ================= */

document
    .getElementById("noBtn")
    .onclick = () => {

        document
            .getElementById(
                "choiceMsg"
            )
            .textContent =
            "No? Try again 😌";


        document
            .getElementById(
                "noBtn"
            )
            .style.transform =
            `translateX(${Math.random()*80-40}px)`;

    };


document
    .getElementById("yesBtn")
    .onclick = () => {

        document
            .getElementById(
                "choiceMsg"
            )
            .textContent =
            "Correct! May our connection stay magical forever! ✨";


        setTimeout(
            () => show("gifts"),
            1000
        );

    };


/* ================================================= */
/*                  MYSTERY GIFTS                    */
/* ================================================= */

const giftButtons =
    document.querySelectorAll(
        ".gift"
    );

const giftMessage =
    document.getElementById(
        "giftMessage"
    );

const giftContinue =
    document.getElementById(
        "giftContinue"
    );


giftButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {


                /* GET DIFFERENT MESSAGE */

                const message =
                    button.dataset.message;


                /* SHOW MESSAGE */

                giftMessage.textContent =
                    message;


                /* SELECTED EFFECT */

                giftButtons.forEach(
                    gift =>
                        gift.classList
                            .remove(
                                "selected"
                            )
                );


                button.classList.add(
                    "selected"
                );


                /* CONFETTI */

                confetti(22);


                /* SHOW CONTINUE */

                giftContinue
                    .classList
                    .remove(
                        "hidden"
                    );

            }
        );

    }
);


/* CONTINUE AFTER GIFT */

giftContinue.onclick = () => {

    show("scratch");

    initScratch();

};


/* ================= SCRATCH CARD ================= */

let scratchReady = false;


function initScratch(){

    if(scratchReady)
        return;


    scratchReady = true;


    const canvas =
        document.getElementById(
            "scratch"
        );


    const box =
        canvas.getBoundingClientRect();


    const d =
        window.devicePixelRatio || 1;


    canvas.width =
        box.width * d;


    canvas.height =
        box.height * d;


    const ctx =
        canvas.getContext("2d");


    ctx.scale(d,d);


    ctx.fillStyle =
        "#cfae2b";


    ctx.fillRect(
        0,
        0,
        box.width,
        box.height
    );


    ctx.fillStyle =
        "#f1d25a";


    ctx.font =
        "700 24px Cormorant Garamond";


    ctx.textAlign =
        "center";


    ctx.fillText(
        "Scratch here",
        box.width/2,
        box.height/2
    );


    let down = false;

    let removed = 0;


    function erase(event){

        if(!down)
            return;


        const rect =
            canvas.getBoundingClientRect();


        const point =
            event.touches
                ? event.touches[0]
                : event;


        ctx.globalCompositeOperation =
            "destination-out";


        ctx.beginPath();


        ctx.arc(
            point.clientX - rect.left,
            point.clientY - rect.top,
            28,
            0,
            Math.PI * 2
        );


        ctx.fill();


        removed++;


        if(removed > 60){

            canvas.style.opacity =
                ".15";


            document
                .getElementById(
                    "afterScratch"
                )
                .classList
                .remove(
                    "hidden"
                );

        }

    }


    canvas.onpointerdown =
        () => down = true;


    canvas.onpointerup =
        () => down = false;


    canvas.onpointerleave =
        () => down = false;


    canvas.onpointermove =
        erase;


    canvas.ontouchstart =
        event => {

            down = true;

            erase(event);

        };


    canvas.ontouchmove =
        erase;


    canvas.ontouchend =
        () => down = false;

}


/* ================= AFTER SCRATCH ================= */

document
    .getElementById(
        "afterScratch"
    )
    .onclick = () => {

        show("vault");

    };


/* ================= SECRET VAULT ================= */

document
    .getElementById(
        "unlock"
    )
    .onclick = () => {


        const value =
            document
                .getElementById(
                    "pass"
                )
                .value
                .trim()
                .toLowerCase();


        if(

            value === "dadu" ||

            value === "love" ||

            value === "youandi" ||

            value === "you and i"

        ){

            show("secret");

        }

        else{

            document
                .getElementById(
                    "vaultHint"
                )
                .textContent =
                "Try the special pass-key 💗";

        }

    };


/* ================= ALL BACK BUTTONS ================= */

document
    .querySelectorAll(
        ".back-btn"
    )
    .forEach(
        button => {

            button.onclick =
                goBack;

        }
    );