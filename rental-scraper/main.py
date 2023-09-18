from pprint import pprint

import scrapers.kijiji as kijiji
import scrapers.kwproperty as kwproperty
import scrapers.rentals as rentals
import firebase_functions as firebase
import twilio_functions as twilio

home_url = 'https://www.test.com'

def main():
    print('Running Main')
    all_listings = []
    # Scrape the sources and get the available new listings.

    print('Scraping Kijiji')
    kijiji_listings = kijiji.main()
    all_listings.extend(kijiji_listings)

    print('Scraping KW Property')
    kwproperty_listings = kwproperty.main()
    all_listings.extend(kwproperty_listings)

    print('Scraping rentals.ca')
    rentals_listings = rentals.main()
    all_listings.extend(rentals_listings)

    new_listings = firebase.import_new_listings(all_listings)
    print(len(new_listings), 'new listings found.')
    
    # If new listings were found notify the users via text message:
    if not len(new_listings):
        return
    print('Sending notification text:\n\n')
    counts = {}
    for l in new_listings:
        counts[l['source']] = counts.get(l['source'], 0) + 1
    count_str = '\n'.join([f'{key}: {value}' for key, value in counts.items() if value >= 1])
    message_text = f"🏠 New listing alert! 🏠\n{len(new_listings)} new listings are available\n{count_str}\nView them here: {home_url}"
    print(message_text, '\n\n')

    twilio.send_text(message_text)
    
if __name__ == "__main__":
    main()