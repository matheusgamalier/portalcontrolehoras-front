function carregarGestor() {
    var usuario = localStorage.getItem("userLogado");
    
    if (usuario == null) {
        location = "index.html";
    } else {
        var usuarioJson = JSON.parse(usuario);
        document.getElementById("foto").innerHTML = 
        "<img alt='foto do usuario' title='" + usuarioJson.nome_usuario + "' src='img/" + usuarioJson.foto + "'/>";

        document.getElementById("dados").innerHTML = 
        "<h3>" +
            "Nome: " + usuarioJson.nome_usuario +
            "<br>Email: " + usuarioJson.email_usuario + 
        "</h3>";
        
        tabelaOcorrencias();
    }

}

function tabelaOcorrencias() {
    var rota = "http://localhost:8080/Ocorrencias"
    
    fetch(rota)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            var tabela = 
            "<table class='table'>" +
                "<tr>" + 
                    "<th>Id</th>" + 
                    "<th>Usuário</th>" +
                    "<th>Atividade</th>" + 
                    "<th>Descrição</th>" + 
                    "<th>Data</th>" + 
                    "<th>Hora</th>" + 
                    "<th>Ponto Manual</th>" + 
                    "<th>Status</th>"
                "</tr>"; 
            
            for(cont = 0; cont < res.length; cont++) {
                tabela += 
                    "<tr>" + 
                        "<td>" + res[cont].num_seq + "</td>" + 
                        "<td>" + res[cont].id_usuario.nome_usuario + "</td>" + 
                        "<td>" + res[cont].id_atividade.nome_atividade + "</td>" + 
                        "<td>" + res[cont].descricao + "</td>" + 
                        "<td>" + res[cont].data + "</td>" + 
                        "<td>" + res[cont].hora + "</td>" + 
                        "<td>" + res[cont].ponto_manual + "</td>" + 
                        "<td>" + res[cont].status + "</td>" + 
                    "<tr>";
            }
        
            tabela += "</table>";
            document.getElementById("ocorrencias").innerHTML = tabela;            
        })
        .catch(err => {
            alert("Não encontrado")
    });
    
    
}

/*function filtrarOcorrencia() {
    var valor = document.getElementById("cmbLancamento").value;
    var rota = "http://localhost:8080/Ocorrencias/"
    
    fetch(rota)
        .then(res => res.json())
        .then(res => tabelaFiltroLancamento(res))
        .catch(err => {
            alert("Não encontrado")
    });

}*/