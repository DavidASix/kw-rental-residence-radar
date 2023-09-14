import requests
import re
from bs4 import BeautifulSoup

cities = ['kitchener', 'waterloo']
city = cities[0]
baseUrl = f'https://rentals.ca/phoenix/api/v1.0.2/listings?beds[]=3&beds[]=4&rentrange=0-3000&types[]=house&types[]=town-house&types[]=multi-unit&types[]=cabin&types[]=cottage&obj_path={city}&details=mid2&prefer-neighbourhood=0'
