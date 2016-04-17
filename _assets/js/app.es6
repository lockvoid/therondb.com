const $ = selector => (
  [...document.querySelectorAll(selector)]
);

(function() {
  const nodes = $('aside.main section.tree h4');

  nodes.forEach(node => {
    node.addEventListener('click', event => node.parentElement.classList.toggle('active'));
  });
})();
