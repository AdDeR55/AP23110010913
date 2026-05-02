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


app.post('/api/logs', (req, res) => {
  const { stack, level, package: pkg, message, timestamp } = req.body;
  
  const format = `[${timestamp || new Date().toISOString()}] [${level}] [${pkg}] [${stack}]: ${message}`;
  if (level === 'ERROR') {
    process.stderr.write(format + '\n');
  } else {
    process.stdout.write(format + '\n');
  }
  res.status(200).send({ success: true });
});


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


app.get('/api/priority', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  Log('server.js', 'INFO', 'Backend', `Incoming request for /api/priority top ${limit}`);
  
  try {
    
    const response = await axios.get(EXTERNAL_API, {
      headers: { Authorization: req.headers.authorization },
      params: { limit: 100, page: 1 } // Fetching a larger dataset to sort
    });

    let notifications = [];
    if (Array.isArray(response.data)) {
      notifications = response.data;
    } else if (response.data && Array.isArray(response.data.notifications)) {
      notifications = response.data.notifications;
    } else if (response.data && Array.isArray(response.data.data)) {
      notifications = response.data.data;
    }

    const topN = getTopNNotifications(notifications, limit);
    res.json(topN);

  } catch (error) {
    Log('server.js', 'WARN', 'Backend', `Error fetching priority notifications: ${error.message}. Falling back to mock data.`);
    
    const mockNotifications = [
      { id: 'm1', type: 'event', message: 'Campus Tech Fair starting soon!', timestamp: new Date().toISOString() },
      { id: 'm2', type: 'result', message: 'Midterm grades posted.', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'm3', type: 'placement', message: 'Google recruitment drive.', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: 'm4', type: 'event', message: 'Hackathon registration open.', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: 'm5', type: 'placement', message: 'Microsoft interview scheduled.', timestamp: new Date(Date.now() - 172800000).toISOString() }
    ];

    const topN = getTopNNotifications(mockNotifications, limit);
    res.json(topN);
  }
});

app.listen(PORT, () => {
  Log('server.js', 'INFO', 'Backend', `Server is running on port ${PORT}`);
});
