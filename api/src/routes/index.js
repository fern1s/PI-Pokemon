//const { Router } = require('express');
const express = require('express');
//const Pokemon = require('../models/Pokemon.js');
const { Pokemon, Type } = require("../db.js");
const fetch = require("node-fetch"); //lo instalé e importé yo para que ande el fetch
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

router.get("/pokemons", async (req, res) => {
    if(req.query.name){
        const { name } = req.query;
        const consult = await Pokemon.findOne({ where: { name: `${name}` } });
        if(consult){    //me fijo si el poke está en la DB
            return res.json(consult)
        }
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokeparsed = await result.json();
        if(pokeparsed){ //me fijo si el pokemon está en la api
            let obj = {
                id: pokeparsed.id,
                name: pokeparsed.name,
                types: pokeparsed.types,
                image: pokeparsed.sprites.other.dream_world.front_default,
            }
            return res.json(obj)
        } else{
            res.send("No se encontró un pokemon con ese nombre :c")
        }
    }
    else{
 const call = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40`)
 const list = await call.json();
 //console.log(list)

 const arrayResponse = await list.results.map(async elemento => {
    let pokeUrl = await fetch(`${elemento.url}`);
    let details = await pokeUrl.json()
    let obj = {
        id: details.id,
        name: details.name,
        types: details.types,
        image: details.sprites.other.dream_world.front_default,
    }
    return obj;
    });
    Promise.all(arrayResponse)
    .then(a => {res.json(a)})

 }});



 router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    if(id>= 3000){
        let poke = await Pokemon.findByPk(id);
        return res.json(poke);
    } else{
        let call = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let poke = await call.json();
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
    console.log("body", req.body);
    const { name } = req.body;
    try{
        await Pokemon.create({name: name})
        //.then(a => {res.send("Pokemon creado con éxito")})
        res.send("Pokemon creado con éxito")
    }
    catch(e){
        console.log(e)
        res.send("Algo salió mal");
    }
 })

 router.get("/types", async (req, res) => {
/*Si la flag=true, debe cargar los tipos en la DB. Puedo llamar esta ruta con la flag en true en la landing page
para cargar los datos en la base, y luego en el form simplemente usar esta misma ruta con flag=false,
para traer los tipos desde la base (sin que intente volver a crearlos en la db y toda la cosa)*/
    if(req.query.flag){
        console.log(req.query);
        let consult = await Type.findAll()
        if(consult.length === 0){
            const call = await fetch(`https://pokeapi.co/api/v2/type`);
            const types = await call.json(); 
            console.log(types.results);
            let valores = []
            types.results.forEach(e => {
                let obj = {
                    name: e.name
                }
                valores.push(obj);
            })
            await Type.bulkCreate(valores);
            return res.send("Éxito")  
    }
    return res.send("nada")     
}   
    let response = await Type.findAll()
    res.json(response);
 })

 


module.exports = router;
