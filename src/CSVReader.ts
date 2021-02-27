const Papa = require("papaparse");
const { StringStream } = require("scramjet");
const request = require("request");


class CSVReader{
    public async getColumns(url:string){
        let columns : string[];
        const req = request
        .get(url)
        .pipe(new StringStream());
       
        return new Promise((resolve, reject) => {
            Papa.parse(req, {
              header: true,
              complete (results, file) {
                resolve(results)
              },
              error (err, file) {
                reject(err)
              }
            })
          })
          
          
        

    }
}

async function main() {
    try {
      var t = new CSVReader();
      const data:any = await t.getColumns("https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv")
      // do something with the data...
      
      console.log("Columns : "+data.meta.fields+"\n");
      console.log("Size: "+ data.meta.cursor+" Bytes \n");
      console.log("Rows : "+ data.data.length + "\n");
    } catch (err) {
      console.error('Could not parse String Stream', err)
    }
  }
main();



