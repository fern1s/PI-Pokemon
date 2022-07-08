//const { Router } = require('express');
const express = require('express');
//const Pokemon = require('../models/Pokemon.js');
const { Pokemon, Type } = require("../db.js");
const axios = require("axios")
const niveladorType = require("./utils")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

 router.get("/pokemons", async (req, res) => { //acordate de prender la base de datos 
    if(req.query.name){
        try{
        const { name } = req.query;
        const consult = await Pokemon.findOne({ where: { name: `${name.toLowerCase()}` }, include:{model: Type} });
        if(consult){    //me fijo si el poke está en la DB
            return res.send([consult])
        } 
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if(result){ //me fijo si el pokemon está en la api
            let obj = {
                id: result.data.id,
                name: result.data.name,
                attack: result.data.stats[1].base_stat,
                types: niveladorType(result.data.types),
                image: result.data.sprites.other.dream_world.front_default,
            }
            return res.send([obj])
        }
        } catch(e){res.send([])}
    }
    else{
        try { 
            const list = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`) 
            const arrayResponse = await list.data.results.map(async elemento => {
               let details = await axios.get(`${elemento.url}`);
               
               let obj = {
                   id: details.data.id,
                   name: details.data.name,
                   attack: details.data.stats[1].base_stat,
                   types: niveladorType(details.data.types),
                   image: details.data.sprites.other.dream_world.front_default,
               }
               return obj;
               });
               const allApi = await Promise.all(arrayResponse);
               const allDb = await Pokemon.findAll({ include:{model: Type} });
               const total = allApi.concat(allDb);
               res.status(200).send(total);
        }
        catch(e){res.status(400).send("Algo salió mal. " + e)}

 }});

 


 router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    try{
        if(id>= 3000){
            let poke = await Pokemon.findByPk(id, {include:{model: Type}});
            return res.json(poke);
        } else{
            let call = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            //let poke = await call.json();
            let obj = {
                id: call.data.id,
                name: call.data.name,
                types: niveladorType(call.data.types),
                image: call.data.sprites.other.dream_world.front_default,
                height: call.data.height,
                weight: call.data.weight,
                hp: call.data.stats[0].base_stat,
                attack: call.data.stats[1].base_stat,
                defense: call.data.stats[2].base_stat,
                speed: call.data.stats[5].base_stat,
            };
            res.send(obj)
        }
    
    }
    catch(e){
        console.log(e)
        res.send("Algo salió mal al pedir este pokemon. " + e)
        }
   
 })

 router.post("/pokemons", async (req, res) =>{
    //console.log("body", req.body);
    const { name } = req.body;
    try{
        let createdPokemon = await Pokemon.create({ //guardar esto en una variable y mandarlo en res send. lo hago luego de lo otro por las dudas
            name: name.toLowerCase(), 
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            speed: req.body.speed,
            height: req.body.height,
            weight: req.body.weight
        })
        if(req.body.types.length > 1){
            let type1 = await Type.findOne({ where: { name: `${req.body.types[0].name}` } })
            let type2 = await Type.findOne({ where: { name: `${req.body.types[1].name}` } })
            await createdPokemon.addType(type1)
            await createdPokemon.addType(type2)
        } else {
            let type1 = await Type.findOne({ where: { name: `${req.body.types[0].name}` } })
            await createdPokemon.addType(type1)  
        }
        
        res.send("Pokemon creado con éxito " + createdPokemon)
    }
    catch(e){
        console.log(e)
        res.send("Algo salió mal al crear el pokemon. " + e);
    }
 })

 router.get("/types", async (req, res) => {
/*Si la flag=true, debe cargar los tipos en la DB. Puedo llamar esta ruta con la flag en true en la landing page
para cargar los datos en la base, y luego en el form simplemente usar esta misma ruta con flag=false,
para traer los tipos desde la base (sin que intente volver a crearlos en la db y toda la cosa)*/
    try{
    if(req.query.flag){
        console.log(req.query);
        let consult = await Type.findAll()
        if(consult.length === 0){
            const call = await axios.get(`https://pokeapi.co/api/v2/type`);
             
            //console.log(types.results);
            let valores = [{id: 0, name:"all"}]
            call.data.results.forEach(e => {
                let obj = {
                    name: e.name
                }
                valores.push(obj);
            })
            await Type.bulkCreate(valores);
            console.log("Carga2");
            //return res.send("Éxito al cargar los tipos en la DB");  
    }
    //return res.send("Tipos ya cargados")     
}   
    let response = await Type.findAll()
    res.json(response);
}
catch(e){res.status(400).send("Error al cargar los Tipos. " + e)}
})


 


module.exports = router;
