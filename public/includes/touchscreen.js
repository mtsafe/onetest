(function (l) {
  var i, s = {
    touchend: function () {}
  };
  for (i in s) l.addEventListener(i, s)
})(document);
