#!/usr/bin/env python3
from flask import Flask
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route("/steal/<classname>/<classcode>")
def main(classname, classcode):
    link  = f"https://webapp4.asu.edu/catalog/myclasslistresults?t=2211&s={classname}&n={classcode}&hon=F&promod=F&c=ASUONLINE&e=all&page=1"
    data  = requests.get(link)
    print(link)
    # data2 = requests.get("https://webapp4.asu.edu/catalog/myclasslistresults?t=2211&s={classname}&n={classcode}&hon=F&promod=F&c=ASUONLINE&e=open&ses=B&page=1")
    # data3 = requests.get("https://webapp4.asu.edu/catalog/myclasslistresults?t=2211&s={classname}&n={classcode}&hon=F&promod=F&c=ASUONLINE&e=open&ses=C&page=1")
    soup  = BeautifulSoup(data.text, "html.parser")
    # soup2 = BeautifulSoup(data2.text, "html.parser")
    # soup3 = BeautifulSoup(data3.text, "html.parser")
    print(soup)
    rows = soup.select("tr")
    print(rows)
    sessionA = []

    for row in rows[1:]:
        seatsOpenStrings = [*row.select(".availableSeatsColumnValue")[0].strings]
        seatsOpen = seatsOpenStrings[4]
        totalSeats = seatsOpenStrings[11]
        values = {
            "title": [*row.select(".titleColumnValue")[0].select("div")[0].strings][1].strip(),
            "class number": [*row.select(".classNbrColumnValue")[0].strings][2].strip(),
            "instructor": row.select(".instructorListColumnValue")[0].select(".nametip")[0]['title'].split("|")[1],
            "seats": {
                "open": seatsOpen,
                "total" : totalSeats
             }
        }

        sessionA.append(values)
    print(sessionA)
    return "something"

if __name__ == "__main__":
    app.run(debug=True)
