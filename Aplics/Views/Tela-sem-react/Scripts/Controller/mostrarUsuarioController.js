
import { mostrarTodosDados , mostrarUsuarioLogado } from '../Services/mostrarUsuarioService.js'

window.addEventListener( 'load', mostraUsuarioController);

function mostraUsuarioController() {
    
    const root = document.querySelector('#rootUsuarios');
    // --- Pega nome e token sessao usuario ---
    const nomeArmazenado = localStorage.getItem('usuario');
    mostrarUsuarioLogado( nomeArmazenado );

        mostrarTodosDados( root );        

}

