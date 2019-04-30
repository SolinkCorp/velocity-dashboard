module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  Dashboard: __webpack_require__(2),
	  Widget: __webpack_require__(175),
	  Config: __webpack_require__(177),
	  Content: __webpack_require__(178)
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Dashboard, DragDropContext, Layout, React, ReactCSSTransitionGroup, Title, _, componentWidthMixin, defaults, dndBackend, getComponentsById;

	React = __webpack_require__(3);

	Title = __webpack_require__(4);

	Layout = __webpack_require__(5);

	componentWidthMixin = __webpack_require__(6);

	_ = __webpack_require__(9);

	ReactCSSTransitionGroup = __webpack_require__(10);

	DragDropContext = __webpack_require__(11).DragDropContext;

	dndBackend = __webpack_require__(149);

	defaults = {
	  widgetWidth: 250,
	  widgetHeight: 250,
	  margin: 15
	};

	Dashboard = React.createClass({
	  displayName: 'Dashboard',
	  mixins: [componentWidthMixin],
	  shouldComponentUpdate: function(nextProps, nextState) {
	    var cc1, cc2;
	    this.layout.reset(nextState.componentWidth);
	    cc1 = this.layout.columnCount();
	    this.layout.reset(this.state.componentWidth);
	    cc2 = this.layout.columnCount();
	    return nextProps !== this.props || cc1 !== cc2;
	  },
	  childComponentsForConfig: function(components, widgets, sizeConfig, columnCount) {
	    var componentsById, instances, menu;
	    menu = this.props.menu;
	    componentsById = getComponentsById(components);
	    instances = widgets.map((function(_this) {
	      return function(widget, index) {
	        var withPositions;
	        if (componentsById[widget.widgetId]) {
	          withPositions = _this.layout.setWidgetPosition(componentsById[widget.widgetId], widget.config);
	          return React.cloneElement(withPositions, {
	            key: index,
	            onHide: function() {
	              return _this.hideWidget(index);
	            },
	            config: widget.config,
	            index: index,
	            sizeConfig: sizeConfig,
	            columnCount: columnCount,
	            onDrop: _this.moveWidget,
	            widgetTitle: widget.config ? widget.config.title : null,
	            widgetDescription: widget.description,
	            widgetMenu: menu
	          });
	        }
	      };
	    })(this));
	    return _(instances).compact();
	  },
	  hideWidget: function(index) {
	    var widgets;
	    widgets = [].concat(this.props.widgets);
	    widgets.splice(index, 1);
	    return this.props.onWidgetsChange(widgets);
	  },
	  widgetChange: function(index, newConfig) {
	    var widgets;
	    widgets = [].concat(this.props.widgets);
	    widgets[index] = {
	      widgetId: widgets[index].widgetId,
	      config: newConfig
	    };
	    return this.props.onWidgetsChange(allConfigs);
	  },
	  moveWidget: function(sourceIndex, targetIndex) {
	    var widgets;
	    widgets = [].concat(this.props.widgets);
	    if (sourceIndex < targetIndex) {
	      targetIndex--;
	    }
	    widgets.splice(targetIndex, 0, widgets.splice(sourceIndex, 1)[0]);
	    return this.props.onWidgetsChange(widgets);
	  },
	  render: function() {
	    var children, childrenForCurrentConfig, className, componentWidth, componentWidthForTesting, contentWidth, layout, maxColumns, ref, ref1, ref2, ref3, ref4, sizeConfig, title, widgetHeight, widgetMargin, widgetWidth, widgets;
	    ref = this.props, children = ref.children, title = ref.title, className = ref.className, widgets = ref.widgets, widgetHeight = (ref1 = ref.widgetHeight) != null ? ref1 : defaults.widgetHeight, widgetWidth = (ref2 = ref.widgetWidth) != null ? ref2 : defaults.widgetWidth, widgetMargin = (ref3 = ref.widgetMargin) != null ? ref3 : defaults.margin, maxColumns = (ref4 = ref.maxColumns) != null ? ref4 : 5, componentWidthForTesting = ref.componentWidthForTesting;
	    componentWidth = this.state.componentWidth;
	    sizeConfig = {
	      widgetHeight: widgetHeight,
	      widgetWidth: widgetWidth,
	      widgetMargin: widgetMargin,
	      maxColumns: maxColumns
	    };
	    this.layout = layout = new Layout(sizeConfig);
	    layout.reset(componentWidthForTesting || componentWidth);
	    childrenForCurrentConfig = this.childComponentsForConfig(children, widgets, sizeConfig, layout.columnCount());
	    contentWidth = layout.columnCount() * (widgetWidth + widgetMargin) - widgetMargin;
	    if (layout.columnCount() === 1) {
	      contentWidth = '90%';
	    }
	    return React.createElement("div", {
	      "className": "dashboard " + className
	    }, React.createElement("section", {
	      "className": "dashboard-content columns-" + (layout.columnCount()),
	      "style": {
	        width: contentWidth
	      }
	    }, childrenForCurrentConfig), React.createElement(ReactCSSTransitionGroup, {
	      "transitionName": "widget-panel",
	      "transitionEnterTimeout": 500.,
	      "transitionLeaveTimeout": 500.,
	      "transitionEnter": true,
	      "transitionLeave": true
	    }));
	  }
	});

	module.exports = DragDropContext(dndBackend)(Dashboard);

	module.exports.defaults = defaults;

	getComponentsById = function(components) {
	  var byId;
	  byId = {};
	  components.forEach(function(comp) {
	    return byId[comp.props.id] = comp;
	  });
	  return byId;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React, Title;

	React = __webpack_require__(3);

	Title = function(arg) {
	  var children, height;
	  children = arg.children, height = arg.height;
	  return React.createElement("div", {
	    "className": 'title',
	    "style": {
	      height: height
	    }
	  }, children);
	};

	Title.displayName = 'Title';

	module.exports = Title;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Positioner, React;

	React = __webpack_require__(3);

	module.exports = Positioner = (function() {
	  Positioner.prototype._currentGrid = [];

	  Positioner.prototype._columnCount = 4;

	  function Positioner(sizeConfig) {
	    this.sizeConfig = sizeConfig;
	  }

	  Positioner.prototype.reset = function(dashboardWidth) {
	    var columnCount, maxWidthForColumnCount;
	    maxWidthForColumnCount = (function(_this) {
	      return function(colCount) {
	        return ((_this.sizeConfig.widgetWidth + _this.sizeConfig.widgetMargin) * colCount) + 100;
	      };
	    })(this);
	    this._currentGrid = [];
	    columnCount = this.sizeConfig.maxColumns;
	    while (dashboardWidth < maxWidthForColumnCount(columnCount)) {
	      columnCount--;
	    }
	    return this._columnCount = Math.max(1, columnCount);
	  };

	  Positioner.prototype.cellIsEmpty = function(arg) {
	    var col, ref, row;
	    row = arg.row, col = arg.col;
	    return !((ref = this._currentGrid[row]) != null ? ref[col] : void 0);
	  };

	  Positioner.prototype.getAllCellsFor = function(arg, row, col, config) {
	    var cells, h, height, i, j, outOfBounds, ref, ref1, ref2, ref3, w, width;
	    height = arg.height, width = arg.width;
	    width = Math.min(parseInt((config != null ? config.width : void 0) || width || 1), this._columnCount);
	    height = parseInt((config != null ? config.height : void 0) || height || 1);
	    outOfBounds = false;
	    cells = [];
	    for (h = i = ref = row, ref1 = row + height - 1; ref <= ref1 ? i <= ref1 : i >= ref1; h = ref <= ref1 ? ++i : --i) {
	      for (w = j = ref2 = col, ref3 = col + width - 1; ref2 <= ref3 ? j <= ref3 : j >= ref3; w = ref2 <= ref3 ? ++j : --j) {
	        cells.push({
	          row: h,
	          col: w
	        });
	        if (w >= this._columnCount) {
	          outOfBounds = true;
	        }
	      }
	    }
	    if (outOfBounds) {
	      return [];
	    } else {
	      return cells;
	    }
	  };

	  Positioner.prototype.fitsInGrid = function(widget, row, col, config) {
	    var cells;
	    cells = this.getAllCellsFor(widget.props, row, col, config);
	    return cells.length > 0 && cells.every((function(_this) {
	      return function(cell) {
	        return _this.cellIsEmpty(cell);
	      };
	    })(this));
	  };

	  Positioner.prototype.markGridAsUsed = function(widget, row, col, config) {
	    var cells;
	    cells = this.getAllCellsFor(widget.props, row, col, config);
	    return cells.forEach((function(_this) {
	      return function(cell) {
	        if (!_this._currentGrid[cell.row]) {
	          _this._currentGrid[cell.row] = [];
	        }
	        return _this._currentGrid[cell.row][cell.col] = 'x';
	      };
	    })(this));
	  };

	  Positioner.prototype.setWidgetPositionInRow = function(widget, row, config) {
	    var col, i, ref, updatedWidget;
	    updatedWidget = null;
	    for (col = i = 0, ref = this._columnCount - 1; 0 <= ref ? i <= ref : i >= ref; col = 0 <= ref ? ++i : --i) {
	      if (this.fitsInGrid(widget, row, col, config)) {
	        this.markGridAsUsed(widget, row, col, config);
	        updatedWidget = React.cloneElement(widget, {
	          col: col,
	          row: row
	        });
	        break;
	      }
	    }
	    return updatedWidget;
	  };

	  Positioner.prototype.setWidgetPosition = function(widget, config) {
	    var row, updatedWidget;
	    updatedWidget = null;
	    row = 0;
	    while (!updatedWidget) {
	      if (!this._currentGrid[row]) {
	        !(this._currentGrid[row] = []);
	      }
	      updatedWidget = this.setWidgetPositionInRow(widget, row, config);
	      row++;
	    }
	    return updatedWidget;
	  };

	  Positioner.prototype.columnCount = function() {
	    return this._columnCount;
	  };

	  Positioner.prototype.rowCount = function() {
	    return this._currentGrid.length;
	  };

	  return Positioner;

	})();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var ReactDOM = __webpack_require__(7);
	var elementResizeEvent = __webpack_require__(8);

	module.exports = {
	  getInitialState: function() {
	    if (this.props.initialComponentWidth !== undefined && this.props.initialComponentWidth !== null) {
	      return {
	        componentWidth: this.props.initialComponentWidth
	      };
	    } else {
	      return {};
	    }
	  },
	  // Add our resize sensor.
	  componentDidMount: function() {
	    this.setState({
	      componentWidth: ReactDOM.findDOMNode(this).getBoundingClientRect().width
	    });
	    elementResizeEvent(ReactDOM.findDOMNode(this), this.onResize);
	  },
	  // When the DOM updates, check that our resize sensor is still there.
	  componentDidUpdate: function() {
	    if (0 === ReactDOM.findDOMNode(this).getElementsByClassName('resize-sensor').length) {
	      elementResizeEvent(ReactDOM.findDOMNode(this), this.onResize);
	    }
	  },
	  onResize: function() {
	    this.setState({
	      componentWidth: ReactDOM.findDOMNode(this).getBoundingClientRect().width
	    });
	  }
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 8 */
/***/ function(module, exports) {

	var requestFrame = (function () {
	  var window = this
	  var raf = window.requestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    function fallbackRAF(func) {
	      return window.setTimeout(func, 20)
	    }
	  return function requestFrameFunction(func) {
	    return raf(func)
	  }
	})()

	var cancelFrame = (function () {
	  var window = this
	  var cancel = window.cancelAnimationFrame ||
	    window.mozCancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.clearTimeout
	  return function cancelFrameFunction(id) {
	    return cancel(id)
	  }
	})()

	function resizeListener(e) {
	  var win = e.target || e.srcElement
	  if (win.__resizeRAF__) {
	    cancelFrame(win.__resizeRAF__)
	  }
	  win.__resizeRAF__ = requestFrame(function () {
	    var trigger = win.__resizeTrigger__
	    trigger.__resizeListeners__.forEach(function (fn) {
	      fn.call(trigger, e)
	    })
	  })
	}

	var exports = function exports(element, fn) {
	  var window = this
	  var document = window.document
	  var isIE

	  var attachEvent = document.attachEvent
	  if (typeof navigator !== 'undefined') {
	    isIE = navigator.userAgent.match(/Trident/) ||
	      navigator.userAgent.match(/Edge/)
	  }

	  function objectLoad() {
	    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
	    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
	  }

	  if (!element.__resizeListeners__) {
	    element.__resizeListeners__ = []
	    if (attachEvent) {
	      element.__resizeTrigger__ = element
	      element.attachEvent('onresize', resizeListener)
	    } else {
	      if (getComputedStyle(element).position === 'static') {
	        element.style.position = 'relative'
	      }
	      var obj = (element.__resizeTrigger__ = document.createElement('object'))
	      obj.setAttribute(
	        'style',
	        'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;'
	      )
	      obj.setAttribute('class', 'resize-sensor')
	      obj.__resizeElement__ = element
	      obj.onload = objectLoad
	      obj.type = 'text/html'
	      if (isIE) {
	        element.appendChild(obj)
	      }
	      obj.data = 'about:blank'
	      if (!isIE) {
	        element.appendChild(obj)
	      }
	    }
	  }
	  element.__resizeListeners__.push(fn)
	}

	module.exports = typeof window === 'undefined' ? exports : exports.bind(window)

	module.exports.unbind = function (element, fn) {
	  var attachEvent = document.attachEvent
	  if (fn) {
	    element.__resizeListeners__.splice(
	      element.__resizeListeners__.indexOf(fn),
	      1
	    )
	  } else {
	    element.__resizeListeners__ = []
	  }
	  if (!element.__resizeListeners__.length) {
	    if (attachEvent) {
	      element.detachEvent('onresize', resizeListener)
	    } else {
	      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener(
	        'resize',
	        resizeListener
	      )
	      delete element.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__
	      element.__resizeTrigger__ = !element.removeChild(
	        element.__resizeTrigger__
	      )
	    }
	    delete element.__resizeListeners__
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-addons-css-transition-group");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DragDropContext = __webpack_require__(12);

	Object.defineProperty(exports, 'DragDropContext', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DragDropContext).default;
	  }
	});

	var _DragDropContextProvider = __webpack_require__(125);

	Object.defineProperty(exports, 'DragDropContextProvider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DragDropContextProvider).default;
	  }
	});

	var _DragLayer = __webpack_require__(126);

	Object.defineProperty(exports, 'DragLayer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DragLayer).default;
	  }
	});

	var _DragSource = __webpack_require__(129);

	Object.defineProperty(exports, 'DragSource', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DragSource).default;
	  }
	});

	var _DropTarget = __webpack_require__(144);

	Object.defineProperty(exports, 'DropTarget', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DropTarget).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unpackBackendForEs5Users = exports.createChildContext = exports.CHILD_CONTEXT_TYPES = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = DragDropContext;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _dndCore = __webpack_require__(13);

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _hoistNonReactStatics = __webpack_require__(123);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _checkDecoratorArguments = __webpack_require__(124);

	var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CHILD_CONTEXT_TYPES = exports.CHILD_CONTEXT_TYPES = {
	  dragDropManager: _react.PropTypes.object.isRequired
	};

	var createChildContext = exports.createChildContext = function createChildContext(backend, context) {
	  return {
	    dragDropManager: new _dndCore.DragDropManager(backend, context)
	  };
	};

	var unpackBackendForEs5Users = exports.unpackBackendForEs5Users = function unpackBackendForEs5Users(backendOrModule) {
	  // Auto-detect ES6 default export for people still using ES5
	  var backend = backendOrModule;
	  if ((typeof backend === 'undefined' ? 'undefined' : _typeof(backend)) === 'object' && typeof backend.default === 'function') {
	    backend = backend.default;
	  }
	  (0, _invariant2.default)(typeof backend === 'function', 'Expected the backend to be a function or an ES6 module exporting a default function. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html');
	  return backend;
	};

	function DragDropContext(backendOrModule) {
	  _checkDecoratorArguments2.default.apply(undefined, ['DragDropContext', 'backend'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params

	  var backend = unpackBackendForEs5Users(backendOrModule);
	  var childContext = createChildContext(backend);

	  return function decorateContext(DecoratedComponent) {
	    var _class, _temp;

	    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

	    var DragDropContextContainer = (_temp = _class = function (_Component) {
	      _inherits(DragDropContextContainer, _Component);

	      function DragDropContextContainer() {
	        _classCallCheck(this, DragDropContextContainer);

	        return _possibleConstructorReturn(this, (DragDropContextContainer.__proto__ || Object.getPrototypeOf(DragDropContextContainer)).apply(this, arguments));
	      }

	      _createClass(DragDropContextContainer, [{
	        key: 'getDecoratedComponentInstance',
	        value: function getDecoratedComponentInstance() {
	          (0, _invariant2.default)(this.child, 'In order to access an instance of the decorated component it can ' + 'not be a stateless component.');
	          return this.child;
	        }
	      }, {
	        key: 'getManager',
	        value: function getManager() {
	          return childContext.dragDropManager;
	        }
	      }, {
	        key: 'getChildContext',
	        value: function getChildContext() {
	          return childContext;
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var _this2 = this;

	          return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, {
	            ref: function ref(child) {
	              return _this2.child = child;
	            }
	          }));
	        }
	      }]);

	      return DragDropContextContainer;
	    }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = 'DragDropContext(' + displayName + ')', _class.childContextTypes = CHILD_CONTEXT_TYPES, _temp);


	    return (0, _hoistNonReactStatics2.default)(DragDropContextContainer, DecoratedComponent);
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DragDropManager = __webpack_require__(14);

	Object.defineProperty(exports, 'DragDropManager', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DragDropManager).default;
	  }
	});

	var _DragSource = __webpack_require__(120);

	Object.defineProperty(exports, 'DragSource', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DragSource).default;
	  }
	});

	var _DropTarget = __webpack_require__(121);

	Object.defineProperty(exports, 'DropTarget', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DropTarget).default;
	  }
	});

	var _createTestBackend = __webpack_require__(122);

	Object.defineProperty(exports, 'createTestBackend', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_createTestBackend).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _createStore = __webpack_require__(15);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _reducers = __webpack_require__(29);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _dragDrop = __webpack_require__(31);

	var dragDropActions = _interopRequireWildcard(_dragDrop);

	var _DragDropMonitor = __webpack_require__(115);

	var _DragDropMonitor2 = _interopRequireDefault(_DragDropMonitor);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DragDropManager = function () {
		function DragDropManager(createBackend) {
			var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, DragDropManager);

			var store = (0, _createStore2.default)(_reducers2.default);
			this.context = context;
			this.store = store;
			this.monitor = new _DragDropMonitor2.default(store);
			this.registry = this.monitor.registry;
			this.backend = createBackend(this);

			store.subscribe(this.handleRefCountChange.bind(this));
		}

		_createClass(DragDropManager, [{
			key: 'handleRefCountChange',
			value: function handleRefCountChange() {
				var shouldSetUp = this.store.getState().refCount > 0;
				if (shouldSetUp && !this.isSetUp) {
					this.backend.setup();
					this.isSetUp = true;
				} else if (!shouldSetUp && this.isSetUp) {
					this.backend.teardown();
					this.isSetUp = false;
				}
			}
		}, {
			key: 'getContext',
			value: function getContext() {
				return this.context;
			}
		}, {
			key: 'getMonitor',
			value: function getMonitor() {
				return this.monitor;
			}
		}, {
			key: 'getBackend',
			value: function getBackend() {
				return this.backend;
			}
		}, {
			key: 'getRegistry',
			value: function getRegistry() {
				return this.registry;
			}
		}, {
			key: 'getActions',
			value: function getActions() {
				var manager = this;
				var dispatch = this.store.dispatch;


				function bindActionCreator(actionCreator) {
					return function () {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}

						var action = actionCreator.apply(manager, args);
						if (typeof action !== 'undefined') {
							dispatch(action);
						}
					};
				}

				return Object.keys(dragDropActions).filter(function (key) {
					return typeof dragDropActions[key] === 'function';
				}).reduce(function (boundActions, key) {
					var action = dragDropActions[key];
					boundActions[key] = bindActionCreator(action); // eslint-disable-line no-param-reassign
					return boundActions;
				}, {});
			}
		}]);

		return DragDropManager;
	}();

	exports.default = DragDropManager;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(26);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'

	  /**
	   * Creates a Redux store that holds the state tree.
	   * The only way to change the data in the store is to call `dispatch()` on it.
	   *
	   * There should only be a single store in your app. To specify how different
	   * parts of the state tree respond to actions, you may combine several reducers
	   * into a single reducer function by using `combineReducers`.
	   *
	   * @param {Function} reducer A function that returns the next state tree, given
	   * the current state tree and the action to handle.
	   *
	   * @param {any} [preloadedState] The initial state. You may optionally specify it
	   * to hydrate the state from the server in universal apps, or to restore a
	   * previously serialized user session.
	   * If you use `combineReducers` to produce the root reducer function, this must be
	   * an object with the same shape as `combineReducers` keys.
	   *
	   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	   * to enhance the store with third-party capabilities such as middleware,
	   * time travel, persistence, etc. The only store enhancer that ships with Redux
	   * is `applyMiddleware()`.
	   *
	   * @returns {Store} A Redux store that lets you read the state, dispatch actions
	   * and subscribe to changes.
	   */
	};function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(17),
	    getPrototype = __webpack_require__(23),
	    isObjectLike = __webpack_require__(25);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(18),
	    getRawTag = __webpack_require__(21),
	    objectToString = __webpack_require__(22);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(19);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(20);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(18);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(24);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(28);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(27)(module)))

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = reduce;

	var _dragOffset = __webpack_require__(30);

	var _dragOffset2 = _interopRequireDefault(_dragOffset);

	var _dragOperation = __webpack_require__(37);

	var _dragOperation2 = _interopRequireDefault(_dragOperation);

	var _refCount = __webpack_require__(96);

	var _refCount2 = _interopRequireDefault(_refCount);

	var _dirtyHandlerIds = __webpack_require__(97);

	var _dirtyHandlerIds2 = _interopRequireDefault(_dirtyHandlerIds);

	var _stateId = __webpack_require__(114);

	var _stateId2 = _interopRequireDefault(_stateId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function reduce() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var action = arguments[1];

		return {
			dirtyHandlerIds: (0, _dirtyHandlerIds2.default)(state.dirtyHandlerIds, action, state.dragOperation),
			dragOffset: (0, _dragOffset2.default)(state.dragOffset, action),
			refCount: (0, _refCount2.default)(state.refCount, action),
			dragOperation: (0, _dragOperation2.default)(state.dragOperation, action),
			stateId: (0, _stateId2.default)(state.stateId)
		};
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = dragOffset;
	exports.getSourceClientOffset = getSourceClientOffset;
	exports.getDifferenceFromInitialOffset = getDifferenceFromInitialOffset;

	var _dragDrop = __webpack_require__(31);

	var initialState = {
		initialSourceClientOffset: null,
		initialClientOffset: null,
		clientOffset: null
	};

	function areOffsetsEqual(offsetA, offsetB) {
		if (offsetA === offsetB) {
			return true;
		}
		return offsetA && offsetB && offsetA.x === offsetB.x && offsetA.y === offsetB.y;
	}

	function dragOffset() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];

		switch (action.type) {
			case _dragDrop.BEGIN_DRAG:
				return {
					initialSourceClientOffset: action.sourceClientOffset,
					initialClientOffset: action.clientOffset,
					clientOffset: action.clientOffset
				};
			case _dragDrop.HOVER:
				if (areOffsetsEqual(state.clientOffset, action.clientOffset)) {
					return state;
				}
				return _extends({}, state, {
					clientOffset: action.clientOffset
				});
			case _dragDrop.END_DRAG:
			case _dragDrop.DROP:
				return initialState;
			default:
				return state;
		}
	}

	function getSourceClientOffset(state) {
		var clientOffset = state.clientOffset,
		    initialClientOffset = state.initialClientOffset,
		    initialSourceClientOffset = state.initialSourceClientOffset;

		if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
			return null;
		}
		return {
			x: clientOffset.x + initialSourceClientOffset.x - initialClientOffset.x,
			y: clientOffset.y + initialSourceClientOffset.y - initialClientOffset.y
		};
	}

	function getDifferenceFromInitialOffset(state) {
		var clientOffset = state.clientOffset,
		    initialClientOffset = state.initialClientOffset;

		if (!clientOffset || !initialClientOffset) {
			return null;
		}
		return {
			x: clientOffset.x - initialClientOffset.x,
			y: clientOffset.y - initialClientOffset.y
		};
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.END_DRAG = exports.DROP = exports.HOVER = exports.PUBLISH_DRAG_SOURCE = exports.BEGIN_DRAG = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.beginDrag = beginDrag;
	exports.publishDragSource = publishDragSource;
	exports.hover = hover;
	exports.drop = drop;
	exports.endDrag = endDrag;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isArray = __webpack_require__(34);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isObject = __webpack_require__(35);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _matchesType = __webpack_require__(36);

	var _matchesType2 = _interopRequireDefault(_matchesType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BEGIN_DRAG = exports.BEGIN_DRAG = 'dnd-core/BEGIN_DRAG';
	var PUBLISH_DRAG_SOURCE = exports.PUBLISH_DRAG_SOURCE = 'dnd-core/PUBLISH_DRAG_SOURCE';
	var HOVER = exports.HOVER = 'dnd-core/HOVER';
	var DROP = exports.DROP = 'dnd-core/DROP';
	var END_DRAG = exports.END_DRAG = 'dnd-core/END_DRAG';

	function beginDrag(sourceIds) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { publishSource: true, clientOffset: null };
		var publishSource = options.publishSource,
		    clientOffset = options.clientOffset,
		    getSourceClientOffset = options.getSourceClientOffset;

		(0, _invariant2.default)((0, _isArray2.default)(sourceIds), 'Expected sourceIds to be an array.');

		var monitor = this.getMonitor();
		var registry = this.getRegistry();
		(0, _invariant2.default)(!monitor.isDragging(), 'Cannot call beginDrag while dragging.');

		for (var i = 0; i < sourceIds.length; i++) {
			(0, _invariant2.default)(registry.getSource(sourceIds[i]), 'Expected sourceIds to be registered.');
		}

		var sourceId = null;
		for (var _i = sourceIds.length - 1; _i >= 0; _i--) {
			if (monitor.canDragSource(sourceIds[_i])) {
				sourceId = sourceIds[_i];
				break;
			}
		}
		if (sourceId === null) {
			return;
		}

		var sourceClientOffset = null;
		if (clientOffset) {
			(0, _invariant2.default)(typeof getSourceClientOffset === 'function', 'When clientOffset is provided, getSourceClientOffset must be a function.');
			sourceClientOffset = getSourceClientOffset(sourceId);
		}

		var source = registry.getSource(sourceId);
		var item = source.beginDrag(monitor, sourceId);
		(0, _invariant2.default)((0, _isObject2.default)(item), 'Item must be an object.');

		registry.pinSource(sourceId);

		var itemType = registry.getSourceType(sourceId);
		return {
			type: BEGIN_DRAG,
			itemType: itemType,
			item: item,
			sourceId: sourceId,
			clientOffset: clientOffset,
			sourceClientOffset: sourceClientOffset,
			isSourcePublic: publishSource
		};
	}

	function publishDragSource() {
		var monitor = this.getMonitor();
		if (!monitor.isDragging()) {
			return;
		}

		return { type: PUBLISH_DRAG_SOURCE };
	}

	function hover(targetIdsArg) {
		var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    _ref$clientOffset = _ref.clientOffset,
		    clientOffset = _ref$clientOffset === undefined ? null : _ref$clientOffset;

		(0, _invariant2.default)((0, _isArray2.default)(targetIdsArg), 'Expected targetIds to be an array.');
		var targetIds = targetIdsArg.slice(0);

		var monitor = this.getMonitor();
		var registry = this.getRegistry();
		(0, _invariant2.default)(monitor.isDragging(), 'Cannot call hover while not dragging.');
		(0, _invariant2.default)(!monitor.didDrop(), 'Cannot call hover after drop.');

		// First check invariants.
		for (var i = 0; i < targetIds.length; i++) {
			var targetId = targetIds[i];
			(0, _invariant2.default)(targetIds.lastIndexOf(targetId) === i, 'Expected targetIds to be unique in the passed array.');

			var target = registry.getTarget(targetId);
			(0, _invariant2.default)(target, 'Expected targetIds to be registered.');
		}

		var draggedItemType = monitor.getItemType();

		// Remove those targetIds that don't match the targetType.  This
		// fixes shallow isOver which would only be non-shallow because of
		// non-matching targets.
		for (var _i2 = targetIds.length - 1; _i2 >= 0; _i2--) {
			var _targetId = targetIds[_i2];
			var targetType = registry.getTargetType(_targetId);
			if (!(0, _matchesType2.default)(targetType, draggedItemType)) {
				targetIds.splice(_i2, 1);
			}
		}

		// Finally call hover on all matching targets.
		for (var _i3 = 0; _i3 < targetIds.length; _i3++) {
			var _targetId2 = targetIds[_i3];
			var _target = registry.getTarget(_targetId2);
			_target.hover(monitor, _targetId2);
		}

		return {
			type: HOVER,
			targetIds: targetIds,
			clientOffset: clientOffset
		};
	}

	function drop() {
		var _this = this;

		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		var monitor = this.getMonitor();
		var registry = this.getRegistry();
		(0, _invariant2.default)(monitor.isDragging(), 'Cannot call drop while not dragging.');
		(0, _invariant2.default)(!monitor.didDrop(), 'Cannot call drop twice during one drag operation.');

		var targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);

		targetIds.reverse();
		targetIds.forEach(function (targetId, index) {
			var target = registry.getTarget(targetId);

			var dropResult = target.drop(monitor, targetId);
			(0, _invariant2.default)(typeof dropResult === 'undefined' || (0, _isObject2.default)(dropResult), 'Drop result must either be an object or undefined.');
			if (typeof dropResult === 'undefined') {
				dropResult = index === 0 ? {} : monitor.getDropResult();
			}

			_this.store.dispatch({
				type: DROP,
				dropResult: _extends({}, options, dropResult)
			});
		});
	}

	function endDrag() {
		var monitor = this.getMonitor();
		var registry = this.getRegistry();
		(0, _invariant2.default)(monitor.isDragging(), 'Cannot call endDrag while not dragging.');

		var sourceId = monitor.getSourceId();
		var source = registry.getSource(sourceId, true);
		source.endDrag(monitor, sourceId);

		registry.unpinSource();

		return { type: END_DRAG };
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 33 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = matchesType;

	var _isArray = __webpack_require__(34);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function matchesType(targetType, draggedItemType) {
		if ((0, _isArray2.default)(targetType)) {
			return targetType.some(function (t) {
				return t === draggedItemType;
			});
		} else {
			return targetType === draggedItemType;
		}
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = dragOperation;

	var _without = __webpack_require__(38);

	var _without2 = _interopRequireDefault(_without);

	var _dragDrop = __webpack_require__(31);

	var _registry = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = {
		itemType: null,
		item: null,
		sourceId: null,
		targetIds: [],
		dropResult: null,
		didDrop: false,
		isSourcePublic: null
	};

	function dragOperation() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];

		switch (action.type) {
			case _dragDrop.BEGIN_DRAG:
				return _extends({}, state, {
					itemType: action.itemType,
					item: action.item,
					sourceId: action.sourceId,
					isSourcePublic: action.isSourcePublic,
					dropResult: null,
					didDrop: false
				});
			case _dragDrop.PUBLISH_DRAG_SOURCE:
				return _extends({}, state, {
					isSourcePublic: true
				});
			case _dragDrop.HOVER:
				return _extends({}, state, {
					targetIds: action.targetIds
				});
			case _registry.REMOVE_TARGET:
				if (state.targetIds.indexOf(action.targetId) === -1) {
					return state;
				}
				return _extends({}, state, {
					targetIds: (0, _without2.default)(state.targetIds, action.targetId)
				});
			case _dragDrop.DROP:
				return _extends({}, state, {
					dropResult: action.dropResult,
					didDrop: true,
					targetIds: []
				});
			case _dragDrop.END_DRAG:
				return _extends({}, state, {
					itemType: null,
					item: null,
					sourceId: null,
					dropResult: null,
					didDrop: false,
					isSourcePublic: null,
					targetIds: []
				});
			default:
				return state;
		}
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(39),
	    baseRest = __webpack_require__(83),
	    isArrayLikeObject = __webpack_require__(92);

	/**
	 * Creates an array excluding all given values using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * **Note:** Unlike `_.pull`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...*} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.difference, _.xor
	 * @example
	 *
	 * _.without([2, 1, 2, 3], 1, 2);
	 * // => [3]
	 */
	var without = baseRest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, values)
	    : [];
	});

	module.exports = without;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(40),
	    arrayIncludes = __webpack_require__(74),
	    arrayIncludesWith = __webpack_require__(79),
	    arrayMap = __webpack_require__(80),
	    baseUnary = __webpack_require__(81),
	    cacheHas = __webpack_require__(82);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee == null ? value : iteratee(value);

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(41),
	    setCacheAdd = __webpack_require__(72),
	    setCacheHas = __webpack_require__(73);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(42),
	    mapCacheDelete = __webpack_require__(66),
	    mapCacheGet = __webpack_require__(69),
	    mapCacheHas = __webpack_require__(70),
	    mapCacheSet = __webpack_require__(71);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(43),
	    ListCache = __webpack_require__(57),
	    Map = __webpack_require__(65);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(44),
	    hashDelete = __webpack_require__(53),
	    hashGet = __webpack_require__(54),
	    hashHas = __webpack_require__(55),
	    hashSet = __webpack_require__(56);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(45);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(46);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(47),
	    getValue = __webpack_require__(52);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(48),
	    isMasked = __webpack_require__(49),
	    isObject = __webpack_require__(35),
	    toSource = __webpack_require__(51);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(17),
	    isObject = __webpack_require__(35);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(50);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(19);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(45);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(45);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(45);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(58),
	    listCacheDelete = __webpack_require__(59),
	    listCacheGet = __webpack_require__(62),
	    listCacheHas = __webpack_require__(63),
	    listCacheSet = __webpack_require__(64);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(60);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(61);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(60);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(60);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(60);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(46),
	    root = __webpack_require__(19);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(67);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(68);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(67);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(67);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(67);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(75);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(76),
	    baseIsNaN = __webpack_require__(77),
	    strictIndexOf = __webpack_require__(78);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(84),
	    overRest = __webpack_require__(85),
	    setToString = __webpack_require__(87);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(86);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(88),
	    shortOut = __webpack_require__(91);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(89),
	    defineProperty = __webpack_require__(90),
	    identity = __webpack_require__(84);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(46);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 91 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(93),
	    isObjectLike = __webpack_require__(25);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(48),
	    isLength = __webpack_require__(94);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 94 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.addSource = addSource;
	exports.addTarget = addTarget;
	exports.removeSource = removeSource;
	exports.removeTarget = removeTarget;
	var ADD_SOURCE = exports.ADD_SOURCE = 'dnd-core/ADD_SOURCE';
	var ADD_TARGET = exports.ADD_TARGET = 'dnd-core/ADD_TARGET';
	var REMOVE_SOURCE = exports.REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE';
	var REMOVE_TARGET = exports.REMOVE_TARGET = 'dnd-core/REMOVE_TARGET';

	function addSource(sourceId) {
		return {
			type: ADD_SOURCE,
			sourceId: sourceId
		};
	}

	function addTarget(targetId) {
		return {
			type: ADD_TARGET,
			targetId: targetId
		};
	}

	function removeSource(sourceId) {
		return {
			type: REMOVE_SOURCE,
			sourceId: sourceId
		};
	}

	function removeTarget(targetId) {
		return {
			type: REMOVE_TARGET,
			targetId: targetId
		};
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = refCount;

	var _registry = __webpack_require__(95);

	function refCount() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var action = arguments[1];

		switch (action.type) {
			case _registry.ADD_SOURCE:
			case _registry.ADD_TARGET:
				return state + 1;
			case _registry.REMOVE_SOURCE:
			case _registry.REMOVE_TARGET:
				return state - 1;
			default:
				return state;
		}
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = dirtyHandlerIds;
	exports.areDirty = areDirty;

	var _xor = __webpack_require__(98);

	var _xor2 = _interopRequireDefault(_xor);

	var _intersection = __webpack_require__(111);

	var _intersection2 = _interopRequireDefault(_intersection);

	var _dragDrop = __webpack_require__(31);

	var _registry = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NONE = [];
	var ALL = [];

	function dirtyHandlerIds() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NONE;
		var action = arguments[1];
		var dragOperation = arguments[2];

		switch (action.type) {
			case _dragDrop.HOVER:
				break;
			case _registry.ADD_SOURCE:
			case _registry.ADD_TARGET:
			case _registry.REMOVE_TARGET:
			case _registry.REMOVE_SOURCE:
				return NONE;
			case _dragDrop.BEGIN_DRAG:
			case _dragDrop.PUBLISH_DRAG_SOURCE:
			case _dragDrop.END_DRAG:
			case _dragDrop.DROP:
			default:
				return ALL;
		}

		var targetIds = action.targetIds;
		var prevTargetIds = dragOperation.targetIds;

		var result = (0, _xor2.default)(targetIds, prevTargetIds);

		var didChange = false;
		if (result.length === 0) {
			for (var i = 0; i < targetIds.length; i++) {
				if (targetIds[i] !== prevTargetIds[i]) {
					didChange = true;
					break;
				}
			}
		} else {
			didChange = true;
		}

		if (!didChange) {
			return NONE;
		}

		var prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
		var innermostTargetId = targetIds[targetIds.length - 1];

		if (prevInnermostTargetId !== innermostTargetId) {
			if (prevInnermostTargetId) {
				result.push(prevInnermostTargetId);
			}
			if (innermostTargetId) {
				result.push(innermostTargetId);
			}
		}

		return result;
	}

	function areDirty(state, handlerIds) {
		if (state === NONE) {
			return false;
		}

		if (state === ALL || typeof handlerIds === 'undefined') {
			return true;
		}

		return (0, _intersection2.default)(handlerIds, state).length > 0;
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(99),
	    baseRest = __webpack_require__(83),
	    baseXor = __webpack_require__(100),
	    isArrayLikeObject = __webpack_require__(92);

	/**
	 * Creates an array of unique values that is the
	 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	 * of the given arrays. The order of result values is determined by the order
	 * they occur in the arrays.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.difference, _.without
	 * @example
	 *
	 * _.xor([2, 1], [2, 3]);
	 * // => [1, 3]
	 */
	var xor = baseRest(function(arrays) {
	  return baseXor(arrayFilter(arrays, isArrayLikeObject));
	});

	module.exports = xor;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(39),
	    baseFlatten = __webpack_require__(101),
	    baseUniq = __webpack_require__(106);

	/**
	 * The base implementation of methods like `_.xor`, without support for
	 * iteratee shorthands, that accepts an array of arrays to inspect.
	 *
	 * @private
	 * @param {Array} arrays The arrays to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of values.
	 */
	function baseXor(arrays, iteratee, comparator) {
	  var length = arrays.length;
	  if (length < 2) {
	    return length ? baseUniq(arrays[0]) : [];
	  }
	  var index = -1,
	      result = Array(length);

	  while (++index < length) {
	    var array = arrays[index],
	        othIndex = -1;

	    while (++othIndex < length) {
	      if (othIndex != index) {
	        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
	      }
	    }
	  }
	  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
	}

	module.exports = baseXor;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(102),
	    isFlattenable = __webpack_require__(103);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(18),
	    isArguments = __webpack_require__(104),
	    isArray = __webpack_require__(34);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(105),
	    isObjectLike = __webpack_require__(25);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(17),
	    isObjectLike = __webpack_require__(25);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(40),
	    arrayIncludes = __webpack_require__(74),
	    arrayIncludesWith = __webpack_require__(79),
	    cacheHas = __webpack_require__(82),
	    createSet = __webpack_require__(107),
	    setToArray = __webpack_require__(110);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;

	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(108),
	    noop = __webpack_require__(109),
	    setToArray = __webpack_require__(110);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Creates a set object of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
	  return new Set(values);
	};

	module.exports = createSet;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(46),
	    root = __webpack_require__(19);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(80),
	    baseIntersection = __webpack_require__(112),
	    baseRest = __webpack_require__(83),
	    castArrayLikeObject = __webpack_require__(113);

	/**
	 * Creates an array of unique values that are included in all given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of intersecting values.
	 * @example
	 *
	 * _.intersection([2, 1], [2, 3]);
	 * // => [2]
	 */
	var intersection = baseRest(function(arrays) {
	  var mapped = arrayMap(arrays, castArrayLikeObject);
	  return (mapped.length && mapped[0] === arrays[0])
	    ? baseIntersection(mapped)
	    : [];
	});

	module.exports = intersection;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(40),
	    arrayIncludes = __webpack_require__(74),
	    arrayIncludesWith = __webpack_require__(79),
	    arrayMap = __webpack_require__(80),
	    baseUnary = __webpack_require__(81),
	    cacheHas = __webpack_require__(82);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * The base implementation of methods like `_.intersection`, without support
	 * for iteratee shorthands, that accepts an array of arrays to inspect.
	 *
	 * @private
	 * @param {Array} arrays The arrays to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of shared values.
	 */
	function baseIntersection(arrays, iteratee, comparator) {
	  var includes = comparator ? arrayIncludesWith : arrayIncludes,
	      length = arrays[0].length,
	      othLength = arrays.length,
	      othIndex = othLength,
	      caches = Array(othLength),
	      maxLength = Infinity,
	      result = [];

	  while (othIndex--) {
	    var array = arrays[othIndex];
	    if (othIndex && iteratee) {
	      array = arrayMap(array, baseUnary(iteratee));
	    }
	    maxLength = nativeMin(array.length, maxLength);
	    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
	      ? new SetCache(othIndex && array)
	      : undefined;
	  }
	  array = arrays[0];

	  var index = -1,
	      seen = caches[0];

	  outer:
	  while (++index < length && result.length < maxLength) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (!(seen
	          ? cacheHas(seen, computed)
	          : includes(result, computed, comparator)
	        )) {
	      othIndex = othLength;
	      while (--othIndex) {
	        var cache = caches[othIndex];
	        if (!(cache
	              ? cacheHas(cache, computed)
	              : includes(arrays[othIndex], computed, comparator))
	            ) {
	          continue outer;
	        }
	      }
	      if (seen) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseIntersection;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(92);

	/**
	 * Casts `value` to an empty array if it's not an array like object.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array|Object} Returns the cast array-like object.
	 */
	function castArrayLikeObject(value) {
	  return isArrayLikeObject(value) ? value : [];
	}

	module.exports = castArrayLikeObject;


/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = stateId;
	function stateId() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		return state + 1;
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isArray = __webpack_require__(34);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _matchesType = __webpack_require__(36);

	var _matchesType2 = _interopRequireDefault(_matchesType);

	var _HandlerRegistry = __webpack_require__(116);

	var _HandlerRegistry2 = _interopRequireDefault(_HandlerRegistry);

	var _dragOffset = __webpack_require__(30);

	var _dirtyHandlerIds = __webpack_require__(97);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DragDropMonitor = function () {
		function DragDropMonitor(store) {
			_classCallCheck(this, DragDropMonitor);

			this.store = store;
			this.registry = new _HandlerRegistry2.default(store);
		}

		_createClass(DragDropMonitor, [{
			key: 'subscribeToStateChange',
			value: function subscribeToStateChange(listener) {
				var _this = this;

				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				var handlerIds = options.handlerIds;

				(0, _invariant2.default)(typeof listener === 'function', 'listener must be a function.');
				(0, _invariant2.default)(typeof handlerIds === 'undefined' || (0, _isArray2.default)(handlerIds), 'handlerIds, when specified, must be an array of strings.');

				var prevStateId = this.store.getState().stateId;
				var handleChange = function handleChange() {
					var state = _this.store.getState();
					var currentStateId = state.stateId;
					try {
						var canSkipListener = currentStateId === prevStateId || currentStateId === prevStateId + 1 && !(0, _dirtyHandlerIds.areDirty)(state.dirtyHandlerIds, handlerIds);

						if (!canSkipListener) {
							listener();
						}
					} finally {
						prevStateId = currentStateId;
					}
				};

				return this.store.subscribe(handleChange);
			}
		}, {
			key: 'subscribeToOffsetChange',
			value: function subscribeToOffsetChange(listener) {
				var _this2 = this;

				(0, _invariant2.default)(typeof listener === 'function', 'listener must be a function.');

				var previousState = this.store.getState().dragOffset;
				var handleChange = function handleChange() {
					var nextState = _this2.store.getState().dragOffset;
					if (nextState === previousState) {
						return;
					}

					previousState = nextState;
					listener();
				};

				return this.store.subscribe(handleChange);
			}
		}, {
			key: 'canDragSource',
			value: function canDragSource(sourceId) {
				var source = this.registry.getSource(sourceId);
				(0, _invariant2.default)(source, 'Expected to find a valid source.');

				if (this.isDragging()) {
					return false;
				}

				return source.canDrag(this, sourceId);
			}
		}, {
			key: 'canDropOnTarget',
			value: function canDropOnTarget(targetId) {
				var target = this.registry.getTarget(targetId);
				(0, _invariant2.default)(target, 'Expected to find a valid target.');

				if (!this.isDragging() || this.didDrop()) {
					return false;
				}

				var targetType = this.registry.getTargetType(targetId);
				var draggedItemType = this.getItemType();
				return (0, _matchesType2.default)(targetType, draggedItemType) && target.canDrop(this, targetId);
			}
		}, {
			key: 'isDragging',
			value: function isDragging() {
				return Boolean(this.getItemType());
			}
		}, {
			key: 'isDraggingSource',
			value: function isDraggingSource(sourceId) {
				var source = this.registry.getSource(sourceId, true);
				(0, _invariant2.default)(source, 'Expected to find a valid source.');

				if (!this.isDragging() || !this.isSourcePublic()) {
					return false;
				}

				var sourceType = this.registry.getSourceType(sourceId);
				var draggedItemType = this.getItemType();
				if (sourceType !== draggedItemType) {
					return false;
				}

				return source.isDragging(this, sourceId);
			}
		}, {
			key: 'isOverTarget',
			value: function isOverTarget(targetId) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { shallow: false };
				var shallow = options.shallow;

				if (!this.isDragging()) {
					return false;
				}

				var targetType = this.registry.getTargetType(targetId);
				var draggedItemType = this.getItemType();
				if (!(0, _matchesType2.default)(targetType, draggedItemType)) {
					return false;
				}

				var targetIds = this.getTargetIds();
				if (!targetIds.length) {
					return false;
				}

				var index = targetIds.indexOf(targetId);
				if (shallow) {
					return index === targetIds.length - 1;
				} else {
					return index > -1;
				}
			}
		}, {
			key: 'getItemType',
			value: function getItemType() {
				return this.store.getState().dragOperation.itemType;
			}
		}, {
			key: 'getItem',
			value: function getItem() {
				return this.store.getState().dragOperation.item;
			}
		}, {
			key: 'getSourceId',
			value: function getSourceId() {
				return this.store.getState().dragOperation.sourceId;
			}
		}, {
			key: 'getTargetIds',
			value: function getTargetIds() {
				return this.store.getState().dragOperation.targetIds;
			}
		}, {
			key: 'getDropResult',
			value: function getDropResult() {
				return this.store.getState().dragOperation.dropResult;
			}
		}, {
			key: 'didDrop',
			value: function didDrop() {
				return this.store.getState().dragOperation.didDrop;
			}
		}, {
			key: 'isSourcePublic',
			value: function isSourcePublic() {
				return this.store.getState().dragOperation.isSourcePublic;
			}
		}, {
			key: 'getInitialClientOffset',
			value: function getInitialClientOffset() {
				return this.store.getState().dragOffset.initialClientOffset;
			}
		}, {
			key: 'getInitialSourceClientOffset',
			value: function getInitialSourceClientOffset() {
				return this.store.getState().dragOffset.initialSourceClientOffset;
			}
		}, {
			key: 'getClientOffset',
			value: function getClientOffset() {
				return this.store.getState().dragOffset.clientOffset;
			}
		}, {
			key: 'getSourceClientOffset',
			value: function getSourceClientOffset() {
				return (0, _dragOffset.getSourceClientOffset)(this.store.getState().dragOffset);
			}
		}, {
			key: 'getDifferenceFromInitialOffset',
			value: function getDifferenceFromInitialOffset() {
				return (0, _dragOffset.getDifferenceFromInitialOffset)(this.store.getState().dragOffset);
			}
		}]);

		return DragDropMonitor;
	}();

	exports.default = DragDropMonitor;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isArray = __webpack_require__(34);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _asap = __webpack_require__(117);

	var _asap2 = _interopRequireDefault(_asap);

	var _registry = __webpack_require__(95);

	var _getNextUniqueId = __webpack_require__(119);

	var _getNextUniqueId2 = _interopRequireDefault(_getNextUniqueId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HandlerRoles = {
		SOURCE: 'SOURCE',
		TARGET: 'TARGET'
	};

	function validateSourceContract(source) {
		(0, _invariant2.default)(typeof source.canDrag === 'function', 'Expected canDrag to be a function.');
		(0, _invariant2.default)(typeof source.beginDrag === 'function', 'Expected beginDrag to be a function.');
		(0, _invariant2.default)(typeof source.endDrag === 'function', 'Expected endDrag to be a function.');
	}

	function validateTargetContract(target) {
		(0, _invariant2.default)(typeof target.canDrop === 'function', 'Expected canDrop to be a function.');
		(0, _invariant2.default)(typeof target.hover === 'function', 'Expected hover to be a function.');
		(0, _invariant2.default)(typeof target.drop === 'function', 'Expected beginDrag to be a function.');
	}

	function validateType(type, allowArray) {
		if (allowArray && (0, _isArray2.default)(type)) {
			type.forEach(function (t) {
				return validateType(t, false);
			});
			return;
		}

		(0, _invariant2.default)(typeof type === 'string' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol', allowArray ? 'Type can only be a string, a symbol, or an array of either.' : 'Type can only be a string or a symbol.');
	}

	function getNextHandlerId(role) {
		var id = (0, _getNextUniqueId2.default)().toString();
		switch (role) {
			case HandlerRoles.SOURCE:
				return 'S' + id;
			case HandlerRoles.TARGET:
				return 'T' + id;
			default:
				(0, _invariant2.default)(false, 'Unknown role: ' + role);
		}
	}

	function parseRoleFromHandlerId(handlerId) {
		switch (handlerId[0]) {
			case 'S':
				return HandlerRoles.SOURCE;
			case 'T':
				return HandlerRoles.TARGET;
			default:
				(0, _invariant2.default)(false, 'Cannot parse handler ID: ' + handlerId);
		}
	}

	var HandlerRegistry = function () {
		function HandlerRegistry(store) {
			_classCallCheck(this, HandlerRegistry);

			this.store = store;

			this.types = {};
			this.handlers = {};

			this.pinnedSourceId = null;
			this.pinnedSource = null;
		}

		_createClass(HandlerRegistry, [{
			key: 'addSource',
			value: function addSource(type, source) {
				validateType(type);
				validateSourceContract(source);

				var sourceId = this.addHandler(HandlerRoles.SOURCE, type, source);
				this.store.dispatch((0, _registry.addSource)(sourceId));
				return sourceId;
			}
		}, {
			key: 'addTarget',
			value: function addTarget(type, target) {
				validateType(type, true);
				validateTargetContract(target);

				var targetId = this.addHandler(HandlerRoles.TARGET, type, target);
				this.store.dispatch((0, _registry.addTarget)(targetId));
				return targetId;
			}
		}, {
			key: 'addHandler',
			value: function addHandler(role, type, handler) {
				var id = getNextHandlerId(role);
				this.types[id] = type;
				this.handlers[id] = handler;

				return id;
			}
		}, {
			key: 'containsHandler',
			value: function containsHandler(handler) {
				var _this = this;

				return Object.keys(this.handlers).some(function (key) {
					return _this.handlers[key] === handler;
				});
			}
		}, {
			key: 'getSource',
			value: function getSource(sourceId, includePinned) {
				(0, _invariant2.default)(this.isSourceId(sourceId), 'Expected a valid source ID.');

				var isPinned = includePinned && sourceId === this.pinnedSourceId;
				var source = isPinned ? this.pinnedSource : this.handlers[sourceId];

				return source;
			}
		}, {
			key: 'getTarget',
			value: function getTarget(targetId) {
				(0, _invariant2.default)(this.isTargetId(targetId), 'Expected a valid target ID.');
				return this.handlers[targetId];
			}
		}, {
			key: 'getSourceType',
			value: function getSourceType(sourceId) {
				(0, _invariant2.default)(this.isSourceId(sourceId), 'Expected a valid source ID.');
				return this.types[sourceId];
			}
		}, {
			key: 'getTargetType',
			value: function getTargetType(targetId) {
				(0, _invariant2.default)(this.isTargetId(targetId), 'Expected a valid target ID.');
				return this.types[targetId];
			}
		}, {
			key: 'isSourceId',
			value: function isSourceId(handlerId) {
				var role = parseRoleFromHandlerId(handlerId);
				return role === HandlerRoles.SOURCE;
			}
		}, {
			key: 'isTargetId',
			value: function isTargetId(handlerId) {
				var role = parseRoleFromHandlerId(handlerId);
				return role === HandlerRoles.TARGET;
			}
		}, {
			key: 'removeSource',
			value: function removeSource(sourceId) {
				var _this2 = this;

				(0, _invariant2.default)(this.getSource(sourceId), 'Expected an existing source.');
				this.store.dispatch((0, _registry.removeSource)(sourceId));

				(0, _asap2.default)(function () {
					delete _this2.handlers[sourceId];
					delete _this2.types[sourceId];
				});
			}
		}, {
			key: 'removeTarget',
			value: function removeTarget(targetId) {
				var _this3 = this;

				(0, _invariant2.default)(this.getTarget(targetId), 'Expected an existing target.');
				this.store.dispatch((0, _registry.removeTarget)(targetId));

				(0, _asap2.default)(function () {
					delete _this3.handlers[targetId];
					delete _this3.types[targetId];
				});
			}
		}, {
			key: 'pinSource',
			value: function pinSource(sourceId) {
				var source = this.getSource(sourceId);
				(0, _invariant2.default)(source, 'Expected an existing source.');

				this.pinnedSourceId = sourceId;
				this.pinnedSource = source;
			}
		}, {
			key: 'unpinSource',
			value: function unpinSource() {
				(0, _invariant2.default)(this.pinnedSource, 'No source is pinned at the time.');

				this.pinnedSourceId = null;
				this.pinnedSource = null;
			}
		}]);

		return HandlerRegistry;
	}();

	exports.default = HandlerRegistry;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(118);
	// RawTasks are recycled to reduce GC churn.
	var freeTasks = [];
	// We queue errors to ensure they are thrown in right order (FIFO).
	// Array-as-queue is good enough here, since we are just dealing with exceptions.
	var pendingErrors = [];
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

	function throwFirstError() {
	    if (pendingErrors.length) {
	        throw pendingErrors.shift();
	    }
	}

	/**
	 * Calls a task as soon as possible after returning, in its own event, with priority
	 * over other events like animation, reflow, and repaint. An error thrown from an
	 * event will not interrupt, nor even substantially slow down the processing of
	 * other events, but will be rather postponed to a lower priority event.
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawAsap(rawTask);
	}

	// We wrap tasks with recyclable task objects.  A task object implements
	// `call`, just like a function.
	function RawTask() {
	    this.task = null;
	}

	// The sole purpose of wrapping the task is to catch the exception and recycle
	// the task object after its single use.
	RawTask.prototype.call = function () {
	    try {
	        this.task.call();
	    } catch (error) {
	        if (asap.onerror) {
	            // This hook exists purely for testing purposes.
	            // Its name will be periodically randomized to break any code that
	            // depends on its existence.
	            asap.onerror(error);
	        } else {
	            // In a web browser, exceptions are not fatal. However, to avoid
	            // slowing down the queue of pending tasks, we rethrow the error in a
	            // lower priority turn.
	            pendingErrors.push(error);
	            requestErrorThrow();
	        }
	    } finally {
	        this.task = null;
	        freeTasks[freeTasks.length] = this;
	    }
	};


/***/ },
/* 118 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}

	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;

	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}

	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` or `self` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

	/* globals self */
	var scope = typeof global !== "undefined" ? global : self;
	var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);

	// MessageChannels are desirable because they give direct access to the HTML
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	// 11-12, and in web workers in many engines.
	// Although message channels yield to any queued rendering and IO tasks, they
	// would be better than imposing the 4ms delay of timers.
	// However, they do not work reliably in Internet Explorer or Safari.

	// Internet Explorer 10 is the only browser that has setImmediate but does
	// not have MutationObservers.
	// Although setImmediate yields to the browser's renderer, it would be
	// preferrable to falling back to setTimeout since it does not have
	// the minimum 4ms penalty.
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	// Desktop to a lesser extent) that renders both setImmediate and
	// MessageChannel useless for the purposes of ASAP.
	// https://github.com/kriskowal/q/issues/396

	// Timers are implemented universally.
	// We fall back to timers in workers in most engines, and in foreground
	// contexts in the following browsers.
	// However, note that even this simple case requires nuances to operate in a
	// broad spectrum of browsers.
	//
	// - Firefox 3-13
	// - Internet Explorer 6-9
	// - iPad Safari 4.3
	// - Lynx 2.8.7
	} else {
	    requestFlush = makeRequestCallFromTimer(flush);
	}

	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;

	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, {characterData: true});
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}

	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html

	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.

	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }

	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.

	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }

	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.

	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.

	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);

	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}

	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getNextUniqueId;
	var nextUniqueId = 0;

	function getNextUniqueId() {
		return nextUniqueId++;
	}

