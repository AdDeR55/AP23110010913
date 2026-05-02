# Notification System Design Document

## System Architecture Overview
The system follows a typical 3-tier architecture:
1. **Frontend (notification_app_fe)**: Built with React (Vite) and Material UI. It provides a responsive, interactive UI with glassmorphism aesthetics and handles user state (read/unread).
2. **Backend (notification_app_be)**: A lightweight Node.js/Express service. It acts as an API Gateway, proxying requests to the core external service and handling complex data processing (Stage 1 Top N logic) so the client doesn't have to load massive datasets.
3. **Core API**: The external `evaluation-service` providing the raw notification data.
4. **Logging Middleware**: A shared library used by both Frontend and Backend to standardize logging across the entire stack.

## Continuous Notifications Handling
In a production scenario, continuous notifications are handled effectively through pagination (implemented on the 'All Notifications' page) and dynamic polling or WebSockets. Currently, the system leverages RESTful pagination (`page`, `limit`) to ensure continuous incoming data doesn't overwhelm the browser's DOM. The React context manages memory efficiently by storing only the current view and read states.

## Priority Algorithm & Min Heap Approach
The Priority Inbox requires calculating the Top 10 notifications based on two factors:
1. **Type Weight**: Placement (3) > Result (2) > Event (1).
2. **Recency**: Newer timestamps have higher priority.

### The Algorithm
We calculate a `priorityScore` for each notification:
`priorityScore = (Weight * LargeConstant) + TimestampMillis`

This ensures that a higher-weight type will *always* outrank a lower-weight type regardless of recency, and recency is used strictly as a tie-breaker within the same type.

### Why Min Heap?
To find the Top $N$ elements out of $M$ total elements, sorting the entire array takes $O(M \log M)$ time. 
By using a **Min Heap** of size $N$, we can achieve this in $O(M \log N)$ time, which is significantly faster and uses $O(N)$ space.

1. We insert the first $N$ elements into the Min Heap. The heap is ordered by `priorityScore` such that the *smallest* priority score is always at the root.
2. For every subsequent element, if its score is *greater* than the root's score, we `poll()` the root (discarding the smallest of the top group) and `add()` the new element.
3. At the end of the iteration, the Min Heap contains exactly the Top $N$ elements.

We explicitly implemented this without external algorithms/libraries to ensure strict compliance with constraints.
