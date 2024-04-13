console.log('%cIMPORTANT!', 'color: red;font-size: 50px;text-shadow: 0 0 10px red;');
console.log('%cPlease do not paste any scripts here, they might be a scam, and may grant a hacker access to your account.', 'color: grey;font-size: 20px;');
console.log('%cPlease contact a Circulet developer or owner before running any scripts here!', 'color: grey;font-size: 15px;');

game = {
  request: async (url, params, callback) => {
      let fetchResult = await fetch(url, {
          method: (params) ? 'POST' : 'GET',
          body: params ? JSON.stringify(params) : undefined,
          headers: {
              'Content-Type': 'application/json'
          }
      });

      let fetchData = await fetchResult.json();
      if (callback) callback(fetchData);
      else return fetchData;
  },
  startLoading: () => {
    let loader = document.createElement('div');
    loader.classList.add('loadingContainer');
    loader.id = 'loading';
    let favicon = document.createElement('img');
    favicon.style.cssText = 'animation: loading 3s infinite;width:80px;';
    favicon.src = '/media/favicon.png';
    loader.appendChild(favicon);
    document.body.appendChild(loader);
  },
  stopLoading: () => {
    document.getElementById('loading').remove();
  }
};