/***/ },
/* 120 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DragSource = function () {
		function DragSource() {
			_classCallCheck(this, DragSource);
		}

		_createClass(DragSource, [{
			key: "canDrag",
			value: function canDrag() {
				return true;
			}
		}, {
			key: "isDragging",
			value: function isDragging(monitor, handle) {
				return handle === monitor.getSourceId();
			}
		}, {
			key: "endDrag",
			value: function endDrag() {}
		}]);

		return DragSource;
	}();

	exports.default = DragSource;

/***/ },
/* 121 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DropTarget = function () {
		function DropTarget() {
			_classCallCheck(this, DropTarget);
		}

		_createClass(DropTarget, [{
			key: "canDrop",
			value: function canDrop() {
				return true;
			}
		}, {
			key: "hover",
			value: function hover() {}
		}, {
			key: "drop",
			value: function drop() {}
		}]);

		return DropTarget;
	}();

	exports.default = DropTarget;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = createBackend;

	var _noop = __webpack_require__(109);

	var _noop2 = _interopRequireDefault(_noop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TestBackend = function () {
		function TestBackend(manager) {
			_classCallCheck(this, TestBackend);

			this.actions = manager.getActions();
		}

		_createClass(TestBackend, [{
			key: 'setup',
			value: function setup() {
				this.didCallSetup = true;
			}
		}, {
			key: 'teardown',
			value: function teardown() {
				this.didCallTeardown = true;
			}
		}, {
			key: 'connectDragSource',
			value: function connectDragSource() {
				return _noop2.default;
			}
		}, {
			key: 'connectDragPreview',
			value: function connectDragPreview() {
				return _noop2.default;
			}
		}, {
			key: 'connectDropTarget',
			value: function connectDropTarget() {
				return _noop2.default;
			}
		}, {
			key: 'simulateBeginDrag',
			value: function simulateBeginDrag(sourceIds, options) {
				this.actions.beginDrag(sourceIds, options);
			}
		}, {
			key: 'simulatePublishDragSource',
			value: function simulatePublishDragSource() {
				this.actions.publishDragSource();
			}
		}, {
			key: 'simulateHover',
			value: function simulateHover(targetIds, options) {
				this.actions.hover(targetIds, options);
			}
		}, {
			key: 'simulateDrop',
			value: function simulateDrop() {
				this.actions.drop();
			}
		}, {
			key: 'simulateEndDrag',
			value: function simulateEndDrag() {
				this.actions.endDrag();
			}
		}]);

		return TestBackend;
	}();

	function createBackend(manager) {
		return new TestBackend(manager);
	}

/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = checkDecoratorArguments;
	function checkDecoratorArguments(functionName, signature) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i += 1) {
	      var arg = arguments.length <= i + 2 ? undefined : arguments[i + 2];
	      if (arg && arg.prototype && arg.prototype.render) {
	        console.error( // eslint-disable-line no-console
	        'You seem to be applying the arguments in the wrong order. ' + ('It should be ' + functionName + '(' + signature + ')(Component), not the other way around. ') + 'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#you-seem-to-be-applying-the-arguments-in-the-wrong-order');
	        return;
	      }
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _react = __webpack_require__(3);

	var _DragDropContext = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * This class is a React-Component based version of the DragDropContext.
	 * This is an alternative to decorating an application component with an ES7 decorator.
	 */
	var DragDropContextProvider = (_temp = _class = function (_Component) {
	  _inherits(DragDropContextProvider, _Component);

	  function DragDropContextProvider(props, context) {
	    _classCallCheck(this, DragDropContextProvider);

	    var _this = _possibleConstructorReturn(this, (DragDropContextProvider.__proto__ || Object.getPrototypeOf(DragDropContextProvider)).call(this, props, context));

	    _this.backend = (0, _DragDropContext.unpackBackendForEs5Users)(props.backend);
	    return _this;
	  }

	  _createClass(DragDropContextProvider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var _this2 = this;

	      /**
	       * This property determines which window global to use for creating the DragDropManager.
	       * If a window has been injected explicitly via props, that is used first. If it is available
	       * as a context value, then use that, otherwise use the browser global.
	       */
	      var getWindow = function getWindow() {
	        if (_this2.props && _this2.props.window) {
	          return _this2.props.window;
	        } else if (_this2.context && _this2.context.window) {
	          return _this2.context.window;
	        } else if (typeof window !== 'undefined') {
	          return window;
	        }
	        return undefined;
	      };

	      return (0, _DragDropContext.createChildContext)(this.backend, { window: getWindow() });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react.Children.only(this.props.children);
	    }
	  }]);

	  return DragDropContextProvider;
	}(_react.Component), _class.propTypes = {
	  backend: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]).isRequired,
	  children: _react.PropTypes.element.isRequired,
	  window: _react.PropTypes.object }, _class.defaultProps = {
	  window: undefined
	}, _class.childContextTypes = _DragDropContext.CHILD_CONTEXT_TYPES, _class.displayName = 'DragDropContextProvider', _class.contextTypes = {
	  window: _react.PropTypes.object
	}, _temp);
	exports.default = DragDropContextProvider;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = DragLayer;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(123);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _shallowEqual = __webpack_require__(127);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _shallowEqualScalar = __webpack_require__(128);

	var _shallowEqualScalar2 = _interopRequireDefault(_shallowEqualScalar);

	var _checkDecoratorArguments = __webpack_require__(124);

	var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function DragLayer(collect) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  _checkDecoratorArguments2.default.apply(undefined, ['DragLayer', 'collect[, options]'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
	  (0, _invariant2.default)(typeof collect === 'function', 'Expected "collect" provided as the first argument to DragLayer ' + 'to be a function that collects props to inject into the component. ', 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html', collect);
	  (0, _invariant2.default)((0, _isPlainObject2.default)(options), 'Expected "options" provided as the second argument to DragLayer to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html', options);

	  return function decorateLayer(DecoratedComponent) {
	    var _class, _temp;

	    var _options$arePropsEqua = options.arePropsEqual,
	        arePropsEqual = _options$arePropsEqua === undefined ? _shallowEqualScalar2.default : _options$arePropsEqua;

	    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

	    var DragLayerContainer = (_temp = _class = function (_Component) {
	      _inherits(DragLayerContainer, _Component);

	      _createClass(DragLayerContainer, [{
	        key: 'getDecoratedComponentInstance',
	        value: function getDecoratedComponentInstance() {
	          (0, _invariant2.default)(this.child, 'In order to access an instance of the decorated component it can ' + 'not be a stateless component.');
	          return this.child;
	        }
	      }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	          return !arePropsEqual(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
	        }
	      }]);

	      function DragLayerContainer(props, context) {
	        _classCallCheck(this, DragLayerContainer);

	        var _this = _possibleConstructorReturn(this, (DragLayerContainer.__proto__ || Object.getPrototypeOf(DragLayerContainer)).call(this, props));

	        _this.handleChange = _this.handleChange.bind(_this);

	        _this.manager = context.dragDropManager;
	        (0, _invariant2.default)(_typeof(_this.manager) === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to wrap the top-level component of your app with DragDropContext. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);

	        _this.state = _this.getCurrentState();
	        return _this;
	      }

	      _createClass(DragLayerContainer, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          this.isCurrentlyMounted = true;

	          var monitor = this.manager.getMonitor();
	          this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
	          this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);

	          this.handleChange();
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          this.isCurrentlyMounted = false;

	          this.unsubscribeFromOffsetChange();
	          this.unsubscribeFromStateChange();
	        }
	      }, {
	        key: 'handleChange',
	        value: function handleChange() {
	          if (!this.isCurrentlyMounted) {
	            return;
	          }

	          var nextState = this.getCurrentState();
	          if (!(0, _shallowEqual2.default)(nextState, this.state)) {
	            this.setState(nextState);
	          }
	        }
	      }, {
	        key: 'getCurrentState',
	        value: function getCurrentState() {
	          var monitor = this.manager.getMonitor();
	          return collect(monitor);
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var _this2 = this;

	          return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state, {
	            ref: function ref(child) {
	              return _this2.child = child;
	            }
	          }));
	        }
	      }]);

	      return DragLayerContainer;
	    }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = 'DragLayer(' + displayName + ')', _class.contextTypes = {
	      dragDropManager: _react.PropTypes.object.isRequired
	    }, _temp);


	    return (0, _hoistNonReactStatics2.default)(DragLayerContainer, DecoratedComponent);
	  };
	}

