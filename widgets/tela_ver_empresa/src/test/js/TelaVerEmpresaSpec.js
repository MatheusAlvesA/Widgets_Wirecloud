/* globals $, MashupPlatform, MockMP, TelaVerEmpresa */

(function () {

    "use strict";

    jasmine.getFixtures().fixturesPath = 'src/test/fixtures/';

    var dependencyList = [
        'script',
        'div',
    ];

    var clearDocument = function clearDocument() {
        $('body > *:not(' + dependencyList.join(', ') + ')').remove();
    };

    describe("Test TelaVerEmpresa", function () {

        var widget;

        beforeAll(function () {
            window.MashupPlatform = new MockMP.MockMP();
        });

        beforeEach(function () {
            MashupPlatform.reset();
            widget = new TelaVerEmpresa();
        });

        afterEach(function () {
            clearDocument();
        });

        it("Dummy test", function () {
            expect(widget).not.toBe(null);
        });

    });

})();
