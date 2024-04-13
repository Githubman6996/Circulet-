(async function init() {
    if (window.game) {
        let user = await game.request('/api/user');

        console.log(user)

        document.querySelector('.pfpImage').src = user.user.avatar;
        document.querySelector('#username').innerText = user.user.username;
        document.querySelector('#role').innerText = user.user.role || 'Common';
        document.querySelector('.userID').innerText = user.user.id;

        document.querySelector('.pfpImage').onclick = () => {
            document.body.insertAdjacentHTML('beforeend', `<div class="modalContainer"><div class="modalCloseBtn" id="modalCloseBtn" role="button"></div><div class="mainModal"><div class="circulosHolder"><img src="/media/favicon.png" role="button" tabindex="0" class="smallCirculo"></div></div></div>`);
            document.getElementById("modalCloseBtn").onclick = () => document.querySelector('.modalContainer').remove();
        } 
    } else setTimeout(init, 2);
})();
