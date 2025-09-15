/* ============================
   REGRAS (Anexo I - ATIVIDADES.pdf)
   ============================ */

/*
 Estrutura:
 categorias = {
   "1": {
     nome, maxCurso, maxSemestre,
     tipos: {
       "1.1": {
         nome, unidade, // "horas" | "eventos" | "meses"s
         regra: ({qtd, area}) => pontosBrutos,
         maxSemestreTipo // limite por semestre do tipo
       },
       ...
     }
   },
   ...
 }

 Observações das regras:
 - Onde o documento diz: "1 ponto por hora OU 10 pontos por evento caso não conste carga horária",
   interpretamos como entrada por "horas" OU por "eventos".
   Para simplicidade do lançamento, use o campo Quantidade com a unidade exibida no "badge".
   Você pode alternar a unidade no seletor de tipo quando aplicável.
*/

const categorias = {
  "1": {
    nome: "Atividades de aperfeiçoamento e enriquecimento cultural e esportivo",
    maxCurso: 120,
    maxSemestre: 80,
    tipos: {
      "1.1": {
        nome: "Atividades culturais/esportivas (filme, teatro, feiras, olimpíadas etc.)",
        unidade: "eventos",
        regra: ({qtd}) => 5 * (qtd || 1), // 5 pontos por atividade
        maxSemestreTipo: 30
      },
      "1.2": {
        nome: "Visitas técnicas e culturais (museus, memoriais, empresas etc.)",
        unidade: "eventos",
        regra: ({qtd}) => 5 * (qtd || 1), // 5 pontos por visita
        maxSemestreTipo: 30
      },
      "1.3": {
        nome: "Cursos (línguas, informática, culturais, sociais, específicos do curso)",
        unidade: "horas",
        regra: ({qtd}) => (qtd || 0) * 1, // 1 ponto por hora
        maxSemestreTipo: 40
      },
      "1.4": {
        nome: "Trabalho voluntário / comunitário / associações (brigadas, APAE etc.)",
        unidade: "eventos",
        regra: ({qtd}) => 10 * (qtd || 1), // 10 pontos por participação comprovada
        maxSemestreTipo: 40
      }
    }
  },
  "2": {
    nome: "Atividades de divulgação científica e de iniciação à docência",
    maxCurso: 100,
    maxSemestre: 60,
    tipos: {
      "2.1": {
        nome: "Monitoria remunerada ou voluntária",
        unidade: "eventos",
        regra: ({qtd}) => 15 * (qtd || 1), // 15 pontos por participação
        maxSemestreTipo: 60
      },
      "2.2": {
        nome: "Atividades técnico-científicas (apresentação, palestras, bancas etc.)",
        unidade: "eventos",
        areaEspecifica: true, // 10 pontos ou 15 se da área específica do curso
        regra: ({qtd, area}) => (area ? 15 : 10) * (qtd || 1),
        maxSemestreTipo: 30
      },
      "2.3": {
        nome: "Atividades pedagógicas de observação",
        unidade: "eventos",
        regra: ({qtd}) => 5 * (qtd || 1), // 5 pontos por participação
        maxSemestreTipo: 20
      }
    }
  },
  "3": {
    nome: "Atividades de vivência acadêmica e profissional complementar",
    maxCurso: 100,
    maxSemestre: 60,
    tipos: {
      "3.1": {
        nome: "Organização de eventos acadêmicos e festivais",
        unidade: "auto", // horas OU eventos (10 se sem carga horária)
        regra: ({qtd, unidade}) => unidade === "horas" ? (qtd || 0) * 1 : 10 * (qtd || 1),
        maxSemestreTipo: 30,
        unidadesPossiveis: ["horas","eventos"]
      },
      "3.2": {
        nome: "Representação discente / liderança / órgãos de classe / conselhos",
        unidade: "eventos",
        regra: ({qtd}) => 5 * (qtd || 1),
        maxSemestreTipo: 20
      },
      "3.3": {
        nome: "Ouvinte em bancas (TCC, dissertação, tese)",
        unidade: "eventos",
        regra: ({qtd}) => 3 * (qtd || 1),
        maxSemestreTipo: 18
      },
      "3.4": {
        nome: "Ouvinte em congressos, seminários, simpósios e afins",
        unidade: "auto", // horas OU eventos (10 se sem carga horária)
        regra: ({qtd, unidade}) => unidade === "horas" ? (qtd || 0) * 1 : 10 * (qtd || 1),
        maxSemestreTipo: 40,
        unidadesPossiveis: ["horas","eventos"]
      },
      "3.5": {
        nome: "Visita técnica relacionada à área de atuação",
        unidade: "auto", // horas OU eventos (8 se sem carga horária)
        regra: ({qtd, unidade}) => unidade === "horas" ? (qtd || 0) * 1 : 8 * (qtd || 1),
        maxSemestreTipo: 20,
        unidadesPossiveis: ["horas","eventos"]
      },
      "3.6": {
        nome: "Participação em projetos de incubação",
        unidade: "meses",
        regra: ({qtd}) => 7.5 * (qtd || 0), // 7,5 pontos por mês
        maxSemestreTipo: 45
      }
    }
  },
  "4": {
    nome: "Atividades de Pesquisa ou Extensão e Publicações",
    maxCurso: 100,
    maxSemestre: 80,
    tipos: {
      "4.1": {
        nome: "Projetos e grupos de pesquisa",
        unidade: "meses",
        regra: ({qtd}) => 7.5 * (qtd || 0), // 7,5 pontos por mês
        maxSemestreTipo: 45
      },
      "4.2": {
        nome: "Projetos e grupos de extensão",
        unidade: "meses",
        regra: ({qtd}) => 7.5 * (qtd || 0), // 7,5 pontos por mês
        maxSemestreTipo: 45
      },
      "4.3": {
        nome: "Artigo científico completo em revista/periódico",
        unidade: "publicações", // eventos
        areaEspecifica: true, // 25 pontos, ou 30 se da área específica
        regra: ({qtd, area}) => (area ? 30 : 25) * (qtd || 1),
        maxSemestreTipo: 50
      },
      "4.4": {
        nome: "Resumo de artigo científico em revista/periódico",
        unidade: "publicações", // eventos
        areaEspecifica: true, // 15 pontos, ou 20 se da área específica
        regra: ({qtd, area}) => (area ? 20 : 15) * (qtd || 1),
        maxSemestreTipo: 50
      },
      "4.5": {
        nome: "Matérias ou notas em jornais e meios eletrônicos",
        unidade: "publicações",
        regra: ({qtd}) => 5 * (qtd || 1),
        maxSemestreTipo: 10
      }
    }
  }
};

