from pprint import pprint

import scrapers.kijiji as kijiji
def main():
    print('Running Main')
    listings = kijiji.main()
    pprint(listings)
    
if __name__ == "__main__":
    main()