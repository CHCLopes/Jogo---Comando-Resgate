document.getElementById('som').innerHTML = "DESLIGADO";
var somLigado = false;
var musicaInicial = document.getElementById("musicaInicio");
var btnClick = document.getElementById("btnClick");
var telaInicial = {};
var inicio = true;
var dificuldade = 1;
var velocidade = 3;
var displayDificuldade = document.getElementById("displayDificuldade");

displayDificuldade.innerHTML = dificuldade;

function dificuldadeAumenta(){
  if (document.getElementById("aumentar").click){
    dificuldade++;
    velocidade++;
    displayDificuldade.innerHTML = dificuldade;
  }
}

function dificuldadeDiminui (){
  if (document.getElementById("diminuir").click){
    dificuldade--;
    velocidade--;
    displayDificuldade.innerHTML = dificuldade;
    if (dificuldade < 1) {
      dificuldade++;
      displayDificuldade.innerHTML = dificuldade;
    }
  } 
}

telaInicial.timer = setInterval(loop,30);

function loop() {
  musicainicial();
}

function ligaSom() {
  if (somLigado == false && document.getElementById('som').click){
    somLigado = !somLigado;
    document.getElementById('som').innerHTML = "LIGADO";
    clickBtn();
    } else if (somLigado == true && document.getElementById('som').click){
    somLigado = !somLigado;
    document.getElementById('som').innerHTML = "DESLIGADO";
    }
}

function clickBtn(){
  if(somLigado == true && document.getElementsByTagName(button).click){
    btnClick.play();
  }

}

function musicainicial(){
  if (somLigado == true && inicio == true){
    musicaInicial.play();
    musicaInicial.addEventListener("ended", function(){ 
    musica.currentTime = 0; musicaInicial.play();
    }, false);
  } else if (somLigado == false || inicio == false){
    musicaInicial.pause();
  }
} 

