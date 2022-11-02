abstract class Department {
    static fiscalYear = 2020
    // private readonly id: string;
    // private name: string;
    //only accessible inside the class
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name:string) {
        // this.id = id;
        // this.name = n;

        //you cannot do this.fiscalYear with the static keyword
        // console.log(Department.fiscalYear)
    }

    static createEmployee(name:string) {
        return {name: name}
    }

    abstract describe(this: Department): void;

    addEmployee(employee:string) {
        this.employees.push(employee)
    }

    printEmployeeInformation() {
        console.log(this.employees)
    }
}

// class ITDepartment extends Department {
//     public admins: string[]

//     constructor(id: string, admins: string[]) {
//     super(id, 'IT');
//     this.admins = admins
//     }

//     describe() {
//         console.log(`Accounting Department - ID: ${this.id}`)
//     }
// }

// const Cooking = new ITDepartment('1A', ['Max'])
// const employee1 = Department.createEmployee('Gary')
// console.log(employee1, Department.fiscalYear)
// console.log(Cooking.describe())
// Cooking.addEmployee('Max')
// Cooking.addEmployee('Jax')




class AccountingDepartment extends Department {
    private lastReport: string 
    //an instance that is accessible in the class
    //only available inside the class
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport
        }

        throw new Error('No report found')
    }

    set mostRecentReport(value:string) {
        if(!value) {
           throw new Error('Please enter a valid value')
        }
        this.addReport(value)
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
        this.lastReport = this.reports[0]
    }

    static getInstance() {
        if(AccountingDepartment.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('d2', [])
        return this.instance
    }

    addReport(text:string) {
        this.reports.push(text)
        this.lastReport = text
    }

    printReports() {
        console.log(this.reports)
    }

    addEmployee(name: string) {
        if(name === 'Max') {
            return ;
        }
        this.employees.push(name)
    }

    describe(): void {
        console.log(`Department: (${this.id}) ${this.name}`)
    }
}

const accounting = AccountingDepartment.getInstance()

accounting.mostRecentReport = 'There is a fork in the road'
accounting.addReport('we are good')
console.log(accounting.mostRecentReport)

accounting.addEmployee('Max')
accounting.addEmployee('Joe')

// console.log(accounting.printReports())
// console.log(accounting.printEmployeeInformation())
console.log(accounting.describe())