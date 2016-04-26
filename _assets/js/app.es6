const $ = selector => (
  [...document.querySelectorAll(selector)]
);

function getCookie(name) {
  const regexp = new RegExp(`(?:^${name}|;\s*${name})=(.*?)(?:;|$)`, 'g');
  const result = regexp.exec(document.cookie);

  return (result === null) ? null : result[1];
}

function scrollTo(element, to, duration, callback) {
  if (duration <= 0) {
    return;
  }

  const perTick = (to - element.scrollTop) / duration * 10;

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;

    if (element.scrollTop === to) {
      return callback && callback();
    }

    scrollTo(element, to, duration - 10, callback);
  }, 10);
}

(function() {
  const nodes = $('aside.main section.tree h4');

  nodes.forEach(node => {
    node.addEventListener('click', event => node.parentElement.classList.toggle('active'));
  });
})();

(function() {
  const signIn = $('header.main a#signin');

  signIn.forEach(link => {
    if (getCookie('theronAuth') === 'true') {
      link.innerHTML = 'Go to App';
      link.href = '/';
    }
  });
})();

(function() {
  const anchors = $('a[href*="#"]:not([href="#"])');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
      const hash = `#${anchor.href.split("#")[1]}`;
      const target = $(hash)[0];

      if (target){
        event.preventDefault();

        scrollTo(document.body, target.offsetTop - 90, 10, () => {
          history.pushState(null, null, hash);
        });
      }
    });
  });

  setTimeout(() => {
    const target = $(':target')[0];

    if (target){
      scrollTo(document.body, target.offsetTop - 90, 10);
    }
  }, 500);
})();