/* ============================
   ESTADO + LOCALSTORAGE
   ============================ */
let atividades = []; // {data, semestreAtividade, evento, cat, tipo, unidadeUsada, quantidade, area, pontosBrutos}
let totais = {};

const storageKeys = {
  atividades: "atividades",
  aluno: "dadosAluno"
};

function salvarLocal(){
  localStorage.setItem(storageKeys.atividades, JSON.stringify(atividades));
  const aluno = {
    nome: document.getElementById("nomeAluno").value || "",
    cpf: document.getElementById("cpfAluno").value || "",
    semestre: document.getElementById("semestreAluno").value || "",
    curso: document.getElementById("cursoAluno").value || ""
  };
  localStorage.setItem(storageKeys.aluno, JSON.stringify(aluno));
}

function carregarLocal(){
  const dados = localStorage.getItem(storageKeys.atividades);
  if(dados){
    atividades = JSON.parse(dados);
  }
  const aluno = localStorage.getItem(storageKeys.aluno);
  if(aluno){
    const a = JSON.parse(aluno);
    document.getElementById("nomeAluno").value = a.nome || "";
    document.getElementById("cpfAluno").value = a.cpf || "";
    document.getElementById("semestreAluno").value = a.semestre || "";
    document.getElementById("cursoAluno").value = a.curso || "";
  }
  atualizarTabela();
  atualizarTotais();
  atualizarContadores();
}

