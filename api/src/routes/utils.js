function niveladorType(array){
    if(array.length > 1){
        array = [array[0].type, array[1].type]
        return array;
    } else {
        array = [array[0].type]
        return array;
    }
}
module.exports = niveladorType;

/*"types": [
            {
                "slot": 1,
                "type": {
                    "name": "grass",
                    "url": "https://pokeapi.co/api/v2/type/12/"
                }
            },
            {
                "slot": 2,
                "type": {
                    "name": "poison",
                    "url": "https://pokeapi.co/api/v2/type/4/"
                }
            }
        ]*/