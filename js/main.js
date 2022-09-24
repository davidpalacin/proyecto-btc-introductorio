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
class Channel {
    constructor(name){
        this.name = name;
    }

    channel_messages = [];
    setMessage(from, to, content, date){
        this.channel_messages.push({from: from, to: to, content: content, date: date});
    }
    getMessage(){
        return this.channel_messages;
    } 
}

const users = [];
const channels = [];
const channel = new Channel("Workflow");
channels.push(channel);

let yourself = new User("Yo");
let teammate2 = new User("Teammate 2");
let teammate3 = new User("Teammate 3");
let teammate4 = new User("Teammate 4");
let teammate5 = new User("Teammate 5");
let teammate6 = new User("Teammate 6");
users.push(yourself,teammate2,teammate3,teammate4,teammate5,teammate6);

channel.setMessage(teammate2.name, 'Workflow', "Hola Chicos!", actualDate());
channel.setMessage(teammate3.name, 'Workflow', "Hola, encantado.", actualDate());
channel.setMessage(teammate4.name, 'Workflow', "¿Cómo estáis hoy? Tenemos bastante trabajo.", actualDate());
channel.setMessage(teammate5.name, 'Workflow', "Yo he terminado mi parte, ahora hablo con Alberto para ayudarle con lo suyo", actualDate());
channel.setMessage(teammate6.name, 'Workflow', "Recibido, te mando un mensaje directo cuando pueda y te comento lo que estoy haciendo. Me viene bien un poco de ayuda jejejeje", actualDate());

teammate2.setMessage(teammate2.name, 'Workflow', "Hola Chicos!", actualDate());
teammate3.setMessage(teammate3.name, 'Workflow', "Hola, encantado.", actualDate());
teammate4.setMessage(teammate4.name, 'Workflow', "¿Cómo estáis hoy? Tenemos bastante trabajo.", actualDate());
teammate5.setMessage(teammate5.name, 'Workflow', "Yo he terminado mi parte, ahora hablo con Alberto para ayudarle con lo suyo", actualDate());
teammate6.setMessage(teammate6.name, 'Workflow', "Recibido, te mando un mensaje directo cuando pueda y te comento lo que estoy haciendo. Me viene bien un poco de ayuda jejejeje", actualDate());

$("#add-user").click(function (){
    let new_name = prompt("Mandarle un mensaje directo a: ");
    if(new_name != null && new_name != ""){
        let user = new User(new_name);
        $("#user_list").append(`<p onclick="enterChat('${new_name}')"><i class="fa-solid fa-user"></i> ${new_name}</p>`);
    }else{
        alert("Información no válida");
    }
});


function enterChat(name, isChannel){
    let to = name;

    $("#ipt-new-msg").focus();
    $(".chat-title").html(`${to}`);
    $(".chat-descript").html(`Este es tu chat con ${to}`);
    printMessages(to, isChannel);
}

function printMessages(to, isChannel){
    $(".msg-screen").html("");

    if(isChannel){
        let info = getInfo(to);
        console.log(`print messages de ${info.name}`);
        console.log(info);

        //Sí que es un canal.
        let today = actualDate();
        let res = info.getMessage();

        if(res.length == 0){
            $(".msg-screen").append(`
            <div class="msg"> 
            <div class="flex-msg">
                <img id="profile-msg" src="img/profile.jpg" alt="foto de perfil">
                <div class="details-msg">
                        <div class="flex-date-msg">
                            <p id="username-msg">Oops!</p>
                            <span id="date-msg">${today}</span>
                        </div>
                    <span id="content-msg">No tienes ningún mensaje con ${info.name}. ¡Dile Hola!</span>
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

    }else{
      //No es un canal.
      let today = actualDate();
      let res = yourself.getMessage(yourself.name, to);
      if(res.length == 0){
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
    
}

$("#ipt-new-msg").on('keypress',function(event) {
    if(event.code === 'Enter') {
        let to = $(".chat-title").html();
        sendMessage(to);
    }
});

function sendMessage(destinatary){
    let to = destinatary;
    let today = actualDate();

    let content = $("#ipt-new-msg").val();
    let objChannel = getInfo(to);
    
    if(typeof(objChannel) === 'object'){
        objChannel.setMessage(yourself.name, objChannel.name, content, today);
    }
    yourself.setMessage(yourself.name, to, content, today);

    $("#ipt-new-msg").val("");
    printMessages(to);
}

$("#add-channel").click(function (){
    let new_channel = prompt("Introduce el nombre del nuevo canal");

    if(new_channel != null && new_channel != ""){
        const channel = new Channel(new_channel);
        channels.push(channel);
        $("#channel_list").append(`<p onclick="enterChat('${new_channel}', true)"><i class="fa-solid fa-chat"></i> ${new_channel}</p>`);
        
    }else{
        alert("Información no válida");
    }
});

function actualDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    return today;
}

function getInfo(to){
    for (let index = 0; index < channels.length; index++) {
        if(channels[index].name === to){
            return channels[index];
        }
    }
}