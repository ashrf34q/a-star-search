"use strict";

class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

//   Priority Queue
class Priority_Queue {
  constructor() {
    this.items = [];
  }

  //   Add the element to its corresponding spot in the priority queue based on its priority
  enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority);
    let lowestPr = true;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > queueElement.priority) {
        // Correct location found, so enqueue
        this.items.splice(i, 0, queueElement);
        lowestPr = false;
        break;
      }
    }

    if (lowestPr) {
      this.items.push(queueElement);
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  //   removes and returns the highest priority element
  dequeue() {
    if (this.isEmpty()) throw new Error("Underflow");
    return this.items.shift();
  }

  //   returns highest priority element without removing it from the queue
  front() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.items[0];
  }

  printPriorityQueue() {
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i].element + " ");
    }
  }
}

let priorityQueue = new Priority_Queue();

priorityQueue.enqueue("A", 5);
priorityQueue.enqueue("B", 4);
priorityQueue.enqueue("D", -2);
priorityQueue.enqueue("C", 2);
priorityQueue.enqueue("E", 3);

priorityQueue.printPriorityQueue();
