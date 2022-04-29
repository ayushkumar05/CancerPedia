from flask import Flask,render_template,request,jsonify

from chat import get_response

app = Flask(__name__)


@app.route("/")
def index_get():
    return render_template("base.html")

#@app.route("/get")
@app.route("/predict",methods = ["POST"])
def predict():
    text = request.get_json("message")
    #text = request.args.get("message")
    response = get_response(text['message'])
    #print(response)
    message={"answer":response}
    return jsonify(message)
    #return str(text)

if __name__ == '__main__':
    app.run(debug=True)