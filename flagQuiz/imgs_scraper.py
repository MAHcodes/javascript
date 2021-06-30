import urllib.request
import requests
import json

url = "https://restcountries.eu/rest/v2/all"
source = requests.get(url).text
headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0'}
page = requests.get(url, headers=headers)

countries = json.loads(source)
counter = 1

for i in countries:
    img = i["flag"]
    name = i["name"]

    file = open("./" + name + "." + img.split(".")[-1], "wb")
    file.write(urllib.request.urlopen(img).read())
    file.close()

    print(str(counter) + ". Done: " + name)
    counter += 1
