// Pasos:
// 1. Al hacer click en añadir usuario, crear una variable new User
// 2. Mostrar el nuevo usuario en la lista lateral de usuarios
// 3. Al hacer click a un usuario entrar en una pantalla de mensajes directos, y los mensajes con este usuario
class User {
    constructor(name){
        this.name = name;
    }
    messages = [];

    setMessage(from, to, content, date){
        this.messages.push({from: from, to: to, content: content, date: date});
    }
    getMessage(from, to){
        let result = [];
        for(let i=0; i<this.messages.length; i++){
            if(this.messages[i].from == from && this.messages[i].to == to){
                result.push(this.messages[i]);
            }
        }
        return result;
    } 
}
let yourself = new User("Yo");

$("#add-user").click(function (){
    let new_name = prompt("Mandarle un mensaje directo a: ");
    if(new_name != null && new_name != ""){
        let user = new User(new_name);
        $("#user_list").append(`<p onclick="enterChat('${new_name}')"><i class="fa-solid fa-user"></i> ${new_name}</p>`);
    }else{
        alert("Información no válida");
    }
});


function enterChat(name){
    $("#ipt-new-msg").focus();
    let to = name;
    $(".chat-title").html(`${to}`);
    $(".chat-descript").html(`Este es tu chat con ${to}`);
    printMessages(to);
}

function printMessages(to){
    $(".msg-screen").html("");

    let res = yourself.getMessage(yourself.name, to);
    if(res.length == 0){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        $(".msg-screen").append(`
        <div class="msg"> 
        <div class="flex-msg">
            <img id="profile-msg" src="img/profile.jpg" alt="foto de perfil">
            <div class="details-msg">
                    <div class="flex-date-msg">
                        <p id="username-msg">Oops!</p>
                        <span id="date-msg">${today}</span>
                    </div>
                <span id="content-msg">No tienes ningún mensaje con ${to}. ¡Dile Hola!</span>
            </div>
        </div>
        </div>
        `);
    }
    res.forEach(msg => {
        $(".msg-screen").append(`
        <div class="msg"> 
        <div class="flex-msg">
            <img id="profile-msg" src="img/profile.jpg" alt="foto de perfil">
            <div class="details-msg">
                    <div class="flex-date-msg">
                        <p id="username-msg">${msg.from}</p>
                        <span id="date-msg">${msg.date}</span>
                    </div>
                <span id="content-msg">${msg.content}</span>
            </div>
        </div>
        </div>
        `);
    });
}

$("#ipt-new-msg").on('keypress',function(event) {
    if(event.code === 'Enter') {
        let to = $(".chat-title").html();
        sendMessage(to);
    }
});
  

function sendMessage(destinatary){
    let to = destinatary;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    let content = $("#ipt-new-msg").val();
    yourself.setMessage(yourself.name, to, content, today);
    printMessages(to);

    $("#ipt-new-msg").val("");
}

    
// //AÑADIR NUEVO CANAL A LA LISTA
// $("#add-channel").click(func = () => {
//     let name_new_channel = prompt("nombre del canal nuevo");
//     if(name_new_channel != null && name_new_channel != ""){
//         channels.push(name_new_channel);
//         $("#channel_list").append(`<p># ${name_new_channel}</p>`);
//     }else{
//         alert("Información no válida");
//     }
// });
