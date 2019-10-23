class Cup {
    drink() {
        return 'water';
    }
}

class Book {
    read() {
        return 'this is a beautiful word, right?';
    }
}

class Bed {
    sleep() {
        return 'so soft';
    }
}

export class BeautifulLife {
    constructor(cup: Cup, book: Book, bed: Bed) {
        this.cup = cup;
        this.book = book;
        this.bed = bed;
    }

    cup: Cup;

    book: Book;

    bed: Bed;

    intoMyLife() {
        return [
            this.cup.drink(),
            this.book.read(),
            this.cup.drink(),
            this.bed.sleep()
        ].join(' > ');
    }
}
