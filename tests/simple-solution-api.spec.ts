import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/OrderDto'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('get order with incorrect id symbol should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/a')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = OrderDto.createOrderWithRandomData()
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(responseBody.status).toBe('OPEN')
  expect.soft(responseBody.courierId).toBeDefined()
  expect.soft(responseBody.customerName).toBeDefined()
  expect.soft(responseBody.customerPhone).toBeDefined()
  expect.soft(responseBody.comment).toBeDefined()
  expect.soft(responseBody.id).toBeDefined()
})

test('post order with incorrect data should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPENN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
