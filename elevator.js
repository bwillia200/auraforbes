var Passenger = require('./passenger.js');
var EventEmitter = require('events');

passenger1 = new Passenger('Shunk Wugga', 5);
passenger2 = new Passenger('Bobo Dakes', 3);
passenger3 = new Passenger('JerryKramerGeorgeElaineNewman', 4);

var passenger = [
  passenger1,
  passenger2,
  passenger3
];

class Elevator extends EventEmitter {
  constructor(currentFloor, currentPassenger){
    super();
    this.currentFloor = 1;
    this.currentPassenger = {};
    this.unloadPassenger = function() {
      console.log(`${this.currentPassenger.name} got off at floor ${this.currentFloor}`);
      this.currentPassenger = {};
    };
    this.goUp = function() {
      console.log(`Elevator taking ${this.currentPassenger.name} up, at floor ${this.currentFloor}`);
      this.currentFloor++;
    };
    this.goDown = function() {
      console.log(`Elevator going down, currently at floor ${this.currentFloor}`);
      this.currentFloor--;
    };
  }
};

loadPassenger = new Elevator();

loadPassenger.on('up', (currentPassenger)=>{
  if (currentPassenger) {
    loadPassenger.currentPassenger = currentPassenger || {};
    console.log(loadPassenger.currentPassenger.name, 'got on the elevator. Presses close door button furiously');
  };

  loadPassenger.goUp();
  
  setTimeout(()=>{
      if(loadPassenger.currentFloor === loadPassenger.currentPassenger.desiredFloor) {
        loadPassenger.unloadPassenger();
        loadPassenger.emit('down')
      } else {
        loadPassenger.emit('up');
      }
  }, 1000);
});

loadPassenger.on('down', ()=>{
  loadPassenger.goDown();

  setTimeout(()=>{
    if(loadPassenger.currentFloor !== 1){
      loadPassenger.emit('down');
    } else {
      if (passenger.length > 0){
        loadPassenger.emit('up', passenger.pop());
      } else {
        console.log('No one needs the elevator right now.');
      }
    }
    }, 1000);
});

loadPassenger.emit('up', passenger.pop());

