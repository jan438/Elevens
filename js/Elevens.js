'use strict';
const deckx = -300;
const elevenachieved = 0;
const elevencannotbeachieved = -2;
const facesachieved = 1;
const counttableaucards = 10;
var cardposition = new Array(counttableaucards);
cardposition[0] = [-100, -150, 0];
cardposition[1] = [0, -150, 0];
cardposition[2] = [100, -150, 0];
cardposition[3] = [-150, 0, 0];
cardposition[4] = [-50, 0, 0];
cardposition[5] = [50, 0, 0];
cardposition[6] = [150, 0, 0];
cardposition[7] = [-100, 150, 0];
cardposition[8] = [0, 150, 0];
cardposition[9] = [100, 150, 0];
var deckcards = [];
var tableaucards = [[],[],[],[],[],[],[],[],[],[]];
var selectedcards = [];
var cardxpos;
var cardypos;
var cardzpos;
var rotation;
var delay;
var duration;
var cardsplaced;
var highestscore = 0;
var gamescore;
const bonus42 = 10000;
const bonus52 = 20000;
var timeelapsed;
var maxZ = 52;
function cardtosymbols(card) {
	var symbols = "";
	var symbol1 = "";
	var symbol2 = "";
	switch (card.suit) {
		case 0: symbol1 = "♠";
			break;
		case 1: symbol1 = "♥";
			break;
		case 2: symbol1 = "♣";
			break;
		case 3: symbol1 = "♦";
			break;
	}
	switch (card.rank) {
		case 13:symbol2 = "H";
			break;
		case 12:symbol2 = "V";
			break;
		case 11:symbol2 = "B";
			break;
		case 10:symbol2 = "0";
			break;
		case 9: symbol2 = "9";
			break;
		case 8: symbol2 = "8";
			break;
		case 7: symbol2 = "7";
			break;
		case 6: symbol2 = "6";
			break;
		case 5: symbol2 = "5";
			break;
		case 4: symbol2 = "4";
			break;
		case 3: symbol2 = "3";
			break;
		case 2: symbol2 = "2";
			break;
		case 1: symbol2 = "A";
			break;
	}
	symbols = symbols + symbol1 + symbol2;
	return symbols;
}
function checkcards(cards) {
	var eleven = -1;
	if (cards.length === 2) {
		var result0 = cards[0].rank + cards[1].rank;
		if (result0 === 11) eleven = elevenachieved;
		else
		if (cards[0].rank < 11 || cards[1].rank < 11) {
			eleven = elevencannotbeachieved;
		}
		else
		if (cards[0].rank === cards[1].rank) {
			eleven = elevencannotbeachieved;
		}
	}
	if (cards.length === 3) {
		var result1 = (cards[0].rank === 11 && cards[1].rank === 12 && cards[2].rank === 13);
		var result2 = (cards[0].rank === 11 && cards[1].rank === 13 && cards[2].rank === 12);
		var result3 = (cards[0].rank === 12 && cards[1].rank === 11 && cards[2].rank === 13);
		var result4 = (cards[0].rank === 12 && cards[1].rank === 13 && cards[2].rank === 11);
		var result5 = (cards[0].rank === 13 && cards[1].rank === 11 && cards[2].rank === 12);
		var result6 = (cards[0].rank === 13 && cards[1].rank === 12 && cards[2].rank === 11);
		if (result1 || result2 || result3 || result4 || result5 || result6) {
			eleven = facesachieved;
		}
		else {
			eleven = elevencannotbeachieved;
		}
	}
	return eleven;
}
function decktotableau(cards) {
	for (var i = 0; i < cards.length; i++) {
		for (var j = 0; j < counttableaucards; j++) {
			if (cards[i].x === cardposition[j][0] && cards[i].y === cardposition[j][1] && deckcards.length > 0) {
				deckcards[0].$el.style.zIndex = maxZ++;
				deckcards[0].setSide('front');
				rotation = 5 - Math.random() * 10;
				deckcards[0].animateTo({
					delay: 1000,
					duration: 250,
					x: cards[i].x,
					y: cards[i].y,
					rot: rotation,
					onStart: function onStart() {
					},
					onComplete: function onComplete() {
					}
				});
//				console.log("Decktotableau: " + cardtosymbols(cards[i]) + " " + cardtosymbols(deckcards[0]) + " " + j + " " + deckcards.length);
				tableaucards[j].push(deckcards[0]);
				$("#countcards"+j).html(tableaucards[j].length);
				deckcards.splice(0,1);
				if (deckcards.length === 0) gamescore = gamescore + bonus42;
				$("#countcards").html("Cards:" + deckcards.length);
				break;
			}
		}
	}
}
function possiblemovecheck() {
	var eleven = -1;
	var cardstocheck;
	var possiblemovecount = 0;
	var possiblemovecard0;
	var possiblemovecard1;
	var possiblemovecard2;
	$("#countcards0").css("color", "white");
	$("#countcards1").css("color", "white");
	$("#countcards2").css("color", "white");
	$("#countcards3").css("color", "white");
	$("#countcards4").css("color", "white");
	$("#countcards5").css("color", "white");
	$("#countcards6").css("color", "white");
	$("#countcards7").css("color", "white");
	$("#countcards8").css("color", "white");
	$("#countcards9").css("color", "white");
	for (var i = 0; i < counttableaucards; i++) {
		if (tableaucards[i].length > 0) {
			cardstocheck = [];
			cardstocheck.push(tableaucards[i][tableaucards[i].length - 1]);
			possiblemovecard0 = "countcards" + i;
			for (var j = i + 1; j < counttableaucards; j++) {
				if (tableaucards[j].length > 0) {
					cardstocheck.push(tableaucards[j][tableaucards[j].length - 1]);
					possiblemovecard1 = "countcards" + j;
					eleven = checkcards(cardstocheck);
					if (eleven === elevenachieved) {
						$("#" + possiblemovecard0).css("color", "yellow");
						$("#" + possiblemovecard1).css("color", "yellow");
						possiblemovecount = possiblemovecount + 1;
					}
					else {
						if (eleven === -1) {
							for (var k = j + 1; k < counttableaucards; k++) {
								if (tableaucards[k].length > 0) {
									cardstocheck.push(tableaucards[k][tableaucards[k].length - 1]);
									possiblemovecard2 = "countcards" + k;
									eleven = checkcards(cardstocheck);
									if (eleven === facesachieved) {
										$("#" + possiblemovecard0).css("color", "yellow");
										$("#" + possiblemovecard1).css("color", "yellow");
										$("#" + possiblemovecard2).css("color", "yellow");
										possiblemovecount = possiblemovecount + 1;
									}
									cardstocheck.splice(-1,1);
								}
							}
						}
					}
					cardstocheck.splice(-1,1);
				}
			}
		}
	}
	if (possiblemovecount === 0) {
		$("img").attr('src', 'clock.png');
		if (gamescore > highestscore) highestscore = gamescore;
		$("#hiscore").html(highestscore);
		setTimeout(function () { $("#sw_stop").trigger('click'); }, 0);
		swal({
			title: "<h4 id='swalspelover'>Spel afgelopen!</h4>",
			imageUrl: "Cards.png",
			timer: 30000,
			showConfirmButton: true,
			html: true
		});
	}
	return possiblemovecount > 0;
}
var Deck = (function () {
  'use strict';
  var ticking;
  var animations = [];
  function animationFrames(delay, duration) {
    var now = Date.now();
    var start = now + delay;
    var end = start + duration;
    var animation = {
      start: start,
      end: end
    };
    animations.push(animation);
    if (!ticking) {
       ticking = true;
      requestAnimationFrame(tick);
    }
    var self = {
      start: function start(cb) {
        animation.startcb = cb;
        return self;
      },
      progress: function progress(cb) {
        animation.progresscb = cb;
        return self;
      },
      end: function end(cb) {
        animation.endcb = cb;
        return self;
      }
    };
    return self;
  }
  function tick() {
    var now = Date.now();
    if (!animations.length) {
      ticking = false;
      return;
    }
    for (var i = 0, animation; i < animations.length; i++) {
      animation = animations[i];
      if (now < animation.start) {
        continue;
      }
      if (!animation.started) {
        animation.started = true;
        animation.startcb && animation.startcb();
      }
      var t = (now - animation.start) / (animation.end - animation.start);
      animation.progresscb && animation.progresscb(t < 1 ? t : 1);
      if (now > animation.end) {
        animation.endcb && animation.endcb();
        animations.splice(i--, 1);
        continue;
      }
    }
    requestAnimationFrame(tick);
  }
  window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) {
    setTimeout(cb, 0);
  });
  var style = document.createElement('p').style;
  var memoized = {};
  function prefix(param) {
    if (typeof memoized[param] !== 'undefined') {
      return memoized[param];
    }
    if (typeof style[param] !== 'undefined') {
      memoized[param] = param;
      return param;
    }
    var camelCase = param[0].toUpperCase() + param.slice(1);
    var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
    var test;
    for (var i = 0, len = prefixes.length; i < len; i++) {
      test = prefixes[i] + camelCase;
      if (typeof style[test] !== 'undefined') {
        memoized[param] = test;
        return test;
      }
    }
  }
  var has3d;
  function translate(a, b, c) {
    typeof has3d !== 'undefined' || (has3d = check3d());
    c = c || 0;
    if (has3d) {
      return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
    } else {
      return 'translate(' + a + ', ' + b + ')';
    }
  }
  function check3d() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      return false;
    }
    var transform = prefix('transform');
    var $p = document.createElement('p');
    document.body.appendChild($p);
    $p.style[transform] = 'translate3d(1px,1px,1px)';
    has3d = $p.style[transform];
    has3d = has3d != null && has3d.length && has3d !== 'none';
    document.body.removeChild($p);
    return has3d;
  }
  function createElement(type) {
    return document.createElement(type);
  }
  function _card(i) {
    var transform = prefix('transform');
    var rank = i % 13 + 1;
    var suit = i / 13 | 0;
    var z = (52 - i) / 4;
    var $el = createElement('div');
	$el.id = 'card' + i;
    var $face = createElement('div');
    var $back = createElement('div');
    var isDraggable = false;
    var isFlippable = false;
    var self = { i: i, rank: rank, suit: suit, pos: i, $el: $el, mount: mount, unmount: unmount, setSide: setSide };
    var modules = Deck.modules;
    var module;
    $face.classList.add('face');
    $back.classList.add('back');
    $el.style[transform] = translate(-z + 'px', -z + 'px');
    self.x = -z;
    self.y = -z;
    self.z = z;
    self.rot = 0;
    self.setSide('back');
    addListener($el, 'mousedown', onMousedown);
    addListener($el, 'touchstart', onMousedown);
    for (module in modules) {
      addModule(modules[module]);
    }
    self.animateTo = function (params) {
      var delay = params.delay;
      var duration = params.duration;
      var _params$x = params.x;
      var x = _params$x === undefined ? self.x : _params$x;
      var _params$y = params.y;
      var y = _params$y === undefined ? self.y : _params$y;
      var _params$rot = params.rot;
      var rot = _params$rot === undefined ? self.rot : _params$rot;
      var ease$$ = params.ease;
      var onStart = params.onStart;
      var onProgress = params.onProgress;
      var onComplete = params.onComplete;
      var startX, startY, startRot;
      var diffX, diffY, diffRot;
      animationFrames(delay, duration).start(function () {
        startX = self.x || 0;
        startY = self.y || 0;
        startRot = self.rot || 0;
        onStart && onStart();
      }).progress(function (t) {
        var et = ease[ease$$ || 'cubicInOut'](t);
        diffX = x - startX;
        diffY = y - startY;
        diffRot = rot - startRot;
        onProgress && onProgress(t, et);
        self.x = startX + diffX * et;
        self.y = startY + diffY * et;
        self.rot = startRot + diffRot * et;
        $el.style[transform] = translate(self.x + 'px', self.y + 'px') + (diffRot ? 'rotate(' + self.rot + 'deg)' : '');
      }).end(function () {
        onComplete && onComplete();
      });
    };
    self.setRankSuit = function (rank, suit) {
      var suitName = SuitName(suit);
      $el.setAttribute('class', 'card ' + suitName + ' rank' + rank);
    };
    self.setRankSuit(rank, suit);
    self.enableDragging = function () {
      if (isDraggable) {
        return;
      }
      isDraggable = true;
      $el.style.cursor = 'move';
    };
    self.enableFlipping = function () {
      if (isFlippable) {
        return;
      }
      isFlippable = true;
    };
    self.disableFlipping = function () {
      if (!isFlippable) {
        return;
      }
      isFlippable = false;
    };
    self.disableDragging = function () {
      if (!isDraggable) {
        return;
      }
      isDraggable = false;
      $el.style.cursor = '';
    };
    return self;
    function addModule(module) {
      module.card && module.card(self);
    }
    function onMousedown(e) {
	var startPos = {};
	var pos = {};
	var starttime = Date.now();
	$("#" + $el.id).addClass('selected');
	for (var i = 0; i < counttableaucards; i++) {
		if (self.x === cardposition[i][0] && self.y === cardposition[i][1]) {
			selectedcards.push(self);
			break;
		}
	}
	var eleven = checkcards(selectedcards);
	if (eleven === elevencannotbeachieved) {
		for (var i = 0; i < selectedcards.length - 1; i++) {
			$("#" + selectedcards[i].$el.id).removeClass('selected');
		}
		selectedcards = [self];
		$("#" + $el.id).addClass('selected');
	}
	if (eleven === elevenachieved || eleven === facesachieved) {
		for (var i = 0; i < selectedcards.length; i++) {
			$("#" + selectedcards[i].$el.id).removeClass('selected');
		}
		if (deckcards.length > 0) decktotableau(selectedcards);
		if (deckcards.length === 0) {
			for (var i = 0; i < selectedcards.length; i++) {
				$("#" + selectedcards[i].$el.id).hide();
				for (var j = 0; j < counttableaucards; j++) {
					if (selectedcards[i].x === cardposition[j][0] && selectedcards[i].y === cardposition[j][1]) {
						tableaucards[j].splice(-1,1);
						$("#countcards"+j).html(tableaucards[j].length);
					}
				}
			}
		}
		if (eleven === elevenachieved) {
			gamescore = gamescore + 2000;
			cardsplaced = cardsplaced + 2;
//			console.log("Cardsplaced:" + cardsplaced + " " + cardtosymbols(selectedcards[0]) + cardtosymbols(selectedcards[1]));
		}
		else {
			gamescore = gamescore + 3000;
			cardsplaced = cardsplaced + 3;
//			console.log("Cardsplaced: " + cardsplaced + " " + cardtosymbols(selectedcards[0]) + cardtosymbols(selectedcards[1]) + cardtosymbols(selectedcards[2]));
		}
		timeelapsed = Math.round((new Date() - $.APP.d1) / 1000);
		selectedcards = [];
		$("#gamescore").html(gamescore);
		if (tableaucards[0].length === 0 && tableaucards[1].length === 0 && tableaucards[2].length === 0 && tableaucards[3].length === 0 && tableaucards[4].length === 0 && tableaucards[5].length === 0 && tableaucards[6].length === 0 && tableaucards[7].length === 0 && tableaucards[8].length === 0 && tableaucards[9].length === 0) {
			$("img").attr('src', 'clock.png');
			gamescore = gamescore + bonus52 - timeelapsed;
			$("#gamescore").html(gamescore);
			if (gamescore > highestscore) highestscore = gamescore;
			$("#hiscore").html(highestscore);
			setTimeout(function () { $("#sw_stop").trigger('click'); }, 0);
			swal({
				title: "<h4 id='swalgoedgedaan'>Goed gedaan!</h4>",
				imageUrl: "Cards.png",
				timer: 30000,
				showConfirmButton: true,
				html: true
			});
		}
		else possiblemovecheck();
	}
	e.preventDefault();
	if (e.type === 'mousedown') {
		startPos.x = pos.x = e.clientX;
		startPos.y = pos.y = e.clientY;
		addListener(window, 'mousemove', onMousemove);
		addListener(window, 'mouseup', onMouseup);
	}
	else {
		startPos.x = pos.x = e.touches[0].clientX;
		startPos.y = pos.y = e.touches[0].clientY;
		addListener(window, 'touchmove', onMousemove);
		addListener(window, 'touchend', onMouseup);
	}
      if (!isDraggable) {
        return;
      }
      $el.style[transform] = translate(self.x + 'px', self.y + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
      $el.style.zIndex = maxZ++;
      function onMousemove(e) {
        if (!isDraggable) {
          return;
        }
        if (e.type === 'mousemove') {
          pos.x = e.clientX;
          pos.y = e.clientY;
        } else {
          pos.x = e.touches[0].clientX;
          pos.y = e.touches[0].clientY;
        }
        $el.style[transform] = translate(Math.round(self.x + pos.x - startPos.x) + 'px', Math.round(self.y + pos.y - startPos.y) + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
      }
      function onMouseup(e) {
        if (isFlippable && Date.now() - starttime < 200) {
          self.setSide(self.side === 'front' ? 'back' : 'front');
        }
        if (e.type === 'mouseup') {
          removeListener(window, 'mousemove', onMousemove);
          removeListener(window, 'mouseup', onMouseup);
        } else {
          removeListener(window, 'touchmove', onMousemove);
          removeListener(window, 'touchend', onMouseup);
        }
        if (!isDraggable) {
          return;
        }
        self.x = self.x + pos.x - startPos.x;
        self.y = self.y + pos.y - startPos.y;
      }
    }
    function mount(target) {
      target.appendChild($el);
      self.$root = target;
    }
    function unmount() {
      self.$root && self.$root.removeChild($el);
      self.$root = null;
    }
    function setSide(newSide) {
      if (newSide === 'front') {
        if (self.side === 'back') {
          $el.removeChild($back);
        }
        self.side = 'front';
        $el.appendChild($face);
        self.setRankSuit(self.rank, self.suit);
      } else {
        if (self.side === 'front') {
          $el.removeChild($face);
        }
        self.side = 'back';
        $el.appendChild($back);
        $el.setAttribute('class', 'card');
      }
    }
  }
  function SuitName(suit) {
    return suit === 0 ? 'spades' : suit === 1 ? 'hearts' : suit === 2 ? 'clubs' : suit === 3 ? 'diamonds' : 'joker';
  }
  function addListener(target, name, listener) {
    target.addEventListener(name, listener);
  }
  function removeListener(target, name, listener) {
    target.removeEventListener(name, listener);
  }
  var ease = {
    linear: function linear(t) {
      return t;
    },
    quadIn: function quadIn(t) {
      return t * t;
    },
    quadOut: function quadOut(t) {
      return t * (2 - t);
    },
    quadInOut: function quadInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    cubicIn: function cubicIn(t) {
      return t * t * t;
    },
    cubicOut: function cubicOut(t) {
      return --t * t * t + 1;
    },
    cubicInOut: function cubicInOut(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    quartIn: function quartIn(t) {
      return t * t * t * t;
    },
    quartOut: function quartOut(t) {
      return 1 - --t * t * t * t;
    },
    quartInOut: function quartInOut(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    quintIn: function quintIn(t) {
      return t * t * t * t * t;
    },
    quintOut: function quintOut(t) {
      return 1 + --t * t * t * t * t;
    },
    quintInOut: function quintInOut(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };
  var sort = {
	deck: function deck(_deck2) {
		_deck2.sort = _deck2.queued(sort);
		function sort(next) {
			var startindex = 0;
			for (var i = 0; i < 12; i++) {
				for (var j = i + 1; j < 13; j++) {
					if (_deck2.cards[39 +j].rank === _deck2.cards[39 + i].rank) {
						for (var k = startindex; k < 39; k++) {
							if (_deck2.cards[k].rank !== _deck2.cards[39].rank && _deck2.cards[k].rank !== _deck2.cards[40].rank && _deck2.cards[k].rank !== _deck2.cards[41].rank && _deck2.cards[k].rank !== _deck2.cards[42].rank && _deck2.cards[k].rank !== _deck2.cards[43].rank && _deck2.cards[k].rank !== _deck2.cards[44].rank && _deck2.cards[k].rank !== _deck2.cards[45].rank && _deck2.cards[k].rank !== _deck2.cards[46].rank && _deck2.cards[k].rank !== _deck2.cards[47].rank && _deck2.cards[k].rank !== _deck2.cards[48].rank && _deck2.cards[k].rank !== _deck2.cards[49].rank && _deck2.cards[k].rank !== _deck2.cards[50].rank && _deck2.cards[k].rank !== _deck2.cards[51].rank) {
								var tempcard = _deck2.cards[k];
								_deck2.cards[k] = _deck2.cards[39 + j];
								_deck2.cards[39 + j] = tempcard;
								startindex = k + 1;
								break;
							}
						}
					}
				}
			}
			_deck2.cards.forEach(function (card, i) {
//				console.log(i + ":" + cardtosymbols(card));
				if (i === 51) {
					next();
				}
			});
		};
	}
  };
  function plusminus(value) {
    var plusminus = Math.round(Math.random()) ? -1 : 1;
    return plusminus * value;
  }
  function fisherYates(array) {
    var rnd, temp;
    for (var i = array.length - 1; i; i--) {
      rnd = Math.random() * i | 0;
      temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }
    return array;
  }
  function fontSize() {
    return window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, -2);
  }
  var ____fontSize;
  var shuffle = {
    deck: function deck(_deck3) {
      _deck3.shuffle = _deck3.queued(shuffle);
      function shuffle(next) {
        var cards = _deck3.cards;
        ____fontSize = fontSize();
        fisherYates(cards);
        cards.forEach(function (card, i) {
          card.pos = i;
          card.shuffle(function (i) {
            if (i === cards.length - 1) {
              next();
            }
          });
        });
        return;
      }
    },
    card: function card(_card3) {
      var $el = _card3.$el;
      _card3.shuffle = function (cb) {
        var i = _card3.pos;
        var z = i / 4;
        var delay = i * 2;
        _card3.animateTo({
          delay: delay,
          duration: 200,
          x: deckx + plusminus(Math.random() * 40 + 20) * ____fontSize / 16,
          y: -300 -z,
          rot: 0
        });
	_card3.animateTo({
		delay: 200 + delay,
		duration: 200,
		x: deckx -z,
		y: -300 -z,
		rot: 0,
		onStart: function onStart() {
		$el.style.zIndex = i;
	},
	onComplete: function onComplete() {
		cb(i);
	}
        });
      };
    }
  };
  var __fontSize;
  var Elevens = {
    deck: function deck(_deck4) {
      _deck4.Elevens = _deck4.queued(Elevens);
	function Elevens(next) {
		deckcards = [];
		selectedcards = [];
		tableaucards = [[],[],[],[],[],[],[],[],[],[]];
		$("img").attr('src', 'clock.gif');
		gamescore = 0;
		$("#gamescore").html(gamescore);
		var cards = _deck4.cards;
		var len = cards.length;
		__fontSize = fontSize();
		cards.slice(-52).reverse().forEach(function (card, i) {
			card.Elevens(i, len, function (i) {
				if (i === 51) {
					var result = possiblemovecheck();
					$("#countcards").html("Cards:" + deckcards.length);
					cardsplaced = 0;
					next();
				}
			});
		});
	}
    },
    card: function card(_card4) {
	var $el = _card4.$el;
	_card4.Elevens = function (i, len, cb) {
	$("#" + _card4.$el.id).show();
	if (i < counttableaucards) {
		_card4.setSide('front');
		cardxpos = cardposition[i][0];
		cardypos = cardposition[i][1];
		cardzpos = cardposition[i][2];
		rotation = 5 - Math.random() * 10;
		delay = i * 250;
		duration = 250;
		tableaucards[i].push(_card4);
		$("#countcards"+i).html(tableaucards[i].length);
	}
	else {
		_card4.setSide('back');
		cardxpos = deckx + (i - counttableaucards) * 0.25;
		cardypos = -300;
		cardzpos = maxZ++;
		rotation = 0;
		delay = 0;
		duration = 0;
		deckcards.push(_card4);
	}
	_card4.animateTo({
		delay: delay,
		duration: duration,
		x: cardxpos,
		y: cardypos,
		rot: rotation,
		onStart: function onStart() {
			$el.style.zIndex = cardzpos;
		},
		onComplete: function onComplete() {
			cb(i);
		}
	});
      };
    }
  };
  var intro = {
    deck: function deck(_deck5) {
      _deck5.intro = _deck5.queued(intro);
      function intro(next) {
        var cards = _deck5.cards;
        cards.forEach(function (card, i) {
          card.setSide('front');
          card.intro(i, function (i) {
            animationFrames(250, 0).start(function () {
              card.setSide('back');
            });
            if (i === cards.length - 1) {
              next();
            }
          });
        });
      }
    },
    card: function card(_card5) {
      var transform = prefix('transform');
      var $el = _card5.$el;
      _card5.intro = function (i, cb) {
        var delay = 500 + i * 10;
        var z = i / 4;
        $el.style[transform] = translate(-z + 'px', '-250px');
        $el.style.opacity = 0;
        _card5.x = -z;
        _card5.y = -250 - z;
        _card5.rot = 0;
        _card5.animateTo({
          delay: delay,
          duration: 1000,
          x: -z,
          y: -z,
          onStart: function onStart() {
            $el.style.zIndex = i;
          },
          onProgress: function onProgress(t) {
            $el.style.opacity = t;
          },
          onComplete: function onComplete() {
            $el.style.opacity = '';
            cb && cb(i);
          }
        });
      };
    }
  };
  function deg2rad(degrees) {
    return degrees * Math.PI / 180;
  }
  function queue(target) {
    var array = Array.prototype;
    var queueing = [];
    target.queue = queue;
    target.queued = queued;
    return target;
    function queued(action) {
      return function () {
        var self = this;
        var args = arguments;

        queue(function (next) {
          action.apply(self, array.concat.apply(next, args));
        });
      };
    }
    function queue(action) {
      if (!action) {
        return;
      }
      queueing.push(action);
      if (queueing.length === 1) {
        next();
      }
    }
    function next() {
      queueing[0](function (err) {
        if (err) {
          throw err;
        }
        queueing = queueing.slice(1);
        if (queueing.length) {
          next();
        }
      });
    }
  }
  function observable(target) {
    target || (target = {});
    var listeners = {};
    target.on = on;
    target.one = one;
    target.off = off;
    target.trigger = trigger;
    return target;
    function on(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({ cb: cb, ctx: ctx });
    }
    function one(name, cb, ctx) {
      listeners[name] || (listeners[name] = []);
      listeners[name].push({
        cb: cb, ctx: ctx, once: true
      });
    }
    function trigger(name) {
      var self = this;
      var args = Array.prototype.slice(arguments, 1);
      var currentListeners = listeners[name] || [];
      currentListeners.filter(function (listener) {
        listener.cb.apply(self, args);
        return !listener.once;
      });
    }
    function off(name, cb) {
      if (!name) {
        listeners = {};
        return;
      }
      if (!cb) {
        listeners[name] = [];
        return;
      }
      listeners[name] = listeners[name].filter(function (listener) {
        return listener.cb !== cb;
      });
    }
  }
  function Deck(jokers) {
    var cards = new Array(jokers ? 55 : 52);
    var $el = createElement('div');
    var self = observable({ mount: mount, unmount: unmount, cards: cards, $el: $el });
    var $root;
    var modules = Deck.modules;
    var module;
    queue(self);
    for (module in modules) {
      addModule(modules[module]);
    }
    $el.classList.add('deck');
    var card;
    for (var i = cards.length; i; i--) {
      card = cards[i - 1] = _card(i - 1);
      card.mount($el);
    }
    return self;
    function mount(root) {
      $root = root;
      $root.appendChild($el);
    }
    function unmount() {
      $root.removeChild($el);
    }
    function addModule(module) {
      module.deck && module.deck(self);
    }
  }
  Deck.animationFrames = animationFrames;
  Deck.ease = ease;
  Deck.modules = { intro: intro, Elevens: Elevens, shuffle: shuffle, sort: sort };
  Deck.Card = _card;
  Deck.prefix = prefix;
  Deck.translate = translate;
  return Deck;
})();