function limparDados() {
  if (confirm("Tem certeza que deseja limpar todos os dados?")) {
    atividades = [];
    localStorage.removeItem(storageKeys.atividades);
    
    // Carrega os dados do aluno antes de apagar
    const dadosAluno = JSON.parse(localStorage.getItem(storageKeys.aluno) || "{}");
    const cursoSalvo = dadosAluno.curso || "";

    // Remove os dados do aluno
    localStorage.removeItem(storageKeys.aluno);

    atualizarTabela();
    atualizarTotais();
    atualizarContadores();

    // Limpa apenas os outros campos
    document.getElementById("nomeAluno").value = "";
    document.getElementById("cpfAluno").value = "";
    document.getElementById("semestreAluno").value = "";

    // Mantém o curso selecionado
    document.getElementById("cursoAluno").value = cursoSalvo;
    localStorage.setItem(storageKeys.aluno, JSON.stringify({ curso: cursoSalvo }));
  }
}

/* ============================
   UI: CATEGORIAS / TIPOS
   ============================ */
function carregarCategorias(){
  const select = document.getElementById("categoria");
  select.innerHTML = "";
  for(const c in categorias){
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = `${c} - ${categorias[c].nome}`;
    select.appendChild(opt);
  }
  carregarTipos();
  atualizarContadores();
}

function atualizarUnidadeUI(cat, tipo){
  const badge = document.getElementById("unidadeBadge");
  const hint = document.getElementById("quantidadeHint");
  const grupoArea = document.getElementById("grupoAreaEspecifica");
  const chkArea = document.getElementById("areaEspecifica");

  // Verifica se a categoria e tipo existem
  if (!categorias[cat] || !categorias[cat].tipos || !categorias[cat].tipos[tipo]) {
    console.warn(`Categoria ${cat} ou tipo ${tipo} não encontrado`);
    return;
  }

  const info = categorias[cat].tipos[tipo];
  let unidade = info.unidade;
  let mostrarArea = !!info.areaEspecifica;

  // unidades dinâmicas (auto)
  if(info.unidadesPossiveis){
    // por padrão, usamos "horas" (para 3.1, 3.4, 3.5)
    unidade = info.unidadesPossiveis[0];
  }

  badge.textContent = unidade;
  hint.textContent = `Informe a quantidade em ${unidade}.`;
  grupoArea.classList.toggle("d-none", !mostrarArea);
  chkArea.checked = false;
}

function carregarTipos(){
  const cat = document.getElementById("categoria").value;
  const select = document.getElementById("tipo");
  select.innerHTML = "";

  if (!categorias[cat]) {
    console.warn(`Categoria ${cat} não encontrada`);
    return;
  }

  for(const t in categorias[cat].tipos){
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = `${t} - ${categorias[cat].tipos[t].nome}`;
    select.appendChild(opt);
  }
  
  if (select.options.length > 0) {
    atualizarUnidadeUI(cat, select.value);
  }
}

// Função para contar atividades por categoria e tipo
function atualizarContadores() {
  const catSelecionada = document.getElementById("categoria").value;
  const tipoSelecionado = document.getElementById("tipo").value;
  
  if (!catSelecionada) {
    document.getElementById("countCategoria").textContent = "Selecione uma categoria";
    document.getElementById("countTipo").textContent = "Selecione um tipo";
    return;
  }
  
  // Conta atividades da categoria selecionada
  const countCat = atividades.filter(a => a.cat === catSelecionada).length;
  document.getElementById("countCategoria").textContent = 
    countCat + (countCat === 1 ? " atividade nesta categoria" : " atividades nesta categoria");
  
  // Conta atividades do tipo selecionado
  const countTipo = atividades.filter(a => a.cat === catSelecionada && a.tipo === tipoSelecionado).length;
  document.getElementById("countTipo").textContent = 
    countTipo + (countTipo === 1 ? " atividade deste tipo" : " atividades deste tipo");
}

