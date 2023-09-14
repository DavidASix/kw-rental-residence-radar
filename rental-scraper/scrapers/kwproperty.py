import requests
import re
from bs4 import BeautifulSoup
from pprint import pprint
from datetime import datetime

baseUrl = "https://www.kwproperty.com/browse.asp"

def scrapeSoup(soup, city):
    id = 'row result-item'
    listings = soup.find_all('div', {'class':  id})
    print(len(listings), 'listings found')
    listing_data = []
    for li in listings:
        # Get Price
        price = li.find('span', {'class': 'listing-price'})
        price = price.text
        price = (price
            .replace('$', '')
            .replace('/mo', '')
            .replace(',', ''))
        price = float(price) if price.replace('.', '').isdigit() else None
        # Get URL, ID
        url = li.find('a', {'role': 'button'})
        if url:
            url = url.get('href', None)
            url = f'https://www.kwproperty.com/{url}'
            listing_id = url.split('id=')[1]
            listing_id = listing_id.split('&')[0]
        else:
            url = None
            listing_id = None
        # Get Title
        title = li.find('div', {'class': 'listing-title'})
        title = title.text
        title = ' '.join(line.strip() for line in title.splitlines())
        # Get listings location
        loc = city
        # Get image location
        img = li.find('img', {'class': 'img rounded img-fluid'})
        img = img.get('src', None) if img else None
        img = f'https://www.kwproperty.com/{img}' if img else None
        listing = {
            "source": "kwproperty",
            "listing_id": listing_id,
            "title": title,
            "loc": loc,
            "price": price,
            "url": url,
            "scrape_date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "img": img,
        }
        if listing['url']:
            listing_data.append(listing)
    return listing_data

def main(): 
    print('Running KWPM Scrape')
    listings = []
    url = baseUrl
    data = {
        'search': 'true',
        'listing-type': 'all-listings',
        'price': '0',
        'bedrooms': '3+',
    }
    cities = ['Kitchener', 'Waterloo']
    for city in cities:
        # Set up city scoped variables
        pages = []
        # Create a session to persist cookies
        session = requests.Session()
        try:
            data['city'] = city
            res = session.post(url, data=data)
            html = res.text
        except Exception as e:
            print(e)
            raise e
        soup = BeautifulSoup(html, 'html.parser')
        # Scrape first page:
        page_1_listings = scrapeSoup(soup, city)
        pages.append(page_1_listings)

        # Find how many pages are remaining 
        pager = soup.find('div', {'class', 'page-stats'})
        max_page = pager.text
        max_page = int(max_page.split(' ')[3])

        # Loop through remaining pages and scrape them
        # If only 1 page exists, this will not loop due to range(0)
        for i in range(max_page - 1):
            j = i + 2
            print(f'Scraping page {j}')
            try:
                res = session.get(f'{url}?searching=true&page={j}')
                html = res.text
            except Exception as e:
                print(e)
                raise e
            soup = BeautifulSoup(html, 'html.parser')
            page_listings = scrapeSoup(soup, city)
            pages.append(page_listings)
        
        # Consolidate listings from all pages to single array
        for arr in pages:
            listings = listings + arr
    
    # Return final list with all cities
    print(f'Returning {len(listings)} listings')
    return listings