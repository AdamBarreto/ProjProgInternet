// Apenas roda o que for da página de Cadastro
if (document.getElementById('formCadastro')) {
    document.getElementById('formCadastro').addEventListener('submit', function (event) {

        event.preventDefault();
        if (validarCadastro()) {
            alert("Cadastro realizado com sucesso!");
        } else {
            alert("Corrija os erros.");
        }
    });
    document.getElementById('nome').addEventListener('blur', validarNome);
    document.getElementById('usuario').addEventListener('blur', validarUsuario);
    document.getElementById('perfil').addEventListener('blur', validarPerfil);
    document.getElementById('email').addEventListener('blur', validarEmail);
    document.getElementById('senha').addEventListener('blur', validarSenha);
    document.getElementById('confirma-senha').addEventListener('blur', validarConfirmaSenha);
}

if (document.getElementById('formLogin')) {
    const formLogin = document.getElementById('formLogin');

    // Cria ouvintes de 'blur' específicos para a página de login
    document.getElementById('usuario').addEventListener('blur', validarUsuarioLogin);
    document.getElementById('senha').addEventListener('blur', validarSenhaLogin);

    formLogin.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede a página de recarregar
        
        // Executa as duas validações antes de entrar
        let usuarioValido = validarUsuarioLogin();
        let senhaValida = validarSenhaLogin();

        if (usuarioValido && senhaValida) {
            alert("Login feito com sucesso.");
            // formLogin.submit(); // Descomente quando tiver um servidor real
        } else {
            alert("Por favor, preencha os dados de login corretamente.");
        }
    });
}


// CADASTRO
function validarNome() {
  const campo = document.getElementById('nome');
  const nome = campo.value;
  const erro = document.getElementById('nomeErro');
  if (nome.trim() === '') {
      erro.innerText = 'O nome completo é obrigatório.';
      campo.classList.add('invalido'); 
      return false;
  }
  erro.innerText = '';
  campo.classList.remove('invalido');
  return true;
}
function validarPerfil() {
  const campo = document.getElementById('perfil');
  const nome = campo.value;
  const erro = document.getElementById('perfilErro');
  if (nome.trim() === '') {
      erro.innerText = 'Selecione uma opção de perfil.';
      campo.classList.add('invalido'); 
      return false;
  }
  erro.innerText = '';
  campo.classList.remove('invalido');
  return true;
}
function validarUsuario() {
  const campo = document.getElementById('usuario');
  const usuario = campo.value;
  const erro = document.getElementById('usuarioErro');

  if (usuario.trim() === '') {
      erro.innerText = 'O nome de usuário é obrigatório.';
      campo.classList.add('invalido'); 
      return false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(usuario)) {
      erro.innerText = 'Use apenas letras, números e _ (sem espaços ou símbolos).';
      return false;
  }
  erro.innerText = '';
  campo.classList.remove('invalido');
  return true;
}
function validarEmail() {
  const campo = document.getElementById('email');
  const email = campo.value;
  const erro = document.getElementById('emailErro');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.trim() === '') {
      erro.innerText = 'O e-mail é obrigatório.';
      campo.classList.add('invalido'); 
      return false;
  } else if (!emailRegex.test(email)) {
      erro.innerText = 'Insira um e-mail válido (ex: nome@dominio.com).';
      return false;
  }
  erro.innerText = '';
  campo.classList.remove('invalido');
  return true;
}
function validarSenha() {
  const campo = document.getElementById('senha');
  const senha = campo.value;
  const erro = document.getElementById('senhaErro');
  const temLetra = /[a-zA-Z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);

  if (senha === '') {
      erro.innerText = 'A senha é obrigatória.';
      campo.classList.add('invalido'); 
      return false;
  } else if (senha.length < 8) {
      erro.innerText = 'A senha deve ter no mínimo 8 caracteres.';
        campo.classList.remove('invalido');
      return false;
  } else if (!temLetra || !temNumero) {
      erro.innerText = 'A senha deve conter pelo menos uma letra e um número.';
        campo.classList.remove('invalido');
      return false;
  }
  erro.innerText = '';
  campo.classList.remove('invalido');
  return true;

}
function validarConfirmaSenha() {
  const campo = document.getElementById('senha');
  const senha = campo.value;
  const confirmaSenha = document.getElementById('confirma-senha').value;
  const erro = document.getElementById('confirmaSenhaErro');

  if (confirmaSenha === '') {
      erro.innerText = 'Por favor, confirme sua senha.';
      campo.classList.add('invalido'); 
      return false;
  } else if (senha !== confirmaSenha) {
      erro.innerText = 'As senhas não coincidem.';
        campo.classList.remove('invalido');
      return false;
  }
  erro.innerText = '';
  campo.classList.remove('invalido');
  return true;
}
function validarCadastro() {
  // Executa todas as funções. O operador "&" garante que TODAS rodem 
  // (se usássemos "&&", a execução pararia no primeiro erro encontrado)
  let n = validarNome();
  let u = validarUsuario();
  let p = validarPerfil();
  let e = validarEmail();
  let s = validarSenha();
  let c = validarConfirmaSenha();

  return n && u && e && s && c && p;
}


