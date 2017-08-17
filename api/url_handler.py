from db import Url, session

def save_url(full_url, short_url):
    to_save = Url(full_url=full_url, short_url=short_url)
    try:
        res = session.add(to_save)
        session.commit()
    except e:
        raise e
    finally:
        return True

def get_all_urls():
    try:
        res = session.query(Url)
    except e:
        raise e
    finally:
        urls = [{'short_url': url.short_url, 'full_url': url.full_url} for url in res]
        return {'urls': urls}
