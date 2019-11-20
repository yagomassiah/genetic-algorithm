const helpers = require("../helpers/helpers");
class individuoLabirinto {
  constructor(vetorPosicoes, encruzilhadas, matriz) {
    this.fenotipo = helpers.copiaArrayDuplo(matriz);
    this.genotipo = helpers.copiaArrayDuplo(vetorPosicoes);
    this.labirinto = helpers.copiaArrayDuplo(matriz);
    this.encruzilhadas = helpers.copiaArrayDuplo(encruzilhadas);
    this.finaliza = false;
    this.fitness = 0;
    this.nBits = 7;
  }

  calculaGenotipo() {
   
    return false;
  }
  calculaFenotipo() {
    this.genotipo.forEach(element => {
      this.fenotipo[element[0]][element[1]] = 4;
    });
    let ultElemento = this.genotipo[this.genotipo.length-1];

    this.fenotipo[ultElemento[0]][ultElemento[1]] = 5;
    
    console.log("esse é o fenótipo: ");
    helpers.printLab(this.fenotipo);
    return true;
  }
  calculaVitoria(){
    let posicaoVencedora;
    for(let i = 0; i < this.labirinto.length; i++){
      for(let j= 0; j< this.labirinto[0].length; j++){
        if(this.labirinto[i][j] == 3){
          posicaoVencedora = [i,j];
        }
      }
    }
    let posicaoAtual; 
    for(let i = 0; i < this.fenotipo.length; i++){
      for(let j= 0; j< this.fenotipo[0].length; j++){
        if(this.fenotipo[i][j] == 5){
          posicaoAtual = [i,j];
        }
      }
    }
    if((posicaoAtual[0] == posicaoVencedora[0]) && (posicaoAtual[1] == posicaoVencedora[1]) ){
      console.log("é vencedor!");
      this.finaliza = true;
    }
  }
  fitnessCalc() {
    this.calculaVitoria();
    if (this.finaliza) this.fitness = 100;
    this.fitness= this.fitness - this.genotipo.length;
  }
}
//var a = new Individuo(  2, 3);
module.exports = { individuoLabirinto };
