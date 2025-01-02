import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { ObjectId } from "mongodb"
import { dbConnect, dbDisConnect, insertData, getData, getAllData, deleteData, updateData } from "./src/dbController/dbConfig"
dotenv.config()
let app = express();
let PORT = process.env.SERVER_PORT
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/health", (req, res) => {
    res.status(200).send({ message: "health ok ", success: true, error: false })
})

app.post("/save", async (req, res) => {
    try {
        let data = req.body;
        let collectionName = "dashboard";

        await insertData(collectionName, data)
        res.status(201).send({ message: "Data has inserted", success: true, error: false })


    } catch (error) {
        res.status(404).send({ message: error.message, success: false, error: true })
    }




})



app.get("/", async (req, res) => {
    try {
        let query = {};
        let collectionName = "dashboard"

        let data = await getAllData(collectionName, query);
        if (data && data.length > 0) {
            res.status(200).send({ message: data, success: true, error: false })
        } else {
            res.status(404).send({ message: "No data found", success: false, error: true })
        }


    } catch (error) {
        res.status(404).send({ message: error.message, success: false, error: true })
    }
})

app.get("/:id", async (req, res) => {
    try {
        let query = {};
        let collectionName = "dashboard"
        let id = new ObjectId(req.params.id);
        query = { _id: id }
        let data = await getData(collectionName, query);
        if (data) {
            res.status(200).send({ message: data, success: true, error: false })
        } else {
            res.status(404).send({ message: "No data found", success: false, error: true })
        }


    } catch (error) {
        res.status(404).send({ message: error.message, success: false, error: true })
    }
})
app.delete("/:id", async (req, res) => {
    try {
        let query = {};
        let collectionName = "dashboard"
        let id = new ObjectId(req.params.id);
        query = { _id: id }
        let data = await deleteData(collectionName, query);
        // console.log(data);
        if (data.deletedCount > 0) {
            res.status(200).send({ message: "data Deleted", success: true, error: false })

        } else {
            res.status(404).send({ message: "No data found", success: false, error: true })
        }




    } catch (error) {
        res.status(404).send({ message: error.message, success: false, error: true })
    }
})

app.put("/:id", async (req, res) => {
    try {
        let collectionName = "dashboard"
        let id = new ObjectId(req.params.id);
        let condition = {
            _id: id
        }
        let data = {
            $set: req.body

        }
        let response = await updateData(collectionName, condition, data)

        if (response.modifiedCount > 0) {
            res.status(200).send({ message: response, success: true, error: false });

        } else {
            res.status(404).send({ message: "No data found", success: false, error: true });
        }

    } catch (error) {
        res.status(404).send({ message: error.message, success: false, error: true })

    }
})


//soft delete
app.put(" /deActive/:id", async (req, res) => {
    try {
        let collectionName = "dashboard"
        let id = new ObjectId(req.params.id);
        let condition = {
            _id: id
        }
        let data = {
            $set: req.body

        }
        let response = await updateData(collectionName, condition, data)
        console.log(response);

        if (response.modifiedCount > 0) {
            res.status(200).send({ message: response, success: true, error: false });

        } else {
            res.status(404).send({ message: "No data found", success: false, error: true });
        }

    } catch (error) {
        res.status(404).send({ message: error.message, success: false, error: true })

    }
})

app.put("/active/:id", async (req, res) => {
    try {
        let collectionName = "dashboard"
        let id = new ObjectId(req.params.id);
        let condition = {
            _id: id
        }
        let data = {
            $set: req.body

        }
        let response = await updateData(collectionName, condition, data)
        console.log(response);

        if (response.modifiedCount > 0) {
            res.status(200).send({ message: response, success: true, error: false });

        } else {
            res.status(404).send({ message: "No data found", success: false, error: true });
        }

    } catch (error) {
        res.status(404).send({ message: error.message, success: false, error: true })

    }
})

app.listen(PORT, (err) => {
    try {
        if (err) throw err
        dbConnect();
        console.log(`Server is running on port ${PORT}`)

    } catch (error) {
        console.log(`Error connecting to server: ${error.message}`)
    }

})





