import requests
import json
import matplotlib.pyplot as plt
import numpy as np

URL = 'http://localhost:3000/labirinto-genetico/'

payload =  {'labirinto': 3} 

r = requests.post(url = URL, json = payload) 
data = r.json() 
plt.plot(data['nGeracoes'], data['fitnessGeral'])
plt.plot(data['nGeracoes'], data['fitnessDoMeio'])
plt.plot(data['nGeracoes'], data['mediaFitness'])
plt.ylabel('Fitness')
plt.xlabel('Gerações')
plt.show()

a =  [ data['fitnessGeral'], data['fitnessDoMeio'], data['mediaFitness'] ]
np.savetxt("M3.csv", a, delimiter=",")

print(data['elite'])