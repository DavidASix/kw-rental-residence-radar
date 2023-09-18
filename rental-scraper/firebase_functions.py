import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

base_path = os.path.dirname(__file__)

def firebase_conn():
    # Initialize Firebase Connection
    cred = credentials.Certificate(os.path.join(base_path, './private/service-account.json'))
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    print('Connected to Firebase')
    return db

def listing_in_collection(listing, collection):
    listing_id = listing['listing_id']
    source = listing['source']
    # Get existing listings with this ID and source
    query = (collection
        .select([])
        .where("listing_id", "==", listing_id)
        .where("source", "==", source))
    docs = query.get()
    return bool(len(docs))

def import_new_listings(listings):
    db = firebase_conn()
    listings_collection = db.collection("listings")
    print('Checking', len(listings), 'listings.')
    for l in listings:
        l_in_collection = listing_in_collection(l, listings_collection)
        if not l_in_collection:
            print("Adding new listing")
            listings_collection.add(l)

def import_all_listings(listings):
    db = firebase_conn()
    listings_collection = db.collection("listings")
    print('Attempting to import', len(listings), 'listings.')
    for l in listings:
        listings_collection.add(l)