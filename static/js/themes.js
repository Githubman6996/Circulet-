let change = (elem, css, value) => {
    setInterval(() => {
        if (document.querySelectorAll(elem).length) Array.from(document.querySelectorAll(elem)).forEach(t => t.style[css] = value);
    }, 25);
};
if (localStorage.getItem('theme') == 'Dark') {
    let styleElement = document.createElement("style");
    styleElement.textContent = `::placeholder { color: #555555; } ::-webkit-scrollbar-track { background: #222222; } ::-webkit-scrollbar-thumb { background: #444444; } ::-webkit-scrollbar-thumb:hover { background: #555555; }`;
    document.head.appendChild(styleElement);
    change('.sidebarContainer', 'background-color', '#252525')
    change('.headerBar', 'background-color', '#1b1b1b')
    change('body', 'background-image', 'linear-gradient(180deg, rgb(56 56 56) 0%, rgb(0 0 0) 100%)')
    change('.styles__infoContainer___2uI-S-camelCase', 'background-color', '#444444')
    change('.styles__headerIcon___1ykdN-camelCase', 'color', '#8b8b8b')
    change('#themeselect', 'background-color', '#5c5c5c')
    change('.styles__link___5UR6_-camelCase', 'color', '#c3c3c3')
    change('.containerButton', 'background-color', '#5d5d5d')
    change('.headerSide', 'background-color', '#3a3a3a')
    change('.signUpButton', 'background-color', '#3a3a3a')
    change('.containerHeader2', 'color', '#353535')
    change('.containerHeader', 'color', '#262626')
    change('.containerDesc', 'color', '#262626')
    change('.errorContainer', 'border', '2px solid #696969')
    change('.errorContainer > p', 'color', '#696969')
    change('.mainModal', 'background-color', '#333333')
    change('.tokenAmountContainer','background-color','#1b1b1b')
    change('.leaderboardContainer','background-color','#2a2a2a')
    change('.newsContainer', 'background-color', '#2a2a2a')
    change('.cardContainer', 'background-color', '#4a4949')
} else if (localStorage.getItem('theme') == 'Red') {
    let styleElement = document.createElement("style");
    styleElement.textContent = `::placeholder { color: #555555; } ::-webkit-scrollbar-track { background: #5e0606; } ::-webkit-scrollbar-thumb { background: #b80000; } ::-webkit-scrollbar-thumb:hover { background: #da0606; }`;
    document.head.appendChild(styleElement);
    change('.sidebarContainer', 'background-color', '#9b0000')
    change('.headerBar', 'background-color', '#b20101')
    change('body', 'background-image', 'linear-gradient(180deg, rgb(133 5 5) 0%, rgb(53 2 2) 100%)')
    change('.styles__infoContainer___2uI-S-camelCase', 'background-color', '#9b0000')
    change('.styles__headerIcon___1ykdN-camelCase', 'color', '#966')
    change('#themeselect', 'background-color', '#7f0e0e')
    change('.styles__link___5UR6_-camelCase', 'color', '#f47979')
    change('.containerButton', 'background-color', '#b20101')
    change('.headerSide', 'background-color', '#b20101')
    change('.signUpButton', 'background-color', '#b20101')
    change('.containerHeader2', 'color', '#3f0000')
    change('.containerHeader', 'color', '#3f0000')
    change('.containerDesc', 'color', '#3f0000')
    change('.errorContainer', 'border', '2px solid #9c0c0c')
    change('.errorContainer > p', 'color', '#9c0c0c')
    change('.mainModal', 'background-color', '#ab0909')
    change('.tokenAmountContainer','background-color','#b20101')
    change('.leaderboardContainer','background-color','#690808')
    change('.newsContainer', 'background-color', '#690808')
    change('.cardContainer', 'background-color', '#9d1313')
} else {}