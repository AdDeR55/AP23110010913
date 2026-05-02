import MinHeap from '../utils/MinHeap.js';

const TYPE_WEIGHTS = {
  'placement': 3,
  'result': 2,
  'event': 1
};

export const getTopNNotifications = (notifications, n = 10) => {
  const heap = new MinHeap();

  for (const notif of notifications) {
    let type = notif.type || notif.notification_type || 'event';
    type = type.toLowerCase();
    const weight = TYPE_WEIGHTS[type] || 0;
    const timestamp = new Date(notif.timestamp || notif.createdAt || 0).getTime();

    
    const priorityScore = (weight * 10000000000000) + timestamp;

    const item = { ...notif, priorityScore };

    if (heap.size() < n) {
      heap.add(item);
    } else if (item.priorityScore > heap.peek().priorityScore) {
      heap.poll(); 
      heap.add(item); 
    }
  }

  
  const topN = heap.toArray();
  topN.sort((a, b) => b.priorityScore - a.priorityScore);

  // Remove the temporary priorityScore field
  return topN.map(item => {
    const { priorityScore, ...rest } = item;
    return rest;
  });
};
