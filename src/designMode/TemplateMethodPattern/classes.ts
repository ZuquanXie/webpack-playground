// template
export class Draw {
    draw() {
        return [
            this.prepare(),
            this.setLineColor(),
            this.stroke(),
            this.setFillColor(),
            this.fill(),
            this.show()
        ];
    }
    prepare() {
        return 'Pencil & Paper';
    }
    setLineColor() {

    }
    stroke() {

    }
    setFillColor() {

    }
    fill() {

    }
    show() {
        return 'Look! So beautiful!';
    }
}

export class DrawRedCircle extends Draw {
    setLineColor() {
        return 'red';
    }
    stroke() {
        return 'circle';
    }
    setFillColor() {
        return 'red';
    }
    fill() {
        return 'circle';
    }
}

export class DrawBlueLine extends Draw {
    setLineColor() {
        return 'blue';
    }
    stroke() {
        return 'line';
    }
}