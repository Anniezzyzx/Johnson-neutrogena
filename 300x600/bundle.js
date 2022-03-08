(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      log.debug = true; // set to false before publishing

      var dom = domIds(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        var tl = gsap.timeline({
          defaults: {},
          onComplete: addRollover
        });
        tl.from(['#img_1'], 1, {
          scale: 1.05,
          force3D: false,
          autoAlpha: 0
        }).staggerFrom(['#txt_1', '#txt_2', '#txt_2_b'], .5, {
          rotateX: -90,
          ease: Cubic.easeOut
        }, .13, '-=0.5').staggerTo(['#txt_1', '#txt_2', '#txt_2_b'], .5, {
          rotateX: 90,
          ease: Cubic.easeIn,
          delay: 1.3
        }, .10).to(['#img_1'], 0.1, {
          autoAlpha: 0
        }, '-=0.2').staggerFrom(['#branding', '#txt_3'], .5, {
          rotateX: -90,
          ease: Cubic.easeOut
        }, .10).staggerFrom(['#img_2', '#img_3'], .5, {
          x: -300,
          ease: Cubic.easeOut
        }, .08, '-=0.7').staggerFrom(['#img_4', '#img_5'], .5, {
          x: 300,
          ease: Cubic.easeOut
        }, .08, '-=0.6').to(['#img_6'], 1, {
          autoAlpha: 1,
          ease: Cubic.easeOut
        }, '-=0.2') // .to(['#img_6'],2,{autoAlpha:1,scale:1.1,force3D:false, ease: Cubic.easeOut},'-=0.4')
        // .to(['#img_6'],1,{scale:1,force3D:false, ease: Cubic.easeIn},'-=0.3')
        .from("#cta_container", .5, {
          rotateX: -40,
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, '-=1');
        dom.ad_content.classList.remove('invisible');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          gsap.to("#cta", 1, {
            scaleX: 1.1,
            ease: Cubic.easeOut
          }); // Hover enter code goes here. Please remove this comment.
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          gsap.to("#cta", 1, {
            scaleX: 1,
            ease: Cubic.easeOut
          }); // Hover out code goes here. Please remove this comment.
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
