import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { getTopNNotifications } from './services/priorityService.js';
import { Log } from '../logging_middleware/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const EXTERNAL_API = 'http://20.207.122.201/evaluation-service/notifications';

// POST /api/logs
// Endpoint for the frontend to send logs through the middleware
app.post('/api/logs', (req, res) => {
  const { stack, level, package: pkg, message, timestamp } = req.body;
  // Print it directly since Log middleware calls this endpoint if it's in FE
  const format = `[${timestamp || new Date().toISOString()}] [${level}] [${pkg}] [${stack}]: ${message}`;
  if (level === 'ERROR') {
    process.stderr.write(format + '\n');
  } else {
    process.stdout.write(format + '\n');
  }
  res.status(200).send({ success: true });
});

// GET /api/notifications
// Proxies to the external service
app.get('/api/notifications', async (req, res) => {
  Log('server.js', 'INFO', 'Backend', `Incoming request for /api/notifications with query ${JSON.stringify(req.query)}`);
  
  try {
    const response = await axios.get(EXTERNAL_API, {
      headers: {
        Authorization: req.headers.authorization
      },
      params: req.query
    });
    
    res.json(response.data);
  } catch (error) {
    Log('server.js', 'ERROR', 'Backend', `Error fetching from external API: ${error.message}`);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

// GET /api/priority
// Implements Stage 1 logic: Fetch all and compute Top 10 using MinHeap
app.get('/api/priority', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  Log('server.js', 'INFO', 'Backend', `Incoming request for /api/priority top ${limit}`);
  
  try {
    // Fetch a large chunk to calculate top N.
    // In a real scenario, this would query a database.
    const response = await axios.get(EXTERNAL_API, {
      headers: { Authorization: req.headers.authorization },
      params: { limit: 100, page: 1 } // Fetching a larger dataset to sort
    });

    let notifications = [];
    if (Array.isArray(response.data)) {
      notifications = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      notifications = response.data.data;
    }

    // Compute Top N using our custom MinHeap implementation
    const topN = getTopNNotifications(notifications, limit);
    res.json(topN);

  } catch (error) {
    Log('server.js', 'ERROR', 'Backend', `Error fetching priority notifications: ${error.message}`);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  Log('server.js', 'INFO', 'Backend', `Server is running on port ${PORT}`);
});
