const chatBox =
document.getElementById("chatBox");
let lastPlan = "";
const input =
document.getElementById("messageInput");

const userId = "user1";

window.onload = () => {

    startChat();
};

async function startChat(){

    await sendMessage("start");
}

function addMessage(text,type){

    const div =
    document.createElement("div");

    div.className = type;

    div.innerText = text;

    chatBox.appendChild(div);

    chatBox.scrollTop =
    chatBox.scrollHeight;
}
function selectEvent(eventType){


    addMessage(
        eventType,
        "user"
    );


    sendMessage(eventType);

}

async function sendMessage(initialMessage = null){

    let message;

    if(initialMessage){

        message = initialMessage;

    }else{

        message = input.value.trim();

        if(!message) return;

        addMessage(message,"user");

        input.value = "";
    }

    try{

        const typingDiv =
        document.createElement("div");

        typingDiv.className = "bot";

        typingDiv.id = "typing";

        typingDiv.innerText =
        "🤖 Typing...";

        chatBox.appendChild(typingDiv);

        chatBox.scrollTop =
        chatBox.scrollHeight;

        const response =
        await fetch(
            "https://chatbot-backend-sduw.onrender.com/api/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify({
                    userId,
                    message
                })
            }
        );

        const data =
        await response.json();

        document
        .getElementById("typing")
        ?.remove();

        addMessage(
    data.reply,
    "bot"
);


lastPlan = data.reply;

    }catch(error){

        console.log(error);

        document
        .getElementById("typing")
        ?.remove();

        addMessage(
            "Unable to connect to backend.",
            "bot"
        );
    }
}
function downloadPlan(){

    if(!lastPlan){

        alert(
        "No event plan available yet."
        );

        return;
    }


    const file =
    new Blob(
        [lastPlan],
        {
            type:"text/plain"
        }
    );


    const link =
    document.createElement("a");


    link.href =
    URL.createObjectURL(file);


    link.download =
    "AI_Event_Plan.txt";


    link.click();
}
function clearChat(){

    chatBox.innerHTML = "";

    startChat();
}
input.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"){

            sendMessage();
        }
    }
);