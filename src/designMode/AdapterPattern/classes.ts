import {Chinese} from './interface';


export class PeopleFromYunNan implements Chinese {
    speakWithChinese() {
        return '和平';
    }
}

// Adapter
export class ChineseTranslator implements Chinese {
    constructor(speaker: Chinese) {
        this.speaker = speaker;
    }

    speaker: Chinese;

    speakWithChinese() {
        return this.speaker.speakWithChinese();
    }
}

export class American {
    speak() {
        return 'peace';
    }
}

// current object
export class AmericanWillSpeakChinese {
    constructor(translator: ChineseTranslator) {
        this.translator = translator;
    }

    translator: ChineseTranslator;

    speak() {
        return this.translator.speakWithChinese();
    }
}