# 📝 Controle de Atividades Complementares

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/)
[![License](https://img.shields.io/badge/license-Livre-brightgreen)](https://github.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

Sistema web para gerenciar **atividades complementares** de alunos do Instituto Federal de Mato Grosso do Sul – Campus Nova Andradina.

---

## ✨ Funcionalidades

- Registro e edição de atividades por aluno.
- Controle automático de **pontuação** por categoria, tipo, semestre e curso.
- Geração de **PDF** com pontuação válida.
- Armazenamento local via **LocalStorage**.
- Suporte a regras específicas de áreas de conhecimento.

---

## 💻 Tecnologias

- **HTML5 / CSS3 / JavaScript (Vanilla)**
- **Bootstrap 5**
- **jsPDF + AutoTable**
- LocalStorage

---

## 📁 Estrutura do Projeto

```
index.html        -> Página principal
instrucoes.html   -> Página de instruções
logo_redonda.png  -> Logo para PDF
```

---

## 🚀 Como Usar

1. Abrir `index.html` no navegador.
2. Selecionar o curso e preencher dados do aluno.
3. Lançar atividades:
   - Escolher categoria e tipo
   - Inserir data, semestre, evento e quantidade
   - Marcar área específica, se aplicável
4. Adicionar à tabela e conferir pontuação.
5. Editar/excluir atividades conforme necessário.
6. Gerar PDF ou limpar todos os dados.

---

## 📊 Regras de Pontuação

- Cada categoria possui **limites por semestre e curso**.
- Tipos de atividades têm **pontuação específica**.
- PDF gera **apenas pontos válidos** respeitando limites.
- Categorias principais:
  1. Aperfeiçoamento e enriquecimento cultural/esportivo
  2. Divulgação científica e iniciação à docência
  3. Vivência acadêmica e profissional complementar
  4. Pesquisa, Extensão e Publicações

---

## 👨‍💻 Autor

**Prof. Silvério Luiz de Sousa**  
Campus Nova Andradina/MS  
[Website pessoal](http://silveriosousa.com.br)  
[Instagram](https://www.instagram.com/silveriosousa_)

---

## 🛡️ Licença

Este projeto é **livre para uso e adaptação** para fins educacionais e institucionais.
