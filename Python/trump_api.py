#flask server code for the API

import twitter_api as ta
import os
import time
from twython import Twython
from flask import Flask, send_file
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
app = Flask(__name__)

#use your api key here
APP_KEY = ''
APP_SECRET = ''
twitter = Twython(APP_KEY, APP_SECRET, oauth_version=2)
ACCESS_TOKEN = twitter.obtain_access_token()
twitter = Twython(APP_KEY, access_token=ACCESS_TOKEN)

@app.route('/last_trump_time')
def last_trump_time():
    return str(ta.last_trump_time(twitter))
    
@app.route('/get_trump_count')
def get_trump_count():
    return str(ta.get_trump_count(twitter))
    
@app.route('/trump_wc')
def trump_wc():
    file_mod_time = round(os.stat('trump_wc.png').st_mtime)
    last_time = round((int(time.time()) - file_mod_time) / 60, 2)
    if last_time>(60*24):
        ta.trump_wc(twitter) 
    return send_file('trump_wc.png', mimetype='image/png')
    

if __name__ == "__main__":
    app.run()