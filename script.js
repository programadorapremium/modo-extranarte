const activarBtn = document.getElementById("activarBtn");
const galeria = document.getElementById("galeria");
const musica = document.getElementById("musica");
const mainText = document.getElementById("typewriter-main");
const cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const particlesContainer = document.querySelector(".particles-container");

let current = 0;
let modoActivo = false;

/* FRASE PRINCIPAL */
const textoPrincipal =
"Te extraño más de lo que imaginé posible... pero incluso lejos, mi corazón siempre vuelve a ti 💖";

function escribirTexto(elemento, texto, velocidad=40){
    let i=0;
    function escribir(){
        if(i<texto.length){
            elemento.textContent+=texto.charAt(i);
            i++;
            setTimeout(escribir,velocidad);
        }
    }
    escribir();
}

/* SLIDER */
function mostrarCard(index){
    cards.forEach(card=>{
        card.classList.remove("active");
        card.querySelector(".typewriter-img").textContent="";
    });

    cards[index].classList.add("active");
    escribirTexto(
        cards[index].querySelector(".typewriter-img"),
        cards[index].getAttribute("data-text"),
        50
    );
}

nextBtn.addEventListener("click",()=>{
    current=(current+1)%cards.length;
    mostrarCard(current);
});

prevBtn.addEventListener("click",()=>{
    current=(current-1+cards.length)%cards.length;
    mostrarCard(current);
});

/* PARTICULAS */
function crearParticula(){
    if(!modoActivo) return; // ← Esto evita que haya partículas antes del click

    const particle=document.createElement("div");
    particle.classList.add("particle");

    const emojis=["❤️"];

    particle.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];
    particle.style.left=Math.random()*100+"vw";
    particle.style.fontSize=Math.random()*25+15+"px";
    particle.style.animationDuration=Math.random()*4+4+"s";

    particlesContainer.appendChild(particle);
    setTimeout(()=>particle.remove(),8000);
}

setInterval(crearParticula,300);

/* ACTIVAR */
activarBtn.addEventListener("click",()=>{

    modoActivo=true;

    document.body.style.backgroundImage=
    "url('assets/img/fondo2.avif')";

    activarBtn.style.marginTop="20px";

    mainText.textContent="";
    escribirTexto(mainText,textoPrincipal);

    galeria.classList.remove("hidden");
    musica.play();
    mostrarCard(current);
});