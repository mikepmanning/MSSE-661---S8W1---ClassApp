class Person {
    name;
    age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getLegal() {
        return this.age > 18;
    }
}

console.log(new Person('Mike', 41));