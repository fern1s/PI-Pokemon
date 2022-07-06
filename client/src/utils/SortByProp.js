export default function sortByProp(array, orden){
    if(orden === "az" || orden === "za"){
        if(orden === "az"){
            array.sort((a, b) =>{
                if(a.name > b.name){
                    return 1
                }
                if(a.name < b.name){
                    return -1
                }
                return 0;
            })
        } else{
            array.sort((a, b) =>{
                if(a.name > b.name){ //si no funca fijarse con a[`${name}`]
                    return -1
                }
                if(a.name < b.name){
                    return 1
                }
                return 0;
            }) 
        }
    } else if(orden === "hat" || orden === "lat"){
        if(orden === "lat"){
            array.sort((a, b) =>{
                if(a.attack > b.attack){
                    return 1
                }
                if(a.attack < b.attack){
                    return -1
                }
                return 0;
            })
        } else{
            array.sort((a, b) =>{
                if(a.attack > b.attack){ //si no funca fijarse con a[`${prop}`]
                    return -1
                }
                if(a.attack < b.attack){
                    return 1
                }
                return 0;
            }) 
        }  
    } return array;
}