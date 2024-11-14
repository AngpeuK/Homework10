export class EmptyBodyApplicationDto {
  income: undefined
  debt: undefined
  age: undefined
  employed: undefined
  loanAmount: undefined
  loanPeriod: undefined

  private constructor(
    income: undefined,
    debt: undefined,
    age: undefined,
    employed: undefined,
    loanAmount: undefined,
    loanPeriod: undefined,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createEmptyBodyApplication(
    income: undefined,
    debt: undefined,
    age: undefined,
    employed: undefined,
    loanAmount: undefined,
    loanPeriod: undefined,
  ): EmptyBodyApplicationDto {
    return new EmptyBodyApplicationDto(
      income, // undefined
      debt, // undefined
      age, // undefined
      employed, // undefined
      loanAmount, // undefined
      loanPeriod, // undefined
    )
  }
}
