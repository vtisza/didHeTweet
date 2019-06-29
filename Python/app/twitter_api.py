from twython import Twython
import time
from os import path
from matplotlib.pyplot import imread
import numpy as np
import matplotlib.pyplot as plt
import random
from palettable.colorbrewer.sequential import Blues_9, YlGnBu_9
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator


def last_trump_time(twitter):
    created=twitter.get_user_timeline(screen_name="realdonaldtrump", count=1)[0]['created_at']
    creation_time=time.strptime(created, "%a %b %d %H:%M:%S %z %Y")
    timediff=(time.time()-time.mktime(creation_time))/60
    return('{{"time": "{}", "in_five_min": "{}", "in_ten_min": "{}", "last_hour":"{}","today":"{}"}}'.
        format(created,str(timediff<5),str(timediff<10),str(timediff<60),str(timediff<1440)))

def get_trump_count(twitter, name="realdonaldtrump"):
    return twitter.show_user(screen_name=name)["statuses_count"]

def color_func(word, font_size, position, orientation, random_state=None, **kwargs):
    return tuple(YlGnBu_9.colors[random.randint(2,8)])

def trump_wc(twitter):
    d = path.dirname(__file__)
    tweets=twitter.get_user_timeline(screen_name="realdonaldtrump", count=20000)
    tweets=" ".join([tweet['text'] for tweet in tweets])
    tweets = " ".join([word for word in tweets.split()
                            if 'http' not in word
                                and not word.startswith('@')
                                and word != 'RT'
                                and 'imp' not in word
                                and word != '&'
                                and word != 'amp'
                                and word != '&amp'
                            ])
    trump_mask = imread(path.join(d, "wh1.png"), 0)
    stopwords = set(STOPWORDS)
    wc = WordCloud(background_color="black", max_words=1750, mask=trump_mask,
                   stopwords=stopwords)
    # generate word cloud
    wc.generate(tweets)
    wc.recolor(color_func=color_func, random_state=22)
    # store to file
    wc.to_file(path.join(d, "trump_wc.png"))
