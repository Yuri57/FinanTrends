import { supabase } from './supabase.js';

const form = document.querySelector('.form');

async function enviarDados(event) {
    event.preventDefault();

    const emailOrUsername = document.querySelector(".email");
    const password = document.querySelector('.password'); 

    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .or(`email.eq.${emailOrUsername.value},nomeUsuario.eq.${emailOrUsername.value}`) 
            .eq('senha', password.value);

        if (error) {
            console.error('Erro ao buscar dados:', error);
            showMessage('Erro ao tentar logar. Tente novamente!', 'error');
            return;
        }

        if (data.length === 0) {
            showMessage('E-mail ou senha incorretos. Verifique e tente novamente!', 'error');
        } else {
            showMessage('Login realizado com sucesso! Redirecionando...', 'success');

            setTimeout(() => {
                window.location.href = 'track.html'; 
            }, 2000);
        }
    } catch (err) {
        console.error('Erro inesperado:', err);
        showMessage('Ocorreu um erro. Por favor, tente novamente mais tarde.', 'error');
    }
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


form.addEventListener('submit', enviarDados);
