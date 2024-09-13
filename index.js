const express = require("express");

const app = express();

const db = require("./db/dbconnect");

app.use(express.json());

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credential: true,
};

app.use(cors(corsOptions));

const Fashion = require("./models/FashionProducts.models");
const Address = require("./models/Address.models");

async function createProduct(newProduct) {
  try {
    const productData = new Fashion(newProduct);
    const savedInfo = await productData.save();
    return savedInfo;
  } catch (error) {
    throw error;
  }
}

app.post("/products", async (req, res) => {
  try {
    const savedProduct = await createProduct(req.body);
    res
      .status(201)
      .json({ message: "Product added successfully.", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

async function getAllProducts() {
  try {
    const products = await Fashion.find();
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/", async (req, res) => {
  res.json("Backend running");
});

app.get("/products", async (req, res) => {
  try {
    const productList = await getAllProducts();
    if (productList.length > 0) {
      res.json(productList);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get product" });
  }
});

async function getProductById(productId) {
  try {
    const products = await Fashion.findById({ _id: productId });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/:productId", async (req, res) => {
  try {
    const productList = await getProductById(req.params.productId);
    res.json(productList);
  } catch (error) {
    res.status(500).json({ error: "Failed to get product" });
  }
});

async function createAddress(newAddress) {
  try {
    const address = new Address(newAddress);
    const savedAddress = address.save();
    return savedAddress;
  } catch (error) {
    throw error;
  }
}

app.post("/profile/newAddress", async (req, res) => {
  try {
    const savedAddress = await createAddress(req.body);
    res
      .status(201)
      .json({ message: "Address added successfully.", address: savedAddress });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Address" });
  }
});

async function getAddress() {
  try {
    const address = await Address.find();
    return address;
  } catch (error) {
    throw error;
  }
}

app.get("/profile/address", async (req, res) => {
  try {
    const AddressList = await getAddress();
    if (AddressList.length > 0) {
      res.json(AddressList);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get address" });
  }
});

async function updateAddress(id, addressToBeUpdated) {
  try {
    const updateAddress = await Address.findByIdAndUpdate(
      id,
      addressToBeUpdated,
      { new: true }
    );
    return updateAddress;
  } catch (error) {
    throw error;
  }
}

app.put("/address/:addressId", async (req, res) => {
  try {
    const addressUpdated = await updateAddress(req.params.addressId, req.body);

    if (addressUpdated) {
      res.status(200).json({
        message: "Address updated successfully",
        address: addressUpdated,
      });
    } else {
      res.status(404).json({ message: "Failed to Updated Address" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Update address" });
  }
});

async function deleteAddress(addressId) {
  try {
    const addressDeleted = await Address.findByIdAndDelete(addressId);
    return addressDeleted;
  } catch (error) {
    throw error;
  }
}

app.delete("/profile/address/:addressId", async (req, res) => {
  try {
    const deletingAddress = await deleteAddress(req.params.addressId);
    if (!deletingAddress) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(200).json({
      message: "Address deleted successfully",
      address: deletingAddress,
    });
  } catch (error) {}
});

const PORT = 3010;

app.listen(PORT, () => {
  console.log("App is running on port", PORT);
});
