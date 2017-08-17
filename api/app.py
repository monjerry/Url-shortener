from flask import Flask, request, jsonify
import url_handler
app = Flask(__name__)

@app.route("/convert_url", methods=["POST"])
def convert_url():
    body = request.json
    res = url_handler.save_url(body['url'], 'mini')
    if res is True:
        return jsonify({'new_url': 'mini'})


@app.route("/list_urls")
def list_urls():
    urls = url_handler.get_all_urls()
    return jsonify(urls) 

@app.route("/<url>")
def parse_url(url):
    return "Hello World!"

app.run()
