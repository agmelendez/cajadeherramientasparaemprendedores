// --- REDIRECT.JS ---
// Force trailing slash for correct relative path resolution on GitHub Pages / custom subdirectories
(function() {
  if (window.location.protocol.indexOf('http') === 0) {
    var path = window.location.pathname;
    if (!path.endsWith('/') && !path.endsWith('.html') && path.indexOf('.') === -1) {
      window.location.replace(window.location.origin + path + '/' + window.location.search + window.location.hash);
    }
  }
})();
