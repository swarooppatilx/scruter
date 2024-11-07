# app.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    user_message = request.json.get("message").lower()
    response = generate_response(user_message)
    return jsonify({"response": response})

def generate_response(user_message):
    if "services" in user_message:
        return "Scruter helps you discover local services within your community."
    elif "ads" in user_message:
        return "You can post ads on Scruter to buy, sell, or trade goods and services."
    elif "buy" in user_message or "sell" in user_message:
        return "Scruter is a great platform for local commerce, perfect for buying and selling!"
    elif "demo" in user_message:
        return "Check out the live demo to explore all Scruter has to offer!"
    elif "contribute" in user_message:
        return "We welcome contributions! Feel free to suggest features or improve Scruter for the community."
    else:
        return "I'm here to assist you with anything about Scruter. Ask me more about services, ads, or contributing!"

if __name__ == "__main__":
    app.run(debug=True)
