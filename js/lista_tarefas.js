//capturar o input field
let input_tarefa = document.querySelector(".input_tarefa")
//capturar lista a ser preenchida
let output_tarefa = document.querySelector(".lista_tarefas")

//função de criar linha da lista de tarefas para receber os inputs adicionados
function criarLista() {
    let liHTML = document.createElement("li")
    return liHTML
}

//função de adicionar uma tarefa À lista
function adicionar(elemento) {
    //evitar q de pra colocar valores vazios
    if (elemento == "") {
        return
    } else {
        //criar o li para encaixar a string em uma lista
        let lista = criarLista()
        //adicionar o li na lista
        lista.innerText = elemento
        //let adicionado = lista + input_tarefa.value
        console.log(`tarefa "${input_tarefa.value}" adicionada`)
        //adicionar o string do input na area de output
        output_tarefa.appendChild(lista)
        //limpar o campo
        input_tarefa.value = ""
        //colocar em foco
        input_tarefa.focus()
        //criar e apensar botão de apagar
        criaRemover(lista)
        //armazenar na memoria interna
        armazenar()
    }
}
//fazer o enter funcionar como adicionar
//capturar o botão adicionar
let adicionarBtn = document.querySelector(".adicionar_btn")
//capturar evento de keypress no campo de input
input_tarefa.addEventListener("keypress", function (teclaPressionada) {
    //console.log(teclaPressionada.keyCode)
    //determinar o que fazer quando key press for enter
    if (teclaPressionada.keyCode == 13) {
        adicionar(input_tarefa.value)
    }
})

//adicionar botão de apagar em cada elemento
function criaRemover(li) {
    //capturar o botão escondido do HTML
    let removerBtn = document.querySelector(".remover_btn")
    //clonar o botão escondido
    let cloneBtn = removerBtn.cloneNode(true)
    //remover a classe que esconde o botão
    cloneBtn.classList.remove("btn_escondido")
    li.appendChild(cloneBtn)
}

//adicionar função ao apagar
//capturar o click da pagina
document.addEventListener("click", function (clickPressionado) {
    //armazenar o exato local clicado numa variável
    let elementoClicado = clickPressionado.target
    //console.log(elementoClicado)
    //identificar se o click foi no remover
    if (elementoClicado.classList.contains("remover_btn")) {
        //Em caso positivo, remover o elemento li ao qual esse botão está apensado como filho
        elementoClicado.parentElement.remove()
        console.log(`tarefa removida com sucesso`)
        //salvar a informação de que uma tarefa foi apagada da lista
        armazenar()
    }
})

//adicionar armazenamento 
function armazenar() {
    //criar um array vazio
    let listaArray = []

    //identificar os elementos em lista inseridos no html
    let elementosLi = document.querySelectorAll("li")

    //armazenar a lista dentro do array
    for (let elementos of elementosLi) {
        let TextoDasTarefas = elementos.innerText
        //retirar o termo "remover" que tá sendo capturado , ANTES de ser jogado dentro do array
        TextoDasTarefas = TextoDasTarefas.replace("Remover", "")
        TextoDasTarefas = TextoDasTarefas.replace("\n", "")
        listaArray.push(TextoDasTarefas)
        console.log(listaArray)
    }

    //criar arquivo json em string
    const tarefasJSON = JSON.stringify(listaArray)
    //salvar o arquivo
    localStorage.setItem("tarefas", tarefasJSON) //só permite salvar strings. Por isso teve q converter
    //OBS: tarefas determina o nome q vai ser usado pra resgatar os valores, e tarefas json determina a variavel q vai ser armazenada
}

//resgatar o armazenamento local do arquivo JSON
function extrairArmazenado() {
    //inserir os dados armazenados em uma variavel
    let dadosArmazenados = localStorage.getItem("tarefas")

    //converter as informações devolta em string
    let extrairLista = JSON.parse(dadosArmazenados)
    console.log(extrairLista)
    //inserir as strings no codigo, em lista
    for (let valores of extrairLista) {
        adicionar(valores)
    }
}
//executar a extração do armazenamento sempre que a pagina carregar
extrairArmazenado()
