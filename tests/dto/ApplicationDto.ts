export class ApplicationDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  //Positive tests generator
  static createValidApplication(): ApplicationDto {
    return new ApplicationDto(
      Math.random() * 2000 + 1000, // random income
      Math.random() * 2, // random debt
      Math.floor(Math.random() * 51) + 17, // random age
      true, // employed
      Math.random() * 100 + 500, // random loan amount
      [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ][Math.floor(Math.random() * 36)], // random loan period
    )
  }

  // Positive tests generator
  static createInvalidApplication(income: number, debt: number, age: number): ApplicationDto {
    return new ApplicationDto(
      income, // specified income
      debt, // specified debt
      age, // specified age
      true, // employed
      Math.random() * 14500 + 500, // random loan amount
      [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ][Math.floor(Math.random() * 36)], // random loan period
    )
  }

  static createLowRiskApplication(): ApplicationDto {
    return new ApplicationDto(
      1000, //income
      0, //debt
      17, //age
      true, // employed
      100, // random loan amount
      3, // loan period
    )
  }
}
