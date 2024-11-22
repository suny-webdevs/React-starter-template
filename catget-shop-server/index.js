const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require("mongodb")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://catget-shop.web.app",
    "https://catget-shop.firebaseapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Welcome to Catty server")
})

const client = new MongoClient(process.env.DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const userCollection = client.db("cattyDB").collection("users")
    const productCollection = client.db("cattyDB").collection("products")
    const wishListCollection = client.db("cattyDB").collection("wishLists")
    const cartCollection = client.db("cattyDB").collection("carts")

    //* Create user
    app.post("/create-user", async (req, res) => {
      try {
        const newUser = req.body
        const isExist = await userCollection.findOne({ email: newUser.email })
        if (isExist) {
          return res
            .status(300)
            .json({ exist: true, message: "User already exists!" })
        }
        const postUser = await userCollection.insertOne(newUser)
        return res.status(200).json({
          success: true,
          message: "User created successfully!",
          postUser,
        })
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to create user!", error })
      }
    })

    //* Get all users
    app.get("/users", async (req, res) => {
      try {
        const users = await userCollection.find().toArray()
        return res.status(200).json({ users })
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to get users!", error })
      }
    })

    //* Get a single user
    app.get("/users/:email", async (req, res) => {
      try {
        const email = req.params.email
        const user = await userCollection.findOne({ email })
        return res.json({ user })
      } catch (error) {
        return res.status(400).json({ message: "Failed to get user!", error })
      }
    })

    //* Post product
    app.post("/create-product", async (req, res) => {
      try {
        const newProduct = req.body
        const data = await productCollection.insertOne(newProduct)
        return res.status(200).json({ data })
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Failed to create product!", error })
      }
    })

    //* Get all products
    app.get("/products", async (req, res) => {
      try {
        const products = await productCollection.find().toArray()
        return res.status(200).json({ products })
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Failed to get products!", error })
      }
    })

    //* Get a single product
    app.get("/products/:id", async (req, res) => {
      try {
        const id = req.params.id
        const product = await productCollection.findOne({ _id: id })
        return res.status(200).json({ product })
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Failed to get product!", error })
      }
    })

    await client.db("admin").command({ ping: 1 })
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
