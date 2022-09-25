// Los mensajes se irán guardando en un array
let messages = [{
    chatWith: "Pepe",
    from: "Pepe",
    to: "Yo",
    date: "Hoy a las 14:58",
    content: "Hola David, cómo estás?"
}];
// Guardo alguno para que haya contenido simulado
messages.push({chatWith: "Juan", from: "Juan", to: "Yo", date: "Ayer a las 14:58", content: "Soy Juan, qué tal?"});
console.log(messages);

// Función, cada vez que se entra al chat, lo que hace es guardar los mensajes según con quién sean, y pintarlos con html.
enterChat = name => {
    let today = actualDate();
    $(".msg-screen").html("");
    $(".chat-title").html(name);

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

// Cuando le doy al Enter, guardar el mensaje en el array, y volver a mostrar los mensajes
$("#ipt-new-msg").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        saveMsgOnArray();
        let name = $(".chat-title").text();
        $("#ipt-new-msg").val("");
        enterChat(name);
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
function saveMsgOnArray(){
    let name = $(".chat-title").text();
    let content = $("#ipt-new-msg").val();
    messages.push({chatWith: name, from: "Yo", to: name, date: actualDate(), content: content});
    console.log(messages);
}