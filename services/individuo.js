

class Individuo {
    constructor(valor) {
        this.fenotipo = parseInt(valor);
        this.genotipo = false;
        this.fitness = false;
        this.nBits = 8;
    
    }

    calculaGenotipo() {
        
        var divisao = this.fenotipo;
        var arr = [];


      /*   if (this.fenotipo > 31)
            return false; */
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

    /* fitnessCalc() {
        this.fitness = Math.pow(this.fenotipo, 2);
        return this.fitness;

    } */
    fitnessCalc(dataset){
        var soma = 0;
        var h = 0.5;
        //Math.pi
        for (let i = 0; i < dataset.int.length; i++)
        {
            let x = (this.fenotipo - dataset.int[i])/h;
           // soma += x;
            soma += (1/(Math.sqrt(2*Math.PI)))*Math.exp(-Math.pow(x,2)/2);
        }
        this.fitness = soma / (dataset.int.length * h)
    }

}
//var a = new Individuo( 2, 3);
module.exports = { Individuo };