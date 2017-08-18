from flask import Flask, request, jsonify
import url_handler
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/convert_url", methods=["POST"])
def convert_url():
    body = request.json
    res = url_handler.save_url(body['url'])
    return jsonify({'minified_url': res.short_url})

@app.route("/list_urls")
def list_urls():
    urls = url_handler.get_all_urls()
    return jsonify(urls) 

@app.route("/<url>")
def parse_url(url):
    return jsonify({'full_url': url_handler.get_full_url(url)})

app.run()
