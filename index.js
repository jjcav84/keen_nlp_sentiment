/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const Language = require('@google-cloud/language');
// utilities requied to promisify Mixpanel.track method
const util = require('util');
// Instantiates a client
const language = new Language.LanguageServiceClient();
// Post Message, Score, Magnitude to Keen
var Mixpanel = require('mixpanel');
// initialize Mixpanel instance with token key and http and https protocols allowed
var mixpanel = Mixpanel.init('b63d1406117667b9b275d70c9839869b');
// wrap mixpanel tracking with a promise for background function to handle async http function req, res objects
var trackAsync = util.promisify(mixpanel.track);
exports.anthemcNLP = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  // this handles CORS preflight check
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }
  // this handles cors for the regular request
  res.set('Access-Control-Allow-Origin', '*');
  if (req.body.review_text == undefined) {
    res.status(400).send("No review text provided");
    return;
  }
  // Ingest the review_text and assign to the constant 'document'
  const document = {
    content: req.body.review_text,
    type: 'PLAIN_TEXT',
  };
  // Google's NLP Language API request is analyzing the text and assigning Sentiment and Magnitude
  language
    .analyzeSentiment({
      document: document
    })
    // store Sentiment Analysis results as an array
    .then(results => {
      const sentiment = results[0].documentSentiment;
      console.log(`Document sentiment:`);
      console.log(`  Score: ${sentiment.score}`);
      console.log(`  Magnitude: ${sentiment.magnitude}`);
      res.setHeader('Content-Type', 'application/json');
      // results object with keys and values from sentiment array
      var resultObj = {};
      resultObj.score = sentiment.score;
      resultObj.magnitude = sentiment.magnitude;
      // Record the "FormResult" event data with 'text', 'score', and 'magnitude' properties to Mixpanel
      trackAsync('FormResult', {
        text: req.body.review_text,
        score: sentiment.score,
        magnitude: sentiment.magnitude
      })
        // Handle AJAX success response for trackAsync
        .then(() => {
          // res.setHeader('Content-Type', 'application/json');
          res.json({ message: "ok" });
          return;
        })
        // Handle AJAX error response for trackAsync
        .catch(err => {
          res.status(500).send(`Error in invoking Mixpanel API: ${err}`);
          return;
        });
    })
    // Handle error response for NLP API call
    .catch(err => {
      res.status(500).send(`Error in invoking NLP API: ${err}`);
      return;
    });
}