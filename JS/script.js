const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const tabClicked = (tab) => {
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');

    const contents = document.querySelectorAll('.content');

    contents.forEach(content => content.classList.remove('show'));

    const contentId = tab.getAttribute('content-id');
    const content = document.getElementById(contentId);

    content.classList.add('show');
}

var titulos = [];
var titulosAssist = [];
var titulosNAssist = [];
let contf = 0;
let conts = 0;

function addTitulo() {
    let nome = document.querySelector("#txtNomeTitulo").value;
    let tipo = document.querySelector("#tipoTit").value;
    let li = document.createElement("li");
    let li2 = document.createElement("li");
    let opt = document.createElement("option");

    let liFilmes = document.createElement("li");
    let liSeries = document.createElement("li");

    if (nome.trim() === "") {
        alert("Campo nome obrigatório!");
        return;
    }

    let jaExiste = titulos.some(
        titulo => titulo.split(" - ")[0].toLowerCase() === nome.toLowerCase()
    );

    if (jaExiste) {
        alert("Título já cadastrado");
        return;
    }

    else {

        let aux = `${nome} - ${tipo}`;
        titulos[titulos.length] = aux;
        titulosNAssist[titulosNAssist.length] = aux;
        li.textContent = aux;
        li2.textContent = aux;
        opt.textContent = aux;
        opt.setAttribute("value", aux);

        document.querySelector("#listaTit").appendChild(li);
        document.querySelector("#listaTitNAssis").appendChild(li2);
        document.querySelector("#selectTit").appendChild(opt);
        document.querySelector("#contTit").textContent = titulos.length;
        document.querySelector("#contTitNAssis").textContent = titulosNAssist.length;

        let titulosOrdenados = [];
        titulosOrdenados = titulos;
        titulosOrdenados.sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
        let li4 = document.getElementById("listaOrdenada");
        li4.innerHTML = "";
        titulosOrdenados.forEach(function (ordem) {
            let li = document.createElement("li");
            li.textContent = ordem;
            li4.appendChild(li);
        });


        if (tipo === "filme") {
            liFilmes.textContent = aux;
            contf++;
            document.querySelector("#listaFilmes").appendChild(liFilmes);
        }
        else {
            liSeries.textContent = aux;
            conts++;
            document.querySelector("#listaSeries").appendChild(liSeries);
        }
        document.querySelector("#contFilmes").textContent = contf;
        document.querySelector("#contSeries").textContent = conts;
        alert("Título cadastrado com sucesso");
    }
}
document.querySelector("#btnCadTit").addEventListener("click", addTitulo);

function marcarAssistido() {

    let titulo = document.querySelector("#selectTit").value;
    let jaExiste = titulosAssist.some(aux => aux === titulo);

    if (jaExiste) {
        alert("Título já marcado como assistido");
        return;
    }

    else {
        let li3 = document.createElement("li");
        titulosAssist[titulosAssist.length] = titulo;
        li3.textContent = titulo;
        let opt = document.createElement("option");

        opt.textContent = titulo;
        opt.setAttribute("value", titulo);

        document.querySelector("#selectTitA").appendChild(opt);



        document.querySelector("#listaTitAssis").appendChild(li3);
        document.querySelector("#contTitAssis").textContent = titulosAssist.length;

        let jaExiste = titulosNAssist.some(titulos => titulos === titulo);
        if (jaExiste) {
            let index = titulosNAssist.indexOf(titulo);
            if (index !== -1) {
                titulosNAssist.splice(index, 1);
            }

            let lista = document.getElementById("listaTitNAssis");
            let itens = lista.getElementsByTagName("li");

            for (let i = 0; i < itens.length; i++) {
                if (itens[i].textContent.trim() === titulo) {
                    lista.removeChild(itens[i]);
                    break;
                }
            }
            document.querySelector("#contTitNAssis").textContent = titulosNAssist.length;
        }
        alert("Título marcado como assistido");
    }

    document.querySelector("#porcA").textContent = ((titulosAssist.length * 100) / titulos.length);
    document.querySelector("#porcNA").textContent = ((titulosNAssist.length * 100) / titulos.length);

}
document.querySelector("#btnAssistido").addEventListener("click", marcarAssistido);

function voltar() {
    let titulo = document.querySelector("#selectTitA").value;

    let indexAssistido = titulosAssist.indexOf(titulo);
    if (indexAssistido !== -1) {
        titulosAssist.splice(indexAssistido, 1);
    }

    titulosNAssist.push(titulo);

    let listaAssis = document.querySelector("#listaTitAssis");
    let itensAssis = listaAssis.getElementsByTagName("li");
    for (let i = 0; i < itensAssis.length; i++) {
        if (itensAssis[i].textContent.trim() === titulo) {
            listaAssis.removeChild(itensAssis[i]);
            break;
        }
    }

    let li = document.createElement("li");
    li.textContent = titulo;
    document.querySelector("#listaTitNAssis").appendChild(li);

    document.querySelector("#contTitAssis").textContent = titulosAssist.length;
    document.querySelector("#contTitNAssis").textContent = titulosNAssist.length;

    let select = document.querySelector("#selectTitA");
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === titulo) {
            select.remove(i);
            break;
        }
    }

    document.querySelector("#porcA").textContent = ((titulosAssist.length * 100) / titulos.length).toFixed(2);
    document.querySelector("#porcNA").textContent = ((titulosNAssist.length * 100) / titulos.length).toFixed(2);
    alert("Título voltou para a lista de não assistido");
}
document.querySelector("#btnVoltar").addEventListener("click", voltar);

function remover() {
    let titulo = document.querySelector("#selectTit").value;

    if (!titulo) {
        alert("Selecione um título para remover.");
        return;
    }

    titulos = titulos.filter(t => t !== titulo);
    titulosAssist = titulosAssist.filter(t => t !== titulo);
    titulosNAssist = titulosNAssist.filter(t => t !== titulo);

    const listas = ["listaTit", "listaTitAssis", "listaTitNAssis", "listaFilmes", "listaSeries", "listaOrdenada"];
    listas.forEach(id => {
        let ul = document.getElementById(id);
        let itens = ul.getElementsByTagName("li");
        for (let i = itens.length - 1; i >= 0; i--) {
            if (itens[i].textContent.trim() === titulo) {
                ul.removeChild(itens[i]);
            }
        }
    });

    let selectTit = document.querySelector("#selectTit");
    for (let i = 0; i < selectTit.options.length; i++) {
        if (selectTit.options[i].value === titulo) {
            selectTit.remove(i);
            break;
        }
    }

    let selectTitA = document.querySelector("#selectTitA");
    for (let i = 0; i < selectTitA.options.length; i++) {
        if (selectTitA.options[i].value === titulo) {
            selectTitA.remove(i);
            break;
        }
    }

    document.querySelector("#contTit").textContent = titulos.length;
    document.querySelector("#contTitAssis").textContent = titulosAssist.length;
    document.querySelector("#contTitNAssis").textContent = titulosNAssist.length;

    if (titulo.endsWith("filme")) {
        contf--;
    } else {
        conts--;
    }
    document.querySelector("#contFilmes").textContent = contf;
    document.querySelector("#contSeries").textContent = conts;

    document.querySelector("#porcA").textContent = titulos.length ? ((titulosAssist.length * 100) / titulos.length).toFixed(2) : 0;
    document.querySelector("#porcNA").textContent = titulos.length ? ((titulosNAssist.length * 100) / titulos.length).toFixed(2) : 0;
    alert("Título removido com sucesso");
}
document.querySelector("#btnRemover").addEventListener("click", remover);