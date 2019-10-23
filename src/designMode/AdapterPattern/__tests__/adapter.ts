import {PeopleFromYunNan, ChineseTranslator, American, AmericanWillSpeakChinese} from '../classes';

test('adapter', () => {
    const xiaoMin = new PeopleFromYunNan();
    const translator = new ChineseTranslator(xiaoMin);
    const bob = new American();
    const tony = new AmericanWillSpeakChinese(translator);

    expect(xiaoMin.speakWithChinese()).toBe('和平');
    expect(bob.speak()).toBe('peace');
    expect(tony.speak()).toBe('和平');
});
