from pymongo import MongoClient
import json

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

# def get_all_user():
#     users = users_collection.find({}, {"_id" : 0})
#     users_list = list(users)

#     print(json.dumps(users_list))

# get_all_user()


def insert_user():
    data_1 = {
        'u_id': 'mau-1-usr',
        'username': 'maulana',
        'email': 'maulana@email.com',
        'password': 'maulana123',
        'workspace_ids': ["pap-1-wks", "pbo-2-wks"],
        'created_at': '2023-12-10-12:51:00',
        'updated_at': '2023-12-10-12:51:00',
        'is_online': 0
    }

    data_2 = {
        'u_id': 'far-2-usr',
        'username': 'faridha',
        'email': 'faridha@email.com',
        'password': 'faridha123',
        'workspace_ids': ["pap-1-wks", "pbo-2-wks"],
        'created_at': '2023-12-10-12:51:00',
        'updated_at': '2023-12-10-12:51:00',
        'is_online': 0
    }

    data_3 = {
        'u_id': 'rak-3-usr',
        'username': 'rakhman',
        'email': 'rakhman@email.com',
        'password': 'rakhman123',
        'workspace_ids': ["pap-1-wks", "pbo-2-wks"],
        'created_at': '2023-12-10-12:51:00',
        'updated_at': '2023-12-10-12:51:00',
        'is_online': 0
    }

    users = users_collection.insert_many([
        data_1, data_2, data_3,
    ])

    print(users.inserted_ids)


