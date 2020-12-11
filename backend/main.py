#!/usr/bin/env python3
from flask import Flask
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route("/steal/<classname>/<classcode>")
def main(classname, classcode):
    data  = requests.get(f"https://webapp4.asu.edu/catalog/myclasslistresults?t=2211&s={classname}&n={classcode}&hon=F&promod=F&c=ASUONLINE&e=open&ses=A&page=1")
    data2 = requests.get("https://webapp4.asu.edu/catalog/myclasslistresults?t=2211&s={classname}&n={classcode}&hon=F&promod=F&c=ASUONLINE&e=open&ses=B&page=1")
    data3 = requests.get("https://webapp4.asu.edu/catalog/myclasslistresults?t=2211&s={classname}&n={classcode}&hon=F&promod=F&c=ASUONLINE&e=open&ses=C&page=1")
    soup  = BeautifulSoup(data.text, "html.parser")
    print(data.text)
    print(data2.text)
    print(data3.text)
    return 

if __name__ == "__main__":
    app.run(debug=True)
