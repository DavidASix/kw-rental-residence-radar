import requests
import re
from bs4 import BeautifulSoup
from pprint import pprint
from datetime import datetime
from time import sleep

makeUrl = lambda city: f'https://rentals.ca/phoenix/api/v1.0.2/listings?beds[]=3&beds[]=4&rentrange=0-3000&types[]=house&types[]=town-house&types[]=multi-unit&types[]=cabin&types[]=cottage&obj_path={city}&details=mid2&prefer-neighbourhood=0&suppress-pagination=1&limit=1000'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
}

def formatListings(listings, city):
    print(len(listings), 'listings found')
    listing_data = []
    for li in listings:
        # Get Price
        price = sum(li['rent_range']) / len(li['rent_range'])
        # Get URL, ID
        url = li.get('url', None)
        listing_id = li.get('id', None)
        # Get Title
        title = li.get('name', None) or li.get('address1', None)
        # Get listings location
        loc = city
        # Get image location
        img = li['photo']['url']
        listing = {
            "source": "rentals.ca",
            "listing_id": listing_id,
            "title": title,
            "loc": loc,
            "price": price,
            "url": url,
            "scrape_date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "img": img,
            "extra_info": li
        }
        if listing['url']:
            listing_data.append(listing)
    return listing_data

def main(): 
    output_listings = []
    cities = ['kitchener', 'waterloo']
    for city in cities:
        # Set up city scoped variables
        url = makeUrl(city)
        print(url)
        # Create a session to persist cookies
        session = requests.Session()
        try:
            res = requests.get(url , headers=headers)
            print(res)
            response = res.json()
            
        except Exception as e:
            print(e)
            raise e
        # Will return up to 1000 listings, pagination is disabled
        # KW under our params should never return over a thousand houses
        # If this project is ever scoped up, this issue should be addressed, but for now, I just need a new place to rent!
        total_properties = response['meta']['total_properties']
        returned_properties = response['meta']['returned_properties']
        listings = response['data']['listings']

        formatted = formatListings(listings, city)

        # Consolidate listings from all pages to single array
        output_listings = output_listings + formatted
        
        # Waiting between requests as to not impact server or incur rate limiting
        for i in range(5):
            print(f'Wait for it...{i+1}')
            sleep(1)
    
    # Return final list with all cities
    return output_listings