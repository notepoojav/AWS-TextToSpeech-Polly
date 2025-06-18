const {PollyClient, SynthesizeSpeechCommand} = require("@aws-sdk/client-polly");
const {S3Client} = require("@aws-sdk/client-s3");
const {Upload} = require("@aws-sdk/lib-storage");

const polly = new PollyClient({});
const s3 = new S3Client({});

exports.handler = async (event) => {

  try{

    const text = event.text;

    //validation for text input
    if(!text || text.trim() === ""){
      return{
        statusCode: 400,
        body: JSON.stringify({message: "Text input is required"}),
      };
    }
      

    //send text to Polly and ask it to turn it into speech
    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna',
    };

    //save this speech to s3

    //1.Synthesize speech using Polly
    const command = new SynthesizeSpeechCommand(params);
    const data = await polly.send(command);

    //2.Generate a unique name for the audio file
    const key = `audio-${Date.now()}.mp3`;
    console.log(key);

    //3.Use Upload to stream the audio file to S3
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: data.AudioStream,
        ContentType: 'audio/mpeg',
      },
    });

    //4.wait for upload to complete
    await upload.done();

    return{
      statusCode: 200,
      body: JSON.stringify({message: `Audio file stored as ${key}`}),
  };
} catch (error) {
  console.error("Error:", error);
  return{
    statusCode: 500,
    body: JSON.stringify({message: "Error synthesizing speech"}),
  };

  }
};
