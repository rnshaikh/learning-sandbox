
const readLine = require('readline');
const { FileManager } = require('./file-processing');
const { ParkingLot } = require('./parking-lot');

let question = async(query) =>{
    return new Promise((resolve, reject)=>{
        try{
            input.question(query, resolve)
        }
        catch(err){
            reject(err);
        }
    });
}

let input = readLine.createInterface({
    input : process.stdin,
    output: process.stdout
});


class ProcessCommand{

     /*
        ProcessCommand class is used for processing commands 
    */

    constructor(){
        this.parking_lot = null;
    }

    process = (content) =>{
        try{

            for(let i = 0 ; i<content.length; i++){

                let comArray = content[i].split(" ");
    
                if(!comArray.length){
                    throw new Error("Invalid Command");
    
                }
                else if(comArray[0] == "create" && comArray.length == 2 && parseInt(comArray[1])){
    
                    if(this.parking_lot){
                        throw new Error("Invalid Command");
                    }
                    this.parking_lot = new ParkingLot(parseInt(comArray[1]));
    
                } 
                else if(comArray[0] == "park" && comArray.length == 2){
                    this.parking_lot.assign_slot(comArray[1])
                }
    
                else if(comArray[0] == "leave" && comArray.length == 3 && parseInt(comArray[2])){
                    this.parking_lot.remove_slot(comArray[1], parseInt(comArray[2]))
                }
                else if(comArray[0] == "status" && comArray.length == 1){
                    this.parking_lot.status()
                }
                else{
                    throw new Error("Invalid Command");
                }
            }
        }
        catch(err){
            console.log(`Error: proccessing commands: ${err.message}`)
            throw err;
        }
        
    }
}


async function main(){
    outer:while(true){
        try{

            let manager = null;
            let resp = await question(`Enter A Choice 1.Enter File Path 2.Exit: \n`);
            resp = parseInt(resp);
            let fileName = null;
            switch(resp){
        
                case 1: fileName = await question("Enter file path: \n");
                        manager = new FileManager(fileName)
                        content = await manager.readFile();
                        commandObj = new ProcessCommand();
                        commandObj.process(content);
                        break;

                case 2: case 2: console.log("Bye.")
                        break outer;

                default: console.log("invalid choice");
                        break outer;
            }

        }
        catch(err){
            console.log(`Error: main function: ${err.message}`);
            break;     
        } 
    }
    process.exit()
}
main()
