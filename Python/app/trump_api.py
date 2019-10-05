#flask server code for the API

import twitter_api as ta
import os
import time
from twython import Twython
from flask import Flask, send_file
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
app = Flask(__name__)

#use your api key here
APP_KEY = os.environ["API_KEY"]
APP_SECRET = os.environ["APP_SECRET"]
twitter = Twython(APP_KEY, APP_SECRET, oauth_version=2)
ACCESS_TOKEN = twitter.obtain_access_token()
twitter = Twython(APP_KEY, access_token=ACCESS_TOKEN)

#Last tweet time API
@app.route('/last_trump_time')
def last_trump_time():
    return str(ta.last_trump_time(twitter))
    
#Count API
@app.route('/get_trump_count')
def get_trump_count():
    return str(ta.get_trump_count(twitter))

#Wordcloud API    
@app.route('/trump_wc')
def trump_wc():
    ta.trump_wc(twitter) 
    return send_file('trump_wc.png', mimetype='image/png')

if __name__ == "__main__":
    port = os.environ.get('PORT', 5500)
    app.run(host='0.0.0.0', port=port)