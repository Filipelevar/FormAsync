//validação e block de eventos do CPF 
const cpfInput = document.getElementById("CPF");
const cepInput = document.getElementById("CEP");
const TelInput = document.getElementById("telefone");

const cityInput = document.getElementById("municipio")
const streetInput = document.getElementById("logadouro")
const neighborhoodInput = document.getElementById("bairro")
const stateInput = document.getElementById("uf")
const loadingOverlay = document.querySelector('.loading-overlay');
const body = document.body


cpfInput.addEventListener('keypress', handleCpfKeyPress)
cpfInput.addEventListener('paste', handleCpfPaste)
cpfInput.addEventListener('input', handleCpfInputMask)
cpfInput.addEventListener('drop', handleCpfDrop)

cepInput.addEventListener('focusout', handleCepFocusOut)
cepInput.addEventListener('keypress', handleCepKeyPress)
cepInput.addEventListener('paste', handleCepPaste)
cepInput.addEventListener('input', handleCepInputMask)
cepInput.addEventListener('drop', handleCepDrop)

TelInput.addEventListener('keypress', handleTelKeyPress)
TelInput.addEventListener('paste', handleTelPaste)
TelInput.addEventListener('input', handleTelInputMask)
TelInput.addEventListener('drop', handleTelDrop)


// Functions CPF

function handleCpfKeyPress(e) {
    const convertedKey = Number(e.key);  //// NAN -> NOT A NUMBER (aqui faz com que toda tecla que voce tecle que nao seja numero nao valide e tudo que for numero seja validado)
    if (isNaN(convertedKey)) {
        e.preventDefault();
    }
}
function handleCpfPaste(e) {    // aqui faz com que nao possa colar nesse campo
    e.preventDefault()
}
function handleCpfInputMask() {    // mascara para deixar com cara de CPF
    cpfInput.value = cpfInput.value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}
function handleCpfDrop(e) {
    e.preventDefault()
}

//CEP

function handleCepKeyPress(e) {
    const convertedKey = Number(e.key);
    if (isNaN(convertedKey)) {
        e.preventDefault();
    }
}

function handleCepPaste(e) {
    e.preventDefault();
}

function handleCepInputMask() {
    cepInput.value = cepInput.value.replace(/^(\d{5})(\d{3})/, "$1-$2")
}

function handleCepDrop(e) {
    e.preventDefault()
}


//TEl

function handleTelKeyPress(e) {
    const convertedKey = Number(e.key);
    if (isNaN(convertedKey)) {
        e.preventDefault();
    }
}

function handleTelPaste(e) {
    e.preventDefault();
}

function handleTelInputMask() {
    TelInput.value = TelInput.value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
}

function handleTelDrop(e) {
    e.preventDefault()
}


async function handleCepFocusOut() {
    
    ///habilita classe para "travar"
    body.classList.add('loading')
    loadingOverlay.classList.remove('hide');

    //valida tamanho do cep, como a mascara existe se o cara digitar 8 numeros, o traço automatico faz ficar 9.
const validaLenght = cepInput.value.length == 9 ? true : false;

if (validaLenght == true) {
        const cepApi = await getCEP(cepInput.value)
        
        //caso retorne undefined
        if(cepApi.erro) {
            body.classList.remove('loading')
            loadingOverlay.classList.add('hide');
            //MENSAGEM VERMELHA CEP DIGITADO NAO EXISTE 
            return false;
        }

        cityInput.value = cepApi.localidade
        streetInput.value = cepApi.logradouro
        neighborhoodInput.value = cepApi.bairro
        stateInput.value = cepApi.uf
        
      
        //desabilita classe para "travar"
        body.classList.remove('loading')
        loadingOverlay.classList.add('hide');
        return true;
}

if(validaLenght == false){
    body.classList.remove('loading')
    loadingOverlay.classList.add('hide');
    // ANIMAL DIGITE _____-___
    return;
    }
}

async function getCEP(number) {
    try {
    const  viacep = await fetch(`https://viacep.com.br/ws/${number}/json/`)
    const  numberCEP = await viacep.json()
    return numberCEP
    } catch (err) {
       console.log(err.message)
    }
  }


// replace
// /^(\d{3})(\d{3})(\d{3})(\d{2})/
// "$1.$2;$3-$4" 

// var cpf = "06474386665";
// console.log(cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));

// var cep = "12030090";
// console.log(cep.replace(/^(\d{5})(\d{3})/, "$1-$2"));

// var tel = "13982271172";
// console.log(tel.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"));


// colocar alert caso erro catch
// colocar alert no html caso nao preencha



/*
DOM -> DOCUMENT OBJECT MODEL

OS ELEMENTOS EM HTML QUE VOCE CONSEGUE MANIPULAR UTILIZANDO JAVASCRIPT

escuradores de eventos  -->  EVENT LISTENERS

QUANDO VOCE PASSA UMA FUNÇÃO COMO UM PARAMETRO PARA OUTRA FUNÇÃO, ELA É CHAMADA DE CALLBACK



*/