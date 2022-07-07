export default function validateInput(input){
    let errors = {}
    console.log(input)
    if(!input.name) errors.name = "A name is required"
    if(!/^[a-zA-Z\s]*$/g.test(input.name)) errors.name = "Only letters allowed"
    if(input.name.length > 20) errors.name = "Name must be 20 characters or less"

    if(!input.hp) errors.hp = "Give some Hp to your Pokemon!"
    if(!/^[0-9]*$/.test(input.hp)) errors.hp = "Only numbers allowed"
    if(input.hp > 400 || input.hp < 1) errors.hp = "Hp must be between 1 and 400"

    if(!input.attack) errors.attack = "Give some Attack to your Pokemon!"
    if(!/^[0-9]*$/.test(input.attack)) errors.attack = "Only numbers allowed"
    if(input.attack > 700) errors.attack = "Your Pokemon is too powerfull!"
    if(input.attack < 1) errors.attack = "Give some Attack to your Pokemon!"

    if(!input.defense) errors.defense = "Give some Defense to your Pokemon!"
    if(!/^[0-9]*$/.test(input.defense)) errors.defense = "Only numbers allowed"
    if(input.defense > 700 || input.defense < 1) errors.defense = "Defense must be between 1 and 700"

    if(!input.speed) errors.speed = "Where's the Speed?"
    if(!/^[0-9]*$/.test(input.speed)) errors.speed = "Only numbers allowed"
    if(input.speed > 600 || input.speed < 1) errors.speed = "Speed must be between 1 and 600"

    if(!input.height) errors.height = "Give a height to your Pokemon"
    if(!/^[0-9]*$/.test(input.height)) errors.height = "Only numbers allowed"
    if(input.height > 1000 || input.height < 1) errors.height = "Height must be between 1 and 1000"

    if(!input.weight) errors.weight = "Give some weight to your Pokemon"
    if(!/^[0-9]*$/.test(input.weight)) errors.weight = "Only numbers allowed"
    if(input.weight > 1000 || input.weight < 1) errors.weight = "Weight must be between 1 and 1000"

    if(input.types.length === 0) errors.types = "Must have at least 1 type"
    
    


    return errors
}















