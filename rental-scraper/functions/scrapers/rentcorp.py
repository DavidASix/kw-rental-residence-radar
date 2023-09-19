import requests
import re
from bs4 import BeautifulSoup


cities = ['waterloo', 'copy-of-kitchener-old']
city = cities[0]

baseUrl = f"https://www.rentcorp.ca/{city}"
