class Payment{

    /*
        Payment class is used for calculating payment/cost of ticket
    */

    constructor(){}

    calculate_payment=(hours) =>{

        if(hours <= 0){
            return -1
        }
        else if(hours>2){
            let cost = (hours-2) * 10;
            cost += 10;
            return cost
        }
        else{
            cost = 10
            return cost
        }

    }
}

module.exports = {Payment}
