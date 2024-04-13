(async function init() {
    if (window.game) {
        document.querySelector('.containerButton').onclick = async (e) => {
            e.preventDefault();

            let login = await game.request('/api/login', {
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
            });

            if (login.error) {
                document.querySelector('.errorContainer').style.display = 'flex';
                document.getElementById('errorText').innerHTML = login.reason;
            } else location.href = '/stats';
        };
    } else setTimeout(init, 2);
})();