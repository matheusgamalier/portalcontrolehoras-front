function carregarColaborador() {
    var usuario = localStorage.getItem("userLogado");
    
    if (usuario == null) {
        location = "index.html";
    } else {
        var usuarioJson = JSON.parse(usuario);
        document.getElementById("foto").innerHTML = 
        "<img class='img-fluid' alt='foto do usuario' title='" + usuarioJson.nome_usuario + "' src='img/" + usuarioJson.foto + "'/>";

        document.getElementById("dados").innerHTML = 
        "<h5 class='card-title'>" + usuarioJson.nome_usuario + "</h5>" + 
        "<p class='card-text'>" + usuarioJson.email_usuario + "<br>" + usuarioJson.racf + "</p>" +
        "<p class='card-text'><small class='text-muted'>Colaborador</small></p>";
        
        tabelaOcorrencias();
    }

}

function tabelaOcorrencias(listaFiltro) {
    var usuario = JSON.parse(localStorage.getItem("userLogado"));
    var rota = listaFiltro == undefined || listaFiltro == "todas" ? "http://localhost:8080/ListaOcorrenciasRacf/" + usuario.racf : "http://localhost:8080/ListaOcorrenciasRacfStatus/" + usuario.racf + "/" + listaFiltro;

    fetch(rota)
        .then(res => res.json())
        .then(res => {
            var tabela = 
            "<table class='table table-striped table-hover table-sm'>" +
                "<tr class='bg-orange text-center text-white'>" + 
                    "<th>Id</th>" + 
                    "<th>Usuário</th>" +
                    "<th>Atividade</th>" + 
                    "<th>Descrição</th>" + 
                    "<th>Data</th>" + 
                    "<th>Hora Extra</th>" + 
                    "<th>Ponto Manual</th>" + 
                    "<th>Status</th>" +
                    "<th>Atualizar</th>" +
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
                        "<td class='text-center'>" + res[cont].hora + "</td>" + 
                        "<td class='text-center'>" + ponto_manual + "</td>" + 
                        "<td class='text-center'>" + status + "</td>" + 
                        "<td class='text-center'><button onclick='abrirOcorrencia("+ res[cont].num_seq +")' class='btn btn-outline-secondary btn-sm'>Atualizar</button></td>" + 
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

function abrirOcorrencia(ocorrencia) {
    localStorage.setItem("ocorrenciaId", ocorrencia);
    location = "atualizar_ocorrencia.html";
}