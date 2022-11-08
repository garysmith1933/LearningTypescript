function Logger(logString: string) {
  console.log('Logger Factory')
  return function(constructor: Function) {
    console.log('Logging...')
    console.log(constructor)
  }

}

function withTemplate(template:string, hookId: string) {
  console.log('Template Factory')
  return function<T extends {new(...args: any[]): {name: string}} >(originalConstructor: T) {

    return class extends originalConstructor {
      //..._ arguments that it needs to take but wont actually be used.
      constructor(..._: any[]) {
        super();
        console.log('Rendering Template')
        const hookElement = document.getElementById(hookId)
   
        if(hookElement) {
          hookElement.innerHTML = template;
          hookElement.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

// @ should point at function that acts as a decorator
//with multiple decorators it executes from bottom to top, meaning withTemplate executes first
//however decorator factories excute from top to bottom
@Logger('Logging')
@withTemplate('<h1>My Person Object</h1>' , 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object')
  }
}

const person = new Person();
console.log(person)

//decorator runs when javascript finds your class definition, constructior definition

//property decorator
function Log(target: any, propertyName: string ) {
  console.log('property decorator!')
  console.log(target, propertyName)
}

function Log2(target: any, name:string, descriptor: PropertyDescriptor) {
  console.log('Accessor Decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method Decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter Decorator')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product  {
  @Log // executes when class is defined in Javascript
  title: string;
  private _price: number;

  @Log2 // Accessor Decorator
  set price(val: number) {
    if(val > 0) {
      this._price = val;
    }
    
    else {
      throw new Error('value should be positive!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 // Method Decorator
  getPriceWithTax(@Log4 tax:number) { //Parameter Decorator
    return this.price * (1 + tax);
  }
}


function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  };

  return adjDescriptor;
}

class Printer {
  message = 'This works'

  @Autobind
  showMessage(){
    console.log(this.message)
  }
}

const p = new Printer();

const button = document.querySelector('button')!
button?.addEventListener('click', p.showMessage)

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positve']
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for(const prop in objValidatorConfig) {
    console.log(prop)
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
          break;
        case 'positive':
          isValid = isValid && !!obj[prop]
          break; 
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price)
  if (!validate(createdCourse)) {
    alert('Invalid input! Please try again!')
  }
  console.log(createdCourse)
}) 