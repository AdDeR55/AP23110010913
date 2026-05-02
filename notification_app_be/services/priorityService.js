import MinHeap from '../utils/MinHeap.js';

const TYPE_WEIGHTS = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

export const getTopNNotifications = (notifications, n = 10) => {
  const heap = new MinHeap();

  for (const notif of notifications) {
    const type = notif.type || notif.notification_type || 'Event';
    const weight = TYPE_WEIGHTS[type] || 0;
    const timestamp = new Date(notif.timestamp || notif.createdAt || 0).getTime();

    // Create a composite score: weight is most important, timestamp breaks ties
    // Since we want higher weights to have higher priority, and newer timestamps to have higher priority,
    // we construct a score where larger is better.
    // However, MinHeap keeps the SMALLEST element at the root.
    // So the item with the SMALLEST score gets removed when the heap exceeds size N.
    // We want to KEEP the largest scores. So the priorityScore should be directly proportional to weight/timestamp.
    
    // Using a large base for weight so it always outweighs timestamp differences
    const priorityScore = (weight * 10000000000000) + timestamp;

    const item = { ...notif, priorityScore };

    if (heap.size() < n) {
      heap.add(item);
    } else if (item.priorityScore > heap.peek().priorityScore) {
      heap.poll(); // Remove the smallest element
      heap.add(item); // Add the new larger element
    }
  }

  // The heap contains the Top N elements, but in Min-Heap order.
  // We need to extract them and sort them descending for the final output.
  const topN = heap.toArray();
  topN.sort((a, b) => b.priorityScore - a.priorityScore);

  // Remove the temporary priorityScore field
  return topN.map(item => {
    const { priorityScore, ...rest } = item;
    return rest;
  });
};
