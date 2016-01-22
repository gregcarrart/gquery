//ghettoQuery.js
//A lighter weight solution mimicing jquery selectors and a few functions

(function() {
    var gQuery = function (selector) {
        return new gQuery.fn.init(selector);
    };

    gQuery.each = function (selector, callback) {
        for (var i = 0; i < selector.length; i++) {
            callback(i, selector[i]);
        }
    };

    gQuery.fn = gQuery.prototype = {
        init: function (selector) {
            var element = document.querySelectorAll(selector) || [];
            var about = {
                Version: 2.0,
                Author: 'gregcarrart',
                Created: '9.19.2015',
                Updated: '1.20.2016'
            }
            if (selector) {
                if (element.length > 1) {
                    this.selector = element;
                } else {
                    this.selector = element[0];
                }

                this.length = element.length;

                if (window === this) {
                    return new $(selector);
                }
                return this;
            } else {
                return about;
            }
        },
        css: function (property, style) {
            var propTypes = {
                'background-image': 'backgroundImage',
                'background-position': 'backgroundPosition',
                'background-color': 'backgroundColor',
                'background-size': 'backgroundSize',
                'background-repeat': 'backgroundRepeat',
                'background-attachment': 'backgroundAttachment',
                'background-origin': 'backgroundOrigin'
            }
            if (this.selector.length > 1) {
                for (var i = 0; i < this.selector.length; i++) {
                    if (typeof property === 'object' && typeof style === 'undefined') {
                        for (var key in property) {
                            if (property.hasOwnProperty(key)) {
                                var value = property[key];
                                if (propTypes.hasOwnProperty(key)) {
                                    this.selector[i].style[propTypes[key]] = value;
                                } else {
                                    this.selector[i].style[key] = value;
                                }
                            }
                        }
                    } else if (typeof property === 'string' && typeof style === 'string') {
                        if (propTypes.hasOwnProperty(property)) {
                            this.selector[i].style[propTypes[property]] = style;
                        } else {
                            this.selector[i].style[property] = style;
                        }
                    } else if (typeof property === 'string' && typeof style === 'undefined') {
                        var style = window.getComputedStyle(this.selector[i]);
                        return style.getPropertyValue(property);
                    } else {
                        return window.getComputedStyle(this.selector[i]);
                    }
                }
            } else {
                if (typeof property === 'object' && typeof style === 'undefined') {
                    for (var key in property) {
                        if (property.hasOwnProperty(key)) {
                            var value = property[key];
                            if (propTypes.hasOwnProperty(key)) {
                                this.selector.style[propTypes[key]] = value;
                            } else {
                                this.selector.style[key] = value;
                            }
                        }
                    }
                } else if (typeof property === 'string' && typeof style === 'string') {
                    if (propTypes.hasOwnProperty(property)) {
                        this.selector.style[propTypes[property]] = style;
                    } else {
                        this.selector.style[property] = style;
                    }
                } else if (typeof property === 'string' && typeof style === 'undefined') {
                    var style = window.getComputedStyle(this.selector);
                    return style.getPropertyValue(property);
                } else {
                    return window.getComputedStyle(this.selector);
                }
            }
        },
        map: function (callback) {
            var results = [], i = 0;
            for ( ; i < this.length; i++) {
                results.push(callback.call(this, this[i], i));
            }
            return results;
        },
        mapOne: function (callback) {
            var m = this.map(callback);
            return m.length > 1 ? m : m[0];
        },
        forEach: function (callback) {
            this.map(callback);
            return this;
        },
        on: function (eventType, callback) {
            if (this.selector.length > 1) {
                for (var i = 0; i < this.selector.length; i++) {
                    this.selector[i].addEventListener(eventType, callback, false);
                }
            } else {
                this.selector.addEventListener(eventType, callback, false);
            }
        },
        text: function (text) {
            if (typeof text !== "undefined") {
                return this.forEach(function () {
                    this.selector.innerText = text;
                });
            } else {
                return this.mapOne(function () {
                    return this.selector.innerText;
                });
            }
        },
        html: function (html) {
            if (typeof html !== "undefined") {
                this.forEach(function () {
                    this.selector.innerHTML = html;
                });
                return this;
            } else {
                return this.mapOne(function () {
                    return this.selector.innerHTML;
                });
            }
        },
        addClass: function (classes) {
            var className = '';
            var el = this.selector;

            if (typeof classes !== 'string') {
                for (var i = 0; i < classes.length; i++) {
                    className += ' ' + classes[i];
                }
            } else {
                className = ' ' + classes;
            }

            return this.forEach(function () {
                this.selector.className += className;
            });
        },
        removeClass: function (cl) {
            return this.forEach(function () {
                var cs = this.selector.className.split(' '), i;

                while ( (i = cs.indexOf(cl)) > -1) {
                    cs = cs.slice(0, i).concat(cs.slice(++i));
                }
                this.selector.className = cs.join(' ');
            });
        },
        attr: function (attr, val) {
            if (typeof val !== 'undefined') {
                return this.forEach(function () {
                    this.selector.setAttribute(attr, val);
                });
            } else {
                return this.mapOne(function () {
                    return this.selector.getAttribute(attr);
                });
            }
        },
        hide: function() {
            if (this.selector.length > 1) {
                for (var i = 0; i < this.selector.length; i++) {
                    this.selector[i].style['display'] = 'none';
                }
            } else {
                this.selector.style['display'] = 'none';
            }

        },
        show: function() {
            if (this.selector.length > 1) {
                for (var i = 0; i < this.selector.length; i++) {
                    this.selector[i].style['display'] = 'block';
                }
            } else {
                this.selector.style['display'] = 'block';
            }
        }
    };

    gQuery.fn.init.prototype = gQuery.fn;

    window.gQuery = window.$ = gQuery;
})();
