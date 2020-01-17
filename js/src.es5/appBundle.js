"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var appBundle = function () {
  'use strict';

  var Api =
  /*#__PURE__*/
  function () {
    function Api() {
      _classCallCheck(this, Api);
    }

    _createClass(Api, [{
      key: "getAppData",
      value: function getAppData() {
        var promises = [this._getMovies(), this._getTvShows()];
        return Promise.all(promises);
      }
    }, {
      key: "_getMovies",
      value: function _getMovies() {
        return fetch("./static/movies.json").then(function (response) {
          return response.json();
        }).then(function (data) {
          return {
            ref: "Movies",
            data: data
          };
        });
      }
    }, {
      key: "_getTvShows",
      value: function () {
        var _getTvShows2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var stream, data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch("./static/series.json");

                case 2:
                  stream = _context.sent;
                  _context.next = 5;
                  return stream.json();

                case 5:
                  data = _context.sent;
                  return _context.abrupt("return", {
                    ref: "TvShows",
                    data: data
                  });

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function _getTvShows() {
          return _getTvShows2.apply(this, arguments);
        }

        return _getTvShows;
      }()
    }]);

    return Api;
  }();

  var Splash =
  /*#__PURE__*/
  function (_lng$Component) {
    _inherits(Splash, _lng$Component);

    function Splash() {
      _classCallCheck(this, Splash);

      return _possibleConstructorReturn(this, _getPrototypeOf(Splash).apply(this, arguments));
    }

    _createClass(Splash, [{
      key: "_init",
      value: function _init() {
        this._setState("Loading");

        this._createAnimations();

        this._register();
      }
    }, {
      key: "_createAnimations",
      value: function _createAnimations() {
        this._reveal = this.animation({
          duration: 1.3,
          repeat: 0,
          delay: 1,
          actions: [{
            t: 'Background',
            p: 'y',
            v: {
              0.20: 0,
              1: -550
            }
          }, {
            t: 'GrayBackdrop',
            p: 'rotation',
            v: {
              0: -0.3,
              1: 0
            }
          }, {
            t: 'GrayBackdrop',
            p: 'scale',
            v: {
              0.6: 1.1,
              1: 1
            }
          }, {
            t: 'GrayBackdrop',
            p: 'y',
            v: {
              0: 1000,
              1: 0
            }
          }, {
            t: 'GrayBackdrop',
            p: 'x',
            v: {
              0: 200,
              1: 0
            }
          }, {
            t: 'Logo',
            p: 'y',
            v: {
              0: 714,
              1: -400
            }
          }, {
            t: 'Logo',
            p: 'rotation',
            v: {
              0: -0.3,
              1: -0
            }
          }]
        });
      }
    }, {
      key: "_register",
      value: function _register() {
        var _this = this;

        this._reveal.on("finish", function () {
          _this.signal("animationFinished");
        });
      }
    }, {
      key: "startAnimation",
      value: function startAnimation() {
        this._start();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Background: {
            src: App.getPath("background.png")
          },
          GrayBackdrop: {
            src: App.getPath("gradient.png"),
            scale: 1.1,
            w: 1920,
            h: 1080,
            y: 1000,
            x: 200,
            rotation: -0.3
          },
          Logo: {
            src: App.getPath("movies-tv-logo.png"),
            y: 714,
            x: 1100,
            rotation: -0.3
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this2) {
          _inherits(Loading, _this2);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "_start",
            value: function _start() {
              this._reveal.start();
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this3) {
          _inherits(Error, _this3);

          function Error() {
            _classCallCheck(this, Error);

            return _possibleConstructorReturn(this, _getPrototypeOf(Error).apply(this, arguments));
          }

          _createClass(Error, [{
            key: "$enter",
            value: function $enter() {// signal error & retry
            }
          }, {
            key: "$exit",
            value: function $exit() {// signal that we exit Error state
            }
          }]);

          return Error;
        }(this)];
      }
    }]);

    return Splash;
  }(lng.Component);

  var Loader =
  /*#__PURE__*/
  function (_lng$Component2) {
    _inherits(Loader, _lng$Component2);

    function Loader() {
      _classCallCheck(this, Loader);

      return _possibleConstructorReturn(this, _getPrototypeOf(Loader).apply(this, arguments));
    }

    _createClass(Loader, [{
      key: "_init",
      value: function _init() {
        this._spinner = this.tag("Spinner").animation({
          duration: 2,
          repeat: -1,
          actions: [{
            p: "rotation",
            v: {
              0: 0,
              1: Math.PI * 2
            }
          }]
        });
      }
    }, {
      key: "_active",
      value: function _active() {
        this._spinner.start();
      }
    }, {
      key: "_inactive",
      value: function _inactive() {
        this._spinner.stop();
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          w: 1920,
          h: 1080,
          color: 0xff000000,
          Spinner: {
            mount: 0.5,
            x: 960,
            y: 540,
            src: App.getPath("spinner.png")
          }
        };
      }
    }]);

    return Loader;
  }(lng.Component);

  var MainSliderItem =
  /*#__PURE__*/
  function (_lng$Component3) {
    _inherits(MainSliderItem, _lng$Component3);

    function MainSliderItem() {
      _classCallCheck(this, MainSliderItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(MainSliderItem).apply(this, arguments));
    }

    _createClass(MainSliderItem, [{
      key: "_focus",
      value: function _focus() {
        this.setSmooth("scale", 1.1);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.setSmooth("scale", 1);
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.patch({
          src: App.getPath("".concat(v.path, "/posterS.jpg"))
        });
      },
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          color: 0xffffffff,
          w: 370,
          h: 556,
          scale: 1,
          transitions: {
            scale: {
              duration: 0.3,
              delay: 0.05
            }
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [];
      }
    }, {
      key: "width",
      get: function get() {
        return 385;
      }
    }, {
      key: "height",
      get: function get() {
        return 556;
      }
    }]);

    return MainSliderItem;
  }(lng.Component);

  var Slider =
  /*#__PURE__*/
  function (_lng$Component4) {
    _inherits(Slider, _lng$Component4);

    function Slider() {
      _classCallCheck(this, Slider);

      return _possibleConstructorReturn(this, _getPrototypeOf(Slider).apply(this, arguments));
    }

    _createClass(Slider, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.setSmooth("alpha", 1);

        this._setState("Expanded");

        this._setIndex();
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.setSmooth("alpha", 0.5);

        this._setState("Collapsed");
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._index > 0) {
          this._setIndex(this._index - 1);
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._index < this.items.length - 1) {
          this._setIndex(this._index + 1);
        }
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.fireAncestors("$onItemSelect", {
          item: this.active.item
        });
      }
    }, {
      key: "_setIndex",
      value: function _setIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._index;
        this._index = index;
        this.patch({
          Items: {
            smooth: {
              x: !index ? 0 : index * -440
            }
          }
        });
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "data",
      set: function set(v) {
        var label = v.label,
            data = v.data;
        this.patch({
          Title: {
            text: {
              text: label.toUpperCase()
            }
          },
          Items: {
            children: data.map(function (item, idx) {
              return {
                type: MainSliderItem,
                x: idx * 350,
                item: item,
                scale: 0.9
              };
            })
          }
        });
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Items").children;
      }
    }, {
      key: "active",
      get: function get() {
        return this.items[this._index];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          alpha: 0.5,
          Title: {
            text: {
              text: "",
              fontSize: 40,
              fontFace: "verdana"
            }
          },
          Items: {
            y: 100
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this4) {
          _inherits(Expanded, _this4);

          function Expanded() {
            _classCallCheck(this, Expanded);

            return _possibleConstructorReturn(this, _getPrototypeOf(Expanded).apply(this, arguments));
          }

          _createClass(Expanded, [{
            key: "$enter",
            value: function $enter() {
              this.setSmooth("alpha", 1);
              this.items.forEach(function (item, idx) {
                item.patch({
                  smooth: {
                    x: [idx * 440, {
                      duration: 0.3,
                      delay: idx * 0.04
                    }],
                    scale: 1
                  }
                });
              });
            }
          }]);

          return Expanded;
        }(this),
        /*#__PURE__*/
        function (_this5) {
          _inherits(Collapsed, _this5);

          function Collapsed() {
            _classCallCheck(this, Collapsed);

            return _possibleConstructorReturn(this, _getPrototypeOf(Collapsed).apply(this, arguments));
          }

          _createClass(Collapsed, [{
            key: "$enter",
            value: function $enter() {
              this.setSmooth("alpha", 0.5);
              this.items.forEach(function (item, idx) {
                item.patch({
                  smooth: {
                    x: [idx * 350, {
                      duration: 0.3,
                      delay: idx * 0.03
                    }],
                    scale: 0.9
                  }
                });
              });
            }
          }]);

          return Collapsed;
        }(this)];
      }
    }]);

    return Slider;
  }(lng.Component);

  var Browse =
  /*#__PURE__*/
  function (_lng$Component5) {
    _inherits(Browse, _lng$Component5);

    function Browse() {
      _classCallCheck(this, Browse);

      return _possibleConstructorReturn(this, _getPrototypeOf(Browse).apply(this, arguments));
    }

    _createClass(Browse, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        if (this._index > 0) {
          this.setIndex(this._index - 1);
        } else {
          return false;
        }
      }
    }, {
      key: "_handleDown",
      value: function _handleDown() {
        if (this._index < this.items.length - 1) {
          this.setIndex(this._index + 1);
        }
      }
    }, {
      key: "setIndex",
      value: function setIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._index;
        this._index = index;
        this.patch({
          Sliders: {
            smooth: {
              y: !index ? 0 : index * -640
            }
          }
        });
      }
    }, {
      key: "data",
      set: function set(v) {
        this.patch({
          Sliders: {
            children: v.map(function (data, idx) {
              return {
                type: Slider,
                data: data,
                y: idx * 680
              };
            })
          }
        });
      }
    }, {
      key: "items",
      get: function get() {
        return this.tag("Sliders").children;
      }
    }, {
      key: "active",
      get: function get() {
        return this.items[this._index];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          Sliders: {}
        };
      }
    }]);

    return Browse;
  }(lng.Component);

  var Details =
  /*#__PURE__*/
  function (_lng$Component6) {
    _inherits(Details, _lng$Component6);

    function Details() {
      _classCallCheck(this, Details);

      return _possibleConstructorReturn(this, _getPrototypeOf(Details).apply(this, arguments));
    }

    _createClass(Details, [{
      key: "_init",
      value: function _init() {
        var _this6 = this;

        this._blur = this.tag("Blur").content;
        this._events = {
          showDetails: function showDetails() {
            var amount = _this6.tag("Blur").amount;

            if (amount === 3) {
              _this6.tag("Details").patch({
                smooth: {
                  alpha: 1,
                  y: 150
                }
              });
            }
          }
        };

        this._register();
      }
    }, {
      key: "_register",
      value: function _register() {
        var _this7 = this;

        this._blur.tag("Background").on("txLoaded", function (e) {
          _this7.signal("detailsLoaded");
        });

        this._blur.tag("Background").on("txError", function (e) {
          _this7._blur.tag("Background").texture = null;

          _this7.signal("detailsLoaded");
        });

        this.tag("Blur").transition("amount").on("finish", this._events.showDetails);
      }
    }, {
      key: "_updateDetails",
      value: function _updateDetails(_ref) {
        var path = _ref.path,
            cast = _ref.cast,
            title = _ref.title,
            year = _ref.year,
            info = _ref.info;
        this.patch({
          Details: {
            Poster: {
              src: App.getPath("".concat(path, "/posterS.jpg"))
            },
            Metadata: {
              Title: {
                text: {
                  text: title
                }
              },
              Year: {
                text: {
                  text: "released: ".concat(year)
                }
              },
              Info: {
                text: {
                  text: info
                }
              }
            }
          }
        });
      }
    }, {
      key: "_focus",
      value: function _focus() {
        this.tag("Blur").patch({
          smooth: {
            amount: 3,
            alpha: 0.4
          }
        });
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.patch({
          Blur: {
            smooth: {
              amount: 0,
              alpha: 1
            }
          },
          Details: {
            smooth: {
              alpha: 0,
              y: 300
            }
          }
        });
      }
    }, {
      key: "asset",
      set: function set(v) {
        this._asset = v;

        this._updateDetails(v);

        this._blur.tag("Background").src = App.getPath("".concat(v.path, "/backdrop.jpg"));
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          rect: true,
          w: 1920,
          h: 1080,
          color: 0xff000000,
          Blur: {
            type: lng.components.FastBlurComponent,
            amount: 0,
            w: 1920,
            h: 1080,
            transitions: {
              amount: {
                duration: 2.1,
                delay: 0.4
              },
              alpha: {
                duration: 1,
                delay: 2.5
              }
            },
            content: {
              Background: {
                w: 1920,
                h: 1080
              }
            }
          },
          Details: {
            x: 250,
            y: 300,
            flex: {
              direction: "row"
            },
            w: 1000,
            alpha: 0,
            Poster: {
              flexItem: {
                marginRight: 150
              }
            },
            Metadata: {
              flex: {
                direction: "column"
              },
              Title: {
                w: 900,
                text: {
                  fontFace: "RobotoRegular",
                  fontSize: 51,
                  lineHeight: 50
                }
              },
              Year: {
                w: 900,
                text: {
                  fontFace: "RobotoRegular",
                  fontSize: 28,
                  lineHeight: 50
                }
              },
              Info: {
                w: 700,
                text: {
                  fontFace: "RobotoRegular",
                  fontSize: 39,
                  lineHeight: 60
                }
              }
            }
          }
        };
      }
    }]);

    return Details;
  }(lng.Component);

  var Menu =
  /*#__PURE__*/
  function (_lng$Component7) {
    _inherits(Menu, _lng$Component7);

    function Menu() {
      _classCallCheck(this, Menu);

      return _possibleConstructorReturn(this, _getPrototypeOf(Menu).apply(this, arguments));
    }

    _createClass(Menu, [{
      key: "_init",
      value: function _init() {
        this._index = 0;
        this.patch({
          Movies: {
            type: MenuItem,
            item: {
              label: "Movies",
              ref: "Movies"
            }
          }
        });
        var shows = this.stage.c({
          type: MenuItem,
          item: {
            label: "Series",
            ref: "TvShows"
          }
        });
        this.childList.add(shows);
      }
    }, {
      key: "_handleLeft",
      value: function _handleLeft() {
        if (this._index > 0) {
          this.setIndex(this._index - 1);
        }
      }
    }, {
      key: "_handleRight",
      value: function _handleRight() {
        if (this._index < this.items.length - 1) {
          this.setIndex(this._index + 1);
        }
      }
    }, {
      key: "setIndex",
      value: function setIndex(index) {
        this._index = index;
      }
    }, {
      key: "_getFocused",
      value: function _getFocused() {
        return this.active;
      }
    }, {
      key: "_handleEnter",
      value: function _handleEnter() {
        this.signal("select", {
          item: this.active.item
        });
      }
    }, {
      key: "items",
      get: function get() {
        return this.children;
      }
    }, {
      key: "active",
      get: function get() {
        return this.items[this._index];
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          flex: {
            direction: "row"
          }
        };
      }
    }]);

    return Menu;
  }(lng.Component);

  var MenuItem =
  /*#__PURE__*/
  function (_lng$Component8) {
    _inherits(MenuItem, _lng$Component8);

    function MenuItem() {
      _classCallCheck(this, MenuItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).apply(this, arguments));
    }

    _createClass(MenuItem, [{
      key: "_focus",
      value: function _focus() {
        this.setSmooth("scale", 1.2);
      }
    }, {
      key: "_unfocus",
      value: function _unfocus() {
        this.setSmooth("scale", 1);
      }
    }, {
      key: "item",
      set: function set(v) {
        this._item = v;
        this.text.text = v.label;
      },
      get: function get() {
        return this._item;
      }
    }], [{
      key: "_template",
      value: function _template() {
        return {
          text: {
            fontSize: 40,
            fontFace: "verdana"
          },
          flexItem: {
            marginRight: 30
          }
        };
      }
    }]);

    return MenuItem;
  }(lng.Component);

  var App =
  /*#__PURE__*/
  function (_ux$App) {
    _inherits(App, _ux$App);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
      key: "_construct",
      value: function _construct() {
        this._api = new Api();
      }
    }, {
      key: "_init",
      value: function _init() {
        this._setState("Splash");
      }
    }, {
      key: "$api",
      value: function $api() {
        return this._api;
      }
    }, {
      key: "$onItemSelect",
      value: function $onItemSelect(_ref2) {
        var item = _ref2.item;

        this._setState("Loading");

        this.tag("Details").asset = item;
      }
    }, {
      key: "_populate",
      value: function _populate(data) {
        var _this8 = this;

        data.forEach(function (props) {
          _this8.tag(props.ref).data = props.data;
        });
      }
    }, {
      key: "_handleUp",
      value: function _handleUp() {
        this._setState("Menu");
      }
    }], [{
      key: "getFonts",
      value: function getFonts() {
        return [{
          family: 'RobotoBold',
          url: App.getPath('fonts/Roboto-Bold.ttf'),
          descriptors: {}
        }, {
          family: 'RobotoRegular',
          url: App.getPath('fonts/Roboto-Regular.ttf'),
          descriptors: {}
        }];
      }
    }, {
      key: "_template",
      value: function _template() {
        return {
          Splash: {
            type: Splash,
            signals: {
              animationFinished: true
            },
            alpha: 0
          },
          Movies: {
            type: Browse,
            x: 100,
            y: 150,
            alpha: 0
          },
          TvShows: {
            type: Browse,
            x: 100,
            y: 150,
            alpha: 0
          },
          Menu: {
            type: Menu,
            x: 1550,
            y: -100,
            alpha: 0.5,
            signals: {
              select: true
            }
          },
          Details: {
            type: Details,
            signals: {
              detailsLoaded: "_loaded"
            },
            alpha: 0.001
          },
          Loader: {
            type: Loader,
            alpha: 0
          }
        };
      }
    }, {
      key: "_states",
      value: function _states() {
        return [
        /*#__PURE__*/
        function (_this9) {
          _inherits(Splash$$1, _this9);

          function Splash$$1() {
            _classCallCheck(this, Splash$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Splash$$1).apply(this, arguments));
          }

          _createClass(Splash$$1, [{
            key: "$enter",
            value: function $enter() {
              var _this10 = this;

              this.tag("Splash").setSmooth("alpha", 1);

              this._api.getAppData().then(function (data) {
                _this10.tag("Splash").startAnimation();

                _this10._populate(data);
              });
            }
          }, {
            key: "animationFinished",
            value: function animationFinished() {
              this._setState("Movies");

              this.tag("Menu").setSmooth("y", 50);
            }
          }]);

          return Splash$$1;
        }(this),
        /*#__PURE__*/
        function (_this11) {
          _inherits(Loading, _this11);

          function Loading() {
            _classCallCheck(this, Loading);

            return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
          }

          _createClass(Loading, [{
            key: "_captureKey",
            value: function _captureKey() {// capture
            }
          }, {
            key: "$enter",
            value: function $enter(_ref3) {
              var prevState = _ref3.prevState;
              this._appReturnState = prevState;
              this.tag("Loader").setSmooth("alpha", 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Loader").setSmooth("alpha", 0);
            }
          }, {
            key: "_loaded",
            value: function _loaded() {
              var _this12 = this;

              setTimeout(function () {
                _this12._setState("Details");
              }, 2000);
            }
          }]);

          return Loading;
        }(this),
        /*#__PURE__*/
        function (_this13) {
          _inherits(Menu$$1, _this13);

          function Menu$$1() {
            _classCallCheck(this, Menu$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Menu$$1).apply(this, arguments));
          }

          _createClass(Menu$$1, [{
            key: "$enter",
            value: function $enter(_ref4) {
              var prevState = _ref4.prevState;
              this._menuReturnState = prevState;
              this.tag("Menu").setSmooth("alpha", 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Menu").setSmooth("alpha", 0.5);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Menu");
            }
          }, {
            key: "_handleDown",
            value: function _handleDown() {
              this._setState(this._menuReturnState);
            }
          }, {
            key: "select",
            value: function select(_ref5) {
              var item = _ref5.item;
              var ref = item.ref;

              if (this.tag(ref)) {
                this.tag(this._menuReturnState).setSmooth("alpha", 0);

                this._setState(ref);
              }
            }
          }]);

          return Menu$$1;
        }(this),
        /*#__PURE__*/
        function (_this14) {
          _inherits(Movies, _this14);

          function Movies() {
            _classCallCheck(this, Movies);

            return _possibleConstructorReturn(this, _getPrototypeOf(Movies).apply(this, arguments));
          }

          _createClass(Movies, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Movies").setSmooth("alpha", 1);
            }
          }, {
            key: "$exit",
            value: function $exit(_ref6) {
              var newState = _ref6.newState;
              this.tag("Movies").setSmooth("alpha", newState === "Menu" ? 1 : 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Movies");
            }
          }]);

          return Movies;
        }(this),
        /*#__PURE__*/
        function (_this15) {
          _inherits(TvShows, _this15);

          function TvShows() {
            _classCallCheck(this, TvShows);

            return _possibleConstructorReturn(this, _getPrototypeOf(TvShows).apply(this, arguments));
          }

          _createClass(TvShows, [{
            key: "$enter",
            value: function $enter() {
              this.tag("TvShows").setSmooth("alpha", 1);
            }
          }, {
            key: "$exit",
            value: function $exit(_ref7) {
              var newState = _ref7.newState;
              this.tag("TvShows").setSmooth("alpha", newState === "Menu" ? 1 : 0);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("TvShows");
            }
          }]);

          return TvShows;
        }(this),
        /*#__PURE__*/
        function (_this16) {
          _inherits(Details$$1, _this16);

          function Details$$1() {
            _classCallCheck(this, Details$$1);

            return _possibleConstructorReturn(this, _getPrototypeOf(Details$$1).apply(this, arguments));
          }

          _createClass(Details$$1, [{
            key: "$enter",
            value: function $enter() {
              this.tag("Details").setSmooth("alpha", 1);
            }
          }, {
            key: "$exit",
            value: function $exit() {
              this.tag("Details").setSmooth("alpha", 0.001);
            }
          }, {
            key: "_handleBack",
            value: function _handleBack() {
              this._setState(this._appReturnState);
            }
          }, {
            key: "_getFocused",
            value: function _getFocused() {
              return this.tag("Details");
            }
          }]);

          return Details$$1;
        }(this)];
      }
    }]);

    return App;
  }(ux.App);

  return App;
}();