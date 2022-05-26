const express = require('express')
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mini
// ieH2V9BQjHoLEcd4

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mlx3w.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollecton = client.db('partShop').collection('services');
        const orderCollection = client.db('partShop').collection('orders');
        const reviewCollection = client.db('partShop').collection('reviews');

        // get api
        app.get('/equipments', async (req, res) => {
            const query = {};
            const cursor = serviceCollecton.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })


        // post
        app.get('/equipments/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await serviceCollecton.findOne(query);
            res.send(inventory);
        })

        // order post api
        app.post('/order', async (req, res) => {

            const result = await orderCollection.insertOne(req.body);
            console.log(result)
            res.send({ success: true, result });
        });

        // user order 
        app.get('/order/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            // const decodedEmail = req.decoded.email;
            // if (email === decodedEmail) {
            const query = { email: email };
            const result = await orderCollection.find(query).toArray();
            return res.send(result);
            // }
            // else {
            //     return res.status(403).send({ message: 'forbidden access' });
            // }
        });

        // order post api
        app.post('/review', async (req, res) => {

            const result = await reviewCollection.insertOne(req.body);
            console.log(result)
            res.send({ success: true, result });
        });






    }



    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello anik!')
})

app.listen(port, () => {
    console.log(`My Example app listening on port ${port}`)
})