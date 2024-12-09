const express = require("express");
const httpProxy = require("http-proxy");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cache = require("node-cache");

// Create Express app
const app = express();
const proxy = httpProxy.createProxyServer();

// Service registry (in production, use service discovery)
const serviceRegistry = {
  products: "http://localhost:3001",
  cart: "http://localhost:3002",
  users: "http://localhost:3003",
  orders: "http://localhost:3004",
  inventory: "http://localhost:3005",
  shipping: "http://localhost:3006",
};

// Initialize cache
const apiCache = new cache({ stdTTL: 600 }); // 10 minutes cache

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Logging middleware
app.use(morgan("combined"));

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Cache middleware
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = apiCache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }
  next();
};

// Route handler for product service
app.use("/api/products", cacheMiddleware, limiter, (req, res) => {
  proxy.web(req, res, { target: serviceRegistry.products });
});

// Route handler for cart service (requires authentication)
app.use("/api/cart", authenticate, limiter, (req, res) => {
  proxy.web(req, res, { target: serviceRegistry.cart });
});

// Route handler for composite orders endpoint
app.get("/api/orders/:orderId", authenticate, async (req, res) => {
  try {
    // Fetch order details
    const orderResponse = await fetch(
      `${serviceRegistry.orders}/orders/${req.params.orderId}`
    );
    const order = await orderResponse.json();

    // Fetch shipping details
    const shippingResponse = await fetch(
      `${serviceRegistry.shipping}/shipments/${order.shippingId}`
    );
    const shipping = await shippingResponse.json();

    // Combine responses
    res.json({
      ...order,
      shipping,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching order details" });
  }
});

// Error handling
proxy.on("error", (err, req, res) => {
  res.status(500).json({ error: "Proxy error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
