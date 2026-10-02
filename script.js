// Rola a página até uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// Gera um número de protocolo
function gerarProtocolo() {
    const ano = new Date().getFullYear();
    const numero = Math.floor(100000 + Math.random() * 900000);

    return `${ano}-${numero}`;
}

// Pega as ocorrências salvas
function obterOcorrencias() {
    const dados = localStorage.getItem("ocorrencias");

    if (dados) {
        return JSON.parse(dados);
    }

    return [];
}

// Salva as ocorrências
function salvarOcorrencias(ocorrencias) {
    localStorage.setItem(
        "ocorrencias",
        JSON.stringify(ocorrencias)
    );
}

// Categorias
const categorias = [
    "Buracos e vias",
    "Iluminação pública",
    "Limpeza urbana",
    "Sinalização",
    "Áreas verdes",
    "Transporte público",
    "Outros"
];

// Coloca as categorias no formulário
const categorySelect = document.getElementById("category");

if (categorySelect) {
    categorias.forEach(function(categoria) {
        const option = document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        categorySelect.appendChild(option);
    });
}

// Formulário de registro
const reportForm = document.getElementById("reportForm");

if (reportForm) {

    reportForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Pega os dados do formulário
        const categoria = document.getElementById("category").value;
        const titulo = document.getElementById("title").value;
        const descricao = document.getElementById("description").value;
        const endereco = document.getElementById("address").value;
        const bairro = document.getElementById("neighborhood").value;
        const nome = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Cria o protocolo
        const protocolo = gerarProtocolo();

        // Cria a ocorrência
        const ocorrencia = {
            protocolo: protocolo,
            categoria: categoria,
            titulo: titulo,
            descricao: descricao,
            endereco: endereco,
            bairro: bairro,
            nome: nome,
            email: email,
            data: new Date().toLocaleDateString("pt-BR"),
            status: "Em análise"
        };

        // Pega as ocorrências existentes
        const ocorrencias = obterOcorrencias();

        // Adiciona a nova ocorrência
        ocorrencias.push(ocorrencia);

        // Salva
        salvarOcorrencias(ocorrencias);

        // Limpa o formulário
        reportForm.reset();

        // Mostra o protocolo
        alert(
            "Solicitação registrada com sucesso!\n\n" +
            "Seu protocolo é: " + protocolo
        );

        // Vai para a área de acompanhamento
        scrollToSection("acompanhar");

        // Coloca o protocolo no campo
        const protocolInput = document.getElementById("protocolInput");

        if (protocolInput) {
            protocolInput.value = protocolo;
        }
    });
}

// Botão de consultar protocolo
const searchProtocol = document.getElementById("searchProtocol");

if (searchProtocol) {

    searchProtocol.addEventListener("click", function() {

        const input = document.getElementById("protocolInput");
        const resultado = document.getElementById("trackingResult");

        const protocolo = input.value.trim();

        // Verifica se o campo está vazio
        if (!protocolo) {
            resultado.innerHTML = `
                <p>Digite um número de protocolo.</p>
            `;

            return;
        }

        // Procura a ocorrência
        const ocorrencias = obterOcorrencias();

        const ocorrencia = ocorrencias.find(function(item) {
            return item.protocolo === protocolo;
        });

        // Se não encontrar
        if (!ocorrencia) {
            resultado.innerHTML = `
                <p>Protocolo não encontrado.</p>
            `;

            return;
        }

        // Mostra os dados da ocorrência
        resultado.innerHTML = `
            <div class="tracking-result-card">

                <div>
                    <strong>Protocolo</strong>
                    <p>${ocorrencia.protocolo}</p>
                </div>

                <div>
                    <strong>Problema</strong>
                    <p>${ocorrencia.titulo}</p>
                </div>

                <div>
                    <strong>Categoria</strong>
                    <p>${ocorrencia.categoria}</p>
                </div>

                <div>
                    <strong>Bairro</strong>
                    <p>${ocorrencia.bairro}</p>
                </div>

                <div>
                    <strong>Data</strong>
                    <p>${ocorrencia.data}</p>
                </div>

                <div>
                    <strong>Status</strong>
                    <p>${ocorrencia.status}</p>
                </div>

                <div>
                    <strong>Descrição</strong>
                    <p>${ocorrencia.descricao}</p>
                </div>

            </div>
        `;
    });
}

// Botão de modo escuro
const themeToggle = document.getElementById("themeToggle");

// Verifica se o usuário já escolheu um tema
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

// Alterna entre claro e escuro
if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        // Verifica qual tema está ativo
        const modoEscuro = document.body.classList.contains("dark-mode");

        if (modoEscuro) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("tema", "dark");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("tema", "light");
        }

    });

}