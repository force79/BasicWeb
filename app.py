from flask import Flask, request, jsonify, render_template
import smtplib
from email.mime.text import MIMEText
import json, os, datetime

app = Flask(__name__)

SAVE_FOLDER = "callbacks"
os.makedirs(SAVE_FOLDER, exist_ok=True)

EMAIL = "forcejod@gmail.com"
PASSWORD = "pklxntsztgulpouf"   # generate an app password if using Gmail
TO_EMAIL = "deletesharma79@gmail.com"

@app.route("/submit_callback", methods=["POST"])
def submit_callback():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    message = data.get("message")

    # Save to JSON file
    entry = {
        "name": name,
        "email": email,
        "phone": phone,
        "message": message,
        "timestamp": str(datetime.datetime.now())
    }
    with open(os.path.join(SAVE_FOLDER, "requests.json"), "a") as f:
        f.write(json.dumps(entry) + "\n")

    # Send Email
    body = f"""
    New Callback Request:

    Name: {name}
    Email: {email}
    Phone: {phone}
    Message: {message}
    """
    msg = MIMEText(body)
    msg["Subject"] = "New Callback Request"
    msg["From"] = EMAIL
    msg["To"] = TO_EMAIL

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL, PASSWORD)
            server.sendmail(EMAIL, TO_EMAIL, msg.as_string())
        return jsonify({"success": True, "message": "Request submitted successfully!"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
