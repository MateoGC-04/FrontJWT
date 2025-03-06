document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    
    // Datos a enviar
    const userData = {
        username: username,
        password: password
    };
    
    console.log("Enviando datos:", userData); // Para depuración
    
    try {
        const response = await fetch("https://patroneauth-api-yflrmyosbm.us-east-1.fcapp.run/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(userData) // Aseguramos que los datos se envían correctamente
        });
        
        console.log("Respuesta recibida:", response.status, response.statusText);
        
        // Si hay un error, intentamos obtener los detalles
        if (!response.ok) {
            let errorText = "";
            try {
                const errorData = await response.json();
                console.error("Datos de error:", errorData);
                errorText = errorData.detail || JSON.stringify(errorData);
            } catch (e) {
                errorText = `Error HTTP: ${response.status} ${response.statusText}`;
            }
            
            errorMessage.textContent = errorText;
            return;
        }
        
        // Procesar respuesta exitosa
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("Login exitoso, token guardado:", data);
        errorMessage.textContent = "Login exitoso!";
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        localStorage.setItem("userRole", payload.role);
        window.location.href = "landing.html";
        
    } catch (error) {
        console.error("Error de conexión:", error);
        errorMessage.textContent = "Error de conexión al servidor: " + error.message;
    }
});
