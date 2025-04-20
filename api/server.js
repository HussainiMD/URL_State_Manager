const jsonServer = require('json-server');
const fs = require('fs');
const crypto = require('crypto'); // For hashing passwords
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const DB_FILE = './db.json';
const USERS_FILE = './users.json'; // File to store user data
const TOKEN_SECRET = 'mock_secret'; // Mock secret for token generation

// Helper to read/write user data
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8') || '[]');
const writeUsers = (users) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

const readDataStore = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8') || {});

// Utility to create mock tokens
const generateToken = (username) => 
  crypto.createHmac('sha256', TOKEN_SECRET).update(username).digest('hex');

server.use(middlewares);
server.use(jsonServer.bodyParser); // Important for POST data

// REGISTER Endpoint (Saves credentials)
server.post('/auth/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const users = readUsers();
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPwd = crypto.createHmac('sha256', TOKEN_SECRET).update(password).digest('hex');
  users.push({ username, password: hashedPwd });
  writeUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

// SIGN-IN Endpoint (Verifies credentials)
server.post('/auth/signin', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const users = readUsers();
  const hashedPwd = crypto.createHmac('sha256', TOKEN_SECRET).update(password).digest('hex');
  const user = users.find(user => user.username === username && user.password === hashedPwd);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = generateToken(username);
  res.json({ access_token: token, token_type: 'Bearer', expires_in: 3600 });
});

// PROTECTED ROUTE Middleware
server.use((req, res, next) => {
  if (req.path.startsWith('/protected')) {
    const authHeader = req.headers.authorization;    
    if (!authHeader || authHeader.split(' ')[1] !== generateToken('testuser')) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  }
  next();
});

// Protected Route Example
server.get('/posts', (req, res) => {
  const data = readDataStore();  
  res.json(data?.posts || []);
  /*res.json([
    { id: 1, title: 'Private Post 1', content: 'Confidential content here.' },
    { id: 2, title: 'Private Post 2', content: 'More secret content.' }
  ]);*/
});

// Public Route Example
server.get('/tags', (req, res) => {
  const data = readDataStore();  
  res.json(data?.tags || []);  
});


server.use(router);
server.listen(3000, () => console.log('Mock API running on port 3000'));
