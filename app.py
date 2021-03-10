from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from datetime import datetime

app = Flask(__name__, instance_relative_config=False, static_folder='./client/build', static_url_path='/')
app.config.from_object('config.Config')

db = SQLAlchemy(app)
cors = CORS(app)

class RoomModel(db.Model):
    id         = db.Column(db.Integer, primary_key=True)
    docter     = db.Column(db.String(50))
    patient    = db.Column(db.String(50))
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=True)

port = 8888
server_addr = ('0.0.0.0', port)
device_addr = {
    'box':   '192.168.1.231',
    'room1': '192.168.1.160',
    'room2': '192.168.1.51',
    'room3': '192.168.1.63'
}

from socket import socket, AF_INET, SOCK_DGRAM, SOL_SOCKET, SO_REUSEADDR
def configUDP():
    s = socket(AF_INET, SOCK_DGRAM)
    s.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
    s.bind(server_addr)
    return s


def getSignal(ip_addr):
    s = configUDP()
    s.sendto("getData".encode('utf-8'), (ip_addr, port))
    data, address = s.recvfrom(4096)
    data = data.decode('utf-8').split(',')
    s.close()
    print(data)
    if len(data) == 1:
        return jsonify(
            uv = data[0]
        )
    
    return jsonify(
        temp  = data[0],
        hum   = data[1],
        light = data[2],
        press = data[3]
    )

def create_app():
    @app.route('/')
    def inbex():
        return app.send_static_file('index.html')

    @app.route('/preferences')
    def preferences():
        return app.send_static_file('index.html')

    @app.route('/api/room_signal/<int:room_no>', methods=['GET'])
    def get_signal_room(room_no):
        if room_no == 1:
            return getSignal(device_addr['room1'])
        elif room_no == 2:
            return getSignal(device_addr['room2'])
        elif room_no == 3:
            return getSignal(device_addr['room3'])
        elif room_no == 0:
            return getSignal(device_addr['box'])
    
    @app.route('/api/name', methods=['GET', 'POST'])
    def update_name():
        if request.method == 'POST':
            data = request.get_json()
            print(data)
            new_ = RoomModel(docter=data['docter'], patient=data['patient'], created_on=datetime.utcnow())
            db.session.add(new_)
            db.session.commit()
            return jsonify({'message': 'new state of name is created'})

        #obj = session.query(ObjectRes).order_by(ObjectRes.id.desc()).first()
        room_ = RoomModel.query.order_by(RoomModel.id.desc()).first()

        return jsonify(docter=room_.docter, patient=room_.patient)
    
    db.create_all()


    return app
