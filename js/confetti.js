"use strict";
var _createClass = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e
    }
}();

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var NUM_CONFETTI = 120,
    COLORS = [
        [85, 71, 106],
        [174, 61, 99],
        [219, 56, 83],
        [244, 92, 68],
        [248, 182, 70]
    ],
    PI_2 = 2 * Math.PI,
    body = document.getElementsByTagName("body")[0],
    canvasStyles = "position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 10000; pointer-events: none;",
    canvas = document.createElement("canvas");

var context = canvas.getContext("2d");
window.w = 0, window.h = 0;
var resizeWindow = function() {
    return window.w = canvas.width = window.innerWidth, window.h = canvas.height = window.innerHeight
};
window.addEventListener("resize", resizeWindow, !1), window.onload = function() {
    return setTimeout(resizeWindow, 0)
};
var range = function(t, e) {
        return (e - t) * Math.random() + t
    },
    drawCircle = function(t, e, i, n) {
        return context.beginPath(), context.arc(t, e, i, 0, PI_2, !1), context.fillStyle = n, context.fill()
    },
    xpos = .5,
    Confetti = function() {
        function t() {
            _classCallCheck(this, t), this.style = COLORS[~~range(0, 5)], this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2], this.r = ~~range(2, 6), this.r2 = 2 * this.r, this.replace()
        }
        return _createClass(t, [{
            key: "replace",
            value: function() {
                return this.opacity = 0, this.dop = .03 * range(1, 4), this.x = range(-this.r2, w - this.r2), this.y = range(-20, h - this.r2), this.xmax = w - this.r, this.ymax = h - this.r, this.vx = range(0, 2) + 8 * xpos - 5, this.vy = .7 * this.r + range(-1, 1)
            }
        }, {
            key: "draw",
            value: function() {
                return this.x += this.vx, this.y += this.vy, this.opacity += this.dop, this.opacity > 1 && (this.opacity = 1, this.dop *= -1), (this.opacity < 0 || this.y > this.ymax) && this.replace(), 0 < this.x && this.x < this.xmax || (this.x = (this.x + this.xmax) % this.xmax), drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")")
            }
        }]), t
    }(),
    confetti = __range__(1, NUM_CONFETTI, !0).map(function(t) {
        return new Confetti
    });

function __range__(t, e, i) {
    for (var n = [], s = t < e, a = i ? s ? e + 1 : e - 1 : e, r = t; s ? r < a : r > a; s ? r++ : r--) n.push(r);
    return n
}
window.step = function() {
    return requestAnimationFrame(step), context.clearRect(0, 0, w, h), confetti.map(function(t) {
        return t.draw()
    })
}, step(), setTimeout(function() {
    canvas.style.WebkitTransition = "visibility 2s, opacity 2s", canvas.style.opacity = "0", canvas.style.visibility = "hidden", setTimeout(function() {
        canvas.remove()
    }, 2e3)
}, 4e3);