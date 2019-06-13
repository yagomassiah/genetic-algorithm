

class Individuo {
    constructor(valor) {
        this.fenotipo = valor;
        this.genotipo =  false;
        this.fitness = false;
        //this.fitness = Individuo.fitnessCalc()
      //  this.fitness =  this.fitnessCalc();
    }

    calculaGenotipo() {
        if(this.fenotipo > 31)
            return false;
        if(this.fenotipo == 0)
            {
                this.genotipo =  [0 , 0, 0, 0, 0];
                return arr;
            }
        var divisao = this.fenotipo;
        var arr = [];
        if(divisao == 1){
            arr.unshift(1);
        }
         while (divisao != 1){
             arr.unshift(divisao%2);
             divisao = parseInt(divisao/2);
             console.log(divisao); 
             if(divisao == 1){
               
                arr.unshift(1);
             }
         } 

         if(arr.length < 5)
            {
                while(arr.length<5)
                    arr.unshift(0);
            }
        this.genotipo = arr;
        return arr;
    }

    fitnessCalc(){
         this.fitness = this.fenotipo/ 31;
        return this.fitness;

    }

}
//var a = new Individuo( 2, 3);
module.exports = {Individuo};