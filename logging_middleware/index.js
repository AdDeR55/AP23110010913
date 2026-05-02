import axios from 'axios';

// The API endpoint where the backend receives logs
const LOG_API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000/api/logs' 
  : '/api/logs';

export const Log = async (stack, level, pkg, message) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    package: pkg,
    message
  };

  
  
  try {
    
    if (typeof window !== 'undefined') {
      await axios.post(LOG_API_URL, logEntry).catch(() => {});
    } else {
      
      const format = `[${logEntry.timestamp}] [${level}] [${pkg}] [${stack}]: ${message}`;
      if (level === 'ERROR') {
        process.stderr.write(format + '\n');
      } else {
        process.stdout.write(format + '\n');
      }
    }
  } catch (error) {

  }
};
