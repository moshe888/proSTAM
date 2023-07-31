const express = require('express');
const router = express.Router();
const { Store } = require('../models/store');
const nodemailer = require('nodemailer');


// Get all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Create a store
router.post('/', async (req, res) => {
  const store = new Store({
    name: req.body.name,
    image: req.body.image,
    email: req.body.email,
    password: req.body.password,
    products: [],
  });
  try {
    const newStore = await store.save();
    res.status(201).json(newStore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:storeId/products', async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    return res.json(store);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


// router.post('/login', async (req, res) => {
//    const { email, password } = req.body;

//   try {
    
//     const store = await Store.findOne({ email, password });
//     if (store) {

    
//       // Email and password are correct, so allow access to personal area
//       res.status(200).json({ id: store._id });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const store = await Store.findOne({ email, password });

    if (store) {
      // Email and password are correct, so allow access to personal area
      res.status(200).json({ id: store._id });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/send-email', async (req, res) => {
  const { email, password } = req.body;

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'mailstammailstam@gmail.com',
      // pass: 'eiseecoixpzfople',
      pass:'opxrsyohcgnimakx',      
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'mailstammailstam@gmail.com',
    to: email,
    subject: "ברוכים הבאים לאתר שלנו"
    ,
    text: `שלום וברוכים הבאים לאתר שלנו, כדי להתחבר לאתר יש להשתמש בסיסמה הבאה: ${password}`,
    
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error sending email' });
  }
});



router.get('/:id', getStore, (req, res) => {
  res.json(res.store);
});

// Middleware to get a specific store by ID
async function getStore(req, res, next) {
  let store;
  try {
    store = await Store.findById(req.params.id);
    if (store == null) {
      return res.status(404).json({ message: 'Cannot find store' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.store = store;
  next();
}

// Middleware to get a specific store by ID
async function getStore(req, res, next) {
  let store;
  try {
    store = await Store.findById(req.params.id);
    if (store == null) {
      return res.status(404).json({ message: 'Cannot find store' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.store = store;
  next();
}

// Add a product to a specific store
router.post('/:id/products', getStore, async (req, res) => {
  const { name, description, price ,image} = req.body;
  const product = { name, description, price,image};
  res.store.products.push(product);
  try {
    const updatedStore = await res.store.save();
    res.json(updatedStore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 

// Delete a product from a specific store
router.delete('/:storeId/products/:productId', async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const productIndex = store.products.findIndex(
      (product) => product._id.toString() === req.params.productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    store.products.splice(productIndex, 1);
    await store.save();

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product for a specific store
// router.patch('/:id/products/:productId', getStore, async (req, res) => {
//   const { name, description, price } = req.body;
//   const productId = req.params.productId;
//   const product = res.store.products.id(productId);
//   if (name) {
//     product.name = name;
//   }
//   if (description) {
//     product.description = description;
//   }
//   if (price) {
//     product.price = price;
//   }
//   try {
//     const updatedStore = await res.store.save();
//     res.json(updatedStore);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


module.exports = router;



 