import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


dataset = pd.read_csv('Data.csv')

#separating out indepndent variable and dependent variable
X = dataset.iloc[:,:-1].values
Y = dataset.iloc[:,3].values


#handling missing data by taking mean
from sklearn.preprocessing import Imputer
imputer = Imputer(missing_values='NaN',strategy='mean',axis=0)

imputer=imputer.fit(X[:,1:3])

X[:,1:3]=imputer.transform(X[:,1:3])

#print(X)


#Encoding Catogorical data: data which can divide into different group generally column without 
#numerical value. as machine learning deals with equation or number we have to Encode it .

from sklearn.preprocessing import LabelEncoder,OneHotEncoder
labelencoder_X= LabelEncoder()

X[:,0]= labelencoder_X.fit_transform(X[:,0])

#as coloumn converted into numerical value but its not actually a number so we have to divide Each category into one coloumn
onehotencoder = OneHotEncoder(categorical_features=[0])
X=onehotencoder.fit_transform(X).toarray()
#print X

labelencoder_Y = LabelEncoder()
Y=labelencoder_Y.fit_transform(Y)
#print Y


# spliting dataset into training  set and test set
from sklearn.model_selection import train_test_split
X_train,X_test,Y_train,Y_test = train_test_split(X,Y,test_size=0.2,random_state=0) 
#print(X_train)
#print(X_test)


#scaling feature as some coloumn have large number so that it doesnot fit in ecludian distance 
#we have to scale it. and  also algorithm converge much faster.

from sklearn.preprocessing import StandardScaler

sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

print(X_train)
print(X_test)








