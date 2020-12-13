import requests

with requests.Session() as s:
    s.get("https://webapp4.asu.edu/catalog/classlist?t=2211&s=MAT&n=265&hon=F&promod=F&c=ASUONLINE&e=open&page=1")
    c = s.get("https://webapp4.asu.edu/catalog/myclasslistresults?init=false&t=2211&s=MAT&n=265&hon=F&promod=F&c=ASUONLINE&e=open&page=1&nopassive=true")
    print(c.text)
