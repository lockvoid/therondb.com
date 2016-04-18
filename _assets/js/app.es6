const $ = selector => (
  [...document.querySelectorAll(selector)]
);

function getCookie(name) {
  const regexp = new RegExp(`(?:^${name}|;\s*${name})=(.*?)(?:;|$)`, 'g');
  const result = regexp.exec(document.cookie);

  return (result === null) ? null : result[1];
}

(function() {
  const nodes = $('aside.main section.tree h4');

  nodes.forEach(node => {
    node.addEventListener('click', event => node.parentElement.classList.toggle('active'));
  });

  const signIn = $('header.main a#signin');

  signIn.forEach(link => {
    if (getCookie('theronAuth') === 'true') {
      link.innerHTML = 'Go to App';
      link.href = '/';
    }
  });
})();
