"""
The stuff I'm using to scrape the intenet
"""
import json
import time
import os
import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

options = webdriver.FirefoxOptions()
options.headless = True

CURR_DIR = os.path.dirname(os.path.realpath(__file__))

def scrape(code, num, store_in_file, end="\n"):
    filepath      = CURR_DIR + "/geckodriver/geckodriver"
    pre_url       = f"https://webapp4.asu.edu/catalog/classlist"
    url           = f"https://webapp4.asu.edu/catalog/classlist?t=2211&s={code}&n={num}&hon=F&promod=F&c=ASUONLINE&e=open&page=1"
    driver        = webdriver.Firefox(executable_path=filepath, options=options)
    driver.get(pre_url)
    time.sleep(10)
    driver.get(url)
    WebDriverWait (driver, 10).until(EC.presence_of_element_located((By.ID, "informal")))
    catalog_list  = driver.find_element_by_id('CatalogList')
    tbody         = catalog_list.find_element_by_tag_name("tbody")
    trs           = tbody.find_elements_by_tag_name("tr")
    print(url, end)

    with open(store_in_file, "w") as f:
        vals = []
        names = ["Course ID", "Course Name", "Course Number", 
                 "Teacher",   "Course Days", "Course Start Time", 
                 "Course End Time", "Course Location", "Start/End dates", 
                 "Course Hours", "Occupado", "IDC1", "IDC2"]
        for tr in trs:
            course = {}
            tds = tr.find_elements_by_tag_name("td")
            for name, td in zip(names, tds): 
                course[name] = td.text.strip()
            vals.append(course)

        json.dump(vals, f, indent=2)
    driver.close()


if __name__ == "__main__":
    courses = ["ASU 101","ENG 101","ENG 107",
               "FSE 100","CSE 110","CSE 205",
               "MAT 265","SER 232","MAT 266",
               "MAT 243","CSE 230","CSE 240",
               "MAT 267","MAT 275","SER 222",
               "EGR 104","EGR 280","SER 216",
               "MAT 343","SER 315","SER 334",
               "PHY 121","PHY 122","SER 321",
               "SER 316","SER 335","SER 415",
               "SER 322","SER 416","SER 401"]

    do_after = "SER 315"
    doing = False
    for i, course in enumerate(courses):
        if course == "SER 315": doing = True
        if not doing: continue
        print(i + 1, "out of", len(courses), course, end=" : ")
        code, num = course.split(" ")
        try:
            scrape(code, num, f"{code}_{num}_details.json")
        except:
            pass

