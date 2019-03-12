# keen-nlp-function
Keen's and Google's Natural Language Pre-Processing

Together we will walk through a project that focuses on building a feedback loop with Keen as our data store and query engine, and Google Cloud’s Natural Language for pre-processing. This application will ingest a feedback response, send it through a serverless function which will enrich feedback data with a score. This score will consist of a magnitude and sentiment analysis done by Google’s machine learning “Natural Language Processing” api. This can prove to be colossally useful in cases where a business is aiming to understand if customers are enjoying their experience. That experience could be the result of a cool new software application, maybe a healthcare app that enables patients to tell you about their latest office visit (the example we’ve built below). It’s possible to track a particular customer’s progress along some series of onboarding steps, or maybe you’re looking to onboard new hires and review the impact of training material...the possibilities are endless.

We're attaching a sentiment analysis and magnitude score.  
