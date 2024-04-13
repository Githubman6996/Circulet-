function sendNotification(title, message, image) {
    if (Notification.permission === 'granted') {
        const options = {
            body: message,
            icon: image
        };
        const notification = new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const options = {
                    body: message,
                    icon: image
                };
                const notification = new Notification(title, options);
            }
        });
    }
    
}
function sendIngameNotice (title, message, image){
    document.body.insertAdjacentHTML('beforeend', ` <div class="notification"><div class="notificationImgHolder"><img src="${image}" alt="image" class="notificationImg" draggable="false"></div><div class="notificationText"><text class="notificationTitle">${title}</text><p class="notificationDesc">${message}</p></div></div>`);
    setTimeout(() => {document.querySelector('.notification').classList.add("noticeLeave")}, 4000);
    setTimeout(() => {document.querySelector('.notification').remove()}, 5000);
}