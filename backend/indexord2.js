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

// Image Storage Engine for Profile Pictures
const profileImageStorage = multer.diskStorage({
    destination: './upload/profile-pics',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const profileImageUpload = multer({ storage: profileImageStorage });

// Creating upload Endpoint for Profile Pictures
app.use('/profile-pics', express.static('upload/profile-pics'));

app.post("/upload/profile-pics", profileImageUpload.single('profilePicture'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/profile-pics/${req.file.filename}`
    });
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
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
        console.log("Product added successfully");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, error: "Failed to add product" });
    }
});

// Creating API for deleting Products
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed successfully");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: "Failed to remove product" });
    }
});

// Creating API for all Products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, error: "Failed to fetch products" });
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

// Rest of the code remains the same...


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

app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        // Retrieve user's cart data
        let userData = await Users.findOne({ _id: req.user.id });

        // Clone the cart data object to avoid direct modification
        let updatedCartData = { ...userData.cartData };

        // Increment the quantity of the specified item
        updatedCartData[req.body.itemId] = (updatedCartData[req.body.itemId] || 0) + 1;

        // Update the user's document with the modified cart data
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: updatedCartData });

        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
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

// Schema for storing order details
const MyOrder = mongoose.model("MyOrder", {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["cash"], // Only allow cash payment method
        required: true,
    },
    orderedProducts: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product' // Reference to the Product model
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Endpoint for placing orders
app.post('/placeorder', fetchUser, async (req, res) => {
    try {
        const { fullName, addressLine1, addressLine2, city, state, postalCode, country} = req.body;

        // Validate required fields
        if (!fullName || !addressLine1 || !city || !state || !postalCode || !country) {
            return res.status(400).json({ success: false, error: "Please fill in all required fields" });
        }

        // Retrieve user's cart data
        const userData = await Users.findOne({ _id: req.user.id });
        let orderedProducts = [
            {
                "productId": "66079ff9fe36a09dba0edb29",
                "name": "Sabari",
                "quantity": 1,
                "price": 750,
                "_id": "662a9576b64a35a0199ba4be"
              }
              
        ];
        console.log("Duumy", orderedProducts);
        // Convert Object.entries to Array
        const cartEntries = Object.entries(userData.cartData);

        // Fetch products for each cart item
        for (const [productId, quantity] of cartEntries) {
            try {
                // Convert productId to ObjectId type
                if (!mongoose.Types.ObjectId.isValid(productId)) {
                    console.error(`Invalid ObjectId format for productId: ${productId}`);
                    continue; // Skip this iteration if productId is invalid
                }

                const productObjectId = mongoose.Types.ObjectId(productId);

                const product = await Product.findById(productObjectId);
                if (product) {
                    /* orderedProducts.push({
                        productId: product._id,
                        name: product.name,
                        quantity: quantity,
                        price: product.new_price
                    }); */
                } else {
                    console.error(`Product with ID ${productId} not found`);
                }
            } catch (error) {
                console.error(`Error fetching product with ID ${productId}:`, error);
            }
        }

        // Create new order instance
        const order = new MyOrder({
            userId: req.user.id,
            fullName,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            paymentMethod: "cash", // Hardcoded to cash payment method
            orderedProducts,
            createdAt: new Date() // Adding the current date to the order
        });
        console.log("Duumy1", orderedProducts);
        // Save the order to the database
        await order.save();

        // Clear user's cart after placing the order
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: {} });

        res.status(201).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});
