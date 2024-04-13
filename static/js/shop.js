(async function init() {
    if (window.game) {
        let user = await game.request('/api/user');
        document.querySelector('#userTokens').innerHTML = user.user.tokens;
    } else setTimeout(init, 2);
})();
