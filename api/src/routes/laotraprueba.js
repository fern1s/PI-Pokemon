const allApi = async () =>{
    console.log("entré")
    
    //const list = await call.json();
    //console.log(list)
   
    // const arrayApi = await list.data.results.map(async elemento => {
    //     console.log("entré al map")
    //    let details = await axios.get(`${elemento.url}`);
    //     return {
    //         id: details.data.id,
    //         name: details.data.name,
    //         types: details.data.types,
    //         image: details.data.sprites.other.dream_world.front_default,
    //     }
       
    //    });
    //    Promise.all(arrayApi)
    //    .then((a) => {console.log("hola",a);
    //     return a})
    //    console.log("array", arrayApi);
    // return arrayApi;
    const list = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`);
    const resultados = list.data.results;
    let rawData= []
    await resultados.forEach(async (elemento) =>{
        let detalles = await axios.get(`${elemento.url}`);
        rawData.push(detalles.data)
    })
    let selectedData =  rawData.map((el) =>{
        return {
                    id: el.id,
                    name: el.name,
                    types: el.types,
                    image: el.sprites.other.dream_world.front_default,
                }
    })
    const algo = await Promise.all(selectedData)
    return algo;
    
}

const allDb = async () =>{
    return await Pokemon.findAll()
}

const allPokemons = async () =>{
    const apiData = await allApi();
    const dbData = await allDb();
    // Promise.all([apiData, dbData])
    // .then(resp =>{
    //     console.log("algo", resp);
    //     let [apiData, dbData] = resp;
    //     return [apiData, dbData];
    // })
    const total = apiData.concat(dbData);
    return total;
}
router.get("/pokemons", async (req, res) => {
    let allPokes = await allPokemons();
    if(req.query.name){
        const { name } = req.query;
        let specificPoke = allPokes.filter((el) => {el.name.toLowerCase() === name.toLowerCase()})
        if(specificPoke.length > 0){
            res.status(200).send(specificPoke)
        } else res.send(404).send("No se encontró un pokemon con ese nombre :c")
    } else {
       res.status(200).send(allPokes); 
    }
})