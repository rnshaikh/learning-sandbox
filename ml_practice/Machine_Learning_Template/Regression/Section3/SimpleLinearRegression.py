import numpy as np
import pandas as pd
import matplotlib.pyplot as plt



dataset = pd.read_csv('Salary_Data.csv')

X = dataset.iloc[:,:-1].values
Y = dataset.iloc[:,1].values

from sklearn.model_selection import train_test_split


X_train,X_test,Y_train,Y_test = train_test_split(X, Y , test_size = 0.3333,random_state = 0)

"""print X_test
print X_train
print "X_test:",X_test
print "Y_train:",Y_train
print "Y_test:",Y_test
"""

#fitting simple linear regression to training set 
from sklearn.linear_model import LinearRegression

regressor = LinearRegression()

regressor.fit(X_train,Y_train)

#predicting test set results

Y_predict=regressor.predict(X_test)


print(Y_predict,"--------",Y_test)


#visualizing Test Set Results

plt.scatter(X_test,Y_test,color='red')
plt.plot(X_test,Y_predict,color='blue')

plt.title("Salary Vs Experience ")
plt.xlabel("Years Of Experience")
plt.ylabel("Salary")

plt.show()




