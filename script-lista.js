let chamados = JSON.parse(localStorage.getItem('chamados')) || [];  
let chamadoParaEditar = JSON.parse(localStorage.getItem('editChamado'));  

// Renderiza os chamados na lista  
function renderChamados() {  
    const listaChamados = document.getElementById('lista-chamados');  
    listaChamados.innerHTML = '';  

    chamados.forEach((chamado, index) => {  
        const chamadaDiv = document.createElement('div');  
        chamadaDiv.classList.add('chamado');  
        chamadaDiv.innerHTML = `  
            <strong>Número DT:</strong> ${chamado.numeroDT}<br>  
            <strong>Setor:</strong> ${chamado.setor}<br>  
            <strong>Responsável:</strong> ${chamado.responsavel}<br>  
            <strong>Motivo:</strong> ${chamado.motivo}<br>  
            <strong>Data de Registro:</strong> ${chamado.dataRegistro}<br>  
            <strong>FINALIZADO:</strong> ${chamado.finalizado}<br>  
            <strong>Equipe que finalizou:</strong> ${chamado.equipeFinalizacao || 'N/A'}<br>  
            <button onclick="editChamado(${index})">Editar</button>  
            <button onclick="deleteChamado(${index})">Excluir</button>  
        `;  
        listaChamados.appendChild(chamadaDiv);  
    });  
}  

// Busca chamados  
function searchChamados() {  
    const query = document.getElementById('search-lista').value.toLowerCase();  
    const filtered = chamados.filter(chamado => chamado.numeroDT.toLowerCase().includes(query));  
    renderFilteredChamados(filtered);  
}  

// Renderiza chamados filtrados  
function renderFilteredChamados(filtered) {  
    const listaChamados = document.getElementById('lista-chamados');  
    listaChamados.innerHTML = '';  

    filtered.forEach((chamado, index) => {  
        const chamadaDiv = document.createElement('div');  
        chamadaDiv.classList.add('chamado');  
        chamadaDiv.innerHTML = `  
            <strong>Número DT:</strong> ${chamado.numeroDT}<br>  
            <strong>Setor:</strong> ${chamado.setor}<br>  
            <strong>Responsável:</strong> ${chamado.responsavel}<br>  
            <strong>Motivo:</strong> ${chamado.motivo}<br>  
            <strong>Data de Registro:</strong> ${chamado.dataRegistro}<br>  
            <strong>FINALIZADO:</strong> ${chamado.finalizado}<br>  
            <strong>Equipe que finalizou:</strong> ${chamado.equipeFinalizacao || 'N/A'}<br>  
            <button onclick="editChamado(${index})">Editar</button>  
            <button onclick="deleteChamado(${index})">Excluir</button>  
        `;  
        listaChamados.appendChild(chamadaDiv);  
    });  
}  

// Função para editar chamado  
function editChamado(index) {  
    const chamado = chamados[index];  
    localStorage.setItem('editChamado', JSON.stringify(chamado));   
    window.location.href = 'lista.html'; // Redireciona para a página de edição  
}  

// Função para excluir chamado  
function deleteChamado(index) {  
    chamados.splice(index, 1);  
    localStorage.setItem('chamados', JSON.stringify(chamados));  
    renderChamados();  
}  

// Renderiza chamados ao carregar a página  
window.onload = () => {  
    renderChamados();  
    if (document.getElementById('form-chamado')) {  
        // Preenche o formulário se estiver na página de cadastro  
        const chamadoParaEditar = JSON.parse(localStorage.getItem('editChamado'));  
        if (chamadoParaEditar) {  
            document.getElementById('numeroDT').value = chamadoParaEditar.numeroDT;  
            document.getElementById('setor').value = chamadoParaEditar.setor;  
            document.getElementById('responsavel').value = chamadoParaEditar.responsavel;  
            document.getElementById('operacao').value = chamadoParaEditar.operacao;  
            document.getElementById('motivo').value = chamadoParaEditar.motivo;  
            document.getElementById('dataRegistro').value = chamadoParaEditar.dataRegistro; // Se aplicar  
            document.getElementById('finalizado').value = chamadoParaEditar.finalizado;  
            
            // Opcional: Remover chamadoParaEditar do localStorage após carregar os dados  
            localStorage.removeItem('editChamado');  
        }  
    }  
};