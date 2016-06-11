(function() {
  $('body.home span.typing').forEach(el => typing(el));

  const series = $('body.home section.video a.episode');
  const videos = $('body.home section.video figure.video > div');

  series.forEach(currentEpisode => {
    currentEpisode.addEventListener('click', event => {
      event.preventDefault();

      if (currentEpisode.classList.contains('active')) {
        return;
      }

      series.forEach(episode => {
        if (episode.getAttribute('data-tab') === currentEpisode.getAttribute('data-tab')) {
          episode.classList.add('active');
        } else {
          episode.classList.remove('active');
        }
      });

      videos.forEach(video => {
        if (video.getAttribute('data-tab') === currentEpisode.getAttribute('data-tab')) {
          video.classList.add('active');
        } else {
          video.classList.remove('active');
          video.firstChild.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
        }
      });
    });
  });
})();
