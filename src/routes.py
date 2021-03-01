import socket
import sys
from flask import Blueprint, jsonify
from flask_cors import cross_origin
from socket import socket, AF_INET, SOCK_DGRAM

main_bp = Blueprint('main_bp', __name__)

@main_bp.route('/', methods=['GET', 'POST'])
def dashboard():
    return jsonify(
        hello='word'
    )


@main_bp.route('/dashboard', methods=['GET'])
def deshboard():
    return jsonify(
        room=123,
        name='mos'
    )

def getSignal(socket, addr):
    print(addr)
    #socket.sendto('getData'.encode('utf-8'), addr)
    send_data = "getData"
    socket.sendto(send_data.encode('utf-8'), ('192.168.1.231', 8888))
    data, address = socket.recvfrom(4096)
    print(data.decode('utf-8'))
    return jsonify(
       temperature=0,
       humidity=0,
       lightIntensity=0,
       pressure=0
    )
    

@main_bp.route('/api/room_signal/<int:room_no>', methods=['GET'])
def rooms_signal(room_no):
    print(room_no)
    port = 8888
    addr = {
        'box':   ('192.168.1.231', port),
        'room1': ('192.168.1.160', port),
        'room2': ('192.168.1.51', port),
        'room3': ('192.168.1.63', port)
    }

    server_addr = ('192.168.1.3', 8888)

    s = socket(AF_INET, SOCK_DGRAM)
    #s =socket(socket.AF_INET, socket.SO_REUSEADDR, 1)
    s.bind(server_addr)

    switcher = {
        0: getSignal(s, addr['box']),
        1: getSignal(s, addr['room1']),
        2: getSignal(s, addr['room2']),
        3: getSignal(s, addr['room3']),
    }

    return switcher.get(room_no, jsonify(
       temperature=None,
       humidity=None,
       lightIntensity=None,
       pressure=None
    ))