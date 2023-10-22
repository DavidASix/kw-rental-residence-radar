import os
import warnings
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

base_path = os.path.dirname(__file__)

# Filter to ignore firebase filter warning.
warnings.filterwarnings(
    "ignore", 
    category=UserWarning, 
    message="Detected filter using positional arguments. Prefer using the 'filter' keyword argument instead.")

def firebase_conn():
    # Initialize Firebase Connection
    cred = credentials.Certificate(os.path.join(base_path, '../private/service-account.json'))
    if not firebase_admin._apps:
        app = firebase_admin.initialize_app(cred)
    else:
        app = firebase_admin.get_app(name='[DEFAULT]')
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
    print('Running import_new_listings')
    db = firebase_conn()
    listings_collection = db.collection("listings")
    print('Checking', len(listings), 'listings.')
    new_listings = []
    for l in listings:
        l_in_collection = listing_in_collection(l, listings_collection)
        if not l_in_collection:
            listings_collection.add(l)
            new_listings.append(l)
    return new_listings

def import_all_listings(listings):
    db = firebase_conn()
    listings_collection = db.collection("listings")
    print('Attempting to import', len(listings), 'listings.')
    for l in listings:
        listings_collection.add(l)

def delete_listings_from_source(source):
    db = firebase_conn()
    listings_collection = db.collection("listings")
    query = listings_collection.where("source", "==", source)
    listings = query.stream()
    print('Deleting', len(query.get()), 'listings.')
    for l in listings:
        l.reference.delete()
    print('Complete')

#######################################
##
##      User Specific Functions
##
#######################################

def get_all_enabled_phone_numbers():
    db = firebase_conn()
    users_collection = db.collection("users")
    query = (users_collection
        .select(['phoneNumber'])
        .where("phoneNumber", ">=", '')
        .where("smsEnabled", "==", True))
    docs = query.get()
    data = []
    for doc in docs:
        data.append(doc.to_dict()['phoneNumber'])
    return data