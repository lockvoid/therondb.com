(function() {
  const [header] = $('header.main');

  window.addEventListener('scroll', () => {
    header.classList.toggle('narrow', window.pageYOffset > 40);
  });

  header.$('a#signin').forEach(link => {
    if (getCookie('theronAuth') === 'true') {
      link.innerHTML = 'Go to App';
      link.href = '/';
    }
  });

  $('a[href*="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const hash = `#${anchor.href.split("#")[1]}`, target = $(hash)[0];

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
