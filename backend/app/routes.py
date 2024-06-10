from flask import request, jsonify, Blueprint
from app.models import Task
from . import db
import datetime

routes = Blueprint('tasks', __name__)

@routes.route('/tasks', methods=['GET'])
def handle_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks]), 200
    
@routes.route('/task/<int:id>', methods=['GET', 'DELETE'])
def task(id):
    task = Task.query.get(id)
    if request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
    return jsonify(task.to_dict()), 200

@routes.route('/complete-task/<int:id>', methods=['POST'])
def complete_task(id):
    task = Task.query.get(id)
    task.completed = True    
    db.session.commit()
    return jsonify(task.to_dict()), 200

@routes.route('/add-task', methods=['POST'])
def add_task():
    id = int(datetime.datetime.utcnow().timestamp()*100)
    title = request.json['title']
    description = request.json['description']
    completed = request.json.get('completed', False)
    task = Task(id=id, title=title, description=description, completed=completed)
    db.session.add(task) 
    db.session.commit()
    return jsonify(task.to_dict())
