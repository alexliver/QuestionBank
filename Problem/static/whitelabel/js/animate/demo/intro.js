// Generated by CoffeeScript 1.4.0
(function() {
  var SliderControl, introAnimation,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SliderControl = (function() {

    function SliderControl(el) {
      this.el = el;
      this.updateProgress = __bind(this.updateProgress, this);

      this.handleResize = __bind(this.handleResize, this);

      this.drag = __bind(this.drag, this);

      this.stopDrag = __bind(this.stopDrag, this);

      this.startDrag = __bind(this.startDrag, this);

      this.progbar = this.el.find('.progress');
      this.handle = this.el.find('.handle');
      this.progX = this.el.offset().left;
      this.progW = this.el.width();
      this.percent = 0;
      this.progress = 0;
      this.isDragging = false;
      this.mouseDown = false;
      this.handle.on('mousedown', this.startDrag);
      this.el.on('scrubbing:tick', this.updateProgress);
      this.el.on('click', this.drag);
      $(window).on('resize', {
        self: this
      }, this.handleResize);
    }

    SliderControl.prototype.startDrag = function(e) {
      this.isDragging = true;
      this.mouseDown = true;
      this.el.off('click');
      $(window).on('mousemove', this.drag);
      return $(window).on('mouseup', this.stopDrag);
    };

    SliderControl.prototype.stopDrag = function(e) {
      var _this = this;
      this.mouseDown = false;
      $(window).off('mousemove', this.drag);
      $(window).off('mouseup', this.stopDrag);
      return setTimeout(function() {
        return _this.el.on('click', _this.drag);
      }, 500);
    };

    SliderControl.prototype.drag = function(e) {
      var newPerc,
        _this = this;
      newPerc = (e.pageX - this.progX) / this.progW;
      newPerc = Math.round(newPerc * 1000) / 10;
      if (newPerc < 0) {
        newPerc = 0;
      } else if (newPerc > 100) {
        newPerc = 100;
      }
      if (e.type === 'mousemove') {
        this.percent = newPerc;
        return TweenMax.to(this, 0.5, {
          progress: newPerc,
          overwrite: 'all',
          onComplete: function() {
            if (_this.mouseDown) {
              return;
            }
            _this.$isDragging = false;
            return _this.el.trigger('scrubbing:complete');
          },
          onUpdate: function() {
            return _this.el.trigger('scrubbing:tick', _this.progress);
          },
          ease: Power2.easeOut
        });
      } else {
        this.percent = newPerc;
        return TweenMax.to(this, 0.6, {
          progress: newPerc,
          overwrite: 'all',
          onComplete: function() {
            _this.el.isDragging = false;
            return _this.el.trigger('scrubbing:complete');
          },
          onUpdate: function() {
            return _this.el.trigger('scrubbing:tick', _this.progress);
          },
          ease: Back.easeOut
        });
      }
    };

    SliderControl.prototype.handleResize = function(e) {
      this.progX = this.el.offset().left;
      return this.progW = this.el.width();
    };

    SliderControl.prototype.updateProgress = function() {
      if (this.progress > 100) {
        this.progress = 100;
      } else if (this.progress < 0) {
        this.progress = 0;
      }
      this.progbar.css('width', this.progress + '%');
      return this.handle.css('left', this.progress + '%');
    };

    SliderControl.prototype.setProgress = function(prog) {
      this.progress = prog;
      return this.updateProgress();
    };

    SliderControl.prototype.destroy = function() {
      clearInterval(this.addedToStageListener);
      $(window).off('resize', this.handleResize);
      this.el.off();
      return this.progbar = null;
    };

    return SliderControl;

  })();

  /* --------------------------------------------
       Begin intro.coffee
  --------------------------------------------
  */


  SliderControl = (function() {

    function SliderControl(el) {
      this.el = el;
      this.updateProgress = __bind(this.updateProgress, this);

      this.handleResize = __bind(this.handleResize, this);

      this.drag = __bind(this.drag, this);

      this.stopDrag = __bind(this.stopDrag, this);

      this.startDrag = __bind(this.startDrag, this);

      this.progbar = this.el.find('.progress');
      this.handle = this.el.find('.handle');
      this.progX = this.el.offset().left;
      this.progW = this.el.width();
      this.percent = 0;
      this.progress = 0;
      this.isDragging = false;
      this.mouseDown = false;
      this.handle.on('mousedown', this.startDrag);
      this.el.on('scrubbing:tick', this.updateProgress);
      this.el.on('click', this.drag);
      $(window).on('resize', {
        self: this
      }, this.handleResize);
    }

    SliderControl.prototype.startDrag = function(e) {
      this.isDragging = true;
      this.mouseDown = true;
      this.el.off('click');
      $(window).on('mousemove', this.drag);
      return $(window).on('mouseup', this.stopDrag);
    };

    SliderControl.prototype.stopDrag = function(e) {
      var _this = this;
      this.mouseDown = false;
      $(window).off('mousemove', this.drag);
      $(window).off('mouseup', this.stopDrag);
      return setTimeout(function() {
        return _this.el.on('click', _this.drag);
      }, 500);
    };

    SliderControl.prototype.drag = function(e) {
      var newPerc,
        _this = this;
      newPerc = (e.pageX - this.progX) / this.progW;
      newPerc = Math.round(newPerc * 1000) / 10;
      if (newPerc < 0) {
        newPerc = 0;
      } else if (newPerc > 100) {
        newPerc = 100;
      }
      if (e.type === 'mousemove') {
        this.percent = newPerc;
        return TweenMax.to(this, 0.5, {
          progress: newPerc,
          overwrite: 'all',
          onComplete: function() {
            if (_this.mouseDown) {
              return;
            }
            _this.$isDragging = false;
            return _this.el.trigger('scrubbing:complete');
          },
          onUpdate: function() {
            return _this.el.trigger('scrubbing:tick', _this.progress);
          },
          ease: Power2.easeOut
        });
      } else {
        this.percent = newPerc;
        return TweenMax.to(this, 1.2, {
          progress: newPerc,
          overwrite: 'all',
          onComplete: function() {
            _this.el.isDragging = false;
            return _this.el.trigger('scrubbing:complete');
          },
          onUpdate: function() {
            return _this.el.trigger('scrubbing:tick', _this.progress);
          },
          ease: Elastic.easeOut
        });
      }
    };

    SliderControl.prototype.handleResize = function(e) {
      this.progX = this.el.offset().left;
      return this.progW = this.el.width();
    };

    SliderControl.prototype.updateProgress = function() {
      if (this.progress > 100) {
        this.progress = 100;
      } else if (this.progress < 0) {
        this.progress = 0;
      }
      this.progbar.css('width', this.progress + '%');
      return this.handle.css('left', this.progress + '%');
    };

    SliderControl.prototype.setProgress = function(prog) {
      this.progress = prog;
      return this.updateProgress();
    };

    SliderControl.prototype.getProgress = function() {
      return this.progress;
    };

    SliderControl.prototype.destroy = function() {
      clearInterval(this.addedToStageListener);
      $(window).off('resize', this.handleResize);
      this.el.off();
      return this.progbar = null;
    };

    return SliderControl;

  })();

  introAnimation = (function() {

    function introAnimation() {
      this.updateTimeline = __bind(this.updateTimeline, this);

      this.handleAnimationComplete = __bind(this.handleAnimationComplete, this);

      var _this = this;
      this.page = $('#main > article[id*=post-]');
      this.header = this.page.find('> header');
      this.title = this.header.find('h1');
      this.subtitle = this.header.find('.tagline');
      this.content = this.page.find('> .post_content');
      this.contentChildren = this.content.find('> *:not(#drag-me-boxes)');
      this.dragMe = this.content.find('#drag-me-boxes');
      this.timeline = new TimelineLite({
        paused: true,
        onComplete: this.handleAnimationComplete
      });
      this.sliderVisible = false;
      setTimeout(function() {
        _this.makeItemsVisible();
        return _this.animate();
      }, 500);
    }

    introAnimation.prototype.animate = function() {
      var maxX, maxY, tl,
        _this = this;
      tl = new TimelineLite({
        onComplete: function() {
          return _this.timeline.play();
        }
      });
      tl.from(this.title, 1.3, {
        css: {
          alpha: 0,
          y: "-50"
        },
        ease: Power3.easeOut
      });
      tl.from(this.subtitle, 0.7, {
        css: {
          alpha: 0,
          y: "-20"
        },
        ease: Power3.easeOut
      }, -0.3);
      this.contentChildren.each(function(i, el) {
        var x;
        if (i % 2 === 0) {
          x = 530 - window.innerWidth;
        } else {
          x = window.innerWidth;
        }
        return tl.from($(el), 0.8, {
          css: {
            alpha: 0,
            x: x,
            rotation: Math.random() * 5 - 10
          },
          ease: Power3.easeOut
        }, -0.6);
      });
      tl.to(this.page, 1.5, {
        css: {
          y: "+150"
        },
        ease: Power2.easeInOut
      }, -1.5);
      tl.to(this.page, 1.1, {
        css: {
          y: 0,
          alpha: 1
        },
        ease: Elastic.easeOut
      }, -0.5);
      tl.from(this.dragMe, 0.7, {
        css: {
          height: 0
        },
        ease: Linear.easeNone
      }, -0.2);
      maxX = window.innerWidth;
      maxY = $(window).height();
      return this.dragMe.find('.letter .pixel').each(function(i, el) {
        var scaleTween, subTl;
        subTl = new TimelineLite({
          delay: i * 0.1
        });
        subTl.from($(el), 1, {
          css: {
            alpha: 0,
            x: Math.random() * maxX - (maxX / 2),
            y: Math.random() * maxY - (maxY / 2)
          },
          ease: Power3.easeInOut
        });
        TweenMax.to($(el), 0.2, {
          css: {
            backgroundColor: "#111111"
          },
          repeat: -1,
          repeatDelay: Math.random() * 40 + 3,
          yoyo: true
        });
        scaleTween = TweenMax.from($(el), 0.8, {
          css: {
            scale: Math.random() * 3,
            rotation: Math.random() * 360 - 180
          }
        });
        subTl.insert(scaleTween, 0.8);
        return _this.timeline.insert(subTl, 0);
      });
    };

    introAnimation.prototype.makeItemsVisible = function() {
      this.header.css('visibility', 'visible');
      return this.content.css('visibility', 'visible');
    };

    introAnimation.prototype.handleAnimationComplete = function() {
      var obj, tl,
        _this = this;
      if (this.sliderVisible) {
        return;
      }
      this.sliderVisible = true;
      this.timeline.pause();
      this.slider = new SliderControl($('#drag-me-boxes .slider-control'));
      this.slider.el.on('scrubbing:tick', this.updateTimeline);
      this.slider.setProgress(100);
      obj = {
        progress: 1
      };
      tl = new TimelineLite({
        delay: 0.4,
        onComplete: function() {
          return TweenMax.to(obj, 2, {
            progress: 0.1,
            onUpdate: function() {
              _this.slider.setProgress(obj.progress * 100);
              return _this.timeline.progress(obj.progress);
            },
            onComplete: function() {
              return $(window).resize();
            },
            ease: Power2.easeInOut,
            repeat: 1,
            repeatDelay: 0.5,
            yoyo: true
          });
        }
      });
      this.slider.el.find('.track .pixel').each(function(i, el) {
        var $pixel;
        $pixel = $(el);
        return tl.from($pixel, 0.3, {
          css: {
            alpha: 0
          },
          ease: Linear.easeNone
        }, -0.28);
      });
      this.slider.el.find('.handle .pixel').each(function(i, el) {
        var $pixel;
        $pixel = $(el);
        $pixel.css('opacity', 1);
        return tl.from($pixel, 0.6, {
          css: {
            scale: 0
          },
          ease: Back.easeOut
        }, -0.5);
      });
      return this.slider.el.css('display', 'block');
    };

    introAnimation.prototype.updateTimeline = function(e, progress) {
      return this.timeline.progress(progress / 100);
    };

    return introAnimation;

  })();

  $(function() {
    return new introAnimation();
  });

}).call(this);
