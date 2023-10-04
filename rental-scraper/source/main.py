from firebase_functions import https_fn, scheduler_fn
from firebase_admin import initialize_app
import rental_scraper

initialize_app()

@https_fn.on_request()
def execute_rental_scraper(req: https_fn.Request) -> https_fn.Response:
    try:
        rental_scraper.main()
        return https_fn.Response("Scrape Successful")
    except Exception as e:
        print('Error happened')
        print(e)
        return https_fn.Response(str(e))

@scheduler_fn.on_schedule(schedule="*/5 12-23,0-3 * * *")
def scheduled_rental_scraper(event: scheduler_fn.ScheduledEvent) -> None:
    rental_scraper.main()