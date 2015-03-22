var Utils = {
    calculateCirclePoint: function (radius, angle) {
        return cc.p(radius * Math.cos(((angle) * Math.PI) / 180),
            -radius * Math.sin(((angle) * Math.PI) / 180))
    },

    doForEach: function (array, functions) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < functions.length; j++) {
                functions[j](array[i]);
            }
        }
    }
};