function start() {
  inicio = !inicio;

  $("#inicio").hide();
  $("#fundoGame").append("<div id = 'jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id = 'inimigo1' class='anima1'></div>");
  $("#fundoGame").append("<div id = 'inimigo2' ></div>");
  $("#fundoGame").append("<div id = 'amigo' class='anima3'></div>");
  $("#fundoGame").append("<div id='placar'></div>");
  $("#fundoGame").append("<div id='energia'></div>");

  var jogo = {};
  var TECLA = {
    W: 87,
    S: 83,
    D: 68
    };
  var pressionou = [];
  var posicaoY = parseInt(Math.random() * 300);
  var podeAtirar = true;
  var fimdejogo = false;
  var pontos = 0;
  var salvos = 0;
  var perdidos = 0;
  var energiaAtual = 3;
  var contaEnergia = 0;
  var maisDificil = 0;
  
  var somDisparo = document.getElementById("somDisparo");
  var somExplosao = document.getElementById("somExplosao");
  var musicaDefundo = document.getElementById("musicaDefundo");
  var somGameover = document.getElementById("somGameover");
  var somPerdido = document.getElementById("somPerdido");
  var somResgate = document.getElementById("somResgate");
  var somResgate2 = document.getElementById("somResgate2");
  var somJogador = document.getElementById("somJogador");
  
  function musicaTema(){
    if (somLigado == true){
      musicaDefundo.addEventListener("ended", function(){ 
      musicaDefundo.currentTime = 0; musicaDefundo.play(); }, false);
      musicaDefundo.play();
    } else if (somLigado == false){
      musicaDefundo.pause();
    }
  }
  
  function helicoptero1(){
    if (somLigado == true){
      somJogador.addEventListener("ended", function(){ 
      somJogador.currentTime = 0; somJogador.play(); }, false);
      somJogador.play();
    } else if (somLigado == false){
      somJogador.pause();
    }
  }

  $(document).keydown(function(e){
    pressionou[e.which] = true;});
  
  $(document).keyup(function(e){
    pressionou[e.which] = false;});
	
  jogo.timer = setInterval(loop,30);

  function loop() {
    musicaTema();
    movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();
    placar();
    ganharEnergia();
    aumentaDificuldade();
    helicoptero1()
    } 

  function placar() {
    $("#placar").html("<h2> DIFICULDADE: " + dificuldade + " " + " |-| Vidas Restantes: " + energiaAtual + " " + " |-| Salvos: " + salvos + " " + " |-| Perdidos: " + perdidos + " " + " |-| Pontos: " + pontos + "</h2>");
  } 
  
  function ganharEnergia() {
    if (contaEnergia == 20) {
    energiaAtual++;
    contaEnergia = contaEnergia - 20;
    }
  }
        
  function aumentaDificuldade() {
    if (maisDificil == 20) {
    dificuldade++;
    velocidade++;
    displayDificuldade.innerHTML = dificuldade;
    maisDificil = maisDificil - 20;
    }
  }

  function movefundo() {
    esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position",esquerda-1); 
  }

  function movejogador() {
    if (pressionou[TECLA.W]) { 
      var topo = parseInt($("#jogador").css("top"));
      $("#jogador").css("top",topo-10);
      if (topo<=30) {		
      $("#jogador").css("top",topo+10);
      }
    } else if (pressionou[TECLA.S]) {
        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top",topo+10);	
        if (topo>=400) {	
        $("#jogador").css("top",topo-10);
        }
      } else if (pressionou[TECLA.D]) {
         disparo();
        };
  }

  function moveinimigo1() {
    helicoptero1();
  	posicaoX = parseInt($("#inimigo1").css("left"));
	  $("#inimigo1").css("left",posicaoX-velocidade);
	  $("#inimigo1").css("top",posicaoY);
	  if (posicaoX<=10) {
      posicaoY = parseInt(Math.random() * 272);
      $("#inimigo1").css("left",870);
      $("#inimigo1").css("top",posicaoY);
    }
  }

  function moveinimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
	  $("#inimigo2").css("left",posicaoX-velocidade+1);
	  if (posicaoX<=10) {
		  $("#inimigo2").css("left",870);
  	}
  }

  function moveamigo() {
    posicaoX = parseInt($("#amigo").css("left"));
	  $("#amigo").css("left",posicaoX+velocidade-2);
	  if (posicaoX >= 1165) {
		  $("#amigo").css("left",70);
	  }
  }

  function disparo() {	
    if (somLigado == true) {
    somDisparo.play();}
	  if (podeAtirar == true) {		
	    podeAtirar = false;	
	    topo = parseInt($("#jogador").css("top"));
	    posicaoX = parseInt($("#jogador").css("left"));
	    tiroX = posicaoX + 190;
	    topoTiro = topo + 37;
	    $("#fundoGame").append("<div id='disparo'></div");
	    $("#disparo").css("top",topoTiro);
	    $("#disparo").css("left",tiroX);
		  var tempoDisparo = window.setInterval(executaDisparo, 30);
	  }

    function executaDisparo() {
      posicaoX = parseInt($("#disparo").css("left"));
      $("#disparo").css("left",posicaoX+30); 
      if (posicaoX > 1130) {          
        window.clearInterval(tempoDisparo);
        tempoDisparo=null;
        $("#disparo").remove();
        podeAtirar=true;      
      }
    }
  }

  function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1")));
    var colisao2 = ($("#jogador").collision($("#inimigo2")));
    var colisao3 = ($("#disparo").collision($("#inimigo1")));
    var colisao4 = ($("#disparo").collision($("#inimigo2")));
    var colisao5 = ($("#jogador").collision($("#amigo")));
    var colisao6 = ($("#inimigo2").collision($("#amigo")));

    if (colisao1.length > 0) {
      var inimigo1X = parseInt($("#inimigo1").css("left"));
      var inimigo1Y = parseInt($("#inimigo1").css("top"));
      explosao1(inimigo1X,inimigo1Y);
      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left",900);
      $("#inimigo1").css("top",posicaoY);
      energiaAtual--;
      if (energiaAtual < 0){
        gameOver();
      }
    };
    
    if (colisao2.length > 0) {
	    inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      explosao2(inimigo2X,inimigo2Y);
      $("#inimigo2").remove();
      reposicionaInimigo2();
      energiaAtual--;
      if (energiaAtual < 0){
        gameOver();
      }
    }	

    function reposicionaInimigo2() {
	    var tempoColisao4=window.setInterval(reposiciona4, 5000);
      function reposiciona4() {
      window.clearInterval(tempoColisao4);
      tempoColisao4=null;
        if (fimdejogo==false) {
            $("#fundoGame").append("<div id=inimigo2></div");
        }
      }	
    }
    if (colisao3.length > 0) {
		  inimigo1X = parseInt($("#inimigo1").css("left"));
      inimigo1Y = parseInt($("#inimigo1").css("top"));
      explosao1(inimigo1X,inimigo1Y);
      $("#disparo").css("left",1200);
      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left",900);
      $("#inimigo1").css("top",posicaoY);
      pontos=pontos+50;
      contaEnergia++;
      maisDificil++;
    }
    if (colisao4.length > 0) {
		  inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      $("#inimigo2").remove();
      explosao2(inimigo2X,inimigo2Y);
      $("#disparo").css("left",1200);
      reposicionaInimigo2();
      pontos=pontos+50;
      contaEnergia++;
      maisDificil++;
    }
    if (colisao5.length > 0) {
      if (somLigado == true) {
        somResgate.play();
        somResgate2.play();
      }
		  reposicionaAmigo();
      $("#amigo").remove();
      pontos=pontos+100;
      salvos++;
      contaEnergia++;
      maisDificil++;
    }
    function reposicionaAmigo() {
	    var tempoAmigo=window.setInterval(reposiciona6, 6000);
      function reposiciona6() {
        window.clearInterval(tempoAmigo);
        tempoAmigo=null;
        if (fimdejogo==false) {
          $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
        }
      }
    }
    if (colisao6.length > 0) {
      if (somLigado == true) {
        somPerdido.play();
       }
	    amigoX = parseInt($("#amigo").css("left"));
      amigoY = parseInt($("#amigo").css("top"));
      explosao3(amigoX,amigoY);
      $("#amigo").remove();
      reposicionaAmigo();
      perdidos++;
      energiaAtual--;
      if (energiaAtual < 0){
        gameOver();
      }
    }
  }

  function explosao3(amigoX,amigoY) {
    $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top",amigoY);
    $("#explosao3").css("left",amigoX);
    var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
    function resetaExplosao3() {
    $("#explosao3").remove();
    window.clearInterval(tempoExplosao3);
    tempoExplosao3=null;
    }
  }

  function explosao1(inimigo1X,inimigo1Y) {
    if (somLigado == true) {
      somExplosao.play();
    }
    $("#fundoGame").append("<div id='explosao1'></div");
    $("#explosao1").css("background-image", "url(assets/styles/imgs/explosao.png)");
      
    var div=$("#explosao1");
      
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({width:200, opacity:0}, "slow");
    var tempoExplosao=window.setInterval(removeExplosao, 1000);
    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao=null;
    }
  }

  function explosao2(inimigo2X,inimigo2Y) {
    if (somLigado == true) {
      somExplosao.play();
    }
	  $("#fundoGame").append("<div id='explosao2'></div");
    $("#explosao2").css("background-image", "url(assets/styles/imgs/explosao.png)");
    var div2=$("#explosao2");
    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({width:200, opacity:0}, "slow");
    var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
    function removeExplosao2() {
      div2.remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2=null;
    }
  }

  function gameOver() {
    fimdejogo = true;
    musicaDefundo.pause();
    somJogador.pause();
    if (somLigado == true) {
      somGameover.play();
    }
  
    window.clearInterval(jogo.timer);
    jogo.timer=null;

    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();

    $("#fundoGame").append("<div id='fim' class='center'></div>");
  
    $("#fim").html("<h1 class ='center'> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<button id='reinicia' onClick='reiniciaJogo()'><h3>Jogar Novamente</h3></button>");

    $("#recorde").append("<h1> Maior Pontuação: " + recorde + "</h1>");

  }
}

function reiniciaJogo() {
  somGameover.pause();
  $("#fim").remove();
  start();
  if (inicio == true){
    inicio = !inicio;
  }
}