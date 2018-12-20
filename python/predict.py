import nltk
import pickle
import re

nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem.snowball import RussianStemmer
import sys

ps = RussianStemmer()


def prepare_string(string):
    string = re.sub('[^\s\а-яА-Я|a-z|A-Z]|\n|•|\|', ' ', string)
    string = string.lower()
    string = string.split()
    string = [ps.stem(word) for word in string if not word in set(stopwords.words('russian'))]

    return ' '.join(string)


classifier = pickle.load(open('./python/finalized_model.sav', 'rb'))
cv = pickle.load(open('./python/cv.sav', 'rb'))

text = sys.argv[1]
print(text)
testtest = prepare_string(text)
testtest_cor = []
testtest_cor.append(testtest)
testtest = cv.transform(testtest_cor).toarray()
testtest_pred = classifier.predict(testtest)[0]

print(testtest_pred)
