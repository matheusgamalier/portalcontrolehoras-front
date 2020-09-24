function carregarOcorrencia() {
    var ocorrencia = localStorage.getItem("ocorrenciaId");
    
    if (ocorrencia == null) {
        location = "index.html";
    }
    else {
        fetch("http://localhost:8080/Atividades/")
        .then(res => res.json())
        .then(res => {
            montarCombo(res)
        });

        fetch("http://localhost:8080/Ocorrencia/" + localStorage.getItem("ocorrenciaId"))
        .then(res => res.json())
        .then(res => {
            document.getElementById("atividadeDataHora").innerHTML = "<span class='pl-4 pr-4'>Data: " + res.data + "</span> <span class='pl-5'>Hora: " + res.hora + "</span>";

            document.getElementById("atividadeDescricao").value = res.descricao;
            if (res.ponto_manual == 0) {
                document.getElementById("atividadeAjusteManualNao").checked = true;
            }
            else {
                document.getElementById("atividadeAjusteManualSim").checked = true;
            }
            document.getElementById("cmbAtividades").value = res.id_atividade.id_atividade;

        });
    }

}

function montarCombo(lista) {
    var combo = "";
    for (cont = 0; cont < lista.length; cont++) {
        combo += 
            "<option value='" + lista[cont].id_atividade + "'>" + lista[cont].nome_atividade + "</option>";
    }
    document.getElementById("cmbAtividades").innerHTML = combo;
}

function atualizarOcorrencia() {
    fetch("http://localhost:8080/Ocorrencia/" + localStorage.getItem("ocorrenciaId"))
    .then(res => res.json())
    .then(res => {
        // Dados do formulario inicio
        res.descricao = document.getElementById("atividadeDescricao").value;
        if (document.getElementsByName("atividadeAjusteManual")[0].checked) {
            res.ponto_manual = 1;
        }
        else {
            res.ponto_manual = 0;
        }
        
        res.id_atividade.id_atividade = document.getElementById("cmbAtividades").value;
        var atividades = document.getElementById("cmbAtividades");
        res.id_atividade.nome_atividade = atividades.options[atividades.selectedIndex].text
        res.status = 1;
        // Dados do formulario fim
        
        var req = {
            method: "POST",
            body: JSON.stringify(res),
            headers: {
                "Content-type": "application/json"
            }
        }
    
        // fetch("http://localhost:8080/login", req).then(res => res.json()).then(res => {alert(res.nome);}).catch(err => {alert("Erro");});
        fetch("http://localhost:8080/AtualizaOcorrencia", req)
            .then(res => res.json())
            .then(res => {
                location = "colaborador.html";
            })
            .catch(err => {
                alert("Falha ao atualizar");
            });
    })

}