import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


dataset = pd.read_csv('50_Startups.csv')

X = dataset.iloc[:,:-1].values

y = dataset.iloc[:,4].values

#print X
#print y

from sklearn.preprocessing import LabelEncoder,OneHotEncoder

labelencoder_x = LabelEncoder()

X[:,3] = labelencoder_x.fit_transform(X[:,3])

onehotencoder = OneHotEncoder(categorical_features=[3])

X = onehotencoder.fit_transform(X).toarray()

#print X
# avoding dummy variable trap its taken care by most of the library

X = X[:,1:]

from sklearn.model_selection import train_test_split

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=0)


print(X_train)
print("y train")
print(y_train)
print("X_test")
print(X_test)
print("Y_test")
print(y_test)



