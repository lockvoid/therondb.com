function $(selector, context = document) {
  return [...context.querySelectorAll(selector)].map(el => {
    el.$ = selector => $(selector, el);
    return el;
  });
}

function getCookie(name) {
  const regexp = new RegExp(`(?:^${name}|;\s*${name})=(.*?)(?:;|$)`, 'g');
  const result = regexp.exec(document.cookie);

  return result === null ? null : result[1];
}

function scrollTo(to, duration, callback) {
  if (duration <= 0) {
    return callback && callback();
  }

  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  setTimeout(() => {
    document.documentElement.scrollTop = document.body.scrollTop = scrollTop + (to - scrollTop) / duration * 10;

    if (scrollTop === to) {
      return;
    }

    scrollTo(to, duration - 10, callback);
  }, 10);
}

function typing(el, index = 0) {
  const letter = el.getAttribute('excerpts')[index];

  if (letter === '|' || letter === undefined) {
    setTimeout(() => {
      el.classList.add('highlight')

      setTimeout(() => {
        el.innerHTML = '';
        el.classList.remove('highlight')

        if (letter) {
          typing(el, index + 1)
        } else {
          typing(el, 0);
        }
      }, 300);
    }, 3000);
  } else {
    el.innerHTML = el.innerHTML + letter;

    setTimeout(() => {
      typing(el, index + 1)
    }, 50)
  }
}
