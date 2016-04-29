const $ = selector => (
  [...document.querySelectorAll(selector)]
);

function getCookie(name) {
  const regexp = new RegExp(`(?:^${name}|;\s*${name})=(.*?)(?:;|$)`, 'g');
  const result = regexp.exec(document.cookie);

  return (result === null) ? null : result[1];
}

function scrollTo(to, duration, callback) {
  if (duration <= 0) {
    return callback && callback();
  }

  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const perTick = (to - scrollTop) / duration * 10;

  setTimeout(() => {
    document.documentElement.scrollTop = document.body.scrollTop = scrollTop + perTick;

    if (scrollTop === to) {
      return;
    }

    scrollTo(to, duration - 10, callback);
  }, 10);
}

(function() {
  const nodes = $('aside.navigation section.tree h4');

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

        scrollTo(target.offsetTop - 90, 10, () => {
          history.pushState(null, null, hash);
        });
      }
    });
  });

  setTimeout(() => {
    const target = $(':target')[0];

    if (target){
      scrollTo(target.offsetTop - 90, 10);
    }
  }, 500);
})();

(function() {
  const header = $('header.main')[0];

  window.addEventListener('scroll', () => {
    header.classList.toggle('narrow', window.pageYOffset > 100);
  });
})();
