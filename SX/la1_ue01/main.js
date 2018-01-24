class Bauteil {
    constructor (name, value) {
        this.name = name;
        this.value = value;

    }

    getValue() {
        return this.value;
    }
    getName() {
        return this.name;
    }
}

let b = new Bauteil ('R1',100);
console.log("Bauteil" + b.getName() + "=" + b.getValue());
