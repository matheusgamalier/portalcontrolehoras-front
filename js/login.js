function logar(e) {
    e.preventDefault();
    var form = {
        racf: document.getElementById("txtRacf").value,
        senha: document.getElementById("txtSenha").value,
    }
    
    var req = {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            "Content-type": "application/json"
        }
    }

    // fetch("http://localhost:8080/login", req).then(res => res.json()).then(res => {alert(res.nome);}).catch(err => {alert("Erro");});
    fetch("http://localhost:8080/login", req)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("userLogado", JSON.stringify(res));
            if (res.gestor == 0) {
                location = "colaborador.html";
            }
            else {
                location = "gestor.html";
            }
        })
        .catch(err => {
            alert("Usuário e/ou senha inválido");
        });
    
}