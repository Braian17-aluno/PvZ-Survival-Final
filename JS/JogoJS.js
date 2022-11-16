let a
let pontos = 10
let pontuacao = document.querySelector(".pontos");
let contadorW = 0;
let contadorP = 0;
let cont = 0;
let m;
let z;
let n;
let b = 0;
document.querySelector("#atirar").addEventListener("click",()=>{botaoatira()});
document.querySelector("#baixo").addEventListener("click",()=>{move('baixo')});
document.querySelector("#acima").addEventListener("click", ()=>{move('acima')});
document.querySelector("#botaoS").addEventListener("click",()=>{iniciar()});
document.querySelector(".Inst").addEventListener("click",()=>{InstSumir()})

function InstSumir(){
    let Inst = document.querySelector(".Inst")
    Inst.setAttribute("class","Sumir");
}

function iniciar(){
    m = setInterval("moverdireita1()", 15);
    z = setInterval("moverdireita2()", 15);
    n = setInterval("colisao()", 5);
    cont++
    let botaoS = document.querySelector("#botaoS");
    botaoS.parentElement.removeChild(botaoS)
}

// mover inimigos - automático
function moverdireita2(){
    let div2Left= parseInt(getComputedStyle(div2).left);
    let fundoWidth= parseInt(getComputedStyle(fundo).width);
    let div2Width= parseInt(getComputedStyle(div2).width);
    if (fundoWidth >= 915){
        div2.style.left = div2Left +5;
        }
    if (fundoWidth <= 915){
        div2.style.left = div2Left +3;
    }
    if ( div2Left >=  fundoWidth - div2Width){
        clearInterval(z);
        z = setInterval("moveresquerda2()",15);
    }
}
function moveresquerda2(){
    let div2Left= parseInt(getComputedStyle(div2).left);
    let fundoWidth= parseInt(getComputedStyle(fundo).width);
    if (fundoWidth >= 915){
    div2.style.left = div2Left -5;
    }
    if (fundoWidth <= 915){
        div2.style.left = div2Left -3;
        }
    if (div2Left <= 0){
        clearInterval(z);
        z = setInterval("moverdireita2()",15);
        pontos--
        pontuacao.innerHTML="Pontuação: "+pontos
        if(pontos <= 0){
            contadorP++
           reiniciar();
        }
    }
}
function moverdireita1(){
    let div1Left=parseInt(getComputedStyle(div1).left);
    let fundoWidth= parseInt(getComputedStyle(fundo).width);
    let div1Width= parseInt(getComputedStyle(div1).width);
    if(fundoWidth >= 915){
    div1.style.left = div1Left + 5;
    }
    if(fundoWidth <= 915){
        div1.style.left = div1Left + 3;
        }
    if (div1Left >=  fundoWidth - div1Width){
        clearInterval(m);
        m = setInterval ("moveresquerda1()",15);
    }
}
function moveresquerda1(){
    let div1Left= parseInt(getComputedStyle(div1).left);
    let fundoWidth= parseInt(getComputedStyle(fundo).width);
    if(fundoWidth >= 915){
        div1.style.left = div1Left - 5;
        }
        if(fundoWidth <= 915){
            div1.style.left = div1Left - 3;
        }
    if (div1Left <= 0){
        clearInterval(m);
        m = setInterval ("moverdireita1()",15);
        pontos--
        pontuacao.innerHTML="Pontuação: "+pontos
        if(pontos <= 0){
            contadorP++
            reiniciar();
        }
    }
}
function reiniciar(){
    let localS = document.querySelector(".localS")
    localS.innerHTML = "Total de inimigos derrotados: " + localStorage.getItem("Kills");
    remover();
    clearInterval(a);
    clearInterval(n);
    clearInterval(m);
    clearInterval(z);
    let botaoR = document.querySelector(".botaoReplay");
    botaoR.setAttribute("class","aparece");
    if(contadorW>0){
        botaoR.innerHTML="Você venceu! Clique aqui para reiniciar o jogo."
    }
    if(contadorP>0){
        let area = document.querySelector("#area");
        let player = document.querySelector(".player")
        area.removeChild(player)
        botaoR.innerHTML="Você perdeu! Clique aqui para reiniciar o jogo."
    }
    botaoR.addEventListener("click",()=>{
        location.reload();
    })
}
//Player
let player = document.querySelector('.player');
let moveBy = 2;

window.addEventListener('load', () => {
player.style.position = 'relative';
player.style.left = 0;
player.style.top = 0;
localStorage.setItem("Kills", b);
});

window.addEventListener('keydown', (e) => {
    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    let playerTop = parseInt(getComputedStyle(player).top);
    let playerHeight= parseInt(getComputedStyle(player).height);

switch (e.key) {
  case 'w':
  if (playerTop<= 0){
          break;
  }
  player.style.top = parseInt(player.style.top) - moveBy + 'vw';
          break;
  case 's':
  if (playerTop >= fundoHeight  - playerHeight){
          break;
  }
  player.style.top = parseInt(player.style.top) + moveBy + 'vw';
          break;
}

});
let atira = new Audio('../Audio/gunshot.mp3')
let c = 0
window.addEventListener('keyup', (e) => {
    if(pontos > 0 && cont >= 1){
    if (e.key == 'q'){
        if (c == 0){
        atirar();
        c++
        }
        if (c == 1){
            a = setInterval("atirar()",3000)
            c++
        }

    }
}
});