/***/ },
/* 127 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i += 1) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }

	    var valA = objA[keysA[i]];
	    var valB = objB[keysA[i]];

	    if (valA !== valB) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = shallowEqualScalar;
	function shallowEqualScalar(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i += 1) {
	    if (!hasOwn.call(objB, keysA[i])) {
	      return false;
	    }

	    var valA = objA[keysA[i]];
	    var valB = objB[keysA[i]];

	    if (valA !== valB || (typeof valA === 'undefined' ? 'undefined' : _typeof(valA)) === 'object' || (typeof valB === 'undefined' ? 'undefined' : _typeof(valB)) === 'object') {
	      return false;
	    }
	  }

	  return true;
	}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = DragSource;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _checkDecoratorArguments = __webpack_require__(124);

	var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

	var _decorateHandler = __webpack_require__(130);

	var _decorateHandler2 = _interopRequireDefault(_decorateHandler);

	var _registerSource = __webpack_require__(136);

	var _registerSource2 = _interopRequireDefault(_registerSource);

	var _createSourceFactory = __webpack_require__(137);

	var _createSourceFactory2 = _interopRequireDefault(_createSourceFactory);

	var _createSourceMonitor = __webpack_require__(138);

	var _createSourceMonitor2 = _interopRequireDefault(_createSourceMonitor);

	var _createSourceConnector = __webpack_require__(139);

	var _createSourceConnector2 = _interopRequireDefault(_createSourceConnector);

	var _isValidType = __webpack_require__(143);

	var _isValidType2 = _interopRequireDefault(_isValidType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function DragSource(type, spec, collect) {
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  _checkDecoratorArguments2.default.apply(undefined, ['DragSource', 'type, spec, collect[, options]'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
	  var getType = type;
	  if (typeof type !== 'function') {
	    (0, _invariant2.default)((0, _isValidType2.default)(type), 'Expected "type" provided as the first argument to DragSource to be ' + 'a string, or a function that returns a string given the current props. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', type);
	    getType = function getType() {
	      return type;
	    };
	  }
	  (0, _invariant2.default)((0, _isPlainObject2.default)(spec), 'Expected "spec" provided as the second argument to DragSource to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', spec);
	  var createSource = (0, _createSourceFactory2.default)(spec);
	  (0, _invariant2.default)(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', collect);
	  (0, _invariant2.default)((0, _isPlainObject2.default)(options), 'Expected "options" provided as the fourth argument to DragSource to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', collect);

	  return function decorateSource(DecoratedComponent) {
	    return (0, _decorateHandler2.default)({
	      connectBackend: function connectBackend(backend, sourceId) {
	        return backend.connectDragSource(sourceId);
	      },
	      containerDisplayName: 'DragSource',
	      createHandler: createSource,
	      registerHandler: _registerSource2.default,
	      createMonitor: _createSourceMonitor2.default,
	      createConnector: _createSourceConnector2.default,
	      DecoratedComponent: DecoratedComponent,
	      getType: getType,
	      collect: collect,
	      options: options
	    });
	  };
	}

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = decorateHandler;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _disposables = __webpack_require__(131);

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _hoistNonReactStatics = __webpack_require__(123);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _shallowEqual = __webpack_require__(127);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _shallowEqualScalar = __webpack_require__(128);

	var _shallowEqualScalar2 = _interopRequireDefault(_shallowEqualScalar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function decorateHandler(_ref) {
	  var _class, _temp;

	  var DecoratedComponent = _ref.DecoratedComponent,
	      createHandler = _ref.createHandler,
	      createMonitor = _ref.createMonitor,
	      createConnector = _ref.createConnector,
	      registerHandler = _ref.registerHandler,
	      containerDisplayName = _ref.containerDisplayName,
	      getType = _ref.getType,
	      collect = _ref.collect,
	      options = _ref.options;
	  var _options$arePropsEqua = options.arePropsEqual,
	      arePropsEqual = _options$arePropsEqua === undefined ? _shallowEqualScalar2.default : _options$arePropsEqua;

	  var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

	  var DragDropContainer = (_temp = _class = function (_Component) {
	    _inherits(DragDropContainer, _Component);

	    _createClass(DragDropContainer, [{
	      key: 'getHandlerId',
	      value: function getHandlerId() {
	        return this.handlerId;
	      }
	    }, {
	      key: 'getDecoratedComponentInstance',
	      value: function getDecoratedComponentInstance() {
	        return this.decoratedComponentInstance;
	      }
	    }, {
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps, nextState) {
	        return !arePropsEqual(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
	      }
	    }]);

	    function DragDropContainer(props, context) {
	      _classCallCheck(this, DragDropContainer);

	      var _this = _possibleConstructorReturn(this, (DragDropContainer.__proto__ || Object.getPrototypeOf(DragDropContainer)).call(this, props, context));

	      _this.handleChange = _this.handleChange.bind(_this);
	      _this.handleChildRef = _this.handleChildRef.bind(_this);

	      (0, _invariant2.default)(_typeof(_this.context.dragDropManager) === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to wrap the top-level component of your app with DragDropContext. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);

	      _this.manager = _this.context.dragDropManager;
	      _this.handlerMonitor = createMonitor(_this.manager);
	      _this.handlerConnector = createConnector(_this.manager.getBackend());
	      _this.handler = createHandler(_this.handlerMonitor);

	      _this.disposable = new _disposables.SerialDisposable();
	      _this.receiveProps(props);
	      _this.state = _this.getCurrentState();
	      _this.dispose();
	      return _this;
	    }

	    _createClass(DragDropContainer, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        this.isCurrentlyMounted = true;
	        this.disposable = new _disposables.SerialDisposable();
	        this.currentType = null;
	        this.receiveProps(this.props);
	        this.handleChange();
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if (!arePropsEqual(nextProps, this.props)) {
	          this.receiveProps(nextProps);
	          this.handleChange();
	        }
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.dispose();
	        this.isCurrentlyMounted = false;
	      }
	    }, {
	      key: 'receiveProps',
	      value: function receiveProps(props) {
	        this.handler.receiveProps(props);
	        this.receiveType(getType(props));
	      }
	    }, {
	      key: 'receiveType',
	      value: function receiveType(type) {
	        if (type === this.currentType) {
	          return;
	        }

	        this.currentType = type;

	        var _registerHandler = registerHandler(type, this.handler, this.manager),
	            handlerId = _registerHandler.handlerId,
	            unregister = _registerHandler.unregister;

	        this.handlerId = handlerId;
	        this.handlerMonitor.receiveHandlerId(handlerId);
	        this.handlerConnector.receiveHandlerId(handlerId);

	        var globalMonitor = this.manager.getMonitor();
	        var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, { handlerIds: [handlerId] });

	        this.disposable.setDisposable(new _disposables.CompositeDisposable(new _disposables.Disposable(unsubscribe), new _disposables.Disposable(unregister)));
	      }
	    }, {
	      key: 'handleChange',
	      value: function handleChange() {
	        if (!this.isCurrentlyMounted) {
	          return;
	        }

	        var nextState = this.getCurrentState();
	        if (!(0, _shallowEqual2.default)(nextState, this.state)) {
	          this.setState(nextState);
	        }
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        this.disposable.dispose();
	        this.handlerConnector.receiveHandlerId(null);
	      }
	    }, {
	      key: 'handleChildRef',
	      value: function handleChildRef(component) {
	        this.decoratedComponentInstance = component;
	        this.handler.receiveComponent(component);
	      }
	    }, {
	      key: 'getCurrentState',
	      value: function getCurrentState() {
	        var nextState = collect(this.handlerConnector.hooks, this.handlerMonitor);

	        if (process.env.NODE_ENV !== 'production') {
	          (0, _invariant2.default)((0, _isPlainObject2.default)(nextState), 'Expected `collect` specified as the second argument to ' + '%s for %s to return a plain object of props to inject. ' + 'Instead, received %s.', containerDisplayName, displayName, nextState);
	        }

	        return nextState;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state, {
	          ref: this.handleChildRef
	        }));
	      }
	    }]);

	    return DragDropContainer;
	  }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = containerDisplayName + '(' + displayName + ')', _class.contextTypes = {
	    dragDropManager: _react.PropTypes.object.isRequired
	  }, _temp);


	  return (0, _hoistNonReactStatics2.default)(DragDropContainer, DecoratedComponent);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isDisposable2 = __webpack_require__(132);

	var _isDisposable3 = _interopRequireDefault(_isDisposable2);

	exports.isDisposable = _isDisposable3['default'];

	var _Disposable2 = __webpack_require__(133);

	var _Disposable3 = _interopRequireDefault(_Disposable2);

	exports.Disposable = _Disposable3['default'];

	var _CompositeDisposable2 = __webpack_require__(134);

	var _CompositeDisposable3 = _interopRequireDefault(_CompositeDisposable2);

	exports.CompositeDisposable = _CompositeDisposable3['default'];

	var _SerialDisposable2 = __webpack_require__(135);

	var _SerialDisposable3 = _interopRequireDefault(_SerialDisposable2);

	exports.SerialDisposable = _SerialDisposable3['default'];

/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isDisposable;

	function isDisposable(obj) {
	  return Boolean(obj && typeof obj.dispose === 'function');
	}

	module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var noop = function noop() {};

	/**
	 * The basic disposable.
	 */

	var Disposable = (function () {
	  _createClass(Disposable, null, [{
	    key: "empty",
	    value: { dispose: noop },
	    enumerable: true
	  }]);

	  function Disposable(action) {
	    _classCallCheck(this, Disposable);

	    this.isDisposed = false;
	    this.action = action || noop;
	  }

	  Disposable.prototype.dispose = function dispose() {
	    if (!this.isDisposed) {
	      this.action.call(null);
	      this.isDisposed = true;
	    }
	  };

	  return Disposable;
	})();

	exports["default"] = Disposable;
	module.exports = exports["default"];

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _isDisposable = __webpack_require__(132);

	var _isDisposable2 = _interopRequireDefault(_isDisposable);

	/**
	 * Represents a group of disposable resources that are disposed together.
	 */

	var CompositeDisposable = (function () {
	  function CompositeDisposable() {
	    for (var _len = arguments.length, disposables = Array(_len), _key = 0; _key < _len; _key++) {
	      disposables[_key] = arguments[_key];
	    }

	    _classCallCheck(this, CompositeDisposable);

	    if (Array.isArray(disposables[0]) && disposables.length === 1) {
	      disposables = disposables[0];
	    }

	    for (var i = 0; i < disposables.length; i++) {
	      if (!_isDisposable2['default'](disposables[i])) {
	        throw new Error('Expected a disposable');
	      }
	    }

	    this.disposables = disposables;
	    this.isDisposed = false;
	  }

	  /**
	   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
	   * @param {Disposable} item Disposable to add.
	   */

	  CompositeDisposable.prototype.add = function add(item) {
	    if (this.isDisposed) {
	      item.dispose();
	    } else {
	      this.disposables.push(item);
	    }
	  };

	  /**
	   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
	   * @param {Disposable} item Disposable to remove.
	   * @returns {Boolean} true if found; false otherwise.
	   */

	  CompositeDisposable.prototype.remove = function remove(item) {
	    if (this.isDisposed) {
	      return false;
	    }

	    var index = this.disposables.indexOf(item);
	    if (index === -1) {
	      return false;
	    }

	    this.disposables.splice(index, 1);
	    item.dispose();
	    return true;
	  };

	  /**
	   * Disposes all disposables in the group and removes them from the group.
	   */

	  CompositeDisposable.prototype.dispose = function dispose() {
	    if (this.isDisposed) {
	      return;
	    }

	    var len = this.disposables.length;
	    var currentDisposables = new Array(len);
	    for (var i = 0; i < len; i++) {
	      currentDisposables[i] = this.disposables[i];
	    }

	    this.isDisposed = true;
	    this.disposables = [];
	    this.length = 0;

	    for (var i = 0; i < len; i++) {
	      currentDisposables[i].dispose();
	    }
	  };

	  return CompositeDisposable;
	})();

	exports['default'] = CompositeDisposable;
	module.exports = exports['default'];

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _isDisposable = __webpack_require__(132);

	var _isDisposable2 = _interopRequireDefault(_isDisposable);

	var SerialDisposable = (function () {
	  function SerialDisposable() {
	    _classCallCheck(this, SerialDisposable);

	    this.isDisposed = false;
	    this.current = null;
	  }

	  /**
	   * Gets the underlying disposable.
	   * @return The underlying disposable.
	   */

	  SerialDisposable.prototype.getDisposable = function getDisposable() {
	    return this.current;
	  };

	  /**
	   * Sets the underlying disposable.
	   * @param {Disposable} value The new underlying disposable.
	   */

	  SerialDisposable.prototype.setDisposable = function setDisposable() {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    if (value != null && !_isDisposable2['default'](value)) {
	      throw new Error('Expected either an empty value or a valid disposable');
	    }

	    var isDisposed = this.isDisposed;
	    var previous = undefined;

	    if (!isDisposed) {
	      previous = this.current;
	      this.current = value;
	    }

	    if (previous) {
	      previous.dispose();
	    }

	    if (isDisposed && value) {
	      value.dispose();
	    }
	  };

	  /**
	   * Disposes the underlying disposable as well as all future replacements.
	   */

	  SerialDisposable.prototype.dispose = function dispose() {
	    if (this.isDisposed) {
	      return;
	    }

	    this.isDisposed = true;
	    var previous = this.current;
	    this.current = null;

	    if (previous) {
	      previous.dispose();
	    }
	  };

	  return SerialDisposable;
	})();

	exports['default'] = SerialDisposable;
	module.exports = exports['default'];

