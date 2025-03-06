document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    
    try {
        const response = await fetch("https://patroneauth-api-yflrmyosbm.us-east-1.fcapp.run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            //window.location.href = "dashboard.html"; 
        } else {
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        errorMessage.textContent = "Error de conexión";
    }
});
