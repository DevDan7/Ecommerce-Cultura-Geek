document.getElementById("produto-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    // Capturando os valores dos inputs
    const nome = document.getElementById("nome").value;
    const valor = document.getElementById("valor").value;
    const descricao = document.getElementById("descricao").value;
  
    // Feedback para o usuário
    const feedbackElement = document.getElementById("feedback");
  
    // Montando o objeto para enviar
    const produtoData = {
      produto: nome,
      valor: valor,
      descricao: descricao,
    };
  
    try {
      // Fazendo a requisição POST usando Fetch API
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoData),
      });
  
      // Verificando a resposta
      if (response.ok) {
        feedbackElement.textContent = "Produto cadastrado com sucesso!";
        feedbackElement.style.color = "green";
        feedbackElement.style.width = "1200 px"
  
        // Adicionando o produto na seção "Produtos Cadastrados"
        adicionarProdutoNaLista(produtoData);
  
        // Limpando os campos
        document.getElementById("produto-form").reset();
      } else {
        throw new Error("Erro ao cadastrar o produto. Tente novamente.");
      }
    } catch (error) {
      feedbackElement.textContent = error.message;
      feedbackElement.style.color = "red";
    }
  });
  
  // Função para adicionar o produto na seção de "Produtos Cadastrados"
  function adicionarProdutoNaLista(produto) {
    const listaProdutos = document.getElementById("produtos-cadastrados");
  
    // Criando o elemento para o novo produto
    const produtoItem = document.createElement("div");
    produtoItem.classList.add("produto-item");
    produtoItem.innerHTML = `
      <h3>${produto.produto}</h3>
      <p><strong>Valor:</strong> R$ ${parseFloat(produto.valor).toFixed(2)}</p>
      <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
  
    // Adicionando o produto na lista
    listaProdutos.appendChild(produtoItem);
  }
  