const Joi = require('joi');
const express = require('express')
const app = express()

app.use(express.json())

//define route, get a call back function also known as a route handler
const courses = [
    {
        id: 1,
        name: "hello"
    },
    {
        id: 2,
        name: "second course"
    },
    {
        id: 3,
        name: "third course"
    }
]
app.get('/', (req, res) => {
    res.send('hello world')
})
const port = process.env.PORT || 3000

//validation logic

const validateCourse = course =>{
     const schema = {
        name: Joi.string().min(3).required()
    }
    
    return Joi.validate(course, schema)
}

app.get('/api/courses', (req, res) => res.send(courses))


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('the course with this id was not found')
    } else {
        res.send(course)
    }
})


app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(courses)
  
    // if (error) {
    //     res.status(400).send(error.details[0].message)
    //     return
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res)=>{
     

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('the course with this id was not found')
 
    const {error} = validateCourse(courses)
    if (error) return res.status(404).send(error.details[0].message);
    course.name = req.body.name
    res.send(course)
    
})


app.delete('/api/courses', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('the course with this id was not found') 
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
    
})

app.listen(3000, () => console.log(`listening on port: ${port}...`))


//query string parameters for optional queries
