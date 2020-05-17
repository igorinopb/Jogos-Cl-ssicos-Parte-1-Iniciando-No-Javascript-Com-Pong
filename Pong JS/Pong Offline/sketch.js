//variáveis da bolinha
let xBolinha = 300
let yBolinha = 200
let diametroBolinha = 25
let raio = diametroBolinha / 2

//velocidade da bolinha
let velocidadeXBolinha = 6
let velocidadeYBolinha = 5

//variáveis da raquete
let larguraRaquete = 20
let alturaRaquete = 75
let xRaquete = -larguraRaquete / 2
let yRaquete = 200 - alturaRaquete / 2

//variáveis do oponente
let xRaqueteOponente = 600 - larguraRaquete / 2
let yRaqueteOponente = yRaquete
let velocidadeYOponente
let chanceDeErrar = 0;

// let colidiu = 0

//placar do jogo
let meusPontos = 0
let pontosDoOponente = 0

//sons do jogo
let raquetada
let ponto
let trilha

function preload() {
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400)
  trilha.loop()

}

function draw() {
  background(240);
  mostraBolinha()
  movimentaBolinha()
  marcaPonto()
  verificaColisaoBorda()
  mostraRaquete(xRaquete, yRaquete)
  movimentaMinhaRaquete()
  //verificaColisaoRaquete(xRaquete, yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaqueteOponente()
  //verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
  incluiPlacar()
  verificaColisaoRaquete()

}

function mostraBolinha() {
  let corBolinha = color(0)
  fill(corBolinha)
  noStroke()
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function verificaColisaoBorda() {

  if (xBolinha + raio > width || xBolinha - raio <= 0) {
    xBolinha = 300
    yBolinha = 200
    velocidadeXBolinha *= -1
    ponto.play()
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x, y) {
  let corRaquete = color(0)
  fill(corRaquete)
  noStroke()
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10
    if (yRaquete <= 0) {
      yRaquete += 10
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10
    if (yRaquete + alturaRaquete >= height) {
      yRaquete -= 10
    }
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete || xBolinha + raio > xRaqueteOponente && yBolinha - raio < yRaqueteOponente + alturaRaquete && yBolinha + raio > yRaqueteOponente) {
    velocidadeXBolinha *= -1
    if(velocidadeXBolinha < 8 && velocidadeYBolinha < 8){
      velocidadeXBolinha *= 1.01
      velocidadeYBolinha *= 1.01
    }
    raquetada.play()
  }
}

// function verificaColisaoRaquete(x,y){
//   colidiu = collideRectCircle(x,y,larguraRaquete,alturaRaquete,xBolinha,yBolinha,raio);
//   if(colidiu){
//     velocidadeXBolinha *= -1
//     velocidadeXBolinha += -0.2
//     raquetada.play()
//   }
// }

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 60
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar() {
  textSize(16)
  textAlign(CENTER)
  fill(color(50, 50, 255))

  stroke(0)
  rect(150, 34, 40, 20)
  noStroke()

  fill(255)
  text(meusPontos, 170, 50)
  fill(color(50, 50, 255))

  stroke(0)
  rect(450, 34, 40, 20)
  noStroke()

  fill(255)
  text(pontosDoOponente, 470, 50)
  textSize(20)
  fill(0)
  text("Velocidade da bolinha:", 300, 20)
  text(round(abs(velocidadeYBolinha)), 420, 20)
}

function marcaPonto() {
  if (xBolinha >= 600 - raio) {
    meusPontos++
  }
  if (xBolinha - raio <= 0) {
    pontosDoOponente++
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}













