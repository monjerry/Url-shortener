from flask import Flask, abort, request, jsonify, redirect
import url_handler
from flask_cors import CORS, cross_origin

app = Flask(__name__)
#CORS(app)

@app.route("/api/convert_url", methods=["POST"])
def convert_url():
    body = request.json
    customurl = ''
    if 'customurl' in body:
        customurl = body['customurl']
    res = url_handler.save_url(body['url'], customurl)
    if isinstance(res,dict):
        return jsonify(res)
    return jsonify({'id': res.id, 'full_url': res.full_url, 'short_url': res.short_url})

@app.route("/api/list_urls")
def list_urls():
    urls = url_handler.get_all_urls()
    return jsonify(urls) 

@app.route("/favicon.ico")
def favicon():
    return 'OK'


@app.route("/<url>")
def parse_url(url):
    url = url_handler.get_full_url(url)
    if url is None:
        abort(404)
    return redirect(url)

app.run()
