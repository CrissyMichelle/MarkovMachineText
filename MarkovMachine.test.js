const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
    test('makes chains correctly', () => {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.chains).toEqual({
            "the":  ["cat", "hat"],
            "cat":  ["in"],
            "in":  ["the"],
            "hat":  [null]
        });
    });

    test('makes text correctly', () => {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(["a b c", "b c", "c"]).toContain(text);
    });
})