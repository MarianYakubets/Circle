var StubLevel = Level.extend({
    getNumber: function () {
        return 1;
    },

    getSegments: function () {
        this.segments = [new Segment(0,180,70),
            new Segment(180,90,100),
            new Segment(270,90,40)];
        return this.segments;
    }

});
