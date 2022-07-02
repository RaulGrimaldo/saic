module.exports = {
    splitIdnombrepersona: function (datospersona) {
        
        let idpersona = "N/A";
        let nombrepersona = "N/A";
        if(datospersona){
            let DatosSplit = datospersona.split(",")
            idpersona = DatosSplit[0];
            nombrepersona = DatosSplit[1];
        } 
        



        return [idpersona, nombrepersona];
    },

};
