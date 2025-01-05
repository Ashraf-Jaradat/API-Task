import { test, expect } from '@playwright/test';
import Ajv from "ajv";
const ajv = new Ajv();
import schema from "../List-Users-Schema.json";

//Get Tests

test("list users", async ({ request }) => {

  const response =await request.get (`/api/users?page=2`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  const validate = ajv.compile(schema);

  const valid = validate(body);

  expect(valid).toBe(true);

})

test("single user", async ({ request }) => {

  const response =await request.get (`/api/users/2`);

  expect(response.status()).toBe(200);

  const body = await response.json();


})

test("single user not found", async ({ request }) => {

  const response =await request.get (`/api/users/23`);

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body).toEqual({});

})

test(" List Resource", async ({ request }) => {

  const response =await request.get (`/api/unknown`);

  expect(response.status()).toBe(200);

  const body = await response.json();


})

test("Single Resource", async ({ request }) => {

  const response =await request.get (`/api/unknown/2`);

  expect(response.status()).toBe(200);

  const body = await response.json();


})

test("single Resource not found", async ({ request }) => {

  const response =await request.get (`/api/unknown/23`);

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body).toEqual({});

})

test ("Delayed Response " , async ({ request }) => {

  const response= await request.get(`/api/users?delay=3`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  
})

//Post Tests

test ("Create User", async ({ request }) => {

  const response = await request.post(`/api/users`,{
    data:{          
      "name": "morpheus",
      "job": "leader"
    }
  });
  expect(response.status()).toBe(201);

  const body = await response.json();


});

test ("Register Successfull",async ({request})=>{

  const response =await request.post (`/api/register `,{
    data:{
      "email":"eve.holt@reqres.in",
      "password":"pistol"
    }
  })
  expect(response.status()).toBe(200);
  const body = await response.json();


})

test ("Register Unsuccessfull",async ({request})=>{

  const response =await request.post (`/api/register `,{
    data:{
      "email":"sydney@fife"
    }
  })
  expect(response.status()).toBe(400);
  const body = await response.json();

  expect(body).toEqual({
    "error": "Missing password"
});

})

test ("Login Successfull",async ({request})=>{

  const response = await request.post(`/api/login`,{
    data:{
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
  }
  })
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("token");
})

test ("Login Unsuccessfull",async({request})=>{
  const response =await request.post (`/api/register `,{
    data:{
      "email": "peter@klaven"
    }
  })
  expect(response.status()).toBe(400);
  const body = await response.json();

  expect(body).toEqual({
    "error": "Missing password"
});
})



//Put Tests 

test ("Update (put)User",async ({ request})=>{

  const response = await request.put(`/api/users/2`,{
    data:{
      "name":"mprpheus",
      "job":"zion resident"
    }
  })

  expect(response.status()).toBe(200);

  const body =await response.json();



})

test ("Update(patch) User",async ({ request})=>{

  const response = await request.patch(`/api/users/2`,{
    data:{
      "name":"mprpheus",
      "job":"zion resident"
    }
  })

  expect(response.status()).toBe(200);

  const body =await response.json();



})

//Delete Tests


test ("Delete User", async ({ request }) => {

  const response = await request.delete(`/api/users/2`);

  expect(response.status()).toBe(204);

});


