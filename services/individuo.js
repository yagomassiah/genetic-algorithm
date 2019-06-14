

class Individuo {
    constructor(valor) {
        this.fenotipo = parseInt(valor);
        this.genotipo = false;
        this.fitness = false;
        //this.fitness = Individuo.fitnessCalc()
        //  this.fitness =  this.fitnessCalc();
        this.nBits = 5;
    5
    }

    calculaGenotipo() {
        
        var divisao = this.fenotipo;
        var arr = [];


        if (this.fenotipo > 31)
            return false;
        if (this.fenotipo == 0) {
            this.genotipo = [];
            while (this.genotipo.length < this.nBits) {
                this.genotipo.unshift(0);
            }

            return this.genotipo;
        }
       
        if (divisao == 1) {
            this.genotipo = [];
            this.genotipo.unshift(1);
            while (this.genotipo.length < this.nBits) {
                this.genotipo.unshift(0);
            }
            return this.genotipo;
        }
        while (divisao != 1) {
            arr.unshift(divisao % 2);
            divisao = parseInt(divisao / 2);
            console.log(divisao);
            if (divisao == 1) {

                arr.unshift(1);

            }
           
        }

        if (arr.length < this.nBits) {
            while (arr.length < this.nBits)
                arr.unshift(0);
        }
        this.genotipo = arr;
        return arr;
    }

    fitnessCalc() {
        this.fitness = this.fenotipo / 31;
        return this.fitness;

    }


}
//var a = new Individuo( 2, 3);
module.exports = { Individuo };