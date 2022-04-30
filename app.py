from flask import Flask,render_template,request,jsonify

from chat import get_response
import os
from keras.models import load_model
from keras_preprocessing import image
from keras.applications.vgg16 import preprocess_input
import numpy as np

model = load_model('model1.h5')

def ProcessInput(img):
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    img_data = preprocess_input(x)
    classes = model.predict(img_data)
    print(classes)
    #currently for tumor
    #for cancer reverse output
    if classes[0][0]<classes[0][1]:
        print("not detected")
        return "not detected"
    else:
        print("detected")
        return "detected"


app = Flask(__name__)
UPLOAD_FOLDER = './upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
    message = {"answer": str(message['answer'])}
    print(message['answer'])
    return jsonify(message)
    #return str(text)



@app.route("/lcd",methods = ["GET","POST"])
def lcd():
    if request.method == 'POST':
        if 'file1' not in request.files:
            return 'there is no file1 in form!'
        file1 = request.files['file1']
        path = os.path.join(app.config['UPLOAD_FOLDER'], file1.filename)
        file1.save(path)
        img = image.load_img(path, target_size=(224, 224))
        return render_template('tab.html',DATA = ProcessInput(img))

    return render_template('tab.html')

if __name__ == '__main__':
    app.run(debug=True)