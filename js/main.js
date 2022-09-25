// Los mensajes se irán guardando en un array
let messages = [{
    chatWith: "Pepe",
    from: "Pepe",
    to: "Yo",
    date: "20/09/2022 a las 14:58",
    content: "Hola David, cómo estás?"
}];
// Guardo alguno para que haya contenido simulado
messages.push({chatWith: "Juan", from: "Juan", to: "Yo", date: "20/09/2022 a las 14:58", content: "Soy Juan, qué tal?"});
console.log(messages);

messages.push(
    {chatWith: "General", from: "Juan", to: "General", date: "20/09/2022 a las 14:58", content: "Soy Juan, qué tal?"},
    {chatWith: "General", from: "Pepe", to: "General", date: "20/09/2022 a las 14:58", content: "Soy Pepe, encantado"},
    {chatWith: "General", from: "Yo", to: "General", date: "20/09/2022 a las 14:58", content: "Hola chicos!"}
);

// Función, cada vez que se entra al chat, lo que hace es guardar los mensajes según con quién sean, y pintarlos con html.
enterChat = name => {
    let today = actualDate();
    $(".msg-screen").html("");
    $(".chat-title").html(name);
    $(".chat-descript").html(`Este es tu chat con ${name}`);

    // Recibo todos los mensajes que tenga con este usuario y los guardo en un array
    let res = [];
    messages.forEach(msg => {
        if(msg.chatWith == name){
            res.push(msg);
        }
    });

    // Si hay mensajes los pinto con un bucle
    if(res.length != 0){
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
        })
    }else{
        $(".msg-screen").append(`
            <div class="msg"> 
            <div class="flex-msg">
                <img id="profile-msg" src="img/profile.jpg" alt="foto de perfil">
                <div class="details-msg">
                        <div class="flex-date-msg">
                            <p id="username-msg">Oops!</p>
                            <span id="date-msg">${today}</span>
                        </div>
                    <span id="content-msg">No tienes ningún mensaje con ${name}. ¡Dile Hola!</span>
                </div>
            </div>
            </div>
        `);
    }
}
enterChat('General');

// Cuando le doy al Enter, guardo el mensaje en el array, y volver a mostrar todos los mensajes
$("#ipt-new-msg").on('keypress', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        if($("#ipt-new-msg").val() != ""){
            saveMsgOnArray();
            let name = $(".chat-title").text();
            $("#ipt-new-msg").val("");
            enterChat(name);
        } 
    }
});
// Añadir usuario a la lista
$("#add-user").click(function(){
    let username = prompt("Nuevo mensaje directo a: ");
    $("#user_list").append(`<p onclick="enterChat('${username}')"><i class="fa-solid fa-user"></i> ${username}</p>`);
});
// Añadir canal a la lista
$("#add-channel").click(function(){
    let channelName = prompt("Nuevo mensaje al canal: ");
    $("#channel_list").append(`<p onclick="enterChat('${channelName}')"># ${channelName}</p>`);
});
// Cuando escribes en el buscador, se llama a la función searchMessage, que busca las coincidencias y los muestra por pantalla.
$("#ipt-search-msg").keyup(function (){
    let name = $(".chat-title").text();
    let keyword = $("#ipt-search-msg").val();

    searchMessage(name, keyword);
});

function searchMessage(name, keyword){
    $(".msg-screen").html('');

    let messagesList = [];
    messages.forEach(msg => {
        if(msg.chatWith == name){
            messagesList.push(msg);
        }
    });

    let searchResults = [];
    messagesList.forEach(msg => {
        if(msg.content.includes(keyword)){
            searchResults.push(msg);
        }
    });

    if(searchResults.length != 0){
        searchResults.forEach(msg => {
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
        })
    }
}

function actualDate(){
    let today = new Date();
    let hour = today.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy + ' a las ' + hour;

    return today;
}
function saveMsgOnArray(){
    let name = $(".chat-title").text();
    let content = $("#ipt-new-msg").val();
    messages.push({chatWith: name, from: "Yo", to: name, date: actualDate(), content: content});
    console.log(messages);
}