document.getElementById("categoria").addEventListener("change", ()=>{
  carregarTipos();
  atualizarContadores();
});

document.getElementById("tipo").addEventListener("change", ()=>{
  const cat = document.getElementById("categoria").value;
  const tipo = document.getElementById("tipo").value;
  atualizarUnidadeUI(cat, tipo);
  atualizarContadores();
});

/* ============================
   Lançamento
   DESENVOLVIDO POR: SILVERIO LUIZ DE SOUSA - EM: 23/08/2025 - http://silveriosousa.com.br
   ============================ */
document.getElementById("atividadeForm").addEventListener("submit", e=>{
  e.preventDefault();

  const data = document.getElementById("data").value;
  const semestreAtividade = (document.getElementById("semestreAtividade").value || "").trim();
  const evento = document.getElementById("evento").value;
  const cat = document.getElementById("categoria").value;
  const tipo = document.getElementById("tipo").value;
  let quantidade = parseFloat(document.getElementById("quantidade").value) || 0;
  const chkArea = document.getElementById("areaEspecifica").checked;

  // Verifica se a categoria e tipo existem
  if (!categorias[cat] || !categorias[cat].tipos || !categorias[cat].tipos[tipo]) {
    alert(`Erro: Categoria ou tipo não encontrado!`);
    return;
  }

  const info = categorias[cat].tipos[tipo];
  let unidadeUsada = info.unidade;
  if(info.unidadesPossiveis){
    unidadeUsada = Number.isInteger(quantidade) ? "eventos" : "horas";
  }
  const pontosBrutos = info.regra({qtd: quantidade, unidade: unidadeUsada, area: chkArea});

  const registro = {
    data, semestreAtividade, evento,
    cat, tipo,
    unidadeUsada,
    quantidade,
    area: !!chkArea,
    pontosBrutos
  };

  if(editIndex !== null){
    atividades[editIndex] = registro;  // substitui
    editIndex = null;
    document.querySelector("#atividadeForm button[type=submit]").textContent = "Adicionar";
  } else {
    atividades.push(registro); // novo
  }

  salvarLocal();
  atualizarTabela();
  atualizarTotais();
  atualizarContadores();
  
  // salva o curso antes de resetar
  const cursoSelecionado = document.getElementById("cursoAluno").value;

  // limpa o formulário
  e.target.reset();
  carregarCategorias();

  // restaura o curso depois do reset
  document.getElementById("cursoAluno").value = cursoSelecionado;
});

/* ============================
   Tabela
   ============================ */
let editIndex = null; // controla se estamos editando

