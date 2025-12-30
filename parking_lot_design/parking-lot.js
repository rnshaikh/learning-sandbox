const { Heap } =  require('heap-js');
const { Payment } = require('./payment');

class ParkingLot{

    /*
        Parking Lot class is used for parking related operations.
    */

    constructor(capacity){

        this.map = {}
        this.min_heap = []
        this.capacity = capacity
        this.payment = new Payment()

        for(let i=0; i<this.capacity; i++){
            Heap.heappush(this.min_heap, i)
        }
    }

    assign_slot = (car_no) =>{

        if (!this.min_heap.length){
            console.log("Sorry, Parking lot is full");
            return
        }

        let slot_no = Heap.heappop(this.min_heap)
        this.map[car_no] = slot_no
        console.log(`Allocated slot number: ${slot_no}`)
    }

    remove_slot = (car_no, hours)=>{

        if(! (car_no in this.map)){
            console.log("Sorry, Given car is not parked in parking lot.")
            return
        }

        let slot_no = this.map[car_no]
        Heap.heappush(this.min_heap, slot_no)
        let cost = this.payment.calculate_payment(hours)
        cost == -1 ? console.log("Invalid Hours") : console.log(`Registration No. ${car_no} from Slot ${slot_no} has left with Charge ${cost}`)
        delete this.map[car_no]
    }

    status = ()=>{
        console.log("SlotNo. Registration No.")
        for(const[car_no, slot_no] of Object.entries(this.map)){
            console.log(slot_no," ", car_no)
        }
    }

}

module.exports = {ParkingLot}