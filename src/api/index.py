from flask import Flask, request
from datetime import datetime
from pymongo import MongoClient
import json

app = Flask(__name__)

# instansiasi MongoClient untuk koneksi ke database "projectp" MongoDB

client = MongoClient(
    "mongodb+srv://thandeousJake:rdwlffng88@tjlesson.k9uokcl.mongodb.net/", 27017)
database = client["projectp"]  # sama utk setiap crud operation

# disesuaikan dengan nama data
activity_collection = database["activities"]
chat_collection = database["chat"]
comments_collection = database["comments"]
notifications_collection = database["notifications"]
tasks_collection = database["tasks"]
users_collection = database["users"]
workspaces_collection = database["workspaces"]


# config
if __name__ == "__main__":
    # app.run(debug=True)
    app.run(port=8000)
# user model

# CREATE


@app.route("/api/create-user", methods=['POST'])
def create_user():
    # konversi json ke dictionary
    user_dict = json.loads(request.data)
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    length = users_collection.count_documents(
        {"username": user_dict["username"]})

    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    if length == 0:
        # pre-designed uid
        u_id = f"{user_dict['username'][:3]}-{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-usr"

        user_dict["u_id"] = u_id

        record = user_dict

        users_collection.insert_one(record)

        return json.dumps({"message": "success"})

    elif length != 0:
        return json.dumps({"message": "user-exist"})

    else:
        return json.dumps({"message": "failed"})

# READ untuk data user


@app.route("/api/get-user/<string:u_id>", methods=['GET'])
def get_user(u_id):
    user = users_collection.find_one({"username": u_id}, {"_id": 0})

    return json.dumps(user)

## Mengambil semua data user


@app.route("/api/get-all-users", methods=['GET'])
def get_all_user():
    users = users_collection.find({}, {"_id": 0})
    users_list = list(users)

    return json.dumps(users_list)

# UPDATE untuk data user


@app.route("/api/update-user/<string:u_id>", methods=['UPDATE'])
def update_user(u_id):
    new_record = json.loads(request.data)

    updated = users_collection.update_one(
        {"u_id": u_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return json.dumps({"updated_count":updated_count })


# DELETE untuk data user


@app.route("/api/delete-user/<string:u_id>", methods=['DELETE'])
def deleteUser(u_id):
    delete = users_collection.delete_one({"u_id": u_id})

    delete_count = delete.raw_result["n"]

    return json.dumps({"deleted_count": delete_count})
