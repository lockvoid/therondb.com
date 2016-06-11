(function() {
  $('aside.navigation section.tree h4').forEach(node => {
    node.addEventListener('click', event => node.parentElement.classList.toggle('active'));
  });
})();
