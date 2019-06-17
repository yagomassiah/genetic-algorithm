

class IndividuoMulti {
    constructor(valor, dimensoes) {
        this.fenotipo = parseInt(valor);
        this.genotipo = false;
        this.fitness = false;
        this.nBits = 8;
    
    }

    calculaGenotipo() {
        
        var divisao = this.fenotipo;
        var arr = [];

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

 
    fitnessCalc(dataset){
        var soma = 0;
        var h = 0.5;
        
        for (let i = 0; i < dataset.int.length; i++)
        {
            let x = (this.fenotipo - dataset.int[i])/h;
      
            soma += (1/(Math.sqrt(2*Math.PI)))*Math.exp(-Math.pow(x,2)/2);
        }
        this.fitness = soma / (dataset.int.length * h)
    }

}

module.exports = { IndividuoMulti};