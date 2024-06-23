const users = JSON.parse(localStorage.getItem("users")) ||[];

if(!users){
    alert("Please Register before login");
}
function togglePass(){
    let pass = document.getElementById("pass")
    pass.type = (pass.type === "text") ? "password": "text";
}

// function login(e){
//     e.preventDefault()
//     console.log("clicked")
// }

if(localStorage.getItem("flag") === "true"){
    window.location.href = 'index.html';
}
// else{
//     alert("Please login")
// }

$(document).ready(function(){
    const user = document.getElementById("user");
    const pass = document.getElementById("pass");
    
    $("#login-btn").click((e)=>{
        e.preventDefault();
        if(users.length === 0){
            alert("User not found")
            return
        }
        // localStorage.setItem("flag", true);
        // window.location.href = 'index.html';

        const enteredUser = user.value;
        const enteredPass = pass.value;

        const isValidUser = users.some(([storedUser, storedPass]) => {
            return enteredUser === storedUser && enteredPass === storedPass;
        });

        if (isValidUser) {
            localStorage.setItem("flag", true);
            window.location.href = 'index.html';
        } else {
            alert("Invalid username or password. Please try again.");
        }
    })
    $("#register").click((e)=>{
        e.preventDefault();
        window.location.href = 'register.html';
    })
})

// $("#register").click(()=>{
//     e.preventDefault();
//     window.location.href = 'register.html';
// })