function atualizarTabela(){
  const tbody = document.querySelector("#tabelaAtividades tbody");
  tbody.innerHTML = "";
  atividades.forEach((a, i)=>{
    const tr = document.createElement("tr");
    
    // Verifica se a categoria e o tipo existem antes de tentar acessar suas propriedades
    const categoriaNome = categorias[a.cat] ? categorias[a.cat].nome : `Categoria ${a.cat} (não encontrada)`;
    
    let tipoNome = `Tipo ${a.tipo} (não encontrado)`;
    if (categorias[a.cat] && categorias[a.cat].tipos && categorias[a.cat].tipos[a.tipo]) {
      tipoNome = categorias[a.cat].tipos[a.tipo].nome;
    }
    
    tr.innerHTML = `
      <td>${a.data || ""}</td>
      <td>${a.semestreAtividade || ""}</td>
      <td>${a.evento}</td>
      <td>${categoriaNome}</td>
      <td>${tipoNome}${a.area ? " (área específica)" : ""}</td>
      <td>${a.quantidade} ${a.unidadeUsada}</td>
      <td>${a.pontosBrutos}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarAtividade(${i})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="removerAtividade(${i})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editarAtividade(index){
  const a = atividades[index];
  editIndex = index;

  // Preenche o formulário com os dados
  document.getElementById("data").value = a.data;
  document.getElementById("semestreAtividade").value = a.semestreAtividade;
  document.getElementById("evento").value = a.evento;
  document.getElementById("cursoAluno").value = document.getElementById("cursoAluno").value; // mantém curso
  
  // Verifica se a categoria existe antes de selecioná-la
  if (categorias[a.cat]) {
    document.getElementById("categoria").value = a.cat;
    carregarTipos();
    
    // Verifica se o tipo existe antes de selecioná-lo
    if (categorias[a.cat].tipos && categorias[a.cat].tipos[a.tipo]) {
      document.getElementById("tipo").value = a.tipo;
      atualizarUnidadeUI(a.cat, a.tipo);
    } else {
      console.warn(`Tipo ${a.tipo} não encontrado para categoria ${a.cat}`);
    }
  } else {
    console.warn(`Categoria ${a.cat} não encontrada`);
    carregarCategorias(); // Carrega categorias padrão se a categoria não existir
  }
  
  document.getElementById("quantidade").value = a.quantidade;
  document.getElementById("areaEspecifica").checked = a.area;

  // Troca o botão de submit para "Atualizar"
  document.querySelector("#atividadeForm button[type=submit]").textContent = "Atualizar";
  
  // Atualiza contadores
  atualizarContadores();
}

function removerAtividade(index){
  atividades.splice(index,1);
  salvarLocal();
  atualizarTabela();
  atualizarTotais();
  atualizarContadores();
}

/* ============================
   Cálculo com limites — atribuição por linha (pontos válidos)
   ============================ */
/*
Passos:
1) Limite por TIPO e SEMESTRE (maxSemestreTipo): FIFO por ordem de lançamento.
2) Limite por CATEGORIA e SEMESTRE (maxSemestre): FIFO considerando valores já limitados do passo 1.
3) Limite por CATEGORIA no curso (maxCurso): FIFO somando todos os semestres da categoria.
Retorna vetor com pontosEfetivos por linha, além dos totais por categoria.
*/
function calcularPontosEfetivosPorLinha(){
  const n = atividades.length;
  const passo1 = new Array(n).fill(0);
  const passo2 = new Array(n).fill(0);
  const efetivo = new Array(n).fill(0);

  // Índices auxiliares
  // Agrupa por (cat,tipo,sem)
  const gruposTipoSem = {};
  atividades.forEach((a, idx)=>{
    const key = `${a.cat}|${a.tipo}|${a.semestreAtividade}`;
    if(!gruposTipoSem[key]) gruposTipoSem[key] = [];
    gruposTipoSem[key].push(idx);
  });

  // 1) aplica maxSemestreTipo (FIFO)
  for(const key in gruposTipoSem){
    const [cat, tipo, sem] = key.split("|");
    // Verifica se categoria e tipo existem
    const maxTipoSem = (categorias[cat] && categorias[cat].tipos && categorias[cat].tipos[tipo]) ? 
                        categorias[cat].tipos[tipo].maxSemestreTipo : Infinity;
    let resto = maxTipoSem;
    for(const idx of gruposTipoSem[key]){
      const usar = Math.min(atividades[idx].pontosBrutos, resto);
      passo1[idx] = usar;
      resto -= usar;
      if(resto <= 0) break;
    }
  }

  // 2) aplica maxSemestre (por categoria e semestre) — FIFO sobre ordem de lançamento desse cat/sem
  const gruposCatSem = {};
  atividades.forEach((a, idx)=>{
    const key = `${a.cat}|${a.semestreAtividade}`;
    if(!gruposCatSem[key]) gruposCatSem[key] = [];
    gruposCatSem[key].push(idx);
  });

  for(const key in gruposCatSem){
    const [cat, sem] = key.split("|");
    // Verifica se categoria existe
    const maxSem = categorias[cat] ? categorias[cat].maxSemestre : Infinity;
    // soma dos valores do passo1 neste cat/sem
    const soma = gruposCatSem[key].reduce((acc, i)=> acc + passo1[i], 0);
    let limite = Math.min(soma, maxSem);
    for(const idx of gruposCatSem[key]){
      const usar = Math.min(passo1[idx], limite);
      passo2[idx] = usar;
      limite -= usar;
      if(limite <= 0) break;
    }
  }

  // 3) aplica maxCurso (por categoria) — FIFO na ordem de lançamento da categoria
  const gruposCat = {};
  atividades.forEach((a, idx)=>{
    const key = `${a.cat}`;
    if(!gruposCat[key]) gruposCat[key] = [];
    gruposCat[key].push(idx);
  });

  const porCatTotal = {};
  for(const cat in gruposCat){
    // Verifica se categoria existe
    const maxCurso = categorias[cat] ? categorias[cat].maxCurso : Infinity;
    const soma = gruposCat[cat].reduce((acc, i)=> acc + passo2[i], 0);
    let limite = Math.min(soma, maxCurso);
    let subtotalCat = 0;
    for(const idx of gruposCat[cat]){
      const usar = Math.min(passo2[idx], limite);
      efetivo[idx] = usar;
      subtotalCat += usar;
      limite -= usar;
      if(limite <= 0) break;
    }
    porCatTotal[cat] = subtotalCat;
  }

  return { efetivoPorLinha: efetivo, porCatTotal };
}

function calcularTotaisLimitados(){
  // Mantido para o resumo na UI (reuso do método de antes, mas agora usamos o novo)
  const { porCatTotal } = calcularPontosEfetivosPorLinha();
  return { porCatTotal };
}

function atualizarTotais(){
  const { porCatTotal } = calcularTotaisLimitados();
  const lista = document.getElementById("totaisCategoria");
  lista.innerHTML = "";

  for(const c in categorias){
    const catNome = categorias[c].nome;
    const val = porCatTotal[c] || 0;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${c} - ${catNome}</span>
      <span><strong>${val}</strong> pontos</span>
    `;
    lista.appendChild(li);
  }

  const totalGeral = Object.values(porCatTotal).reduce((a,b)=>a+b,0);
  document.getElementById("totalGeral").textContent = totalGeral;
}

/* ============================
   PDF — somente pontos VÁLIDOS
   ============================ */
async function gerarPDF(){
  if(atividades.length === 0){
    alert("Nenhuma atividade lançada. Adicione atividades antes de gerar o PDF.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Função auxiliar para obter nomes de categoria/tipo com segurança
  const getNomeCategoria = (cat) => categorias[cat] ? categorias[cat].nome : `Categoria ${cat} (não encontrada)`;
  const getNomeTipo = (cat, tipo) => {
    if (categorias[cat] && categorias[cat].tipos && categorias[cat].tipos[tipo]) {
      return categorias[cat].tipos[tipo].nome;
    }
    return `Tipo ${tipo} (não encontrado)`;
  };

  // Logo
  try {
    const logoBase64 = await toBase64("logo_redonda.png"); 
    doc.addImage(logoBase64, "PNG", 8, 8, 25, 25);
  } catch(e){}

  // Cabeçalho fixo
  doc.setFontSize(10);
  doc.text("INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE MATO GROSSO DO SUL", 40, 15);
  doc.text("CAMPUS NOVA ANDRADINA", 40, 20);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PONTUAÇÃO PARA AS ATIVIDADES COMPLEMENTARES", 40, 30);

  // Dados do aluno
  const cursoAluno = document.getElementById("cursoAluno").value;
  if(!cursoAluno){
    alert("Selecione um curso antes de gerar o PDF.");
    return;
  }

  const nomeAluno = document.getElementById("nomeAluno").value || "NÃO INFORMADO";
  const cpfAluno = document.getElementById("cpfAluno").value || "NÃO INFORMADO";
  const semestreAluno = document.getElementById("semestreAluno").value || "NÃO INFORMADO";

  doc.setFontSize(11);
  doc.text(`Curso: ${cursoAluno}`, 10, 42);
  doc.text(`Aluno: ${nomeAluno}`, 10, 47);
  doc.text(`CPF: ${cpfAluno}`, 110, 47);
  doc.text(`Semestre de Formatura: ${semestreAluno}`, 10, 52);

  let y = 70;

  // --- resto do código de gerar tabelas, totais e rodapé permanece igual ---
  const { efetivoPorLinha, porCatTotal } = calcularPontosEfetivosPorLinha();
  const agrupado = {};
  atividades.forEach((a, i)=>{
    if(!agrupado[a.cat]) agrupado[a.cat] = [];
    agrupado[a.cat].push({ idx: i, ...a, pontosValidos: efetivoPorLinha[i] });
  });

  let totalGeral = 0;
  const ordCats = Object.keys(categorias).sort((a,b)=> Number(a)-Number(b));
  for(const c of ordCats){
    const catAtividades = (agrupado[c] || []).slice();
    const catInfo = categorias[c];

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${c} - ${catInfo.nome}`, 10, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Limites: por tipo/semestre (ver subitens), por semestre da categoria (${catInfo.maxSemestre} pts) e por curso (${catInfo.maxCurso} pts).`, 10, y);
    y += 5;

    if(catAtividades.length === 0){
      doc.setFont("helvetica", "italic");
      doc.text("Sem lançamentos nesta categoria.", 12, y);
      y += 10;
      if(y > 250){ doc.addPage(); y = 20; }
      continue;
    }

    const dados = catAtividades.map(a => ([
      a.data || "",
      a.semestreAtividade || "",
      a.evento,
      getNomeTipo(a.cat, a.tipo) + (a.area ? " (área específica)" : ""),
      `${a.quantidade} ${a.unidadeUsada}`,
      a.pontosValidos
    ]));

    doc.autoTable({
      head: [["Data","Semestre","Evento","Tipo","Qtd","Pontos (válidos)"]],
      body: dados,
      startY: y,
      theme: "grid",
      headStyles: { fillColor: [0, 102, 0] },
      styles: { fontSize: 9 }
    });

    const subtotalEfetivo = porCatTotal[c] || 0;
    totalGeral += subtotalEfetivo;

    y = doc.lastAutoTable.finalY + 7;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(`Subtotal da categoria (após limites): ${subtotalEfetivo} pontos`, 12, y);
    y += 12;

    if(y > 250){ doc.addPage(); y = 20; }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`TOTAL GERAL: ${totalGeral} pontos`, 10, y);

  // Observação
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Observação: o PDF exibe apenas pontos VÁLIDOS, já limitados por subcategoria/semestre, por categoria/semestre e por categoria (curso).", 10, 255);

  // ASSINATURA
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const pageWidth = doc.internal.pageSize.getWidth();
  // linha de assinatura
  doc.text("__________________________________________________________________", pageWidth/2, 265, { align: "center" });
  // nome do aluno
  doc.text(nomeAluno, pageWidth/2, 270, { align: "center" });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.text("Desenvolvido por Prof. Silvério Luiz de Sousa - Campus Nova Andradina/MS", 10, 290);
    doc.text(`${i}/${pageCount}`, 200, 290, { align: "right" });
  }

  doc.save(nomeAluno+"atividades_validas.pdf");
}

// utilitário para carregar imagem
function toBase64(url) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
      })
      .catch(reject);
  });
}