function botaoatira(){
    if(pontos>0 && cont >= 1){
    if (c == 0){
        atirar();
        c++
        }
        if (c == 1){
            a = setInterval("atirar()",3000)
            c++
        }
    }
}
// Mover player  - através dos botões
function move(Direcao) {
    let moveB = 4
    let fundoHeight = parseInt(getComputedStyle(fundo).height);
    let playerTop = parseInt(getComputedStyle(player).top);
    let playerHeight= parseInt(getComputedStyle(player).height);

    switch(Direcao){
        case "acima": 

        if (playerTop<= 0){
            break;
        }
        player.style.top = parseInt(player.style.top) - moveB + 'vw';
        break;

        case "baixo":
    
        if (playerTop >= fundoHeight  - playerHeight){
                break;
        }
        player.style.top = parseInt(player.style.top) + moveB + 'vw';
                break;
    }
}
//Disparar tiros
function atirar(){
    atira.play();
    let top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let tiros = document.querySelector(".tiros");
    let tiro = document.createElement("div");
    tiro.setAttribute("class","tiro");
    tiros.appendChild(tiro);
    setInterval(()=>{
        let tiroLeft = parseInt(getComputedStyle(tiro).left);
        let tiroTop = parseInt(getComputedStyle(tiro).top);
        let div1 = document.querySelector("#div1")
        let div2 = document.querySelector("#div2")
        let div1Left=parseInt(getComputedStyle(div1).left);
        let div2Left= parseInt(getComputedStyle(div2).left);
        let div1Top=parseInt(getComputedStyle(div1).top);
        let div2Top= parseInt(getComputedStyle(div2).top);
        let div2Height= parseInt(getComputedStyle(div2).height);
        let div2Width= parseInt(getComputedStyle(div2).width);
        let div1Height= parseInt(getComputedStyle(div1).height);
        let div1Width= parseInt(getComputedStyle(div1).width);

        if (((tiroLeft >= div1Left)&&(tiroLeft <= div1Left + div1Width))&&
            ((tiroTop >= div1Top)&&(tiroTop <= div1Top + div1Height))){
                para();
        }
        
        if (((tiroLeft >= div2Left)&&(tiroLeft <= div2Left + div2Width))&&
            ((tiroTop >= div2Top)&&(tiroTop <= div2Top + div2Height))){
                para2(); 
        }
        
        let balaDireita = parseInt(window.getComputedStyle(tiro).getPropertyValue("left"));
        tiro.style.top = top +30+"px"
        tiro.style.left = balaDireita + 5
    },1);
    setTimeout("remover()",2000);
    
}

function remover(){
    let tiros = document.querySelector(".tiros");
    tiros.innerHTML=""
}
// Transportar Inimigos e Armazenar Info no localStorage
function para2(){
    pontos+=2
    b++
    localStorage.setItem("Kills",b)
    let div2 = document.querySelector("#div2")
    div2.style.left = Math.floor(Math.random()*50 + 35)+"vw"
    div2.style.top = Math.floor(Math.random()*25 + 1)+"vw"
    pontuacao.innerHTML="Pontuação: " + pontos
    if(pontos >= 20){
        contadorW++
        reiniciar();
    }
   
}
function para(){
    pontos+=2
    b++
    localStorage.setItem("Kills", b)
    let div1 = document.querySelector("#div1")
    div1.style.left = Math.floor(Math.random()*50 + 35)+"vw"
    div1.style.top = Math.floor(Math.random()*25 + 1)+"vw"
    pontuacao.innerHTML="Pontuação: " + pontos
    if(pontos >= 20){
        contadorW++
        reiniciar();
    }
   
}


//Colisão do player com os inimigos
    function colisao(){

    let div1Left= parseInt(getComputedStyle(div1).left);
    let div1Top= parseInt(getComputedStyle(div1).top);
    let div1Height= parseInt(getComputedStyle(div1).height);
    let div1Width= parseInt(getComputedStyle(div1).width);

    let div2Left= parseInt(getComputedStyle(div2).left);
    let div2Top= parseInt(getComputedStyle(div2).top);
    let div2Height= parseInt(getComputedStyle(div2).height);
    let div2Width= parseInt(getComputedStyle(div2).width);

    let playerLeft= parseInt(getComputedStyle(player).left);
    let playerTop = parseInt(getComputedStyle(player).top);
 
        
        if (((playerLeft >= div1Left)&&(playerLeft <= div1Left + div1Width))&&
            ((playerTop >= div1Top)&&(playerTop <= div1Top + div1Height))){
                contadorP++
                reiniciar();
                
        }
        
        if (((playerLeft >= div2Left)&&(playerLeft <= div2Left + div2Width))&&
            ((playerTop >= div2Top)&&(playerTop <= div2Top + div2Height))){
                contadorP++
                reiniciar();
                
            
        }
        

    }
