const CHAVE_OS = "ordensServico";

const ordensPadrao = [
    {
        id: "001",
        descricao: "Impressora não está imprimindo",
        equipamento: "Impressora HP LaserJet 1020",
        tecnico: "João Silva",
        status: "Em andamento",
        data_abertura: "2026-04-24",
        prioridade: "Média",
        observacoes: "Verificar cartucho e fila de impressão."
    },
    {
        id: "002",
        descricao: "Computador não liga",
        equipamento: "PC Dell Inspiron 15",
        tecnico: "Maria Souza",
        status: "Aguardando peças",
        data_abertura: "2026-04-22",
        prioridade: "Alta",
        observacoes: "Possível problema na fonte."
    },
    {
        id: "003",
        descricao: "Tela com manchas",
        equipamento: "Monitor LG 24MK430",
        tecnico: "Carlos Lima",
        status: "Finalizado",
        data_abertura: "2026-04-20",
        prioridade: "Baixa",
        observacoes: "Equipamento testado e finalizado."
    }
];

function inicializarDados() {
    const ordens = localStorage.getItem(CHAVE_OS);

    if (!ordens) {
        localStorage.setItem(CHAVE_OS, JSON.stringify(ordensPadrao));
    }
}

function buscarOrdens() {
    return JSON.parse(localStorage.getItem(CHAVE_OS)) || [];
}

function salvarOrdens(ordens) {
    localStorage.setItem(CHAVE_OS, JSON.stringify(ordens));
}

function formatarData(data) {
    if (!data) {
        return "";
    }

    const partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function gerarClasseStatus(status) {
    return status
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function carregarTabelaOrdens() {
    const tabela = document.getElementById("tabela-os");

    if (!tabela) {
        return;
    }

    const campoBusca = document.getElementById("buscar-os");
    const filtro = campoBusca ? campoBusca.value.toLowerCase() : "";

    const ordens = buscarOrdens();

    const ordensFiltradas = ordens.filter(os => {
        return (
            os.descricao.toLowerCase().includes(filtro) ||
            os.equipamento.toLowerCase().includes(filtro) ||
            os.tecnico.toLowerCase().includes(filtro) ||
            os.status.toLowerCase().includes(filtro)
        );
    });

    tabela.innerHTML = "";

    ordensFiltradas.forEach(os => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${os.id}</td>
            <td>${os.descricao}</td>
            <td>${os.equipamento}</td>
            <td>${os.tecnico}</td>
            <td>
                <span class="status-badge ${gerarClasseStatus(os.status)}">
                    ${os.status}
                </span>
            </td>
            <td>${formatarData(os.data_abertura)}</td>
            <td>
                <button class="action-btn btn-view" title="Visualizar">
                    <i class="fa-solid fa-eye"></i>
                </button>

                <button class="action-btn btn-edit" title="Editar">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="action-btn btn-delete" title="Excluir" onclick="excluirOS('${os.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function cadastrarOrdemServico(event) {
    event.preventDefault();

    const form = event.target;
    const ordens = buscarOrdens();

    const maiorId = ordens.length > 0
        ? Math.max(...ordens.map(os => Number(os.id)))
        : 0;

    const novaOS = {
        id: String(maiorId + 1).padStart(3, "0"),
        descricao: form.descricao.value,
        equipamento: form.equipamento.value,
        tecnico: form.tecnico.value,
        status: form.status.value,
        data_abertura: form.data_abertura.value,
        prioridade: form.prioridade.value,
        observacoes: form.observacoes.value
    };

    ordens.push(novaOS);
    salvarOrdens(ordens);

    alert("Ordem de Serviço cadastrada com sucesso!");

    window.location.href = "../index.html";
}

function excluirOS(id) {
    const confirmar = confirm("Deseja realmente excluir esta Ordem de Serviço?");

    if (!confirmar) {
        return;
    }

    const ordens = buscarOrdens();
    const novasOrdens = ordens.filter(os => os.id !== id);

    salvarOrdens(novasOrdens);
    carregarTabelaOrdens();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarDados();

    const formOS = document.getElementById("form-os");

    if (formOS) {
        formOS.addEventListener("submit", cadastrarOrdemServico);
    }

    const campoBusca = document.getElementById("buscar-os");

    if (campoBusca) {
        campoBusca.addEventListener("input", carregarTabelaOrdens);
    }

    carregarTabelaOrdens();
});