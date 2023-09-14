import requests
import re
from bs4 import BeautifulSoup
from datetime import datetime

baseUrl = "https://www.kijiji.ca/b-apartments-condos/kitchener-waterloo/5+bedrooms__4+bedroom+den__4+bedrooms__3+bedroom+den__3+bedrooms-duplex+triplex__townhouse__house/c37l1700212a27949001a29276001?sort=dateDesc&price=__2999"

def main(): 
    print('Running Kijiji Scrape')
    url = baseUrl
    params = {}
    try:
        res = requests.get(url, params=params)
        html = res.text
    except Exception as e:
        print(e)
        raise e
    soup = BeautifulSoup(html, 'html.parser')
    id = 'listing-card-list-item'
    listings = soup.find_all('li', {'data-testid':  lambda value: value and id in value})
    print(len(listings), 'listings found')
    listing_data = []
    for li in listings:
        # Get Price
        price = li.find('p', {'data-testid': 'listing-price'})
        price = price.text
        price = (price
            .replace('$', '')
            .replace(',', ''))
        price = float(price) if price.replace('.', '').isdigit() else None
        # Get URL, ID, Title
        link = li.find('a', {'data-testid': 'listing-link'})
        url = link.get('href')
        url = f'https://www.kijiji.ca{url}'
        listing_id = url.split('/')[-1]
        title = link.text
        # Get listings location
        loc = li.find('p', {'data-testid': 'listing-location'})
        loc = loc.text
        # Get image location
        img = li.find('img', {
            'data-testid': 'listing-card-image',
            'src': lambda v: v and 'http' in v})
        img = img.get('src', None) if img else None
        listing = {
            "source": "kijiji",
            "listing_id": listing_id,
            "title": title,
            "loc": loc,
            "price": price,
            "url": url,
            "scrape_date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "img": img,
        }
        listing_data.append(listing)
    return listing_data