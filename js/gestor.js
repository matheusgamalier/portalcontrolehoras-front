function carregarGestor() {
    var usuario = localStorage.getItem("userLogado");
    
    if (usuario == null) {
        location = "index.html";
    } else {
        var usuarioJson = JSON.parse(usuario);
        if (usuario.gestor != 1) {
            location = "colaborador.html";
        }
        else {
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

}

function tabelaOcorrencias(listaFiltro) {
    var rota = listaFiltro == undefined || listaFiltro == "todas" ? "http://localhost:8080/Ocorrencias" : "http://localhost:8080/ListaOcorrenciasStatus/" + listaFiltro;

    fetch(rota)
        .then(res => res.json())
        .then(res => {
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
                var ponto_manual = res[cont].ponto_manual == 0 ? "Não" : "Sim";
                var status = res[cont].status == 0 ? "Pendente" : "Justificada";
                
                tabela += 
                    "<tr>" + 
                        "<td>" + res[cont].num_seq + "</td>" + 
                        "<td>" + res[cont].id_usuario.nome_usuario + "</td>" + 
                        "<td>" + res[cont].id_atividade.nome_atividade + "</td>" + 
                        "<td>" + res[cont].descricao + "</td>" + 
                        "<td>" + res[cont].data + "</td>" + 
                        "<td>" + res[cont].hora + "</td>" + 
                        "<td>" + ponto_manual + "</td>" + 
                        "<td>" + status + "</td>" + 
                    "<tr>";
            }
        
            tabela += "</table>";
            document.getElementById("ocorrencias").innerHTML = tabela;            
        })
        .catch(err => {
            alert("Não encontrado")
    });
    
    
}

function filtrarOcorrencias() {
    tabelaOcorrencias(document.getElementById("cmbOcorrencia").value);
}