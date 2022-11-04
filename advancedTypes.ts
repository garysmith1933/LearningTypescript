type Admin = {
  name:string;
  privileges: string[];
};

type Employee = {
name:string;
  startDate: Date;
}

//interface ElevatedEmployee extends Employee, Admin
type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'Gary',
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//Function Overloads
//if both parameters are a function return a number
function add1(a:number, b:number): number
//if both are strings, return a string
function add1(a:string, b:string): string

function add1(a:Combinable, b: Combinable) {
  if(typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b
}

const result = add1('Max', 'Schwartz')
result.split(' ')

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own Company'}
}

//optional chaining
console.log(fetchedUserData?.job?.title)

//Nullish Coalescing
const userInput = undefined;

//if userInput is null or undefined, use default
const storedData = userInput ?? 'DEFAULT';

console.log(storedData)
 
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name ${emp.name}`)
  //type guard example
  if('privileges' in emp) {
    console.log( `Privleges ${emp.privileges}`)
  }

  if('startDate' in emp) {
    console.log(`Start Date ${emp.startDate}`)
  }  
}

printEmployeeInformation(e1)

class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
      console.log('Driving a truck')
  }

  loadCargo(amount:number) {
    console.log(`Loading cargo... ${amount}`)
  }
}

type Vehicle = Car | Truck

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1)
useVehicle(v2)

//Type guarding
//for objects we can use instanceof or in
//for other types we can use typeof

//Discrimated Unions
interface Bird {
  //literal type
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
      case 'bird':
        speed = animal.flyingSpeed;
        break;
      case 'horse': 
        speed = animal.runningSpeed;
        break;
    }

    console.log(`Moving with speed ${speed}`)
}

moveAnimal({type:'bird', flyingSpeed: 10})

//Type Casting

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!

const userInputElement = <HTMLInputElement>document.getElementById('user-input')

if(userInputElement){
  (userInputElement as HTMLInputElement).value = 'Hi there!'
}

//Index Properties 

interface ErrorContainer { // { email: 'Not valid email', username: 'must start with a character'}
  //We dont know the name, nor how many there are. We just know it has to be a string, with a value that is also a string.
  [prop: string]: string
}

const errorBag: ErrorContainer = {
  //can also be a number since it can be converted to a string, but not vice versa.
  email: 'Not a valid email',
  username: 'Must start with a capital character!'
}

