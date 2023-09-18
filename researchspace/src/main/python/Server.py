from flask import Flask,request
from flask_cors import CORS, cross_origin
from rdfGenerator.CSVToRDFConverter import CSVToRDFConverter

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/generaterdf", methods = ["POST"])
def generate_rdf_file():

    dataFileName = request.args.get('dataFileName')
    mappingFileName =  request.args.get('mappingFileName')
    
    rdf = CSVToRDFConverter();
    rdf.create_rdf_file(dataFileName, mappingFileName);
    return 1


@app.route("/columndetails", methods = ["GET"])
def get_column_details():

    dataFileName = request.args.get('dataFileName')
    rdf = CSVToRDFConverter();
    column_names = rdf.get_column_names(dataFileName)
    
    return column_names

if __name__ == "__main__":
    app.run(debug=True, port=5000)
