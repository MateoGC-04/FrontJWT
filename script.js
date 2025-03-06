document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    
    try {
        const response = await fetch("https://patroneauth-api-yflrmyosbm.us-east-1.fcapp.run/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            mode: "cors", // Especificar explícitamente el modo CORS
            credentials: "same-origin", // Manejo de credenciales
            body: JSON.stringify({ username, password })
        });
        
        if (!response.ok) {
            // Manejar respuestas de error HTTP (400, 401, 500, etc.)
            const errorData = await response.json().catch(() => ({
                detail: `Error HTTP: ${response.status} ${response.statusText}`
            }));
            errorMessage.textContent = errorData.detail || "Error en la autenticación";
            console.error("Error de respuesta:", errorData);
            return;
        }

        // Procesar respuesta exitosa
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("Login exitoso, token guardado");
        errorMessage.textContent = ""; // Limpiar cualquier mensaje de error
        
        // Descomentar para redirigir al dashboard
        // window.location.href = "dashboard.html";
        
    } catch (error) {
        console.error("Error de conexión:", error);
        errorMessage.textContent = "Error de conexión al servidor. Verifica tu conexión a internet.";
    }
});
