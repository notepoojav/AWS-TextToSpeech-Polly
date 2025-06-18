This serverless project leverages AWS Lambda, Amazon Polly, and Amazon S3 to convert input text into speech. The core functionality is handled through an AWS Lambda function that receives text input (currently via test events), synthesizes speech using Amazon Polly, and stores the resulting audio file in S3.

💡 Features
- AWS Lambda function to process text input
- Speech generation using Amazon Polly (currently using the voice "Joanna")
- Utilizes PollyClient and SynthesizeSpeechCommand from AWS SDK
- Streams the audio output directly to an S3 bucket using Upload
- Generates uniquely named audio files for each input
- Implements basic error handling and logging
- IAM roles configured to securely manage service permissions

Work in Progress
- Building a web interface to allow users to input text and play the resulting speech
- Plan to integrate API Gateway for HTTP access to the Lambda function
- Will host the complete solution to demonstrate full serverless architecture

