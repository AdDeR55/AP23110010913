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

  // Replace console.log entirely as per requirements
  // However, we still output to stdout/stderr in the backend context if needed,
  // but since this is a shared middleware, we'll try to send it via API.
  
  try {
    // If we are in the browser (Frontend), send to backend API
    if (typeof window !== 'undefined') {
      await axios.post(LOG_API_URL, logEntry).catch(() => {});
    } else {
      // If we are in the Node context (Backend), we just format and print it
      // In a real prod environment this would write to a file or external service
      const format = `[${logEntry.timestamp}] [${level}] [${pkg}] [${stack}]: ${message}`;
      if (level === 'ERROR') {
        process.stderr.write(format + '\n');
      } else {
        process.stdout.write(format + '\n');
      }
    }
  } catch (error) {
    // Fallback if network fails
  }
};
