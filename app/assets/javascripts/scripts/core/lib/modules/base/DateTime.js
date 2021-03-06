/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

define(function defineLibDateTime() {

    /**
     * Define Date time
     * @class LibDateTime
     * @constructor
     */
    var LibDateTime = function LibDateTime() {

        (function () {

            /**
             * Define toISO8601
             * @memberOf Date
             * @param date
             * @returns {string}
             */
            Date.prototype.toISO8601 = function toISO8601(date) {

                // Define padding
                var pad = function pad(amount, width) {
                    var padding = '';
                    while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1))
                        padding += '0';
                    return padding + amount.toString();
                };
                date = date ? date : new Date();
                var offset = date.getTimezoneOffset();
                return pad(date.getFullYear(), 4)
                    + '-' + pad(date.getMonth() + 1, 2)
                    + '-' + pad(date.getDate(), 2)
                    + 'T' + pad(date.getHours(), 2)
                    + ':' + pad(date.getMinutes(), 2)
                    + ':' + pad(date.getUTCSeconds(), 2)
                    + (offset > 0 ? '-' : '+')
                    + pad(Math.floor(Math.abs(offset) / 60), 2)
                    + ':' + pad(Math.abs(offset) % 60, 2);
            };
        })();
    };

    LibDateTime.extend('LibDateTime', {

        /**
         * Get date
         * @memberOf LibDateTime
         * @returns {Date}
         */
        getDate: function getDate() {
            return new Date();
        },

        /**
         * Get timestamp
         * @memberOf LibDateTime
         * @param time
         * @returns {*}
         */
        timestamp: function timestamp(time) {
            return time ? time :
                this.getDate().getTime();
        },

        /**
         * Get timestamp utc
         * @memberOf LibDateTime
         * @returns {number}
         */
        timestampUTC: function timestampUTC() {
            var now = this.getDate();
            return Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                now.getHours(),
                now.getMinutes(),
                now.getSeconds(),
                now.getMilliseconds()
            );
        },

        /*
         * Date Format 1.2.3
         * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
         * MIT license
         *
         * Includes enhancements by Scott Trenda <scott.trenda.net>
         * and Kris Kowal <cixar.com/~kris.kowal/>
         *
         * Accepts a date, a mask, or a date and a mask.
         * Returns a formatted version of the given date.
         * The date defaults to the current date/time.
         * The mask defaults to dateFormat.masks.default.
         */

        // Some common format strings
        //      dateFormat.masks = {
        //          "default":      "ddd mmm dd yyyy HH:MM:ss",
        //          shortDate:      "m/d/yy",
        //          mediumDate:     "mmm d, yyyy",
        //          longDate:       "mmmm d, yyyy",
        //          fullDate:       "dddd, mmmm d, yyyy",
        //          shortTime:      "h:MM TT",
        //          mediumTime:     "h:MM:ss TT",
        //          longTime:       "h:MM:ss TT Z",
        //          isoDate:        "yyyy-mm-dd",
        //          isoTime:        "HH:MM:ss",
        //          isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        //          isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        //      };

        // Internationalization strings
        //      dateFormat.i18n = {
        //          dayNames: [
        //              "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        //              "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        //          ],
        //          monthNames: [
        //              "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        //              "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        //          ]
        //      };

        // For convenience...
        //      Date.prototype.format = function (mask, utc) {
        //          return dateFormat(this, mask, utc);
        //      };

        dateFormat: function dateFormat() {

            var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) val = "0" + val;
                    return val;
                };

            var masksList = {
                "default": "ddd mmm dd yyyy HH:MM:ss",
                shortDate: "m/d/yy",
                mediumDate: "mmm d, yyyy",
                longDate: "mmmm d, yyyy",
                fullDate: "dddd, mmmm d, yyyy",
                shortTime: "h:MM TT",
                mediumTime: "h:MM:ss TT",
                longTime: "h:MM:ss TT Z",
                isoDate: "yyyy-mm-dd",
                isoTime: "HH:MM:ss",
                isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
            };

            var i18n = {
                dayNames: [
                    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                monthNames: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ]
            };

            // Regexes and supporting functions are cached through closure
            return (function (date, mask, utc) {
                var dF = dateFormat;

                // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }

                // Passing date through Date applies Date.parse, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date)) throw SyntaxError("invalid date");

                mask = String(masksList[mask] || mask || masksList["default"]);

                // Allow setting the utc argument via the mask
                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                var _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    m = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    M = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d: d,
                        dd: pad(d),
                        ddd: i18n.dayNames[D],
                        dddd: i18n.dayNames[D + 7],
                        m: m + 1,
                        mm: pad(m + 1),
                        mmm: i18n.monthNames[m],
                        mmmm: i18n.monthNames[m + 12],
                        yy: String(y).slice(2),
                        yyyy: y,
                        h: H % 12 || 12,
                        hh: pad(H % 12 || 12),
                        H: H,
                        HH: pad(H),
                        M: M,
                        MM: pad(M),
                        s: s,
                        ss: pad(s),
                        l: pad(L, 3),
                        L: pad(L > 99 ? Math.round(L / 10) : L),
                        t: H < 12 ? "a" : "p",
                        tt: H < 12 ? "am" : "pm",
                        T: H < 12 ? "A" : "P",
                        TT: H < 12 ? "AM" : "PM",
                        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

                return mask.replace(token, function ($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            })();
        }
    });

    return new LibDateTime();
});