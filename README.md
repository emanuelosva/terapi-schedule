# [Terapify](https://www.terapify.com) Backend Challenge (Terapi-schedule)

Develop a REST API that allows to users know the available psychologists hours and create/schedule an appoiment in some of these, ensuring that the space is available.

## Tech Stack

- **Language**: Javascript
- **WebFramewrok**: ExpressJs
- **Security**: JWT cookie based
- **DB**: MongoDB


## Features

- RESTFul API
- Request validation (Joi)
- SwaggerDocs (swaggger-generator)
- Scope validation (roles: patient & psy)
- Docker based
- Github Actions for CI
- Automatic deploy after test on PaaS (Heroku)

> psy - refers to psychologists

## Docs

The API is completely documented.

- If you run the project in local, you can interact with the swagger docs in:
  - http://localhost:3000/api-docs

- Also you can visit the interactive docs of deployed version in:
  - https://terapi-schedule.herokuapp.com/api-docs

## Usage

- First clone this repository:

```bash
git clone https://github.com/emanuelosva/terapi-schedule
```

- Build the docker image.

First go to the .env.example file and rename as .env and fill the
required config vars.
The mongo DB_URL is by default for dev: `mongodb://db:27017/terapischedule`

Run the following command to build the Docker image.

```bash
npm run build:docker
```

- Lauch the server and the development MongoDB instance:

```bash
npm run dev
```

- Perform tests in Docker container:

```bash
npm run test:dev
```

- Open html test report (comman available for ubuntu):

```bash
npm run test:dev
```

## Endpoints

**Server:** http:/localhost:3000
**Prefix route:** /api

#### Operations about patients

- POST /patients
> Create a new patient and set a cookie session

```js
body: {
  email: "stan@marvel.com",
  name: "Stan Lee",
  cel: "+5256238574",
}

```

- GET /patients
> Return current patient info and appoiments.


#### Operations about psychologists

- POST /psy/signup
> Register a new psychologyst.

```js
body: {
    email: "strange@marvel.com",
    password: "User123",
    firstName: "Steven",
    lastName: "Strange",
    cedula: "2598634",
    description: "Some description..."
}
```

- POST /psy/login
> Login a psychologyst.

```js
body: {
    email: "strange@marvel.com",
    password: "User123",
}
```

#### Operations about agenda

- POST /agenda
> Create agenda for week/day.

:scope: `psy`

```js
body: {
  psy: ID,
  days: [
    {
      dayOfWeek: "Monday",
      workingPlan: {
        start: "09:00",
        end: "17:30",
      },
      breaks: [
        {
          start: "15:00",
          end: "16:00",
        }
      ]
    }
  ]
}
```

- GET /agenda
> Retrieve agenda info of the day

:scope: `psy`

- PUT /agenda
> Update agenda for some day.

:scope: `psy`

```js
body:{
  dayOfWeek: "Monday",
  workingPlan: {
    start: "09:00",
    end: "18:00",
  },
  breaks: [
    {
      start: "14:00",
      end: "15:30",
    }
  ]
}
```

- DELETE /agenda/{dayOfWeek}
> Reset agenda for some day.

:scope: `psy`

#### Operations about appoiments

- GET /appoiments/hours
> Retrieve the available hours

```js
query: {
  selectedDay: "22/12/2020",
  psy: ID,
  duration: 50,
}
```

- POST /appoiments
> Create a new appoiment.

:scope: `patient`

```js
body: {
  start_time: "2020-07-10T13:00:03-05:00",
  end_time: "2020-07-10T13:50:03-05:00",
  duration: 50,
  psy: ID,
  pattient: ID,
}
```

- POST /appoiment/new
> Create a new appoiment and register the patient.

```js
body: {
  start_time: "2020-07-10T13:00:03-05:00",
  end_time: "2020-07-10T13:50:03-05:00",
  duration: 50,
  psy: ID,
  patient: {
    pattientName: "Stan Lee",
    pattientEmail: "stan@marvel.com",
    pattientCel: "+5255468932"
  }
}
```

- PUT /appoiments/{id}
> Update appoiment.

:scope: `patient`

- params: id: ID - appoiment id

```js
body: {
  start_time: "2020-07-10T13:00:03-05:00",
  end_time: "2020-07-10T13:50:03-05:00",
  duration: 50,
}
```

- DELETE /appoiments/{id}
> Delete appoiment.

:scope: `patient`

- params: id: ID - appoiment id

## DB Schemas

**Patient**

```json
{
  "id": "ID",
  "email": "str",
  "firstName": "str",
  "lastName": "str",
  "cel": "str",
}
```

**Psy**

```json
{
  "id": "ID",
  "email": "str",
  "password": "str",
  "firstName": "str",
  "lastName": "str",
  "cedula": "str",
  "description": "str"
}
```

**Day**

```json
{
  "id": "ID",
  "psy": "ID-ref:psy[id]",
  "dayOfWeek": "str",
  "workingPlan": {
    "start": "str",
    "end": "str",
  }
  "breaks": [
    {
      "start": "str",
      "end": "str"
    }
  ]
}
```

**Appoiment**

```json
{
  "id": "ID",
  "psy": "ID-ref:psy[id]",
  "patient": "ID-ref:patient[id]",
  "date": "DateTime",
  "duration": "int",
  "startTime": "DateTime",
  "endTime": "DateTime"
}
```

## About the project

This project takes part of [Terapify](https://www.terapify.com) Backend Challenge.
The correct appoiments scheduling is crucial to ensure a great services to patients and psychologists. This application is my personal solution to cover this service.

## Author

- Emanuel Osorio <emanuelosva@gmail.com>
