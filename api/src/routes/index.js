const { Router } = require('express');
//const Pokemon = require('../models/Pokemon.js');
const { Pokemon, Type } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", async (req, res) => {
    if(req.query.name){
        const { name } = req.query;
        const consult = await Pokemon.findOne({ where: { name: `${name}` } });
        if(consult){
            return res.json(consult)
        }
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if(result){
            return res.json(result)
        } else{
            res.send("No se encontró un pokemon con ese nombre :c")
        }
    }
    else{
 const list = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40`)
 let response = [];
list.results.forEach(elemento => {
    let detalle = await fetch(`${elemento.url}`);
    let obj = {
        id: detalle.id,
        name: detalle.name,
        types: detalle.types,
        image: detalle.sprites.other.dream_world.front_default,
    }
    response.push(obj)
 });
res.json(response);
 
 }});

 router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    if(id>= 3000){
        let poke = await Pokemon.findByPk(id);
        return res.json(poke);
    } else{
        let poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let obj = {
            id: poke.id,
            name: poke.name,
            types: poke.types,
            image: poke.sprites.other.dream_world.front_default,
            height: poke.height,
            weight: poke.weight,
            hp: poke.stats[0].base_stat,
            attack: poke.stats[1].base_stat,
            defense: poke.stats[2].base_stat,
            speed: poke.stats[5].base_stat,
        };
        res.json(obj)
    }
 })

 router.post("/pokemons", async (req, res) =>{
    const { pokemon } = req.body;
    try{
        await Pokemon.create(pokemon)
        res.send("Pokemon creado con éxito")
    }
    catch(e){
        res.send("Algo salió mal");
    }
 })

 router.get("/types", async (req, res) => {
/*Si la flag=true, debe cargar los tipos en la DB. Puedo llamar esta ruta con la flag en true en la landing page
para cargar los datos en la base, y luego en el form simplemente usar esta misma ruta con flag=false,
para traer los tipos desde la base (sin que intente volver a crearlos en la db y toda la cosa)*/
    if(req.query.flag){
        let consult = await Type.findAll()
        if(consult.length === 0){
            const types = await fetch(`https://pokeapi.co/api/v2/type`); 
            types.results.forEach(el => {
            await Type.create(el.name);
        })   
    } 
    return res.send("Éxito");      
}   
    let response = await Type.findAll()
    res.json(response);
 })

 


module.exports = router;
