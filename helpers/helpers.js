module.exports = {

    calculaFenotipo(Nbits, genotipo) {
        var maxValue = Math.pow(2, Nbits - 1);
        var soma = 0; 

        for(var i=0; i< genotipo.length; i++)
        {
            if(genotipo[i] ==1){
                soma+=maxValue;
            }
            maxValue= parseInt( maxValue /2);
        }
        return soma;
    
    }

}