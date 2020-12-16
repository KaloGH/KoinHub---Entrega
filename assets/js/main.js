import * as cookie from './cookies.js';
import * as showPage from './pages.js';

(() => {
    document.addEventListener('DOMContentLoaded', () => {

        cookie.getCookie('username') == null ? showPage.login() : showPage.home();

    });
})();