// LOGIN
function validarUsuarioLogin() {
    const campo = document.getElementById('usuario');
    const erro = document.getElementById('usuarioErro');
    
    if (campo.value.trim() === '') {
        erro.innerText = 'O nome de usuário é obrigatório.';
        return false;
    }
    erro.innerText = ''; // Limpa o erro se digitou algo
    return true;
}

function validarSenhaLogin() {
    const campo = document.getElementById('senha');
    const erro = document.getElementById('senhaErro');
    
    if (campo.value === '') {
        erro.innerText = 'A senha é obrigatória.';
        return false;
    }
    erro.innerText = ''; // Limpa o erro se digitou algo
    return true;
}

function validarLogin() {
    let u = validarUsuarioLogin();
    let s = validarSenhaLogin();

    return u && s;
}



function validarQuestao() {
  const enunciado = document.getElementById('campoEnunciado');
  const erro = document.getElementById('erroEnunciado');

  if (!enunciado || enunciado.value.trim() === '') {
    if (erro) erro.innerText = 'Campo obrigatório.';
    return false;
  }
  if (erro) erro.innerText = '';
  return true;
}

function validarCampoAlternativa(idCampo, idErro, letra) {
    const campo = document.getElementById(idCampo);
    const erro = document.getElementById(idErro);

    // Se o campo não existir na página, não faz nada
    if (!campo) return true;

    if (campo.value.trim() === '') {
        erro.innerText = 'A alternativa ' + letra + ' é obrigatória.';
        return false;
    }
    
    erro.innerText = ''; // Limpa o erro se o usuário digitou algo
    return true;
}

function alternarTipo() {
    const tipo = document.getElementById('tipoQuestao').value;
    const divAlt = document.getElementById('containerAlternativas');
    const divGabarito = document.getElementById('containerGabarito');
    const divDisc = document.getElementById('containerDiscursiva');

    if (tipo === 'discursiva') {
        if (divAlt) divAlt.style.display = 'none';
        if (divGabarito) divGabarito.style.display = 'none';
        if (divDisc) divDisc.style.display = 'block';
    } else {
        if (divAlt) divAlt.style.display = 'block';
        if (divGabarito) divGabarito.style.display = 'block';
        if (divDisc) divDisc.style.display = 'none';
    }
}

// Validação unificada do botão "Cadastrar"
if (document.getElementById('formQuestao')) {
    document.getElementById('formQuestao').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio imediato
        
        const enunciado = document.getElementById('campoEnunciado');
        const erroEnunciado = document.getElementById('erroEnunciado');
        const tipo = document.getElementById('tipoQuestao').value;

        // 1. Validar o enunciado (sempre)
        let enunciadoValido = false;
        if (enunciado.value.trim() === '') {
            erroEnunciado.innerText = 'Você precisa digitar o enunciado da questão!';
        } else {
            erroEnunciado.innerText = '';
            enunciadoValido = true;
        }
        let alternativasValidas = true;
        if (tipo === 'alternativa') {
            let a = validarCampoAlternativa('alt-a', 'altAErro', 'A');
            let b = validarCampoAlternativa('alt-b', 'altBErro', 'B');
            let c = validarCampoAlternativa('alt-c', 'altCErro', 'C');
            let d = validarCampoAlternativa('alt-d', 'altDErro', 'D');
            
            alternativasValidas = (a && b && c && d);
        }

        if (enunciadoValido && alternativasValidas) {
            alert('Questão cadastrada com sucesso!');
        } else {
            alert('Por favor, corrija os erros no formulário.');
        }
    });
}


// Redirecionamento de botões
if (document.getElementById('red-to-quiz')) {
    const botao = document.getElementById("red-to-quiz");

    function redirecionar() {
        window.location.href = "quiz.html";
    }

    botao.addEventListener("click", redirecionar);
}