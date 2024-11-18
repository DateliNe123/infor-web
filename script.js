const storyData = {
    inicio: {
      texto: "Você é um príncipe em busca da Rapunzel, que está presa em uma torre. Ao chegar à floresta, você encontra dois caminhos.",
      escolhas: [
        { texto: "Seguir pelo caminho iluminado", proximo: "caminho_iluminado", classe: "button1" },
        { texto: "Seguir pelo caminho escuro", proximo: "caminho_escuro", classe: "button2" }
      ]
    },
    caminho_iluminado: {
      texto: "Você segue pelo caminho iluminado e encontra uma clareira onde há um rio.",
      escolhas: [
        { texto: "Atravessar o rio", proximo: "atravessar_rio", classe: "button3" },
        { texto: "Voltar ao início", proximo: "inicio", classe: "button4" }
      ]
    },
    caminho_escuro: {
      texto: "Você segue pelo caminho escuro e é atacado por lobos.",
      escolhas: [
        { texto: "Lutar com os lobos", proximo: "lutar_lobos", classe: "button3" },
        { texto: "Fugir de volta ao início", proximo: "inicio", classe: "button4" }
      ]
    },
    atravessar_rio: {
      texto: "Você atravessa o rio e encontra um velho sábio que oferece ajuda.",
      escolhas: [
        { texto: "Aceitar a ajuda do sábio", proximo: "ajuda_sabio", classe: "button1" },
        { texto: "Recusar e continuar sozinho", proximo: "continuar_sozinho", classe: "button2" }
      ]
    },
    lutar_lobos: {
      texto: "Você derrota os lobos e segue em frente, avistando a torre de Rapunzel ao longe.",
      escolhas: [
        { texto: "Ir para a torre", proximo: "torre", classe: "button1" },
        { texto: "Descansar antes de continuar", proximo: "descansar", classe: "button4" }
      ]
    },
    ajuda_sabio: {
      texto: "O sábio lhe dá uma poção mágica para escalar a torre.",
      escolhas: [
        { texto: "Seguir até a torre", proximo: "torre", classe: "button1" },
        { texto: "Agradecer e continuar por outro caminho", proximo: "continuar_sozinho", classe: "button2" }
      ]
    },
    continuar_sozinho: {
      texto: "Sem ajuda, você enfrenta desafios e chega à torre cansado.",
      escolhas: [
        { texto: "Tentar escalar a torre", proximo: "torre", classe: "button1" }
      ]
    },
    descansar: {
      texto: "Ao descansar, você é encontrado por bandidos e levado de volta ao início.",
      escolhas: [
        { texto: "Recomeçar", proximo: "inicio", classe: "button4" }
      ]
    },
    torre: {
      texto: "Você finalmente chega à torre e ouve a voz de Rapunzel. Ela joga suas tranças para ajudá-lo a subir.",
      escolhas: [
        { texto: "Subir pela trança", proximo: "fim", classe: "button3" }
      ]
    },
    fim: {
      texto: "Você resgata Rapunzel e vivem felizes para sempre! Parabéns por completar a aventura!",
      escolhas: []
    }
  };
  
  const storyContainer = document.getElementById("story-container");
  let memory = JSON.parse(localStorage.getItem("decisions")) || [];
  
  function renderStory(section) {
    const sectionData = storyData[section] || storyData["inicio"];
    storyContainer.innerHTML = "";
  
    const textoElement = document.createElement("p");
    textoElement.textContent = sectionData.texto;
    storyContainer.appendChild(textoElement);
  
    sectionData.escolhas.forEach((escolha) => {
      const button = document.createElement("button");
      button.textContent = escolha.texto;
      button.className = escolha.classe;
      button.addEventListener("click", () => {
        makeDecision(section, escolha.proximo);
        navigateTo(escolha.proximo);
      });
      storyContainer.appendChild(button);
    });
  
    localStorage.setItem("ultimaSecao", section);
  
    if (section === "fim") {
      showPath();
      localStorage.removeItem("ultimaSecao");
      localStorage.removeItem("decisions");
    }
  }
  
  function navigateTo(section) {
    history.pushState({}, "", `?section=${section}`);
    renderStory(section);
  }
  
  function makeDecision(currentSection, nextSection) {
    memory.push(currentSection);
    localStorage.setItem("decisions", JSON.stringify(memory));
  }
  
  function showPath() {
    const pathContainer = document.createElement("div");
    pathContainer.id = "path";
    pathContainer.textContent = `Caminho realizado: ${memory.join(" → ")}`;
    storyContainer.appendChild(pathContainer);
  }
  
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get("section") || localStorage.getItem("ultimaSecao") || "inicio";
    renderStory(section);
  });
  window.addEventListener("load", () => {
    const lanternas = 20; // Aumenta o número de lanternas para preencher a tela
    for (let i = 0; i < lanternas; i++) {
      const lanterna = document.createElement("div");
      lanterna.classList.add("lanterna");
      lanterna.style.left = `${Math.random() * 100}%`; // Posição horizontal aleatória
      lanterna.style.top = `${Math.random() * 100}%`; // Posição vertical aleatória
      document.body.appendChild(lanterna);
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get("section") || localStorage.getItem("ultimaSecao") || "inicio";
    renderStory(section);
  });
    