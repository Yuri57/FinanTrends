import { supabase } from './supabase.js';

const form = document.querySelector('.form');
const emailReceived = document.querySelector(".email");
const nameReceived = document.querySelector(".name");
const nameUserReceived = document.querySelector('.nameUser'); 
const passwordReceived = document.querySelector('.password');  

async function cadastrado(event) {
    event.preventDefault();

    const { data, error } = await supabase.from('usuarios').insert([
        {
            email: emailReceived.value,
            nomeCompleto: nameReceived.value,
            nomeUsuario: nameUserReceived.value,
            senha: passwordReceived.value,
        },
    ]);

    if (error) {
        showMessage('Erro ao cadastrar usuário. Tente novamente!', 'error');
    } else {
        showMessage('Cadastro realizado com sucesso! Redirecionando para a tela de login...', 'success');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000); 
    }

    emailReceived.value = '';
    nameReceived.value = '';
    nameUserReceived.value = '';
    passwordReceived.value = '';
}

function showMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.className = `message-box ${type}`;
    messageBox.textContent = message;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 5000);
}

form.addEventListener('submit', cadastrado);
