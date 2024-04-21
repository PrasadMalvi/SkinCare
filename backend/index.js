const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://prasadmalvi23:126052@cluster0.ibujylr.mongodb.net/glownius");

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload Endpoint for Images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error in adding product:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Creating API for deleting Products
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error in removing product:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Creating API for all Products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error in fetching products:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Schema Creation for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Creating Endpoint for Registering Users
app.post('/signup', async (req, res) => {
    try {
        // Check if user with same email already exists
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "A user with the same email already exists" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create cart data for the user
        const cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Create a new user instance
        const newUser = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });

        // Save the new user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, 'secret_ecom', { expiresIn: '1h' });

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

//Creating endpoitns for user login

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Wrong Email" });
        }
        
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.status(400).json({ success: false, error: "Wrong Password" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

//creating endpoitns for new collection data
app.get('/newcollection',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products;
    console.log("New Collection fecthed");
    res.send(newcollection);
})




//creating middlware to fetch user 
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please Authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            if (!data || !data.userId) {
                throw new Error("User ID not found in token");
            }
            req.user = { id: data.userId }; // Set user ID in req.user
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" });
        }
    }
};





// Creating endpoint for adding product for CartData
// Creating endpoint for adding product for CartData
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Item added to cart" }); // Send JSON response
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ success: false, error: "Internal server error" }); // Send error response
    }
 });
 
 //Creating endpoint for removing  product from cartData
 app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const userData = await Users.findOne({ _id: req.user.id });
        const { itemId } = req.body;

        // Check if the item exists in the cart
        if (!userData.cartData[itemId] || userData.cartData[itemId] <= 0) {
            return res.status(400).json({ success: false, error: "Item not found in cart" });
        }

        // Decrement the item quantity in the cart
        userData.cartData[itemId] -= 1;

        // Update the user's cart data in the database
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        // Send a success response
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


//Creating endpoint for cartdata

app.post('/getdata',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let  userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});
