# keen-nlp-function
Keen's and Google's Natural Language Pre-Processing

Together we will walk through a project that focuses on building a feedback loop with Keen as our data store and query engine, and Google Cloud’s Natural Language for pre-processing. This application will ingest a feedback response, send it through a serverless function which will enrich feedback data with a score. This score will consist of a magnitude and sentiment analysis done by Google’s machine learning “Natural Language Processing” api. This can prove to be colossally useful in cases where a business is aiming to understand if customers are enjoying their experience. That experience could be the result of a cool new software application, maybe a healthcare app that enables patients to tell you about their latest office visit (the example we’ve built below). It’s possible to track a particular customer’s progress along some series of onboarding steps, or maybe you’re looking to onboard new hires and review the impact of training material...the possibilities are endless.

First we're creating a feedback form that turns a string of feedback to json to be processed by our cloud function.
Second, we're attaching a sentiment analysis and magnitude score to the the feedback.
Last that review_text event is stored in Keen which can be viewed in the "Streams" tab of your Keen dashboard.
