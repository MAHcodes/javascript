import urllib.request
import requests
from bs4 import BeautifulSoup
# list = []

for i in range(1, 102):
    url = "https://www.umop.com/rps101/" + str(i) + ".htm"
    source = requests.get(url).text
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0'}
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')

    img = soup.find('img')["src"]
    link = "https://www.umop.com/rps101/"+ img
    name = soup.find("b").text.strip()

    file = open("js/rps101/images/" + name + "." + link.split(".")[-1], 'wb')
    file.write(urllib.request.urlopen(link).read())
    file.close()
    print(str(i) + "  " + name + " :  Done!")
#     list.append(name)
#     print(i)
# print(list)
