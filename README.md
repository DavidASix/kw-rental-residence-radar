# KW Rental Residence Radar

I'm about to move from Cambridge back to Kitchener-Waterloo. Unfortuatnely since moving to Cambrdige, the KW rental market has gone crazy. Within hours of a post going up it could have thousands of views. Ontop of that if a rental has a great price it will get responded too very quickly.

To give us a competitve advantage, I've devised this project.

## The Project

There are a few places that the vast majority of KW rentals get posted to, and I'm going to monitor them minute to minute and set up notifications for new spaces that could suit our needs.

The web scrapping portion of this project will be done with Python. The Python script will run on my home server, and post the listings up to Firebase. The postings will then be displayed via a NextJS website, and a notification system will be set up with either push notifications or twilio texts.