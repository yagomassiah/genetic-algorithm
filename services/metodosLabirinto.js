const helpers = require("../helpers/helpers");
const { Individuo } = require("./individuo");
const { generalIndividual } = require("./generalIndividual");
const { individuoLabirinto } = require("./individuoLabirinto");
module.exports = {
  torneio(populacao, numVencedores, k) {
    /* populacao.sort(function (a, b) {
            return a.fitness - b.fitness
        }); */

    var selecionados = [];

    // CONSERTAR O INDICE AQUI CARAIO
    while (selecionados.length < numVencedores) {
      let competidores = [];
      while (competidores.length < k) {
        let indice = Math.floor(Math.random() * populacao.length);
        competidores.push(populacao[indice]);
      }
      var res = Math.max.apply(
        Math,
        competidores.map(function(o) {
          return o.fitness;
        })
      );
      var vencedor = competidores.find(function(o) {
        return o.fitness == res;
      });

      selecionados.push(vencedor);
      competidores = [];
    }

    /*  var ret = {
      vencedores: selecionados
    }; */
    return selecionados;
  },

  crossover(par, chanceDeCross) {
    var sorteio = Math.random();
    // sorteio = 0.8;
    if (sorteio >= chanceDeCross) {
      var tamanho = par[0].genotipo.length - 1;
      console.log("Tamanho: " + tamanho);
      var indice = Math.floor(Math.random() * tamanho);
      console.log("indice: " + indice);

      var filho1 = [];
      for (var i = 0; i < indice; i++) {
        filho1.push(par[0].genotipo[i]);
      }
      i = indice;
      for (i; i < par[0].genotipo.length; i++) {
        filho1.push(par[1].genotipo[i]);
      }

      var filho2 = [];
      for (var k = 0; k < indice; k++) {
        filho2.push(par[1].genotipo[k]);
      }
      k = indice;
      for (k; k < par[0].genotipo.length; k++) {
        filho2.push(par[0].genotipo[k]);
      }

      var individuo1 = new Individuo(
        helpers.calculaFenotipo(par[0].nBits, filho1)
      );
      var individuo2 = new Individuo(
        helpers.calculaFenotipo(par[0].nBits, filho2)
      );
      individuo1.calculaGenotipo();
      individuo2.calculaGenotipo();
      var obj = {
        pais: [par[0], par[1]],
        filhos: [individuo1, individuo2],
        indice: indice
      };
      var ret = [individuo1, individuo2];
      return ret;
    } else {
      return par;
    }
  },
  crossover2(par, chanceDeCross) {
    let sorteio = Math.random();

   /*  console.log("cross individuo 0 : ");
    helpers.printLab(par[0].fenotipo);
    console.log("cross individuo 1 : ");
    helpers.printLab(par[1].fenotipo);
 */
    if (sorteio >= chanceDeCross) {
      let encruzilhadasEmComum = [];

      for (let i = 0; i < par[0].encruzilhadas.length; i++) {
        let element1 = par[0].encruzilhadas[i];
        for (let k = 0; k < par[1].encruzilhadas.length; k++) {
          let element2 = par[1].encruzilhadas[k];
          if (element1[0] == element2[0] && element1[1] == element2[1]) {
            let IndiceEm1;
            let IndiceEm2;
            for (let m = 0; m < par[0].genotipo.length; m++) {
              const elementM = par[0].genotipo[m];
              if (element1[0] == elementM[0] && element1[1] == elementM[1]) {
                IndiceEm1 = m;
              }
            }
            for (let n = 0; n < par[0].genotipo.length; n++) {
              const elementN = par[0].genotipo[n];
              if (element2[0] == elementN[0] && element2[1] == elementN[1]) {
                IndiceEm2 = n;
              }
            }
            let obj = {
              posicao: element1,
              indiceNo1: IndiceEm1,
              indiceNo2: IndiceEm2
            };
            encruzilhadasEmComum.push(obj);
          }
        }
      }
      let indice = Math.floor(Math.random() * encruzilhadasEmComum.length);
      let encruzilhadaSelecionada = encruzilhadasEmComum[indice];
      let novoGenotipo1 = helpers.copiaArrayDuplo(par[0].genotipo);
      novoGenotipo1 = novoGenotipo1.slice(
        0,
        encruzilhadaSelecionada.indiceNo1 + 1
      );
      let trecho2 = helpers.copiaArrayDuplo(par[1].genotipo);
      trecho2 = trecho2.slice(
        encruzilhadaSelecionada.indiceNo2 + 1,
        par[1].genotipo.length
      );

      let Genotipo1 = novoGenotipo1.concat(trecho2);

      let novoGenotipo2 = helpers.copiaArrayDuplo(par[1].genotipo);
      novoGenotipo2 = novoGenotipo2.slice(
        0,
        encruzilhadaSelecionada.indiceNo2 + 1
      );
      let trecho1 = helpers.copiaArrayDuplo(par[0].genotipo);
      trecho1 = trecho1.slice(
        encruzilhadaSelecionada.indiceNo1 + 1,
        par[0].genotipo.length
      );

      let Genotipo2 = novoGenotipo2.concat(trecho1);
      console.log(Genotipo2);

      let novoIndividuo1 = new individuoLabirinto(
        Genotipo1,
        [[]],
        par[0].labirinto
      );

      let novoIndividuo2 = new individuoLabirinto(
        Genotipo2,
        [[]],
        par[0].labirinto
      );
      novoIndividuo1.calculaFenotipo();
      novoIndividuo2.calculaFenotipo();
      novoIndividuo1.calculaEncruzilhadas();
      novoIndividuo2.calculaEncruzilhadas();

    /*   console.log("cross resultado 1: ");
      helpers.printLab(novoIndividuo1.fenotipo);
      console.log("cross resultado 2 : ");
      helpers.printLab(novoIndividuo2.fenotipo); */
      return [novoIndividuo1, novoIndividuo2];
    } else {
      return par;
    }
  },

  selecionaPares(individuos) {
    var naoPareados = individuos;
    var indiceSorteado = Math.floor(Math.random() * (naoPareados.length - 1));
    var selecionados = [];
    var k = 0;
    while (naoPareados.length > 0) {
      selecionados[k] = [];
      selecionados[k].push(naoPareados[indiceSorteado]);
      naoPareados.splice(indiceSorteado, 1);
      indiceSorteado = Math.floor(Math.random() * (naoPareados.length - 1));
      selecionados[k].push(naoPareados[indiceSorteado]);
      naoPareados.splice(indiceSorteado, 1);

      k++;
    }
    return selecionados;
  },

  mutation(individuo, rateOfMutation) {
    var sorteio;
    var newGenotipo = individuo.genotipo;
    for (var i = 0; i < newGenotipo.length; i++) {
      sorteio = Math.random();
      if (sorteio > rateOfMutation) {
        if (newGenotipo[i] == 1) {
          newGenotipo[i] = 0;
        } else if (newGenotipo[i] == 0) {
          newGenotipo[i] = 1;
        }
      }
    }
    var fenotipo = helpers.calculaFenotipo(individuo.nBits, newGenotipo);
    var individuoMutado = new Individuo(fenotipo);
    individuoMutado.calculaGenotipo();

    return individuoMutado;
  },
  mutation2(individuo, rateOfMutation) {
      let sorteio = Math.random();
   // let sorteio = 0.7;
    let newGenotipo = helpers.copiaArrayDuplo(individuo.genotipo);
    let encruzilhadas = helpers.copiaArrayDuplo(individuo.encruzilhadas);

    if (sorteio >= rateOfMutation) {
      let indice = Math.floor(Math.random() * encruzilhadas.length);
      let encruzilhadaSelecionada = encruzilhadas[indice];
      let indiceNoGenotipo;
      for (let i = 0; i < newGenotipo.length; i++) {
        const element = newGenotipo[i];
        if (
          element[0] == encruzilhadaSelecionada[0] &&
          element[1] == encruzilhadaSelecionada[1]
        ) {
          indiceNoGenotipo = i;
          break;
        }
      }
      newGenotipo = newGenotipo.slice(0, indiceNoGenotipo +1);
      let newIndividuo = new individuoLabirinto(newGenotipo, [[]], individuo.labirinto);
      newIndividuo.calculaFenotipo();
      let newCaminho = helpers.geradorDeIndividuo(newIndividuo.fenotipo, encruzilhadaSelecionada).genotipo;
      newCaminho.shift();
      newGenotipo =newGenotipo.concat(newCaminho);
      let finalIndividuo = new individuoLabirinto(newGenotipo, [[]], individuo.labirinto);
      finalIndividuo.calculaFenotipo();
      finalIndividuo.calculaEncruzilhadas();
      finalIndividuo.fitnessCalc();
      console.log(newGenotipo);
      return finalIndividuo;
    }else {
      return individuo;
    }

    //  var newGenotipo = individuo.genotipo;
    for (let i = 0; i < encruzilhadas.length; i++) {
      sorteio = Math.random();
      if (sorteio > rateOfMutation) {
        for (let j = 0; j < newGenotipo.length; j++) {
          const element = newGenotipo[j];
        }
        /* 
        if (newGenotipo[i] == 1) {
          newGenotipo[i] = 0;
        } else if (newGenotipo[i] == 0) {
          newGenotipo[i] = 1;
        } */
      }
    }
    var fenotipo = helpers.calculaFenotipo(individuo.nBits, newGenotipo);
    var individuoMutado = new generalIndividual(fenotipo);
    individuoMutado.calculaGenotipo();

    return individuoMutado;
  },

  copiaIndividuo(individuo) {
    let newIndividuo = new individuoLabirinto(
      helpers.copiaArrayDuplo(
        individuo.genotipo,
        individuo.encruzilhadas,
        individuo.labirinto
      )
    );
    newIndividuo.calculaFenotipo();
    newIndividuo.fitnessCalc();

    return newIndividuo;
  }
};
