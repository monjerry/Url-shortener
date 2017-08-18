from db import Url, session

alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

def save_url(full_url):
    to_save = Url(full_url=full_url)
    try:
        session.add(to_save)
        session.commit()
        mini = get_hash(to_save.id)
        to_save.short_url = mini
        session.commit()
    except e:
        raise e
    finally:
        return to_save

def get_all_urls():
    try:
        res = session.query(Url)
    except e:
        raise e
    finally:
        urls = [{'id': url.id, 'short_url': url.short_url, 'full_url': url.full_url} for url in res]
        return {'urls': urls}

def get_hash(number):
    possible_letters = len(alphabet)
    string  = ''
    number += possible_letters
    while number >= 1:
        string += alphabet[int(number % possible_letters)]
        number -= possible_letters
    return string

def get_full_url(id_url):
    url = session.query(Url).filter(Url.short_url==id_url).first()
    return url.full_url
