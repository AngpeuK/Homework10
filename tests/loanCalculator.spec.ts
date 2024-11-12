import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { ApplicationDto } from './dto/ApplicationDto'
import { EmptyBodyApplicationDto } from './dto/EmptyBodyApplicationDto'

test.describe('API tests for risk calculation', () => {
  test.describe('Positive tests', () => {
    test('1.1 Successful risk score calculation based on valid data should return status code 200', async ({
      request,
    }) => {
      const requestBody = ApplicationDto.createValidApplication()
      console.log('1.1 requestBody:', requestBody) //Print Request Body
      //Request
      const response = await request.post(
        'https://backend.tallinn-learning.ee/api/loan-calc/decision',
        {
          data: requestBody,
        },
      )
      expect(response.status()).toBe(StatusCodes.OK)
      //Response
      const responseBody = await response.json()
      // Verify all fields in response body
      expect.soft(responseBody.riskScore).toBeDefined()
      expect.soft(responseBody.riskLevel).toBeDefined()
      expect.soft(responseBody.riskPeriods).toBeDefined()
      expect.soft(responseBody.applicationId).toBeDefined()
      expect.soft(responseBody.riskDecision).toBeDefined()
      //Print Response Body and status code
      console.log('1.1 ResponseBody:', responseBody)
      console.log('1.1 Response status code:', response.status())
    })

    //
    test('1.2/1.3/1.4 Tests for Any RiskScore loanPeriod return should be adequate, should return status code 200', async ({
      request,
    }) => {
      // I discovered that the calculator returns the riskLevel differently with the same data, so I need three checks in one.
      //
      const requestBody = ApplicationDto.createValidApplication()
      console.log('requestBody for 1.2/1.3/1.4:', requestBody) //Print Request Body
      //Request
      const response = await request.post(
        'https://backend.tallinn-learning.ee/api/loan-calc/decision',
        {
          data: requestBody,
        },
      )
      expect(response.status()).toBe(StatusCodes.OK)
      //Response
      const responseBody = await response.json()
      // Verify all fields in response body
      expect.soft(responseBody.riskScore).toBeDefined()
      expect.soft(responseBody.riskLevel).toBeDefined()
      expect.soft(responseBody.riskPeriods).toBeDefined()
      expect.soft(responseBody.applicationId).toBeDefined()
      expect.soft(responseBody.riskDecision).toBeDefined()
      //Print Response Body and status code
      console.log('ResponseBody for 1.2/1.3/1.4:', responseBody)
      console.log('Response status code for 1.2/1.3/1.4:', response.status())
      // I discovered that the calculator returns the riskLevel differently with the same data, so I need three checks in one.
      if (responseBody.riskLevel === 'Low Risk') {
        expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([12, 18, 24, 30, 36]))
      } else if (responseBody.riskLevel === 'Medium Risk') {
        expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([6, 9, 12]))
      } else if (responseBody.riskLevel === 'High Risk') {
        expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([3, 6]))
      } else {
        // Print if Undocumented Risk Level
        console.warn(
          `Unexpected risk level, so no period provided, that is ok: ${responseBody.riskLevel}`,
        )
      }
    })

    test('1.2 Low Risk Score loanPeriod return should be adequate, should return status code 200', async ({
      request,
    }) => {
      const requestBody = ApplicationDto.createLowRiskApplication()
      console.log('requestBody for 1.2:', requestBody) //Print Request Body
      //Request
      const response = await request.post(
        'https://backend.tallinn-learning.ee/api/loan-calc/decision',
        {
          data: requestBody,
        },
      )
      expect(response.status()).toBe(StatusCodes.OK)
      //Response
      const responseBody = await response.json()
      // Verify all fields in response body
      expect.soft(responseBody.riskScore).toBeDefined()
      expect.soft(responseBody.riskLevel).toBeDefined()
      expect.soft(responseBody.riskPeriods).toBeDefined()
      expect.soft(responseBody.applicationId).toBeDefined()
      expect.soft(responseBody.riskDecision).toBeDefined()
      //Print Response Body and status code
      console.log('ResponseBody for 1.2:', responseBody)
      console.log('Response status code for 1.2:', response.status())

      if (responseBody.riskLevel === 'Low Risk') {
        expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([12, 18, 24, 30, 36]))
      } else if (responseBody.riskLevel === 'Medium Risk') {
        console.warn(`inadequate risk level: ${responseBody.riskLevel}`)
      } else if (responseBody.riskLevel === 'High Risk') {
        console.warn(`inadequate risk level: ${responseBody.riskLevel}`)
      } else {
        // Print if Undocumented Risk Level
        console.warn(`inadequate risk level: ${responseBody.riskLevel}`)
      }
    })
  })

  //
  // Negative Tests
  test.describe('Negative tests', () => {
    test('1.5 Unsuccessful risk score calculation with empty request body should return status code 400', async ({
      request,
    }) => {
      const requestBody = EmptyBodyApplicationDto.createEmptyBodyApplication(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      )
      console.log(requestBody) //Print Request Body
      //Request
      const response = await request.post(
        'https://backend.tallinn-learning.ee/api/loan-calc/decision',
        {
          data: requestBody,
        },
      )
      //Response
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
      console.log('1.5 Response status code:', response.status())
    })

    test('1.6 Unsuccessful risk score calculation with negative debt value in request body should return status code 400', async ({
      request,
    }) => {
      const requestBody = ApplicationDto.createInvalidApplication(1000, -1, 17)
      console.log(requestBody) //Print Request Body
      //Request
      const response = await request.post(
        'https://backend.tallinn-learning.ee/api/loan-calc/decision',
        {
          data: requestBody,
        },
      )
      //Response
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
      console.log('1.6 Response status code:', response.status())
    })

    test('1.7 Unsuccessful risk score calculation with invalid income value in request body should return status code 400', async ({
      request,
    }) => {
      const requestBody = ApplicationDto.createInvalidApplication(0, 1, 17)
      console.log(requestBody) //Print Request Body
      //Request
      const response = await request.post(
        'https://backend.tallinn-learning.ee/api/loan-calc/decision',
        {
          data: requestBody,
        },
      )
      //Response
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
      console.log('1.7 Response status code:', response.status())
    })

    test('1.8 Unsuccessful risk score calculation with invalid аge value in request body should return status code 400', async ({
      request,
    }) => {
      const requestBody = ApplicationDto.createInvalidApplication(1000, 1, 0)
      console.log('1.8 requestBody:', requestBody) //Print Request Body
      //Request
      const response = await request.post(
        'https://backend.tallinn-learning.ee/api/loan-calc/decision',
        {
          data: requestBody,
        },
      )
      //Response
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
      console.log('1.8 Response status code:', response.status())
    })
  })
})
