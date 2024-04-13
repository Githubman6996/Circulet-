(async function init() {
    if (window.game) {
        let user = await game.request('/api/user');

        // document.querySelector('#settingsJoined').innerText = user.user.joined;
        document.querySelector('#settingsUser').innerText = user.user.username;
        document.querySelector('#settingsRole').innerText = user.user.role || 'Common';
        document.querySelector('#settingsID').innerText = user.user.id;
    } else setTimeout(init, 2);
})();

document.body.onload = () => {
    if (localStorage.getItem('theme') == 'Dark') document.getElementById('themeselect').value = "Dark"
    else if (localStorage.getItem('theme') == 'Red') document.getElementById('themeselect').value = "Red"
    else document.getElementById('themeselect').value = "Blue (default)"
}

document.getElementById('themeselect').onchange = () => {
    localStorage.setItem('theme', document.getElementById('themeselect').value)
    location.reload();
} 