/***/ },
/* 136 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = registerSource;
	function registerSource(type, source, manager) {
	  var registry = manager.getRegistry();
	  var sourceId = registry.addSource(type, source);

	  function unregisterSource() {
	    registry.removeSource(sourceId);
	  }

	  return {
	    handlerId: sourceId,
	    unregister: unregisterSource
	  };
	}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = createSourceFactory;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag'];
	var REQUIRED_SPEC_METHODS = ['beginDrag'];

	function createSourceFactory(spec) {
	  Object.keys(spec).forEach(function (key) {
	    (0, _invariant2.default)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', ALLOWED_SPEC_METHODS.join(', '), key);
	    (0, _invariant2.default)(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);
	  });
	  REQUIRED_SPEC_METHODS.forEach(function (key) {
	    (0, _invariant2.default)(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);
	  });

	  var Source = function () {
	    function Source(monitor) {
	      _classCallCheck(this, Source);

	      this.monitor = monitor;
	      this.props = null;
	      this.component = null;
	    }

	    _createClass(Source, [{
	      key: 'receiveProps',
	      value: function receiveProps(props) {
	        this.props = props;
	      }
	    }, {
	      key: 'receiveComponent',
	      value: function receiveComponent(component) {
	        this.component = component;
	      }
	    }, {
	      key: 'canDrag',
	      value: function canDrag() {
	        if (!spec.canDrag) {
	          return true;
	        }

	        return spec.canDrag(this.props, this.monitor);
	      }
	    }, {
	      key: 'isDragging',
	      value: function isDragging(globalMonitor, sourceId) {
	        if (!spec.isDragging) {
	          return sourceId === globalMonitor.getSourceId();
	        }

	        return spec.isDragging(this.props, this.monitor);
	      }
	    }, {
	      key: 'beginDrag',
	      value: function beginDrag() {
	        var item = spec.beginDrag(this.props, this.monitor, this.component);
	        if (process.env.NODE_ENV !== 'production') {
	          (0, _invariant2.default)((0, _isPlainObject2.default)(item), 'beginDrag() must return a plain object that represents the dragged item. ' + 'Instead received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', item);
	        }
	        return item;
	      }
	    }, {
	      key: 'endDrag',
	      value: function endDrag() {
	        if (!spec.endDrag) {
	          return;
	        }

	        spec.endDrag(this.props, this.monitor, this.component);
	      }
	    }]);

	    return Source;
	  }();

	  return function createSource(monitor) {
	    return new Source(monitor);
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = createSourceMonitor;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var isCallingCanDrag = false;
	var isCallingIsDragging = false;

	var SourceMonitor = function () {
	  function SourceMonitor(manager) {
	    _classCallCheck(this, SourceMonitor);

	    this.internalMonitor = manager.getMonitor();
	  }

	  _createClass(SourceMonitor, [{
	    key: 'receiveHandlerId',
	    value: function receiveHandlerId(sourceId) {
	      this.sourceId = sourceId;
	    }
	  }, {
	    key: 'canDrag',
	    value: function canDrag() {
	      (0, _invariant2.default)(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');

	      try {
	        isCallingCanDrag = true;
	        return this.internalMonitor.canDragSource(this.sourceId);
	      } finally {
	        isCallingCanDrag = false;
	      }
	    }
	  }, {
	    key: 'isDragging',
	    value: function isDragging() {
	      (0, _invariant2.default)(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');

	      try {
	        isCallingIsDragging = true;
	        return this.internalMonitor.isDraggingSource(this.sourceId);
	      } finally {
	        isCallingIsDragging = false;
	      }
	    }
	  }, {
	    key: 'getItemType',
	    value: function getItemType() {
	      return this.internalMonitor.getItemType();
	    }
	  }, {
	    key: 'getItem',
	    value: function getItem() {
	      return this.internalMonitor.getItem();
	    }
	  }, {
	    key: 'getDropResult',
	    value: function getDropResult() {
	      return this.internalMonitor.getDropResult();
	    }
	  }, {
	    key: 'didDrop',
	    value: function didDrop() {
	      return this.internalMonitor.didDrop();
	    }
	  }, {
	    key: 'getInitialClientOffset',
	    value: function getInitialClientOffset() {
	      return this.internalMonitor.getInitialClientOffset();
	    }
	  }, {
	    key: 'getInitialSourceClientOffset',
	    value: function getInitialSourceClientOffset() {
	      return this.internalMonitor.getInitialSourceClientOffset();
	    }
	  }, {
	    key: 'getSourceClientOffset',
	    value: function getSourceClientOffset() {
	      return this.internalMonitor.getSourceClientOffset();
	    }
	  }, {
	    key: 'getClientOffset',
	    value: function getClientOffset() {
	      return this.internalMonitor.getClientOffset();
	    }
	  }, {
	    key: 'getDifferenceFromInitialOffset',
	    value: function getDifferenceFromInitialOffset() {
	      return this.internalMonitor.getDifferenceFromInitialOffset();
	    }
	  }]);

	  return SourceMonitor;
	}();

	function createSourceMonitor(manager) {
	  return new SourceMonitor(manager);
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createSourceConnector;

	var _wrapConnectorHooks = __webpack_require__(140);

	var _wrapConnectorHooks2 = _interopRequireDefault(_wrapConnectorHooks);

	var _areOptionsEqual = __webpack_require__(142);

	var _areOptionsEqual2 = _interopRequireDefault(_areOptionsEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createSourceConnector(backend) {
	  var currentHandlerId = void 0;

	  var currentDragSourceNode = void 0;
	  var currentDragSourceOptions = void 0;
	  var disconnectCurrentDragSource = void 0;

	  var currentDragPreviewNode = void 0;
	  var currentDragPreviewOptions = void 0;
	  var disconnectCurrentDragPreview = void 0;

	  function reconnectDragSource() {
	    if (disconnectCurrentDragSource) {
	      disconnectCurrentDragSource();
	      disconnectCurrentDragSource = null;
	    }

	    if (currentHandlerId && currentDragSourceNode) {
	      disconnectCurrentDragSource = backend.connectDragSource(currentHandlerId, currentDragSourceNode, currentDragSourceOptions);
	    }
	  }

	  function reconnectDragPreview() {
	    if (disconnectCurrentDragPreview) {
	      disconnectCurrentDragPreview();
	      disconnectCurrentDragPreview = null;
	    }

	    if (currentHandlerId && currentDragPreviewNode) {
	      disconnectCurrentDragPreview = backend.connectDragPreview(currentHandlerId, currentDragPreviewNode, currentDragPreviewOptions);
	    }
	  }

	  function receiveHandlerId(handlerId) {
	    if (handlerId === currentHandlerId) {
	      return;
	    }

	    currentHandlerId = handlerId;
	    reconnectDragSource();
	    reconnectDragPreview();
	  }

	  var hooks = (0, _wrapConnectorHooks2.default)({
	    dragSource: function connectDragSource(node, options) {
	      if (node === currentDragSourceNode && (0, _areOptionsEqual2.default)(options, currentDragSourceOptions)) {
	        return;
	      }

	      currentDragSourceNode = node;
	      currentDragSourceOptions = options;

	      reconnectDragSource();
	    },

	    dragPreview: function connectDragPreview(node, options) {
	      if (node === currentDragPreviewNode && (0, _areOptionsEqual2.default)(options, currentDragPreviewOptions)) {
	        return;
	      }

	      currentDragPreviewNode = node;
	      currentDragPreviewOptions = options;

	      reconnectDragPreview();
	    }
	  });

	  return {
	    receiveHandlerId: receiveHandlerId,
	    hooks: hooks
	  };
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = wrapConnectorHooks;

	var _react = __webpack_require__(3);

	var _cloneWithRef = __webpack_require__(141);

	var _cloneWithRef2 = _interopRequireDefault(_cloneWithRef);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function throwIfCompositeComponentElement(element) {
	  // Custom components can no longer be wrapped directly in React DnD 2.0
	  // so that we don't need to depend on findDOMNode() from react-dom.
	  if (typeof element.type === 'string') {
	    return;
	  }

	  var displayName = element.type.displayName || element.type.name || 'the component';

	  throw new Error('Only native element nodes can now be passed to React DnD connectors.' + ('You can either wrap ' + displayName + ' into a <div>, or turn it into a ') + 'drag source or a drop target itself.');
	}

	function wrapHookToRecognizeElement(hook) {
	  return function () {
	    var elementOrNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    // When passed a node, call the hook straight away.
	    if (!(0, _react.isValidElement)(elementOrNode)) {
	      var node = elementOrNode;
	      hook(node, options);
	      return undefined;
	    }

	    // If passed a ReactElement, clone it and attach this function as a ref.
	    // This helps us achieve a neat API where user doesn't even know that refs
	    // are being used under the hood.
	    var element = elementOrNode;
	    throwIfCompositeComponentElement(element);

	    // When no options are passed, use the hook directly
	    var ref = options ? function (node) {
	      return hook(node, options);
	    } : hook;

	    return (0, _cloneWithRef2.default)(element, ref);
	  };
	}

	function wrapConnectorHooks(hooks) {
	  var wrappedHooks = {};

	  Object.keys(hooks).forEach(function (key) {
	    var hook = hooks[key];
	    var wrappedHook = wrapHookToRecognizeElement(hook);
	    wrappedHooks[key] = function () {
	      return wrappedHook;
	    };
	  });

	  return wrappedHooks;
	}

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = cloneWithRef;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function cloneWithRef(element, newRef) {
	  var previousRef = element.ref;
	  (0, _invariant2.default)(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' + 'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' + 'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');

	  if (!previousRef) {
	    // When there is no ref on the element, use the new ref directly
	    return (0, _react.cloneElement)(element, {
	      ref: newRef
	    });
	  }

	  return (0, _react.cloneElement)(element, {
	    ref: function ref(node) {
	      newRef(node);

	      if (previousRef) {
	        previousRef(node);
	      }
	    }
	  });
	}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = areOptionsEqual;

	var _shallowEqual = __webpack_require__(127);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function areOptionsEqual(nextOptions, currentOptions) {
	  if (currentOptions === nextOptions) {
	    return true;
	  }

	  return currentOptions !== null && nextOptions !== null && (0, _shallowEqual2.default)(currentOptions, nextOptions);
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	       value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = isValidType;

	var _isArray = __webpack_require__(34);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isValidType(type, allowArray) {
	       return typeof type === 'string' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' || allowArray && (0, _isArray2.default)(type) && type.every(function (t) {
	              return isValidType(t, false);
	       });
	}

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = DropTarget;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _checkDecoratorArguments = __webpack_require__(124);

	var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

	var _decorateHandler = __webpack_require__(130);

	var _decorateHandler2 = _interopRequireDefault(_decorateHandler);

	var _registerTarget = __webpack_require__(145);

	var _registerTarget2 = _interopRequireDefault(_registerTarget);

	var _createTargetFactory = __webpack_require__(146);

	var _createTargetFactory2 = _interopRequireDefault(_createTargetFactory);

	var _createTargetMonitor = __webpack_require__(147);

	var _createTargetMonitor2 = _interopRequireDefault(_createTargetMonitor);

	var _createTargetConnector = __webpack_require__(148);

	var _createTargetConnector2 = _interopRequireDefault(_createTargetConnector);

	var _isValidType = __webpack_require__(143);

	var _isValidType2 = _interopRequireDefault(_isValidType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function DropTarget(type, spec, collect) {
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  _checkDecoratorArguments2.default.apply(undefined, ['DropTarget', 'type, spec, collect[, options]'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
	  var getType = type;
	  if (typeof type !== 'function') {
	    (0, _invariant2.default)((0, _isValidType2.default)(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' + 'a string, an array of strings, or a function that returns either given ' + 'the current props. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', type);
	    getType = function getType() {
	      return type;
	    };
	  }
	  (0, _invariant2.default)((0, _isPlainObject2.default)(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', spec);
	  var createTarget = (0, _createTargetFactory2.default)(spec);
	  (0, _invariant2.default)(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', collect);
	  (0, _invariant2.default)((0, _isPlainObject2.default)(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', collect);

	  return function decorateTarget(DecoratedComponent) {
	    return (0, _decorateHandler2.default)({
	      connectBackend: function connectBackend(backend, targetId) {
	        return backend.connectDropTarget(targetId);
	      },
	      containerDisplayName: 'DropTarget',
	      createHandler: createTarget,
	      registerHandler: _registerTarget2.default,
	      createMonitor: _createTargetMonitor2.default,
	      createConnector: _createTargetConnector2.default,
	      DecoratedComponent: DecoratedComponent,
	      getType: getType,
	      collect: collect,
	      options: options
	    });
	  };
	}

/***/ },
/* 145 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = registerTarget;
	function registerTarget(type, target, manager) {
	  var registry = manager.getRegistry();
	  var targetId = registry.addTarget(type, target);

	  function unregisterTarget() {
	    registry.removeTarget(targetId);
	  }

	  return {
	    handlerId: targetId,
	    unregister: unregisterTarget
	  };
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = createTargetFactory;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];

	function createTargetFactory(spec) {
	  Object.keys(spec).forEach(function (key) {
	    (0, _invariant2.default)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drop target specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', ALLOWED_SPEC_METHODS.join(', '), key);
	    (0, _invariant2.default)(typeof spec[key] === 'function', 'Expected %s in the drop target specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', key, key, spec[key]);
	  });

	  var Target = function () {
	    function Target(monitor) {
	      _classCallCheck(this, Target);

	      this.monitor = monitor;
	      this.props = null;
	      this.component = null;
	    }

	    _createClass(Target, [{
	      key: 'receiveProps',
	      value: function receiveProps(props) {
	        this.props = props;
	      }
	    }, {
	      key: 'receiveMonitor',
	      value: function receiveMonitor(monitor) {
	        this.monitor = monitor;
	      }
	    }, {
	      key: 'receiveComponent',
	      value: function receiveComponent(component) {
	        this.component = component;
	      }
	    }, {
	      key: 'canDrop',
	      value: function canDrop() {
	        if (!spec.canDrop) {
	          return true;
	        }

	        return spec.canDrop(this.props, this.monitor);
	      }
	    }, {
	      key: 'hover',
	      value: function hover() {
	        if (!spec.hover) {
	          return;
	        }

	        spec.hover(this.props, this.monitor, this.component);
	      }
	    }, {
	      key: 'drop',
	      value: function drop() {
	        if (!spec.drop) {
	          return undefined;
	        }

	        var dropResult = spec.drop(this.props, this.monitor, this.component);
	        if (process.env.NODE_ENV !== 'production') {
	          (0, _invariant2.default)(typeof dropResult === 'undefined' || (0, _isPlainObject2.default)(dropResult), 'drop() must either return undefined, or an object that represents the drop result. ' + 'Instead received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', dropResult);
	        }
	        return dropResult;
	      }
	    }]);

	    return Target;
	  }();

	  return function createTarget(monitor) {
	    return new Target(monitor);
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = createTargetMonitor;

	var _invariant = __webpack_require__(32);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var isCallingCanDrop = false;

	var TargetMonitor = function () {
	  function TargetMonitor(manager) {
	    _classCallCheck(this, TargetMonitor);

	    this.internalMonitor = manager.getMonitor();
	  }

	  _createClass(TargetMonitor, [{
	    key: 'receiveHandlerId',
	    value: function receiveHandlerId(targetId) {
	      this.targetId = targetId;
	    }
	  }, {
	    key: 'canDrop',
	    value: function canDrop() {
	      (0, _invariant2.default)(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html');

	      try {
	        isCallingCanDrop = true;
	        return this.internalMonitor.canDropOnTarget(this.targetId);
	      } finally {
	        isCallingCanDrop = false;
	      }
	    }
	  }, {
	    key: 'isOver',
	    value: function isOver(options) {
	      return this.internalMonitor.isOverTarget(this.targetId, options);
	    }
	  }, {
	    key: 'getItemType',
	    value: function getItemType() {
	      return this.internalMonitor.getItemType();
	    }
	  }, {
	    key: 'getItem',
	    value: function getItem() {
	      return this.internalMonitor.getItem();
	    }
	  }, {
	    key: 'getDropResult',
	    value: function getDropResult() {
	      return this.internalMonitor.getDropResult();
	    }
	  }, {
	    key: 'didDrop',
	    value: function didDrop() {
	      return this.internalMonitor.didDrop();
	    }
	  }, {
	    key: 'getInitialClientOffset',
	    value: function getInitialClientOffset() {
	      return this.internalMonitor.getInitialClientOffset();
	    }
	  }, {
	    key: 'getInitialSourceClientOffset',
	    value: function getInitialSourceClientOffset() {
	      return this.internalMonitor.getInitialSourceClientOffset();
	    }
	  }, {
	    key: 'getSourceClientOffset',
	    value: function getSourceClientOffset() {
	      return this.internalMonitor.getSourceClientOffset();
	    }
	  }, {
	    key: 'getClientOffset',
	    value: function getClientOffset() {
	      return this.internalMonitor.getClientOffset();
	    }
	  }, {
	    key: 'getDifferenceFromInitialOffset',
	    value: function getDifferenceFromInitialOffset() {
	      return this.internalMonitor.getDifferenceFromInitialOffset();
	    }
	  }]);

	  return TargetMonitor;
	}();

	function createTargetMonitor(manager) {
	  return new TargetMonitor(manager);
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createTargetConnector;

	var _wrapConnectorHooks = __webpack_require__(140);

	var _wrapConnectorHooks2 = _interopRequireDefault(_wrapConnectorHooks);

	var _areOptionsEqual = __webpack_require__(142);

	var _areOptionsEqual2 = _interopRequireDefault(_areOptionsEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createTargetConnector(backend) {
	  var currentHandlerId = void 0;

	  var currentDropTargetNode = void 0;
	  var currentDropTargetOptions = void 0;
	  var disconnectCurrentDropTarget = void 0;

	  function reconnectDropTarget() {
	    if (disconnectCurrentDropTarget) {
	      disconnectCurrentDropTarget();
	      disconnectCurrentDropTarget = null;
	    }

	    if (currentHandlerId && currentDropTargetNode) {
	      disconnectCurrentDropTarget = backend.connectDropTarget(currentHandlerId, currentDropTargetNode, currentDropTargetOptions);
	    }
	  }

	  function receiveHandlerId(handlerId) {
	    if (handlerId === currentHandlerId) {
	      return;
	    }

	    currentHandlerId = handlerId;
	    reconnectDropTarget();
	  }

	  var hooks = (0, _wrapConnectorHooks2.default)({
	    dropTarget: function connectDropTarget(node, options) {
	      if (node === currentDropTargetNode && (0, _areOptionsEqual2.default)(options, currentDropTargetOptions)) {
	        return;
	      }

	      currentDropTargetNode = node;
	      currentDropTargetOptions = options;

	      reconnectDropTarget();
	    }
	  });

	  return {
	    receiveHandlerId: receiveHandlerId,
	    hooks: hooks
	  };
	}

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getEmptyImage = exports.NativeTypes = undefined;
	exports.default = createHTML5Backend;

	var _HTML5Backend = __webpack_require__(150);

	var _HTML5Backend2 = _interopRequireDefault(_HTML5Backend);

	var _getEmptyImage = __webpack_require__(174);

	var _getEmptyImage2 = _interopRequireDefault(_getEmptyImage);

	var _NativeTypes = __webpack_require__(173);

	var NativeTypes = _interopRequireWildcard(_NativeTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.NativeTypes = NativeTypes;
	exports.getEmptyImage = _getEmptyImage2.default;
	function createHTML5Backend(manager) {
	  return new _HTML5Backend2.default(manager);
	}

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _defaults = __webpack_require__(151);

	var _defaults2 = _interopRequireDefault(_defaults);

	var _shallowEqual = __webpack_require__(165);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _EnterLeaveCounter = __webpack_require__(166);

	var _EnterLeaveCounter2 = _interopRequireDefault(_EnterLeaveCounter);

	var _BrowserDetector = __webpack_require__(168);

	var _OffsetUtils = __webpack_require__(170);

	var _NativeDragSources = __webpack_require__(172);

	var _NativeTypes = __webpack_require__(173);

	var NativeTypes = _interopRequireWildcard(_NativeTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HTML5Backend = function () {
	  function HTML5Backend(manager) {
	    _classCallCheck(this, HTML5Backend);

	    this.actions = manager.getActions();
	    this.monitor = manager.getMonitor();
	    this.registry = manager.getRegistry();
	    this.context = manager.getContext();

	    this.sourcePreviewNodes = {};
	    this.sourcePreviewNodeOptions = {};
	    this.sourceNodes = {};
	    this.sourceNodeOptions = {};
	    this.enterLeaveCounter = new _EnterLeaveCounter2.default();

	    this.getSourceClientOffset = this.getSourceClientOffset.bind(this);
	    this.handleTopDragStart = this.handleTopDragStart.bind(this);
	    this.handleTopDragStartCapture = this.handleTopDragStartCapture.bind(this);
	    this.handleTopDragEndCapture = this.handleTopDragEndCapture.bind(this);
	    this.handleTopDragEnter = this.handleTopDragEnter.bind(this);
	    this.handleTopDragEnterCapture = this.handleTopDragEnterCapture.bind(this);
	    this.handleTopDragLeaveCapture = this.handleTopDragLeaveCapture.bind(this);
	    this.handleTopDragOver = this.handleTopDragOver.bind(this);
	    this.handleTopDragOverCapture = this.handleTopDragOverCapture.bind(this);
	    this.handleTopDrop = this.handleTopDrop.bind(this);
	    this.handleTopDropCapture = this.handleTopDropCapture.bind(this);
	    this.handleSelectStart = this.handleSelectStart.bind(this);
	    this.endDragIfSourceWasRemovedFromDOM = this.endDragIfSourceWasRemovedFromDOM.bind(this);
	    this.endDragNativeItem = this.endDragNativeItem.bind(this);
	  }

	  _createClass(HTML5Backend, [{
	    key: 'setup',
	    value: function setup() {
	      if (this.window === undefined) {
	        return;
	      }

	      if (this.window.__isReactDndBackendSetUp) {
	        // eslint-disable-line no-underscore-dangle
	        throw new Error('Cannot have two HTML5 backends at the same time.');
	      }
	      this.window.__isReactDndBackendSetUp = true; // eslint-disable-line no-underscore-dangle
	      this.addEventListeners(this.window);
	    }
	  }, {
	    key: 'teardown',
	    value: function teardown() {
	      if (this.window === undefined) {
	        return;
	      }

	      this.window.__isReactDndBackendSetUp = false; // eslint-disable-line no-underscore-dangle
	      this.removeEventListeners(this.window);
	      this.clearCurrentDragSourceNode();
	    }
	  }, {
	    key: 'addEventListeners',
	    value: function addEventListeners(target) {
	      target.addEventListener('dragstart', this.handleTopDragStart);
	      target.addEventListener('dragstart', this.handleTopDragStartCapture, true);
	      target.addEventListener('dragend', this.handleTopDragEndCapture, true);
	      target.addEventListener('dragenter', this.handleTopDragEnter);
	      target.addEventListener('dragenter', this.handleTopDragEnterCapture, true);
	      target.addEventListener('dragleave', this.handleTopDragLeaveCapture, true);
	      target.addEventListener('dragover', this.handleTopDragOver);
	      target.addEventListener('dragover', this.handleTopDragOverCapture, true);
	      target.addEventListener('drop', this.handleTopDrop);
	      target.addEventListener('drop', this.handleTopDropCapture, true);
	    }
	  }, {
	    key: 'removeEventListeners',
	    value: function removeEventListeners(target) {
	      target.removeEventListener('dragstart', this.handleTopDragStart);
	      target.removeEventListener('dragstart', this.handleTopDragStartCapture, true);
	      target.removeEventListener('dragend', this.handleTopDragEndCapture, true);
	      target.removeEventListener('dragenter', this.handleTopDragEnter);
	      target.removeEventListener('dragenter', this.handleTopDragEnterCapture, true);
	      target.removeEventListener('dragleave', this.handleTopDragLeaveCapture, true);
	      target.removeEventListener('dragover', this.handleTopDragOver);
	      target.removeEventListener('dragover', this.handleTopDragOverCapture, true);
	      target.removeEventListener('drop', this.handleTopDrop);
	      target.removeEventListener('drop', this.handleTopDropCapture, true);
	    }
	  }, {
	    key: 'connectDragPreview',
	    value: function connectDragPreview(sourceId, node, options) {
	      var _this = this;

	      this.sourcePreviewNodeOptions[sourceId] = options;
	      this.sourcePreviewNodes[sourceId] = node;

	      return function () {
	        delete _this.sourcePreviewNodes[sourceId];
	        delete _this.sourcePreviewNodeOptions[sourceId];
	      };
	    }
	  }, {
	    key: 'connectDragSource',
	    value: function connectDragSource(sourceId, node, options) {
	      var _this2 = this;

	      this.sourceNodes[sourceId] = node;
	      this.sourceNodeOptions[sourceId] = options;

	      var handleDragStart = function handleDragStart(e) {
	        return _this2.handleDragStart(e, sourceId);
	      };
	      var handleSelectStart = function handleSelectStart(e) {
	        return _this2.handleSelectStart(e, sourceId);
	      };

	      node.setAttribute('draggable', true);
	      node.addEventListener('dragstart', handleDragStart);
	      node.addEventListener('selectstart', handleSelectStart);

	      return function () {
	        delete _this2.sourceNodes[sourceId];
	        delete _this2.sourceNodeOptions[sourceId];

	        node.removeEventListener('dragstart', handleDragStart);
	        node.removeEventListener('selectstart', handleSelectStart);
	        node.setAttribute('draggable', false);
	      };
	    }
	  }, {
	    key: 'connectDropTarget',
	    value: function connectDropTarget(targetId, node) {
	      var _this3 = this;

	      var handleDragEnter = function handleDragEnter(e) {
	        return _this3.handleDragEnter(e, targetId);
	      };
	      var handleDragOver = function handleDragOver(e) {
	        return _this3.handleDragOver(e, targetId);
	      };
	      var handleDrop = function handleDrop(e) {
	        return _this3.handleDrop(e, targetId);
	      };

	      node.addEventListener('dragenter', handleDragEnter);
	      node.addEventListener('dragover', handleDragOver);
	      node.addEventListener('drop', handleDrop);

	      return function () {
	        node.removeEventListener('dragenter', handleDragEnter);
	        node.removeEventListener('dragover', handleDragOver);
	        node.removeEventListener('drop', handleDrop);
	      };
	    }
	  }, {
	    key: 'getCurrentSourceNodeOptions',
	    value: function getCurrentSourceNodeOptions() {
	      var sourceId = this.monitor.getSourceId();
	      var sourceNodeOptions = this.sourceNodeOptions[sourceId];

	      return (0, _defaults2.default)(sourceNodeOptions || {}, {
	        dropEffect: 'move'
	      });
	    }
	  }, {
	    key: 'getCurrentDropEffect',
	    value: function getCurrentDropEffect() {
	      if (this.isDraggingNativeItem()) {
	        // It makes more sense to default to 'copy' for native resources
	        return 'copy';
	      }

	      return this.getCurrentSourceNodeOptions().dropEffect;
	    }
	  }, {
	    key: 'getCurrentSourcePreviewNodeOptions',
	    value: function getCurrentSourcePreviewNodeOptions() {
	      var sourceId = this.monitor.getSourceId();
	      var sourcePreviewNodeOptions = this.sourcePreviewNodeOptions[sourceId];

	      return (0, _defaults2.default)(sourcePreviewNodeOptions || {}, {
	        anchorX: 0.5,
	        anchorY: 0.5,
	        captureDraggingState: false
	      });
	    }
	  }, {
	    key: 'getSourceClientOffset',
	    value: function getSourceClientOffset(sourceId) {
	      return (0, _OffsetUtils.getNodeClientOffset)(this.sourceNodes[sourceId]);
	    }
	  }, {
	    key: 'isDraggingNativeItem',
	    value: function isDraggingNativeItem() {
	      var itemType = this.monitor.getItemType();
	      return Object.keys(NativeTypes).some(function (key) {
	        return NativeTypes[key] === itemType;
	      });
	    }
	  }, {
	    key: 'beginDragNativeItem',
	    value: function beginDragNativeItem(type) {
	      this.clearCurrentDragSourceNode();

	      var SourceType = (0, _NativeDragSources.createNativeDragSource)(type);
	      this.currentNativeSource = new SourceType();
	      this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
	      this.actions.beginDrag([this.currentNativeHandle]);

	      // On Firefox, if mousemove fires, the drag is over but browser failed to tell us.
	      // This is not true for other browsers.
	      if ((0, _BrowserDetector.isFirefox)()) {
	        this.window.addEventListener('mousemove', this.endDragNativeItem, true);
	      }
	    }
	  }, {
	    key: 'endDragNativeItem',
	    value: function endDragNativeItem() {
	      if (!this.isDraggingNativeItem()) {
	        return;
	      }

	      if ((0, _BrowserDetector.isFirefox)()) {
	        this.window.removeEventListener('mousemove', this.endDragNativeItem, true);
	      }

	      this.actions.endDrag();
	      this.registry.removeSource(this.currentNativeHandle);
	      this.currentNativeHandle = null;
	      this.currentNativeSource = null;
	    }
	  }, {
	    key: 'endDragIfSourceWasRemovedFromDOM',
	    value: function endDragIfSourceWasRemovedFromDOM() {
	      var node = this.currentDragSourceNode;
	      if (document.body.contains(node)) {
	        return;
	      }

	      if (this.clearCurrentDragSourceNode()) {
	        this.actions.endDrag();
	      }
	    }
	  }, {
	    key: 'setCurrentDragSourceNode',
	    value: function setCurrentDragSourceNode(node) {
	      this.clearCurrentDragSourceNode();
	      this.currentDragSourceNode = node;
	      this.currentDragSourceNodeOffset = (0, _OffsetUtils.getNodeClientOffset)(node);
	      this.currentDragSourceNodeOffsetChanged = false;

	      // Receiving a mouse event in the middle of a dragging operation
	      // means it has ended and the drag source node disappeared from DOM,
	      // so the browser didn't dispatch the dragend event.
	      this.window.addEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
	    }
	  }, {
	    key: 'clearCurrentDragSourceNode',
	    value: function clearCurrentDragSourceNode() {
	      if (this.currentDragSourceNode) {
	        this.currentDragSourceNode = null;
	        this.currentDragSourceNodeOffset = null;
	        this.currentDragSourceNodeOffsetChanged = false;
	        this.window.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'checkIfCurrentDragSourceRectChanged',
	    value: function checkIfCurrentDragSourceRectChanged() {
	      var node = this.currentDragSourceNode;
	      if (!node) {
	        return false;
	      }

	      if (this.currentDragSourceNodeOffsetChanged) {
	        return true;
	      }

	      this.currentDragSourceNodeOffsetChanged = !(0, _shallowEqual2.default)((0, _OffsetUtils.getNodeClientOffset)(node), this.currentDragSourceNodeOffset);

	      return this.currentDragSourceNodeOffsetChanged;
	    }
	  }, {
	    key: 'handleTopDragStartCapture',
	    value: function handleTopDragStartCapture() {
	      this.clearCurrentDragSourceNode();
	      this.dragStartSourceIds = [];
	    }
	  }, {
	    key: 'handleDragStart',
	    value: function handleDragStart(e, sourceId) {
	      this.dragStartSourceIds.unshift(sourceId);
	    }
	  }, {
	    key: 'handleTopDragStart',
	    value: function handleTopDragStart(e) {
	      var _this4 = this;

	      var dragStartSourceIds = this.dragStartSourceIds;

	      this.dragStartSourceIds = null;

	      var clientOffset = (0, _OffsetUtils.getEventClientOffset)(e);

	      // Don't publish the source just yet (see why below)
	      this.actions.beginDrag(dragStartSourceIds, {
	        publishSource: false,
	        getSourceClientOffset: this.getSourceClientOffset,
	        clientOffset: clientOffset
	      });

	      var dataTransfer = e.dataTransfer;

	      var nativeType = (0, _NativeDragSources.matchNativeItemType)(dataTransfer);

	      if (this.monitor.isDragging()) {
	        if (typeof dataTransfer.setDragImage === 'function') {
	          // Use custom drag image if user specifies it.
	          // If child drag source refuses drag but parent agrees,
	          // use parent's node as drag image. Neither works in IE though.
	          var sourceId = this.monitor.getSourceId();
	          var sourceNode = this.sourceNodes[sourceId];
	          var dragPreview = this.sourcePreviewNodes[sourceId] || sourceNode;

	          var _getCurrentSourcePrev = this.getCurrentSourcePreviewNodeOptions(),
	              anchorX = _getCurrentSourcePrev.anchorX,
	              anchorY = _getCurrentSourcePrev.anchorY;

	          var anchorPoint = { anchorX: anchorX, anchorY: anchorY };
	          var dragPreviewOffset = (0, _OffsetUtils.getDragPreviewOffset)(sourceNode, dragPreview, clientOffset, anchorPoint);
	          dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
	        }

	        try {
	          // Firefox won't drag without setting data
	          dataTransfer.setData('application/json', {});
	        } catch (err) {}
	        // IE doesn't support MIME types in setData


	        // Store drag source node so we can check whether
	        // it is removed from DOM and trigger endDrag manually.
	        this.setCurrentDragSourceNode(e.target);

	        // Now we are ready to publish the drag source.. or are we not?

	        var _getCurrentSourcePrev2 = this.getCurrentSourcePreviewNodeOptions(),
	            captureDraggingState = _getCurrentSourcePrev2.captureDraggingState;

	        if (!captureDraggingState) {
	          // Usually we want to publish it in the next tick so that browser
	          // is able to screenshot the current (not yet dragging) state.
	          //
	          // It also neatly avoids a situation where render() returns null
	          // in the same tick for the source element, and browser freaks out.
	          setTimeout(function () {
	            return _this4.actions.publishDragSource();
	          });
	        } else {
	          // In some cases the user may want to override this behavior, e.g.
	          // to work around IE not supporting custom drag previews.
	          //
	          // When using a custom drag layer, the only way to prevent
	          // the default drag preview from drawing in IE is to screenshot
	          // the dragging state in which the node itself has zero opacity
	          // and height. In this case, though, returning null from render()
	          // will abruptly end the dragging, which is not obvious.
	          //
	          // This is the reason such behavior is strictly opt-in.
	          this.actions.publishDragSource();
	        }
	      } else if (nativeType) {
	        // A native item (such as URL) dragged from inside the document
	        this.beginDragNativeItem(nativeType);
	      } else if (!dataTransfer.types && (!e.target.hasAttribute || !e.target.hasAttribute('draggable'))) {
	        // Looks like a Safari bug: dataTransfer.types is null, but there was no draggable.
	        // Just let it drag. It's a native type (URL or text) and will be picked up in
	        // dragenter handler.
	        return; // eslint-disable-line no-useless-return
	      } else {
	        // If by this time no drag source reacted, tell browser not to drag.
	        e.preventDefault();
	      }
	    }
	  }, {
	    key: 'handleTopDragEndCapture',
	    value: function handleTopDragEndCapture() {
	      if (this.clearCurrentDragSourceNode()) {
	        // Firefox can dispatch this event in an infinite loop
	        // if dragend handler does something like showing an alert.
	        // Only proceed if we have not handled it already.
	        this.actions.endDrag();
	      }
	    }
	  }, {
	    key: 'handleTopDragEnterCapture',
	    value: function handleTopDragEnterCapture(e) {
	      this.dragEnterTargetIds = [];

	      var isFirstEnter = this.enterLeaveCounter.enter(e.target);
	      if (!isFirstEnter || this.monitor.isDragging()) {
	        return;
	      }

	      var dataTransfer = e.dataTransfer;

	      var nativeType = (0, _NativeDragSources.matchNativeItemType)(dataTransfer);

	      if (nativeType) {
	        // A native item (such as file or URL) dragged from outside the document
	        this.beginDragNativeItem(nativeType);
	      }
	    }
	  }, {
	    key: 'handleDragEnter',
	    value: function handleDragEnter(e, targetId) {
	      this.dragEnterTargetIds.unshift(targetId);
	    }
	  }, {
	    key: 'handleTopDragEnter',
	    value: function handleTopDragEnter(e) {
	      var _this5 = this;

	      var dragEnterTargetIds = this.dragEnterTargetIds;

	      this.dragEnterTargetIds = [];

	      if (!this.monitor.isDragging()) {
	        // This is probably a native item type we don't understand.
	        return;
	      }

	      if (!(0, _BrowserDetector.isFirefox)()) {
	        // Don't emit hover in `dragenter` on Firefox due to an edge case.
	        // If the target changes position as the result of `dragenter`, Firefox
	        // will still happily dispatch `dragover` despite target being no longer
	        // there. The easy solution is to only fire `hover` in `dragover` on FF.
	        this.actions.hover(dragEnterTargetIds, {
	          clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
	        });
	      }

	      var canDrop = dragEnterTargetIds.some(function (targetId) {
	        return _this5.monitor.canDropOnTarget(targetId);
	      });

	      if (canDrop) {
	        // IE requires this to fire dragover events
	        e.preventDefault();
	        e.dataTransfer.dropEffect = this.getCurrentDropEffect();
	      }
	    }
	  }, {
	    key: 'handleTopDragOverCapture',
	    value: function handleTopDragOverCapture() {
	      this.dragOverTargetIds = [];
	    }
	  }, {
	    key: 'handleDragOver',
	    value: function handleDragOver(e, targetId) {
	      this.dragOverTargetIds.unshift(targetId);
	    }
	  }, {
	    key: 'handleTopDragOver',
	    value: function handleTopDragOver(e) {
	      var _this6 = this;

	      var dragOverTargetIds = this.dragOverTargetIds;

	      this.dragOverTargetIds = [];

	      if (!this.monitor.isDragging()) {
	        // This is probably a native item type we don't understand.
	        // Prevent default "drop and blow away the whole document" action.
	        e.preventDefault();
	        e.dataTransfer.dropEffect = 'none';
	        return;
	      }

	      this.actions.hover(dragOverTargetIds, {
	        clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
	      });

	      var canDrop = dragOverTargetIds.some(function (targetId) {
	        return _this6.monitor.canDropOnTarget(targetId);
	      });

	      if (canDrop) {
	        // Show user-specified drop effect.
	        e.preventDefault();
	        e.dataTransfer.dropEffect = this.getCurrentDropEffect();
	      } else if (this.isDraggingNativeItem()) {
	        // Don't show a nice cursor but still prevent default
	        // "drop and blow away the whole document" action.
	        e.preventDefault();
	        e.dataTransfer.dropEffect = 'none';
	      } else if (this.checkIfCurrentDragSourceRectChanged()) {
	        // Prevent animating to incorrect position.
	        // Drop effect must be other than 'none' to prevent animation.
	        e.preventDefault();
	        e.dataTransfer.dropEffect = 'move';
	      }
	    }
	  }, {
	    key: 'handleTopDragLeaveCapture',
	    value: function handleTopDragLeaveCapture(e) {
	      if (this.isDraggingNativeItem()) {
	        e.preventDefault();
	      }

	      var isLastLeave = this.enterLeaveCounter.leave(e.target);
	      if (!isLastLeave) {
	        return;
	      }

	      if (this.isDraggingNativeItem()) {
	        this.endDragNativeItem();
	      }
	    }
	  }, {
	    key: 'handleTopDropCapture',
	    value: function handleTopDropCapture(e) {
	      this.dropTargetIds = [];
	      e.preventDefault();

	      if (this.isDraggingNativeItem()) {
	        this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
	      }

	      this.enterLeaveCounter.reset();
	    }
	  }, {
	    key: 'handleDrop',
	    value: function handleDrop(e, targetId) {
	      this.dropTargetIds.unshift(targetId);
	    }
	  }, {
	    key: 'handleTopDrop',
	    value: function handleTopDrop(e) {
	      var dropTargetIds = this.dropTargetIds;

	      this.dropTargetIds = [];

	      this.actions.hover(dropTargetIds, {
	        clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
	      });
	      this.actions.drop();

	      if (this.isDraggingNativeItem()) {
	        this.endDragNativeItem();
	      } else {
	        this.endDragIfSourceWasRemovedFromDOM();
	      }
	    }
	  }, {
	    key: 'handleSelectStart',
	    value: function handleSelectStart(e) {
	      var target = e.target;

	      // Only IE requires us to explicitly say
	      // we want drag drop operation to start

	      if (typeof target.dragDrop !== 'function') {
	        return;
	      }

	      // Inputs and textareas should be selectable
	      if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
	        return;
	      }

	      // For other targets, ask IE
	      // to enable drag and drop
	      e.preventDefault();
	      target.dragDrop();
	    }
	  }, {
	    key: 'window',
	    get: function get() {
	      if (this.context && this.context.window) {
	        return this.context.window;
	      } else if (typeof window !== 'undefined') {
	        return window;
	      }
	      return undefined;
	    }
	  }]);

	  return HTML5Backend;
	}();

	exports.default = HTML5Backend;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(83),
	    eq = __webpack_require__(61),
	    isIterateeCall = __webpack_require__(152),
	    keysIn = __webpack_require__(154);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
	 * @example
	 *
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults = baseRest(function(object, sources) {
	  object = Object(object);

	  var index = -1;
	  var length = sources.length;
	  var guard = length > 2 ? sources[2] : undefined;

	  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	    length = 1;
	  }

	  while (++index < length) {
	    var source = sources[index];
	    var props = keysIn(source);
	    var propsIndex = -1;
	    var propsLength = props.length;

	    while (++propsIndex < propsLength) {
	      var key = props[propsIndex];
	      var value = object[key];

	      if (value === undefined ||
	          (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	        object[key] = source[key];
	      }
	    }
	  }

	  return object;
	});

	module.exports = defaults;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(61),
	    isArrayLike = __webpack_require__(93),
	    isIndex = __webpack_require__(153),
	    isObject = __webpack_require__(35);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 153 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(155),
	    baseKeysIn = __webpack_require__(162),
	    isArrayLike = __webpack_require__(93);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(156),
	    isArguments = __webpack_require__(104),
	    isArray = __webpack_require__(34),
	    isBuffer = __webpack_require__(157),
	    isIndex = __webpack_require__(153),
	    isTypedArray = __webpack_require__(159);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 156 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(19),
	    stubFalse = __webpack_require__(158);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)(module)))

/***/ },
/* 158 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(160),
	    baseUnary = __webpack_require__(81),
	    nodeUtil = __webpack_require__(161);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(17),
	    isLength = __webpack_require__(94),
	    isObjectLike = __webpack_require__(25);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(20);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)(module)))

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(35),
	    isPrototype = __webpack_require__(163),
	    nativeKeysIn = __webpack_require__(164);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 163 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 164 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 165 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i += 1) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }

	    var valA = objA[keysA[i]];
	    var valB = objB[keysA[i]];

	    if (valA !== valB) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _union = __webpack_require__(167);

	var _union2 = _interopRequireDefault(_union);

	var _without = __webpack_require__(38);

	var _without2 = _interopRequireDefault(_without);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EnterLeaveCounter = function () {
	  function EnterLeaveCounter() {
	    _classCallCheck(this, EnterLeaveCounter);

	    this.entered = [];
	  }

	  _createClass(EnterLeaveCounter, [{
	    key: 'enter',
	    value: function enter(enteringNode) {
	      var previousLength = this.entered.length;

	      var isNodeEntered = function isNodeEntered(node) {
	        return document.documentElement.contains(node) && (!node.contains || node.contains(enteringNode));
	      };

	      this.entered = (0, _union2.default)(this.entered.filter(isNodeEntered), [enteringNode]);

	      return previousLength === 0 && this.entered.length > 0;
	    }
	  }, {
	    key: 'leave',
	    value: function leave(leavingNode) {
	      var previousLength = this.entered.length;

	      this.entered = (0, _without2.default)(this.entered.filter(function (node) {
	        return document.documentElement.contains(node);
	      }), leavingNode);

	      return previousLength > 0 && this.entered.length === 0;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.entered = [];
	    }
	  }]);

	  return EnterLeaveCounter;
	}();

	exports.default = EnterLeaveCounter;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(101),
	    baseRest = __webpack_require__(83),
	    baseUniq = __webpack_require__(106),
	    isArrayLikeObject = __webpack_require__(92);

	/**
	 * Creates an array of unique values, in order, from all given arrays using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([2], [1, 2]);
	 * // => [2, 1]
	 */
	var union = baseRest(function(arrays) {
	  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
	});

	module.exports = union;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isSafari = exports.isFirefox = undefined;

	var _memoize = __webpack_require__(169);

	var _memoize2 = _interopRequireDefault(_memoize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isFirefox = exports.isFirefox = (0, _memoize2.default)(function () {
	  return (/firefox/i.test(navigator.userAgent)
	  );
	});
	var isSafari = exports.isSafari = (0, _memoize2.default)(function () {
	  return Boolean(window.safari);
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(41);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getNodeClientOffset = getNodeClientOffset;
	exports.getEventClientOffset = getEventClientOffset;
	exports.getDragPreviewOffset = getDragPreviewOffset;

	var _BrowserDetector = __webpack_require__(168);

	var _MonotonicInterpolant = __webpack_require__(171);

	var _MonotonicInterpolant2 = _interopRequireDefault(_MonotonicInterpolant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint
	   no-mixed-operators: off
	*/
	var ELEMENT_NODE = 1;

	function getNodeClientOffset(node) {
	  var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;

	  if (!el) {
	    return null;
	  }

	  var _el$getBoundingClient = el.getBoundingClientRect(),
	      top = _el$getBoundingClient.top,
	      left = _el$getBoundingClient.left;

	  return { x: left, y: top };
	}

	function getEventClientOffset(e) {
	  return {
	    x: e.clientX,
	    y: e.clientY
	  };
	}

	function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint) {
	  // The browsers will use the image intrinsic size under different conditions.
	  // Firefox only cares if it's an image, but WebKit also wants it to be detached.
	  var isImage = dragPreview.nodeName === 'IMG' && ((0, _BrowserDetector.isFirefox)() || !document.documentElement.contains(dragPreview));
	  var dragPreviewNode = isImage ? sourceNode : dragPreview;

	  var dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
	  var offsetFromDragPreview = {
	    x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
	    y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
	  };

	  var sourceWidth = sourceNode.offsetWidth,
	      sourceHeight = sourceNode.offsetHeight;
	  var anchorX = anchorPoint.anchorX,
	      anchorY = anchorPoint.anchorY;


	  var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
	  var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;

	  // Work around @2x coordinate discrepancies in browsers
	  if ((0, _BrowserDetector.isSafari)() && isImage) {
	    dragPreviewHeight /= window.devicePixelRatio;
	    dragPreviewWidth /= window.devicePixelRatio;
	  } else if ((0, _BrowserDetector.isFirefox)() && !isImage) {
	    dragPreviewHeight *= window.devicePixelRatio;
	    dragPreviewWidth *= window.devicePixelRatio;
	  }

	  // Interpolate coordinates depending on anchor point
	  // If you know a simpler way to do this, let me know
	  var interpolantX = new _MonotonicInterpolant2.default([0, 0.5, 1], [
	  // Dock to the left
	  offsetFromDragPreview.x,
	  // Align at the center
	  offsetFromDragPreview.x / sourceWidth * dragPreviewWidth,
	  // Dock to the right
	  offsetFromDragPreview.x + dragPreviewWidth - sourceWidth]);
	  var interpolantY = new _MonotonicInterpolant2.default([0, 0.5, 1], [
	  // Dock to the top
	  offsetFromDragPreview.y,
	  // Align at the center
	  offsetFromDragPreview.y / sourceHeight * dragPreviewHeight,
	  // Dock to the bottom
	  offsetFromDragPreview.y + dragPreviewHeight - sourceHeight]);
	  var x = interpolantX.interpolate(anchorX);
	  var y = interpolantY.interpolate(anchorY);

	  // Work around Safari 8 positioning bug
	  if ((0, _BrowserDetector.isSafari)() && isImage) {
	    // We'll have to wait for @3x to see if this is entirely correct
	    y += (window.devicePixelRatio - 1) * dragPreviewHeight;
	  }

	  return { x: x, y: y };
	}

/***/ },
/* 171 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint
	   no-plusplus: off,
	   no-mixed-operators: off
	*/
	var MonotonicInterpolant = function () {
	  function MonotonicInterpolant(xs, ys) {
	    _classCallCheck(this, MonotonicInterpolant);

	    var length = xs.length;

	    // Rearrange xs and ys so that xs is sorted
	    var indexes = [];
	    for (var i = 0; i < length; i++) {
	      indexes.push(i);
	    }
	    indexes.sort(function (a, b) {
	      return xs[a] < xs[b] ? -1 : 1;
	    });

	    // Get consecutive differences and slopes
	    var dys = [];
	    var dxs = [];
	    var ms = [];
	    var dx = void 0;
	    var dy = void 0;
	    for (var _i = 0; _i < length - 1; _i++) {
	      dx = xs[_i + 1] - xs[_i];
	      dy = ys[_i + 1] - ys[_i];
	      dxs.push(dx);
	      dys.push(dy);
	      ms.push(dy / dx);
	    }

	    // Get degree-1 coefficients
	    var c1s = [ms[0]];
	    for (var _i2 = 0; _i2 < dxs.length - 1; _i2++) {
	      var _m = ms[_i2];
	      var mNext = ms[_i2 + 1];
	      if (_m * mNext <= 0) {
	        c1s.push(0);
	      } else {
	        dx = dxs[_i2];
	        var dxNext = dxs[_i2 + 1];
	        var common = dx + dxNext;
	        c1s.push(3 * common / ((common + dxNext) / _m + (common + dx) / mNext));
	      }
	    }
	    c1s.push(ms[ms.length - 1]);

	    // Get degree-2 and degree-3 coefficients
	    var c2s = [];
	    var c3s = [];
	    var m = void 0;
	    for (var _i3 = 0; _i3 < c1s.length - 1; _i3++) {
	      m = ms[_i3];
	      var c1 = c1s[_i3];
	      var invDx = 1 / dxs[_i3];
	      var _common = c1 + c1s[_i3 + 1] - m - m;
	      c2s.push((m - c1 - _common) * invDx);
	      c3s.push(_common * invDx * invDx);
	    }

	    this.xs = xs;
	    this.ys = ys;
	    this.c1s = c1s;
	    this.c2s = c2s;
	    this.c3s = c3s;
	  }

	  _createClass(MonotonicInterpolant, [{
	    key: "interpolate",
	    value: function interpolate(x) {
	      var xs = this.xs,
	          ys = this.ys,
	          c1s = this.c1s,
	          c2s = this.c2s,
	          c3s = this.c3s;

	      // The rightmost point in the dataset should give an exact result

	      var i = xs.length - 1;
	      if (x === xs[i]) {
	        return ys[i];
	      }

	      // Search for the interval x is in, returning the corresponding y if x is one of the original xs
	      var low = 0;
	      var high = c3s.length - 1;
	      var mid = void 0;
	      while (low <= high) {
	        mid = Math.floor(0.5 * (low + high));
	        var xHere = xs[mid];
	        if (xHere < x) {
	          low = mid + 1;
	        } else if (xHere > x) {
	          high = mid - 1;
	        } else {
	          return ys[mid];
	        }
	      }
	      i = Math.max(0, high);

	      // Interpolate
	      var diff = x - xs[i];
	      var diffSq = diff * diff;
	      return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
	    }
	  }]);

	  return MonotonicInterpolant;
	}();

	exports.default = MonotonicInterpolant;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nativeTypesConfig;

	exports.createNativeDragSource = createNativeDragSource;
	exports.matchNativeItemType = matchNativeItemType;

	var _NativeTypes = __webpack_require__(173);

	var NativeTypes = _interopRequireWildcard(_NativeTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
	  var result = typesToTry.reduce(function (resultSoFar, typeToTry) {
	    return resultSoFar || dataTransfer.getData(typeToTry);
	  }, null);

	  return result != null ? // eslint-disable-line eqeqeq
	  result : defaultValue;
	}

	var nativeTypesConfig = (_nativeTypesConfig = {}, _defineProperty(_nativeTypesConfig, NativeTypes.FILE, {
	  exposeProperty: 'files',
	  matchesTypes: ['Files'],
	  getData: function getData(dataTransfer) {
	    return Array.prototype.slice.call(dataTransfer.files);
	  }
	}), _defineProperty(_nativeTypesConfig, NativeTypes.URL, {
	  exposeProperty: 'urls',
	  matchesTypes: ['Url', 'text/uri-list'],
	  getData: function getData(dataTransfer, matchesTypes) {
	    return getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n');
	  }
	}), _defineProperty(_nativeTypesConfig, NativeTypes.TEXT, {
	  exposeProperty: 'text',
	  matchesTypes: ['Text', 'text/plain'],
	  getData: function getData(dataTransfer, matchesTypes) {
	    return getDataFromDataTransfer(dataTransfer, matchesTypes, '');
	  }
	}), _nativeTypesConfig);

	function createNativeDragSource(type) {
	  var _nativeTypesConfig$ty = nativeTypesConfig[type],
	      exposeProperty = _nativeTypesConfig$ty.exposeProperty,
	      matchesTypes = _nativeTypesConfig$ty.matchesTypes,
	      getData = _nativeTypesConfig$ty.getData;


	  return function () {
	    function NativeDragSource() {
	      var _item, _mutatorMap;

	      _classCallCheck(this, NativeDragSource);

	      this.item = (_item = {}, _mutatorMap = {}, _mutatorMap[exposeProperty] = _mutatorMap[exposeProperty] || {}, _mutatorMap[exposeProperty].get = function () {
	        console.warn( // eslint-disable-line no-console
	        'Browser doesn\'t allow reading "' + exposeProperty + '" until the drop event.');
	        return null;
	      }, _defineEnumerableProperties(_item, _mutatorMap), _item);
	    }

	    _createClass(NativeDragSource, [{
	      key: 'mutateItemByReadingDataTransfer',
	      value: function mutateItemByReadingDataTransfer(dataTransfer) {
	        delete this.item[exposeProperty];
	        this.item[exposeProperty] = getData(dataTransfer, matchesTypes);
	      }
	    }, {
	      key: 'canDrag',
	      value: function canDrag() {
	        return true;
	      }
	    }, {
	      key: 'beginDrag',
	      value: function beginDrag() {
	        return this.item;
	      }
	    }, {
	      key: 'isDragging',
	      value: function isDragging(monitor, handle) {
	        return handle === monitor.getSourceId();
	      }
	    }, {
	      key: 'endDrag',
	      value: function endDrag() {}
	    }]);

	    return NativeDragSource;
	  }();
	}

	function matchNativeItemType(dataTransfer) {
	  var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);

	  return Object.keys(nativeTypesConfig).filter(function (nativeItemType) {
	    var matchesTypes = nativeTypesConfig[nativeItemType].matchesTypes;

	    return matchesTypes.some(function (t) {
	      return dataTransferTypes.indexOf(t) > -1;
	    });
	  })[0] || null;
	}

/***/ },
/* 173 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FILE = exports.FILE = '__NATIVE_FILE__';
	var URL = exports.URL = '__NATIVE_URL__';
	var TEXT = exports.TEXT = '__NATIVE_TEXT__';

/***/ },
/* 174 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getEmptyImage;
	var emptyImage = void 0;
	function getEmptyImage() {
	  if (!emptyImage) {
	    emptyImage = new Image();
	    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	  }

	  return emptyImage;
	}

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var DragLayer, DragSource, DropTarget, ItemTypes, React, Widget, collectDragable, collectDropTarget, connectDragLayer, dragLayer, dragSource, drop, dropTarget, ref, ref1, target, widgetSource;

	React = __webpack_require__(3);

	ref = __webpack_require__(176), drop = ref.drop, target = ref.target, collectDropTarget = ref.collectDropTarget, ItemTypes = ref.ItemTypes, widgetSource = ref.widgetSource, collectDragable = ref.collectDragable, connectDragLayer = ref.connectDragLayer;

	ref1 = __webpack_require__(11), DropTarget = ref1.DropTarget, DragSource = ref1.DragSource, DragLayer = ref1.DragLayer;

	Widget = React.createClass({
	  displayName: 'Widget',
	  propTypes: {
	    contentComp: React.PropTypes.func
	  },
	  getInitialState: function() {
	    return {
	      showInfo: false,
	      showMenu: false,
	      isReady: false
	    };
	  },
	  toggleInfo: function() {
	    var showInfo;
	    showInfo = this.state.showInfo;
	    if (!showInfo) {
	      document.addEventListener('click', this.closeInfo);
	    }
	    return this.setState({
	      showInfo: !showInfo,
	      showMenu: false
	    });
	  },
	  closeInfo: function() {
	    document.removeEventListener('click', this.closeInfo);
	    return this.setState({
	      showInfo: false
	    });
	  },
	  toggleMenu: function() {
	    var showMenu;
	    showMenu = this.state.showMenu;
	    if (!showMenu) {
	      document.addEventListener('click', this.closeMenu);
	    }
	    return this.setState({
	      showMenu: !showMenu,
	      showInfo: false
	    });
	  },
	  closeMenu: function() {
	    document.removeEventListener('click', this.closeMenu);
	    return this.setState({
	      showMenu: false
	    });
	  },
	  render: function() {
	    var classes, col, columnCount, config, connectDragPreview, connectDragSource, connectDropTarget, contentComp, height, index, infoClass, isDragging, isOver, isReady, menuClass, onHide, ref2, ref3, rendered, row, showInfo, showMenu, sizeConfig, styles, widgetDescription, widgetHeight, widgetMargin, widgetMenu, widgetTitle, widgetWidth, width;
	    ref2 = this.props, index = ref2.index, height = ref2.height, width = ref2.width, col = ref2.col, row = ref2.row, config = ref2.config, onHide = ref2.onHide, contentComp = ref2.contentComp, sizeConfig = ref2.sizeConfig, columnCount = ref2.columnCount, connectDragSource = ref2.connectDragSource, connectDropTarget = ref2.connectDropTarget, connectDragPreview = ref2.connectDragPreview, isDragging = ref2.isDragging, isOver = ref2.isOver, widgetTitle = ref2.widgetTitle, widgetDescription = ref2.widgetDescription, widgetMenu = ref2.widgetMenu;
	    ref3 = this.state, showMenu = ref3.showMenu, showInfo = ref3.showInfo, isReady = ref3.isReady;
	    widgetHeight = sizeConfig.widgetHeight, widgetWidth = sizeConfig.widgetWidth, widgetMargin = sizeConfig.widgetMargin;
	    width = (config != null ? config.width : void 0) || width || 1;
	    height = (config != null ? config.height : void 0) || height || 1;
	    styles = {
	      height: height * (widgetHeight + widgetMargin) - widgetMargin,
	      width: columnCount === 1 ? '100%' : width * (widgetWidth + widgetMargin) - widgetMargin,
	      left: Math.max(0, col * (widgetWidth + widgetMargin)),
	      top: row * (widgetHeight + widgetMargin)
	    };
	    classes = ['widget'];
	    if (isDragging) {
	      classes.push('is-dragging');
	    }
	    if (isOver) {
	      classes.push('drag-over');
	    }
	    infoClass = ['info'];
	    if (showInfo) {
	      infoClass.push('active');
	    }
	    menuClass = ['menu'];
	    if (showMenu) {
	      menuClass.push('active');
	    }
	    rendered = React.createElement("div", {
	      "className": classes.join(' '),
	      "style": styles
	    }, (isOver ? React.createElement("div", {
	      "className": 'drop-prompt',
	      "style": {
	        height: styles.height
	      }
	    }) : void 0), React.createElement("div", {
	      "className": 'widget-inner'
	    }, connectDragSource(React.createElement("header", {
	      "className": 'widget-header draggable'
	    }, (widgetTitle ? React.createElement("h3", {
	      "className": 'widget-title'
	    }, widgetTitle) : void 0), React.createElement("section", {
	      "className": 'action-bar'
	    }, (widgetDescription ? React.createElement("span", {
	      "className": 'action'
	    }, React.createElement("a", {
	      "className": 'action-button hide-widget-button',
	      "onClick": this.toggleInfo
	    }, React.createElement("i", {
	      "className": 'zmdi zmdi-info_outline'
	    })), React.createElement("p", {
	      "className": infoClass.join(' ')
	    }, widgetDescription)) : void 0), (widgetMenu ? React.createElement("span", {
	      "className": 'action'
	    }, React.createElement("a", {
	      "className": 'action-button hide-widget-button',
	      "onClick": this.toggleMenu
	    }, React.createElement("i", {
	      "className": 'zmdi zmdi-uniF19B'
	    })), React.createElement("ul", {
	      "className": menuClass.join(' ')
	    }, widgetMenu.map(function(item, menuIndex) {
	      return React.createElement("li", {
	        "key": menuIndex,
	        "className": item.type
	      }, (item.title && item.type === 'action' ? React.createElement("a", {
	        "onClick": (function() {
	          return item.handler(index);
	        })
	      }, item.title) : void 0));
	    }))) : void 0)))), (contentComp ? React.createElement(contentComp, {
	      index: index,
	      config: config
	    }) : void 0)));
	    return connectDropTarget(connectDragPreview(rendered));
	  }
	});

	dragLayer = DragLayer(connectDragLayer)(Widget);

	dropTarget = DropTarget(ItemTypes.WIDGET, target, collectDropTarget)(dragLayer);

	dragSource = DragSource(ItemTypes.WIDGET, widgetSource, collectDragable);

	module.exports = dragSource(dropTarget);


/***/ },
/* 176 */
/***/ function(module, exports) {

	module.exports = {
	  ItemTypes: {
	    WIDGET: 'widget'
	  },
	  widgetSource: {
	    beginDrag: function(props) {
	      return {
	        index: props.index
	      };
	    }
	  },
	  collectDragable: function(connect, monitor) {
	    return {
	      connectDragSource: connect.dragSource(),
	      connectDragPreview: connect.dragPreview(),
	      isDragging: monitor.isDragging()
	    };
	  },
	  target: {
	    drop: function(props, monitor) {
	      return props.onDrop(monitor.getItem().index, props.index);
	    }
	  },
	  collectDropTarget: function(connect, monitor) {
	    return {
	      connectDropTarget: connect.dropTarget(),
	      isOver: monitor.isOver()
	    };
	  },
	  connectDragLayer: function(monitor) {
	    return {
	      item: monitor.getItem(),
	      itemType: monitor.getItemType(),
	      isDragging: monitor.isDragging()
	    };
	  }
	};


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var Config, React;

	React = __webpack_require__(3);

	Config = function(arg) {
	  var children;
	  children = arg.children;
	  return React.createElement("div", {
	    "className": 'config'
	  }, children);
	};

	Config.displayName = 'Config';

	module.exports = Config;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var Content, React;

	React = __webpack_require__(3);

	Content = function(arg) {
	  var children;
	  children = arg.children;
	  return React.createElement("div", {
	    "className": 'content'
	  }, children);
	};

	Content.displayName = 'Content';

	module.exports = Content;


/***/ }
/******/ ]);