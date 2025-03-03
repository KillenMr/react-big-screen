(function(win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  var tid;
  var flexible = lib.flexible || (lib.flexible = {});

  if (metaEl) {
    console.warn("将根据已有的meta标签来设置缩放比例");
    var match = metaEl
      .getAttribute("content")
      // eslint-disable-next-line no-useless-escape
      .match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale, 10);
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute("content");
    if (content) {
      // eslint-disable-next-line no-useless-escape
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      // eslint-disable-next-line no-useless-escape
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  if (!dpr && !scale) {
    // eslint-disable-next-line no-unused-vars
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }

  docEl.setAttribute("data-dpr", dpr);
  if (!metaEl) {
    metaEl = doc.createElement("meta");
    metaEl.setAttribute("name", "viewport");
    metaEl.setAttribute(
      "content",
      "initial-scale=" +
        scale +
        ", maximum-scale=" +
        scale +
        ", minimum-scale=" +
        scale +
        ", user-scalable=no"
    );
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement("div");
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    // 最小1366px，最大适配2560px
    if (width / dpr < 1366) {
      width = 1366 * dpr;
    } else if (width / dpr > 2560) {
      width = 2560 * dpr;
    }
    // 设置成24等份，设计稿时1920px的，这样1rem就是80px
    var rem = width / 24;
    docEl.style.fontSize = rem + "px";
    flexible.rem = win.rem = rem;

    // 确保页面宽度自适应
    docEl.style.width = "100%";
    // 设置根元素最小高度
    docEl.style.minHeight = "100vh";
  }

  win.addEventListener(
    "resize",
    function() {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    },
    false
  );
  win.addEventListener(
    "pageshow",
    function(e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    },
    false
  );

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = 12 * dpr + "px";
  } else {
    doc.addEventListener(
      "DOMContentLoaded",
      // eslint-disable-next-line no-unused-vars
      function(e) {
        doc.body.style.fontSize = 12 * dpr + "px";
      },
      false
    );
  }

  refreshRem();

  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function(d) {
    var val = parseFloat(d) * this.rem;
    if (typeof d === "string" && d.match(/rem$/)) {
      val += "px";
    }
    return val;
  };
  flexible.px2rem = function(d) {
    var val = parseFloat(d) / this.rem;
    if (typeof d === "string" && d.match(/px$/)) {
      val += "rem";
    }
    return val;
  };
})(window, window["lib"] || (window["lib"] = {}));
