function calcularIMC() {
    // Captura os valores dos campos do formulário
    const nome = document.getElementById("nome").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const objetivo = document.getElementById("objetivo").value;
  
    // Valida os campos
    if (!nome || isNaN(idade) || isNaN(peso) || isNaN(altura)) {
      alert("Por favor, preencha todos os campos corretamente!");
      return;
    }
  
    // Cálculo do IMC e classificação
    const imc = peso / (altura * altura);
    const classificacao =
      imc < 18.5
        ? "Abaixo do peso"
        : imc < 24.9
        ? "Peso normal"
        : imc < 29.9
        ? "Sobrepeso"
        : "Obesidade";
  
    // Cálculo da gordura corporal (fator sexo: masculino = 1, feminino = 0)
    const fatorSexo = sexo.toLowerCase() === "masculino" ? 1 : 0;
    const gorduraCorporal = 1.2 * imc + 0.23 * idade - 10.8 * fatorSexo - 5.4;
  
    // Recomendações baseadas no objetivo
    let caloriasRecomendadas, dieta, dicas;
  
    if (objetivo === "ganhar-massa") {
      caloriasRecomendadas = 2800;
      dieta = "Carboidratos: 50%, Proteínas: 30%, Gorduras: 20%";
      dicas = "Foco em treinos de força e aumento de consumo de proteínas.";
    } else if (objetivo === "perder-gordura") {
      caloriasRecomendadas = 1600;
      dieta = "Carboidratos: 35%, Proteínas: 40%, Gorduras: 25%";
      dicas = "Priorize exercícios aeróbicos e mantenha um déficit calórico.";
    } else {
      caloriasRecomendadas = 2000;
      dieta = "Carboidratos: 50%, Proteínas: 25%, Gorduras: 25%";
      dicas = "Mantenha exercícios regulares e uma alimentação equilibrada.";
    }
  
    // Exibição dos resultados no HTML
    const resultadoHtml = `
      <h3>Resultados para ${nome}</h3>
      <p><strong>Idade:</strong> ${idade} anos</p>
      <p><strong>Sexo:</strong> ${sexo}</p>
      <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>
      <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>
      <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
      <p><strong>Classificação do IMC:</strong> ${classificacao}</p>
      <p><strong>Gordura Corporal Estimada:</strong> ${gorduraCorporal.toFixed(2)}%</p>
      <p><strong>Objetivo:</strong> ${objetivo.replace("-", " ")}</p>
      <p><strong>Dicas:</strong> ${dicas}</p>
      <p><strong>Recomendações Dietéticas:</strong> ${dieta}</p>
      <p><strong>Calorias Recomendadas:</strong> ${caloriasRecomendadas} kcal</p>
    `;
  
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = resultadoHtml;
  
    // Adiciona botão para baixar resultados
    const dadosTxt = `
  Nome: ${nome}
  Idade: ${idade}
  Sexo: ${sexo}
  Peso: ${peso.toFixed(1)} kg
  Altura: ${altura.toFixed(2)} m
  IMC: ${imc.toFixed(2)}
  Classificação: ${classificacao}
  Gordura Corporal Estimada: ${gorduraCorporal.toFixed(2)}%
  Objetivo: ${objetivo.replace("-", " ")}
  Dicas: ${dicas}
  Recomendações Dietéticas: ${dieta}
  Calorias Recomendadas: ${caloriasRecomendadas} kcal
    `;
  
    const blob = new Blob([dadosTxt], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${nome}_dados_IMC.txt`;
    link.textContent = "Baixar Dados";
    link.className = "btn";
    resultadoDiv.appendChild(link);
  }
  
  function carregarArquivo(event) {
    // Carrega o arquivo de texto selecionado
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("resultado").innerText = e.target.result;
      };
      reader.readAsText(file);
    }
  }
  