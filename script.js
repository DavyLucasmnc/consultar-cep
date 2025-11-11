// Função validar o formato do CEP
function validarCEP(cep) {
    const regex = /^[0-9]{5}-?[0-9]{3}$/;
    return regex.test(cep);
}

// Função para consultar na API ViaCEP
function consultarCEP(cep) {
    if (!validarCEP(cep)) {
       alert('CEP inválido.');
        return;
    }


// Remover qualquer dado de endereço anterior
document.getElementById('logradouro').value = '';
document.getElementById('bairro').value = '';
document.getElementById('cidade').value ='';
document.getElementById('estado').value = '';

// Chama a API ViaCEP
fetch(`https://viacep.com.br/ws/${cep}/json/`)
.then(response => response.json())
.then(data => {
    if (data.erro) {
        document.getElementById('cepErro').innerText = 'CEP não encontrado.'
        return
    }
    
//  Preenche os campos do enreço
document.getElementById('logradouro').value = data.logradouro;
document.getElementById('bairro').value = data.bairro;
document.getElementById('cidade').value = data.localidade;
document.getElementById('estado').value = data.estado;

})
.catch(error => {
     alert('Erro ao consultar o CEP.');
    console.error('Erro na consulta do CEP:', error);
});

}

// Função que é chamada quando o formulário é enviado
function handleSubmit(event) {
    event.preventDefault();

    const cep = document.getElementById('cep').value.replace('-', ''); // Remove o traço

    consultarCEP(cep);

}


    // Evento de submit do formulário

    document.getElementById('formConsultaCep').addEventListener('submit', handleSubmit);