from pprint import pprint

import scrapers.kijiji as kijiji
import scrapers.kwproperty as kwproperty
import scrapers.rentals as rentals
import firebase_functions as firebase

def main():
    print('Running Main')
    all_listings = []
    print('Scraping Kijiji')
    #kijiji_listings = kijiji.main()
    #all_listings.extend(kijiji_listings)

    print('Scraping KW Property')
    kwproperty_listings = kwproperty.main()
    all_listings.extend(kwproperty_listings)

    print('Scraping rentals.ca')
    #rentals_listings = rentals.main()
    #all_listings.extend(rentals_listings)

    firebase.import_new_listings(all_listings)

    
if __name__ == "__main__":
    main()