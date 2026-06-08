from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return {
        "mensagem": "Backend do Sistema de Ordens de Serviço",
        "status": "Em desenvolvimento"
    }

if __name__ == "__main__":
    app.run(debug=True)