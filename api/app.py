from flask import Flask
app = Flask(__name__)

@app.route("/convert_url", methods=["GET", "POST"])
def convert_url():
    return "convert"


@app.route("/list_urls")
def list_urls():
    return "list"

@app.route("/<url>")
def parse_url(url):
    return "Hello World!"

app.run()
