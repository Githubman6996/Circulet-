(async function init() {
    if (window.game) {
        document.querySelector('.containerButton').onclick = async (e) => {
            e.preventDefault();

            let login = await game.request('/api/signup', {
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
            });

            if (login.error) {
                document.querySelector('.errorContainer').style.display = 'flex';
                document.getElementById('errorText').innerHTML = login.reason;
            } else {
                sendNotification('Success!','You have successfully created an account for circulet.', '/media/favicon.png');
                location.href = '/stats';
            }
        };
    } else setTimeout(init, 2);
})();