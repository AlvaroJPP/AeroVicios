document.addEventListener("DOMContentLoaded", function() {
    // Função para criar e retornar uma div flutuante
    function createFloatingDiv(id, innerHTML) {
        var div = document.createElement('div');
        div.className = 'floating-div';
        div.id = id;
        div.innerHTML = innerHTML;
        document.body.appendChild(div);
        div.style.display = 'none'; // Assegura que a div esteja escondida inicialmente
        return div;
    }

    // Função para criar e retornar uma overlay
    function createOverlay() {
        var overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'overlay';
        document.body.appendChild(overlay);
        overlay.style.display = 'none'; // Assegura que a overlay esteja escondida inicialmente
        return overlay;
    }

    // Cria a div flutuante com o formulário de login
    var loginDiv = createFloatingDiv('loginDiv', `
        <form id="loginForm" action="/login" method="POST">
            <h2 id="naoquero">Login</h2>
            <label for="loginUsername" id="naoquero">Usuário:</label>
            <input type="email" id="loginEmail" name="email" placeholder="Digite o seu email" required>
            <label for="loginPassword" id="naoquero">Senha:</label>
            <input type="password" id="loginPassword" name="password" placeholder="Digite a sua senha" required>
            <button type="submit" class="button is-warning">Entrar</button>
            <button type="button" class="button is-warning" id= "closeDivBtn">Fechar</button>
        </form>
    `);

    // Cria a div flutuante com o formulário de cadastro
    var registerDiv = createFloatingDiv('registerDiv', `
        <form id="registerForm" action="/sign" method="POST">
            <h2>Cadastro</h2>
            <label for="registerUsername" id="naoquero">Usuário:</label>
            <input type="text" id="registerUsername" name="username" placeholder="Digite um nome de usuario" required >
            <label for="registerEmail" id="naoquero">Email:</label>
            <input type="email" id="registerEmail" name="email" placeholder="Digite um email" required>
            <label for="registerPassword" id="naoquero">Senha:</label>
            <input type="password" id="registerPassword" name="password" placeholder="Digite uma senha" required>
            <button type="submit"class="button is-warning">Cadastrar</button>
            <button type="button" class="button is-warning" id= "closeDivBtn">Fechar</button>
        </form>
    `);

    // Cria a overlay de fundo
    var overlay = createOverlay();

    // Função para exibir a div flutuante e a overlay
    function showDiv(div) {
        // Esconde todas as divs flutuantes antes de mostrar a nova
        hideDivs();
        div.style.display = 'flex';
        overlay.style.display = 'block';
    }

    // Função para esconder todas as divs flutuantes e a overlay
    function hideDivs() {
        loginDiv.style.display = 'none';
        registerDiv.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Adiciona eventos aos botões
    document.getElementById('loginBtn').addEventListener('click', function() {
        showDiv(loginDiv);
    });
    document.getElementById('registerBtn').addEventListener('click', function() {
        showDiv(registerDiv);
    });

    // Adiciona evento ao botão de fechar nas divs flutuantes
    document.querySelectorAll('#closeDivBtn').forEach(function(btn) {
        btn.addEventListener('click', hideDivs);
    });

    // Adiciona evento para esconder as divs quando a overlay é clicada
    overlay.addEventListener('click', hideDivs);

    // Previne o comportamento padrão de submit dos formulários para evitar recarregar a página
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = new FormData(event.target)
        
        const body = {
            senha: form.get('password'),
            email: form.get('email')    
        }

        fetch('http://localhost:3490/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>{
            alert(res.message)
            if(res.user) {
                const div = document.querySelector('#menu-contat')
                div.innerHTML = `
                    <a class="navbar-item" href="#" class="button is-info is-light">
                        <span class="icon">
                            <i class="fas fa-user"></i>
                            ${res.user.nome}
                        </span>`
            }
        })
        .catch(alert)
    });
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = new FormData(event.target)
        
        const body = {
            nome: form.get("username"),
            senha: form.get('password'),
            email: form.get('email')    
        }

        fetch('http://localhost:3490/sign', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(alert)
    });

    hideDivs();
    document.getElementById('scrollButton').addEventListener('click', function() {
        // Coordenadas específicas (exemplo: 0, 1000)
        window.scrollTo({
            top: 1100,
            behavior: 'instant'
        });
    });

});
