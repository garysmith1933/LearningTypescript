//They are the same
// const names: Array<string> = []; // string[]

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10)
//   }, 2000)
// })

// promise.then(data => {
//   // data.split(' ')
// })

//GENERIC TYPES

//This is to make sure that T and U are always objects, since Object assign only merges objects
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Gary', hobbies: ['Gaming']}, {age: 25})
const mergedObj2 = merge({name: 'Gary'}, {age: 25})


console.log(mergedObj)

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = `Got no value.`
  if(element.length === 1) {
    descriptionText = `Got 1 element`
  }

  if(element.length > 1) {
    descriptionText = `Got ${element.length} elements`
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('hi'))

function extractAndConvert<T extends object, U extends keyof T>(obj:T, key: U) {
  return `Value: ${obj[key]} `
}

extractAndConvert({name: 'Gary'}, 'name')

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data]
  }


}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date
}

function createCourseGoal (
  title: string, 
  description: string,
  date: Date
) : CourseGoal {
  //Partial means its optional, it doesnt have to have every thing CourseGoal requires
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title;
  courseGoal.description = description
  courseGoal.completeUntil = date
  return courseGoal as CourseGoal;
}

//Readonly prevents being able to add anything to the variable.
const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu')