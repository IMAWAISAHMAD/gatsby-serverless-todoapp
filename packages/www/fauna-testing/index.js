
require('dotenv').config();

const faunadb = require("faunadb");

const q = faunadb.query;

const client = new faunadb.Client({secret:process.env.FAUNA_DB})

async function run() {
  try{
   /* const results = await client.query(
      q.Create(q.Collection("todos"), {
        data: {
          text: "my todo!second",
          done: false,
          owner: "user-test-2"
        }
      })
    );
    console.log(results.ref.id); */
    /* const results = await client.query(
      q.Update(q.Ref(q.Collection("todos"),"289951794529829383"),{
        data:{
          done:false
        }
      })
    )
    console.log(results); */
    const results = await client.query(
      q.Paginate(q.Match(q.Index("todos_by_user"),"user-test-1"))
    );
    console.log(results);
  }catch(err){
    console.log('Error:',err);
  }
}
  
  run();   