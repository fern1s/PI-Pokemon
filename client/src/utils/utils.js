export default function filterByType(array, type){
const aux = [];

for(let i=0; i<array.length; i++){
    for(let j = 0; j<array[i].types.length; j++){
        if(array[i].types[j].type.name === type){
            aux.push(array[i])
        }
    }
}
console.log(aux);
return aux;
}