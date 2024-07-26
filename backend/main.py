from flask import Flask, jsonify, render_template, request
from kb_rag import get_llm_response
from flask_cors import CORS
from timeseries import get_stock_prediction, get_historical

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/stocker/chat", methods=["POST"])
def handle_query_chat():
    if request.is_json:
        data = request.get_json()

        # Process the data as needed
        query = data.get("query")
        client_data = data.get("client_data")

        llm_advice = get_llm_response(query, client_data)
        # Create a response
        response = {"status": "success", "message": llm_advice}
        return jsonify(response), 200
    else:
        response = {"status": "fail", "message": "Request body must be JSON"}
        return jsonify(response), 400


@app.route("/api/stock/<ticker>", methods=["GET"])
def handle_query(ticker):
    print(ticker)
    if ticker:
        prediction = get_stock_prediction(ticker)
        historical = get_historical(ticker)
        print(historical)

        # Create a response
        response = {
            "status": "success",
            "prediction": prediction,
            "historical": historical,
        }
        return jsonify(response), 200
    else:
        response = {"status": "fail", "message": "Request body must be JSON"}
        return jsonify(response), 400