// Funções de abertura de instruções
function abrirInstrucoes() {
  // Abre uma nova janela com largura e altura definidas
  window.open(
    'instrucoes.html', // aqui você coloca o link para sua página de instruções
    'Instrucoes',
    'width=800,height=600,scrollbars=yes,resizable=yes'
  );
}

/* ============================
   FUNÇÕES DE EXPORTAÇÃO E IMPORTAÇÃO JSON
   ============================ */

// Função para validar dados importados
function validarAtividades(atividades) {
  // Validação básica - verifica se é um array
  if (!Array.isArray(atividades)) {
    console.error("Dados importados não são um array válido");
    return false;
  }
  
  // Verifica se cada atividade tem os campos mínimos necessários
  for (let i = 0; i < atividades.length; i++) {
    const a = atividades[i];
    if (!a.cat || !a.tipo || a.quantidade === undefined || a.pontosBrutos === undefined) {
      console.error(`Atividade na posição ${i} não tem campos obrigatórios`);
      return false;
    }
  }
  
  return true;
}

// Função para exportar dados como JSON
function exportarJSON() {
  const dadosExport = {
    atividades: atividades,
    aluno: {
      nome: document.getElementById("nomeAluno").value || "",
      cpf: document.getElementById("cpfAluno").value || "",
      semestre: document.getElementById("semestreAluno").value || "",
      curso: document.getElementById("cursoAluno").value || ""
    }
  };
  
  const dataStr = JSON.stringify(dadosExport, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  // Cria elemento para download
  const a = document.createElement('a');
  a.download = `atividades_complementares_${new Date().toISOString().slice(0,10)}.json`;
  a.href = URL.createObjectURL(dataBlob);
  a.click();
  URL.revokeObjectURL(a.href);
}

// Função para importar dados de arquivo JSON
function importarJSON(input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const dadosImport = JSON.parse(e.target.result);
      
      if (confirm("Importar os dados irá substituir todas as informações atuais. Deseja continuar?")) {
        // Importa os dados com validação
        if (dadosImport.atividades && validarAtividades(dadosImport.atividades)) {
          atividades = dadosImport.atividades;
        } else {
          alert("O arquivo importado contém dados de atividades inválidos");
          return;
        }
        
        if (dadosImport.aluno) {
          const aluno = dadosImport.aluno;
          document.getElementById("nomeAluno").value = aluno.nome || "";
          document.getElementById("cpfAluno").value = aluno.cpf || "";
          document.getElementById("semestreAluno").value = aluno.semestre || "";
          document.getElementById("cursoAluno").value = aluno.curso || "";
        }
        
        // Salva, atualiza a interface e notifica
        salvarLocal();
        atualizarTabela();
        atualizarTotais();
        atualizarContadores();
        alert("Dados importados com sucesso!");
      }
    } catch (error) {
      alert("Erro ao importar arquivo: " + error.message);
      console.error("Erro na importação:", error);
    }
    
    // Reseta o input para permitir selecionar o mesmo arquivo novamente
    input.value = "";
  };
  
  reader.readAsText(file);
}

/* ============================
   FORMATAÇÃO DE CPF
   ============================ */
document.getElementById("cpfAluno").addEventListener("input", function(e){
  let v = e.target.value.replace(/\D/g, "");
  if(v.length > 11) v = v.slice(0,11);
  let formatado = "";
  if(v.length > 9){
    formatado = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if(v.length > 6){
    formatado = v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  } else if(v.length > 3){
    formatado = v.replace(/(\d{3})(\d+)/, "$1.$2");
  } else {
    formatado = v;
  }
  e.target.value = formatado;
});

/* ============================
   INIT
   ============================ */
carregarCategorias();
carregarLocal();

// Salva dados do aluno on change
["nomeAluno","cpfAluno","semestreAluno","cursoAluno"].forEach(id=>{
  document.getElementById(id).addEventListener("change", salvarLocal);
});
