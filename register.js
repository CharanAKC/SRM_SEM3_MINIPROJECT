
    
function togglePass(){
    let pass = document.getElementById("pass-check")
    pass.type = (pass.type === "text") ? "password": "text";
}

const users = JSON.parse(localStorage.getItem("users")) || [];

if(localStorage.getItem("flag") === "true"){
    window.location.href = 'index.html';
}
//else{
//     alert("Please login")
// }

$(document).ready(function(){
    const user = document.getElementById("user");
    const pass = document.getElementById("pass");
    const passCheck = document.getElementById("pass-check");
    $("#register-btn").click((e)=>{
        e.preventDefault();
        const enteredUser = user.value;
        // const enteredPass = pass.value;
        
        const isValidUser = users.some(([storedUser]) => {
            return enteredUser === storedUser;
        });

        if (isValidUser) {
            alert("Username already exists!!!!");
        } else {
            if(pass.value !== passCheck.value){
                alert("Password and Confirm Passwords are not matching!! Please check")
            }else{
                if (user.value && pass.value) {
                    alert(user.value+" User Successfully registered. Please Login and Happy Shoppin!!")
                    users.push([user.value, pass.value]);
                    localStorage.setItem("users", JSON.stringify(users));
                    window.location.href = "login.html";
                }            
            }
        }
        user.value = "";
        pass.value = "";
        passCheck.value = "";
    })

    $("#login-btn").click(()=>{
        window.location.href = "login.html";
    })
})