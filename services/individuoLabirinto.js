5;
class individuoLabirinto {
  constructor(vetorPosicoes, encruzilhadas, matriz, posicaoVitoriosa) {
    this.fenotipo = this.copiaArrayDuplo(matriz);
    this.genotipo = this.copiaArrayDuplo(vetorPosicoes);
    this.labirinto = this.copiaArrayDuplo(matriz);
    this.encruzilhadas = this.copiaArrayDuplo(encruzilhadas);
    this.posicaoVitoriosa = this.copiaArraySimples(posicaoVitoriosa);
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
    let ultElemento = this.genotipo[this.genotipo.length - 1];

    this.fenotipo[ultElemento[0]][ultElemento[1]] = 5;

    return true;
  }
  calculaVitoria() {
    if (
      this.genotipo[this.genotipo.length - 1][0] == this.posicaoVitoriosa[0] &&
      this.genotipo[this.genotipo.length - 1][1] == this.posicaoVitoriosa[1]
    ) {
      this.finaliza = true;
    } else {
      this.finaliza = false;
    }
  }
  calculaEncruzilhadas() {
    let encruzilhadas = [];
    this.genotipo.forEach(posicao => {
      let celulasDisponiveis = this.checaVizinhanca(posicao, this.fenotipo);

      if (celulasDisponiveis.length >= 1) {
        encruzilhadas.push(this.copiaArraySimples(posicao));
      }
    });
    this.encruzilhadas = encruzilhadas;
  }
  fitnessCalc() {
    this.calculaVitoria();
    if (this.finaliza) {
      this.fitness = this.labirinto.length * this.labirinto[0].length;
      this.fitness = this.fitness - this.genotipo.length;
    } else {
   /*    let x1 = this.genotipo[this.genotipo.length - 1][0];
      let y1 = this.genotipo[this.genotipo.length - 1][1];
      let distancia = Math.abs(
        x1 - this.posicaoVitoriosa[0] + (y1 - this.posicaoVitoriosa[1])
      );

      this.fitness = 1/ distancia; */
      this.fitness = this.genotipo.length;
    }
  }

  copiaArraySimples(arr) {
    let novoArray = [];
    arr.forEach(element => {
      novoArray.push(element);
    });

    return novoArray;
  }

  copiaArrayDuplo(arr) {
    let novoArray = [];
    arr.forEach(element => {
      let elementoInterno = [];
      element.forEach(element2 => {
        elementoInterno.push(element2);
      });
      novoArray.push(elementoInterno);
    });

    return novoArray;
  }
  printLab(matriz) {
    console.log("-------------------------");
    for (let i = 0; i < matriz.length; i++) {
      let linha = "";
      for (let j = 0; j < matriz[0].length; j++) {
        if (matriz[i][j] == 1) {
          linha = linha + "\x1b[31m" + matriz[i][j];
        } else if (matriz[i][j] == 4) {
          linha = linha + "\x1b[32m" + matriz[i][j];
        } else if (matriz[i][j] == 5) {
          linha = linha + "\x1b[33m" + matriz[i][j];
        } else if (matriz[i][j] == 0) {
          linha = linha + "\x1b[37m" + matriz[i][j];
        } else if (matriz[i][j] == 3) {
          linha = linha + "\x1b[36m" + matriz[i][j];
        }
      }

      console.log(linha);
    }
  }

  checaVizinhanca(posicao, matriz) {
    let linha = posicao[0];
    let coluna = posicao[1];
    let disponiveis = [];
    let saida = [];
    if (typeof matriz[linha - 1] != "undefined") {
      if (matriz[linha - 1][coluna] == 0 || matriz[linha - 1][coluna] == 3) {
        if (matriz[linha - 1][coluna] == 3) {
          saida.push([linha - 1, coluna]);
        }

        disponiveis.push([linha - 1, coluna]);
      }
    }
    if (typeof matriz[linha + 1] != "undefined") {
      if (matriz[linha + 1][coluna] == 0 || matriz[linha + 1][coluna] == 3) {
        if (matriz[linha + 1][coluna] == 3) {
          saida.push([linha + 1, coluna]);
        }

        disponiveis.push([linha + 1, coluna]);
      }
    }
    if (typeof matriz[linha][coluna - 1] != "undefined") {
      if (matriz[linha][coluna - 1] == 0 || matriz[linha][coluna - 1] == 3) {
        if (matriz[linha][coluna - 1] == 3) {
          saida.push([linha, coluna - 1]);
        }

        disponiveis.push([linha, coluna - 1]);
      }
    }

    if (typeof matriz[linha][coluna + 1] != "undefined") {
      if (matriz[linha][coluna + 1] == 0 || matriz[linha][coluna + 1] == 3) {
        if (matriz[linha][coluna + 1] == 3) {
          saida.push([linha, coluna + 1]);
        }

        disponiveis.push([linha, coluna + 1]);
      }
    }
    if (saida.length > 0) return saida;
    else return disponiveis;
  }
}
//var a = new Individuo(  2, 3);
module.exports = { individuoLabirinto };