def insert_workspace():
    workspace_1 = {
        "w_id": "pap-1-wks",
        'name': "Paper Kakulus",
        'description': 'Membuat tugas akhir paper kalkulus lanjut',
        'notification_list': [
            {
                "n_id": "pap-1-wks-1-ntf",
                "message": "Berdoalah sebelum mulai mengerjakan tugas 🙏",
                "created_at": '2023-12-10-12:51:00',

            },
            {
                "n_id": "pap-1-wks-2-ntf",
                "message": "Berdoalah setelah mengerjakan tugas 🤲",
                "created_at": '2023-12-10-12:51:00'

            },
        ],
        'status': "ON-GOING",
        'admin_list': ['mau-1-usr'],
        'member_list': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'task_ids': [
            "pap-1-1-tsk",
            "pap-1-2-tsk",
            "pap-1-3-tsk",
            "pap-1-4-tsk",
        ],
        'activity_list': [
            {
                'a_id': 'pap-1-wks-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-wks-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-wks-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'updated_at': '2023-12-10-12:51:00',
        'created_at': '2023-12-10-12:51:00',
    }

    workspace_2 = {
        "w_id": "pbo-2-wks",
        'name': "PBO Final Project",
        'description': 'Membuat tugas akhir aplikasi java',
        'notification_list': [
            {
                "n_id": "pap-1-wks-1-ntf",
                "message": "Berdoalah sebelum mulai mengerjakan tugas 🙏",
                "created_at": '2023-12-10-12:51:00'

            },
            {
                "n_id": "pap-1-wks-2-ntf",
                "message": "Berdoalah setelah mengerjakan tugas 🤲",
                "created_at": '2023-12-10-12:51:00'

            },
        ],
        'status': "ON-GOING",
        'admin_list': ['far-2-usr'],
        'member_list': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'task_ids': ["pbo-2-1-tsk", "pbo-2-2-tsk"],
        'activity_list': [
            {
                'a_id': 'pbo-2-wks-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-wks-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-wks-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'updated_at': '2023-12-10-12:51:00',
        'created_at': '2023-12-10-12:51:00',
    }

    workspace = workspaces_collection.insert_many([
        workspace_1, workspace_2
    ])

    print(workspace.inserted_ids)


def insert_task():
    task_1 = {
        "t_id": "pap-1-1-tsk",
        "title": "Mencari referensi",
        "description": "Mencari referensi jurnal deret",
        'assigned_member': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'deadline':  '2023-12-20-12:51:00',
        'priority': 'MED',
        'created_at': '2023-12-10-12:51:00',
        'activity_list': [
            {
                'a_id': 'pap-1-1-tsk-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'w_id': "pap-1-wks",
        'seen_by': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'comments': [
            {
                'c_id': "pap-1-1-tsk-1-c",
                'username': 'faridha',
                'message': 'Halo!',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-1-tsk-2-c",
                'username': 'maulana',
                'message': 'Biar silaturahmi tidak terputus...',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-1-tsk-3-c",
                'username': 'faridha',
                'message': 'Pinjam dulu seratus 💵',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-1-tsk-4-c",
                'username': 'rakhman',
                'message': 'cuaks 🤙',
                'time': '2023-12-10-12:51:00',
            },
        ],
        'status': 'IN-PROGRESS',
        'updated_at': '2023-12-10-12:51:00',
        'author': 'faridha'
    }

    task_2 = {
        "t_id": "pap-1-2-tsk",
        "title": "Google Docs",
        "description": "Menyiapkan google docs",
        'assigned_member': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'deadline':  '2023-12-20-12:51:00',
        'priority': 'LOW',
        'created_at': '2023-12-10-12:51:00',
        'activity_list': [
            {
                'a_id': 'pap-1-1-tsk-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'w_id': "pap-1-wks",
        'seen_by': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'comments': [
            {
                'c_id': "pap-1-2-tsk-1-c",
                'username': 'faridha',
                'message': 'Halo!',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-2-tsk-2-c",
                'username': 'maulana',
                'message': 'Biar silaturahmi tidak terputus...',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-2-tsk-3-c",
                'username': 'faridha',
                'message': 'Pinjam dulu seratus 💵',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-2-tsk-4-c",
                'username': 'rakhman',
                'message': 'cuaks 🤙',
                'time': '2023-12-10-12:51:00',
            },
        ],
        'status': 'COMPLETED',
        'updated_at': '2023-12-10-12:51:00',
        'author': 'faridha'
    }

    task_3 = {
        "t_id": "pap-1-3-tsk",
        "title": "Template PPT",
        "description": "Mencari template PPT di Canva",
        'assigned_member': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'deadline':  '2023-12-20-12:51:00',
        'priority': 'LOW',
        'created_at': '2023-12-10-12:51:00',
        'activity_list': [
            {
                'a_id': 'pap-1-1-tsk-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'w_id': "pap-1-wks",
        'seen_by': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'comments': [
            {
                'c_id': "pap-1-3-tsk-1-c",
                'username': 'faridha',
                'message': 'Halo!',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-3-tsk-2-c",
                'username': 'maulana',
                'message': 'Biar silaturahmi tidak terputus...',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-3-tsk-3-c",
                'username': 'faridha',
                'message': 'Pinjam dulu seratus 💵',
                'time': '2023-12-10-12:51:00',
            },
            {
                'c_id': "pap-1-3-tsk-4-c",
                'username': 'rakhman',
                'message': 'cuaks 🤙',
                'time': '2023-12-10-12:51:00',
            },
        ],
        'status': 'REVISED',
        'updated_at': '2023-12-10-12:51:00',
        'author': 'faridha'
    }

    task_4 = {
        "t_id": "pap-1-4-tsk",
        "title": "Menyusun Paper",
        "description": "Menyusun paper kalkulus di ms word",
        'assigned_member': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'deadline':  '2023-12-20-12:51:00',
        'priority': 'HIGH',
        'created_at': '2023-12-10-12:51:00',
        'activity_list': [
            {
                'a_id': 'pap-1-1-tsk-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pap-1-1-tsk-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'w_id': "pap-1-wks",
        'seen_by': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'comments': [
            {
                "c_id": "pap-1-4-tsk-1-c",
                'username': 'faridha',
                'message': 'Halo!',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pap-1-4-tsk-2-c",
                'username': 'maulana',
                'message': 'Biar silaturahmi tidak terputus...',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pap-1-4-tsk-3-c",
                'username': 'faridha',
                'message': 'Pinjam dulu seratus 💵',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pap-1-4-tsk-4-c",
                'username': 'rakhman',
                'message': 'cuaks 🤙',
                'time': '2023-12-10-12:51:00',
            },
        ],
        'status': 'REVISED',
        'updated_at': '2023-12-10-12:51:00',
        'author': 'faridha'
    }

    task_5 = {
        "t_id": "pbo-2-1-tsk",
        "title": "Referensi Design",
        "description": "Mencari referensi design di internet",
        'assigned_member': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'deadline':  '2023-12-20-12:51:00',
        'priority': 'LOW',
        'created_at': '2023-12-10-12:51:00',
        'activity_list': [
            {
                'a_id': 'pbo-2-1-tsk-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-1-tsk-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-1-tsk-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'w_id': "pbo-2-wks",
        'seen_by': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'comments': [
            {
                "c_id": "pbo-2-1-tsk-1-c",
                'username': 'faridha',
                'message': 'Halo!',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-1-tsk-2-c",
                'username': 'maulana',
                'message': 'Biar silaturahmi tidak terputus...',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-1-tsk-3-c",
                'username': 'faridha',
                'message': 'Pinjam dulu seratus 💵',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-1-tsk-4-c",
                'username': 'rakhman',
                'message': 'cuaks 🤙',
                'time': '2023-12-10-12:51:00',
            },
        ],
        'status': 'IN-PROGRESS',
        'updated_at': '2023-12-10-12:51:00',
        'author': 'faridha'
    }

    task_6 = {
        "t_id": "pbo-2-2-tsk",
        "title": "Coding Java",
        "description": "Mencari referensi design di internet",
        'assigned_member': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'deadline':  '2023-12-20-12:51:00',
        'priority': 'LOW',
        'created_at': '2023-12-10-12:51:00',
        'activity_list': [
            {
                'a_id': 'pbo-2-2-tsk-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-2-tsk-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-2-tsk-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'w_id': "pbo-2-wks",
        'seen_by': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'comments': [
            {
                "c_id": "pbo-2-2-tsk-1-c",
                'username': 'faridha',
                'message': 'Halo!',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-2-tsk-2-c",
                'username': 'maulana',
                'message': 'Biar silaturahmi tidak terputus...',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-2-tsk-3-c",
                'username': 'faridha',
                'message': 'Pinjam dulu seratus 💵',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-2-tsk-4-c",
                'username': 'rakhman',
                'message': 'cuaks 🤙',
                'time': '2023-12-10-12:51:00',
            },
        ],
        'status': 'NEXT-UP',
        'updated_at': '2023-12-10-12:51:00',
        'author': 'maulana'
    }

    tasks = tasks_collection.insert_many([
        task_1, task_2, task_3, task_4, task_5, task_6,
    ])

    print(tasks.inserted_ids)


def get_user():
    user = users_collection.aggregate([{'$match': {'username': 'maulana'}}, {'$lookup': {'from': 'workspaces', 'localField': 'workspace_ids', 'foreignField': 'w_id', 'pipeline': [
        {'$lookup': {'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {"_id": 0}}], 'as': 'workspace_list'}}, {'$project': {'_id': 0}}])
    print(json.dumps(list(user)[0]))


def get_workspace():
    workspace = workspaces_collection.aggregate([{'$match': {'w_id': 'pap-1-wks'}}, {'$lookup': {
                                                'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {'_id': 0}}])

    print(json.dumps(list(workspace[0])))


def sign_in():
    data = {
        "username": "maulana",
        "password": "maulana123"
    }

    get_records = users_collection.find_one(
        {"username": data["username"]}, {'_id': 0})

    if get_records["password"] == data['password']:
        print(get_records)
    else:
        print("😭"
)

def update_task():
    data = {
        "t_id": "20231211102737260950-tsk",
        "title": "Referensi Design",
        "description": "Mencari referensi design di internet",
        'assigned_member': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'deadline':  '2023-12-20-12:51:00',
        'priority': 'LOW',
        'created_at': '2023-12-10-12:51:00',
        'activity_list': [
            {
                'a_id': 'pbo-2-1-tsk-1-act',
                'activity_desc': 'maulana seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-1-tsk-2-act',
                'activity_desc': 'faridha seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
            {
                'a_id': 'pbo-2-1-tsk-3-act',
                'activity_desc': 'rakhman seen this task',
                'created_at': '2023-12-10-12:51:00',
                'activity_type': "READ"
            },
        ],
        'w_id': "pbo-2-wks",
        'seen_by': [{"u_id": 'mau-1-usr', 'username': 'maulana'}, {'u_id': 'far-2-usr', 'username': 'faridha'}, {'u_id': 'rak-3-usr', 'username': 'rakhman'}],
        'comments': [
            {
                "c_id": "pbo-2-1-tsk-1-c",
                'username': 'faridha',
                'message': 'Halo!',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-1-tsk-2-c",
                'username': 'maulana',
                'message': 'Biar silaturahmi tidak terputus...',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-1-tsk-3-c",
                'username': 'faridha',
                'message': 'Pinjam dulu seratus 💵',
                'time': '2023-12-10-12:51:00',
            },
            {
                "c_id": "pbo-2-1-tsk-4-c",
                'username': 'rakhman',
                'message': 'cuaks 🤙',
                'time': '2023-12-10-12:51:00',
            },
        ],
        'status': 'IN-PROGRESS',
        'updated_at': '2023-12-10-12:51:00',
        'author': 'faridha'
    }
    

    updated = tasks_collection.replace_one(
        {"t_id": "20231211102737260950-tsk"}, data)

    updated_count = updated.raw_result["nModified"]

    print(json.dumps({"updated_count": updated_count}))


update_task()

# sign_in()


# insert_user()
# insert_workspace()
# insert_task()

# get_user()
# get_workspace()
