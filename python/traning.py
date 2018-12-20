# Natural Language Processing

# Importing the libraries

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('концерты.csv')

# Cleaning the texts
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem.snowball import RussianStemmer
ps = RussianStemmer()


def prepare_string(string):
    string = re.sub('[^\s\а-яА-Я|a-z|A-Z]|\n|•|\|', ' ', string)
    string = string.lower()
    string = string.split()
    string = [ps.stem(word) for word in string if not word in set(stopwords.words('russian'))]

    return ' '.join(string)


corpus = []
for i in range(0, dataset.shape[0]):
    string = dataset['text'][i]
    string = prepare_string(string)

    corpus.append(string)


# Creating the Bag of Words model
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features = 1500)
X = cv.fit_transform(corpus).toarray()
y = dataset.iloc[:, 1].values


# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

# Fitting Naive Bayes to the Training set
from sklearn.linear_model import LogisticRegression
classifier = LogisticRegression(random_state = 0)
classifier.fit(X_train, y_train)


# Predicting the Test set results
y_pred = classifier.predict(X_test)


# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)
result = (cm[0][0]+cm[1][1])/X_test.shape[0] * 100

# Save model
import pickle

pickle.dump(classifier, open('finalized_model.sav', 'wb'))
pickle.dump(cv, open('cv.sav', 'wb'))
