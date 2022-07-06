
export default function filterByType(array, type){
const aux = [];

for(let i=0; i<array.length; i++){
    for(let j = 0; j<array[i].types.length; j++){
        if(array[i].types[j].name === type){
            aux.push(array[i])
        }
    }
}
return aux;
}

//pokemon.types[0].name