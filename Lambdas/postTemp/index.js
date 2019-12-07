const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

let conn = null;

const uri = 'mongodb+srv://rw_user:OcfQF2XrBkZXB6ub@cluster0-anwcj.mongodb.net/SabbyTracker?retryWrites=true&w=majority';

let jsonMessage = {};

const SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:637454239702:SabbyTracker";

exports.handler = async function(event, context, callback) {
  
  context.callbackWaitsForEmptyEventLoop = false;
  
  if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0
    });
    
    conn.model('temp', new mongoose.Schema({
      variable: String,
      day: String,
      month: String,
      year: String,
      hour: String,
      minute: String,
      second: String
    }), 'temp');
      
  }
  
  console.log('this is a reqs ',event);
  
  var data = event.variable;
  console.log(data);
  
  const M = conn.model('temp');
  
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 6);
  
  // a document instance
  var temp1 = new M({ variable: data, day: currentDate.getDate(), month: currentDate.getMonth() + 1, year: currentDate.getFullYear(), hour: currentDate.getHours(), minute: currentDate.getMinutes(), second: currentDate.getSeconds()});

  console.log('This is temp1: ', temp1);
  
  conn.collection('temp').insertOne(temp1);
  
  const doc = await M.findOne(temp1);
  console.log(doc);
  
  let response = {};
  
  if(doc != null){
    
    response = {
        statusCode: 200,
        body: {
          message: 'The data has been saved'
        }
    };
    
  }else{
    
    response = {
        statusCode: 200,
        body: {
          message: 'The data is NOT saved'
        }
    };
    
    
  }
  
  if(parseInt(event.variable) > 39 || parseInt(event.variable) < 20){
    console.log('\nit is inside the if!!\n');
    
    jsonMessage = {
      "default": "Ejemplo de mensaje alternativo",
      "GCM": "{\"notification\": { \"title\": \"¡Hay algo mal con tu bebe!\", \"body\": \"SU TEMPERATURA ES DE " + event.variable + "\" } }"
    };
    
    const params = {
      Message: JSON.stringify(jsonMessage),
      MessageStructure: 'json',
      Subject: "Test SNS From Lambda",
      TopicArn: SNS_TOPIC_ARN /* From step 2 */
    };
    
    sns.publish(params, callback);
  }
  
  return response;
};