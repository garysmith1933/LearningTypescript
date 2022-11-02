// type AddFn = (a: number, b: number) => number; - MORE COMMON


interface AddFn {
    (a:number, b:number): number;
}

let add: AddFn;

add = (n1: number, n2:number) => {
    return n1 + n2;
}

interface Named {
  //cannot add public or private
  readonly name?:string;
  //optional
  outputName?: string;
}

//extended interfaces make sure that it classes and objects obtains what both interfaces requires.
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable, Named {
    name?: string;

    constructor(n?:string) {
        if(n) {
          this.name = n;  
        }

    }

    greet(phrase: string) {
        if(this.name) {
            console.log(`${phrase} ${this.name}`)
        }

        else {
            console.log('Hi!')
        }
   
    }

}

let user1: Greetable;
user1 = new Person('Gary')

console.log(user1.greet('Hi my name is'))