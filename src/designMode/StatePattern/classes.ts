import {State} from './interface';

export class StateOn implements State {
    constructor(context: Light) {
        this.context = context;
    }

    context: Light;

    turnOn() {
       return 'Nothing happened' 
    }

    turnOff() {
        this.context.isOn = false;
        this.context.setState(this.context.getStateOff());
        return 'Light is OFF';
    }
}

export class StateOff implements State {
    constructor(context: Light) {
        this.context = context;
    }

    context: Light;

    turnOn() {
        this.context.isOn = true;
        this.context.setState(this.context.getStateOn());
        return 'Light is ON'
    }

    turnOff() {
        return 'Nothing happened'
    }
}

export class Light implements State {
    constructor() {
        this.isOn = false;
        this.stateOn = new StateOn(this);
        this.stateOff = new StateOff(this);
        this.state = this.stateOff;
    }

    state: State;

    isOn: boolean;

    stateOn: StateOn;

    stateOff: StateOff;

    setState(state: State) {
        this.state = state;
    }

    getStateOn(): State {
        return this.stateOn;
    }

    getStateOff(): State {
        return this.stateOff;
    }

    turnOn() {
        return this.state.turnOn();
    }

    turnOff() {
        return this.state.turnOff();
    }
}