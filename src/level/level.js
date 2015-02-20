var Level = cc.Class.extend({
    number: 0,
    segments: [],
    rules: [],

    ctor: function (number, segments, rules) {
        this._super();
        this.number = number;
        this.segments = segments;
        this.rules = rules;
    },

    getNumber: function () {
        return this.number;
    },

    getSegments: function () {
        return this.segments;
    }

});
