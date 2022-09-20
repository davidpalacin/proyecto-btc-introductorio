let users = [];
let channels = [];

//AÑADIR NUEVO CANAL A LA LISTA
$("#add-channel").click(func = () => {
    let name_new_channel = prompt("nombre del canal nuevo");
    if(name_new_channel != null && name_new_channel != ""){
        channels.push(name_new_channel);
        $("#channel_list").append(`<p># ${name_new_channel}</p>`);
    }else{
        alert("Información no válida");
    }
});

//AÑADIR NUEVO USUARIO A LA LISTA
$("#add-user").click(func = () => {
    let name_new_user = prompt("nombre del canal nuevo");
    if(name_new_user != null && name_new_user != ""){
        users.push(name_new_user);
        $("#user_list").append(`<p># ${name_new_user}</p>`);
    }else{
        alert("Información no válida");
    }
});
