//====================================================================================================
//================================== I M P O R T S ===================================================
//====================================================================================================
import { getJsonData } from './fetchJson.js';
import * as cookie from './cookies.js';
import * as utils from './utils.js';
import { CryptoInfo } from './cryptoInfo.js';
import { User } from './user.js';
var usuario;
let cryptoInfo = new CryptoInfo();
//TODO: Añadir dinero a la cuenta del usuario.
//TODO: Añadir tabla y añadir botones estilo SpringMVC para cryptomonedas. Comprar - Más info - ¿"Vender"?.


// Contenedor principal.
const mainDiv = document.body.querySelector('#content');
//====================================================================================================
//====================================================================================================
//====================================================================================================

//====================================================================================================
//===================================== L O G I N ====================================================
//====================================================================================================
export { login }
function login() {

    const html = `<div class="container">
    <h1>Inicar Sesion</h1>
    <div id="loginError" class="shadow-lg p-3 mb-5 bg-danger rounded invisible">Usuario o contraseña incorrectos.</div>
    <form id="loginForm" class="needs-validation" novalidate>
    <div class="form-group">
    <label for="uname">Usuario:</label>
    <input type="text" class="form-control" id="uname" placeholder="Ingresa usuario" name="uname" required>
    <div class="invalid-feedback">Porfavor rellena este campo.</div>
    </div>
    <div class="form-group">
    <label for="pwd">Contraseña:</label>
    <input type="password" class="form-control" id="pwd" placeholder="Ingresa contraseña" name="pswd" required>
    <div class="invalid-feedback">Porfavor rellena este campo.</div>
    </div>
    <button id="btnLogin" class="btn btn-primary">Iniciar Sesion</button>
    </form>
    </div> `;
    const divLogin = document.createElement('div');
    divLogin.id = 'divLogin';

    divLogin.innerHTML = html;

    mainDiv.appendChild(divLogin);
    addListeners.login();



}
//====================================================================================================
//====================================================================================================
//====================================================================================================

//====================================================================================================
//===================================== REGISTER  ====================================================
//====================================================================================================
export { register } //* Se utilizará mas adelante.
function register() {
    const html = `<h1>Register</h1>`;
    const divSignup = document.createElement('div');
    divSignup.id = 'divSignup';

    divSignup.innerHTML = html;

    mainDiv.appendChild(divSignup);

}
//====================================================================================================
//====================================================================================================
//====================================================================================================

//====================================================================================================
//===================================== H O M E ======================================================
//====================================================================================================

export { home }
async function home() {
    console.log(usuario);
    const html = `<div class="container"><h1 class="display-1"><b>Bienvenido - ${usuario.getUsername()}</b></h1><br>
    <div class="container"><h1 class="display-3"><b>Su saldo actual es <span style="color: green" id="balance">${usuario.getBalance()}€</span></b></h1><br>
    <div class="container"><h1><b>A continuación puedes añadir más saldo a tu cuenta.</b></h1><br>
    <form id="addSaldoForm">
    <div class="form-group">
    <input type="number" class="form-control form-control-lg" id="saldo" placeholder="Ingresar cantidad..." name="saldo">
    </div>
    <a id="btnAddSaldo" class="btn btn-primary">Agregar saldo</a>
    </form></div>`;

    const divHome = document.createElement('div');
    divHome.id = 'divHome';

    divHome.innerHTML = html;

    mainDiv.appendChild(divHome);


    addListeners.navigation();
    addListeners.addSaldo();
}
//====================================================================================================
//====================================================================================================
//====================================================================================================

//====================================================================================================
//===================================== C O I N S ====================================================
//====================================================================================================
async function coins() {
    const html = `<h1 class="display-1 text-center">Monedas</h1>`;

    const divTexto = document.createElement('div');
    divTexto.id = 'divCoins';

    divTexto.innerHTML = html;

    mainDiv.appendChild(divTexto);

    

        let coinsInfo = await cryptoInfo.coinsList();

        let table = document.createElement('table');
        table.classList.add('table');
        let htmlCoin = `<thead class="thead-dark">
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Abreviatura</th>
          <th>Precio Actual</th>
          <th>Volumen Total</th>
          <th>Puesto Ranking</th>
          <th>Acciones</th>
        </tr>
      </thead><tbody>`;
        for (let coin of coinsInfo) {
            console.log(coin);
            htmlCoin += `
            <tr>
            <td><img src="${coin.image}" height="50" width="50" heigth></img></td>
                <th>${coin.name}</th>
                <td>${coin.symbol}</td>
                <td>${coin.current_price}€</td>
                <td>${coin.total_volume}€</td>
                <td>${coin.market_cap_rank}</td>
                <td>
                <a class="btn btn-outline-primary" data-coin="${coin.name}"> Comprar </a>
                <a class="btn btn-outline-secondary"> Info </a>
                </td>
            </tr>`;
              table.innerHTML += ``;
        }

        htmlCoin += `</tbody>`;
        table.innerHTML = htmlCoin;


        mainDiv.appendChild(table);

        for (let coin of coinsInfo) {
            document.querySelector(`[data-coin="${coin.name}"]`).addEventListener('click',(event)=>{
                console.log(event.target.dataset.coin); //FIXME: continuar con esto.
            });
        }

}
//====================================================================================================
//====================================================================================================
//====================================================================================================

//====================================================================================================
//===================================== Listeners  ====================================================
//====================================================================================================
let addListeners = {
    login: async () => {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });

        // Validacion si existe usuario

        let users = await getJsonData('/assets/json/users.json');

        document.body.querySelector('#loginForm').addEventListener('submit', (event) => {
            event.preventDefault();
            let userValid = false;

            for (const user of users) {
                if (user.username == event.target[0].value && user.password == event.target[1].value) {
                    userValid = true;
                    // cookie.setCookie('username', user.username); //FIXME: remove
                    utils.clearPage();
                    usuario = new User(user.userid, user.username, user.email, user.balance);
                    home();
                }
            }

            if (!userValid)
                document.body.querySelector('#loginError').classList.replace('invisible', 'visible');

        });
    },
    navigation: () => {
        document.body.querySelector('#logOut').addEventListener('click', () => {
            console.log("Cerrar SEsion");
            // Eliminar cookie de usuario
            cookie.eraseCookie('username');
            utils.clearPage();
            login();
        });

        document.body.querySelector('#paginaMonedas').addEventListener('click', () => {
            utils.clearPage();
            coins();

        });

        document.body.querySelector('#paginaInicio').addEventListener('click', () => {
            utils.clearPage();
            home();
        });
    },
    addSaldo: () => {
        document.body.querySelector('#btnAddSaldo').addEventListener('click', (event) => {
            event.preventDefault();

            usuario.setBalance(usuario.balance + parseInt($('form').serializeArray()[0].value));


            document.querySelector('#balance').innerHTML = usuario.getBalance() + "€";
            //usuario.setBalance(usuario.balance + event.target[0].value);

        });


    }
}
//====================================================================================================
//====================================================================================================
//====================================================================================================