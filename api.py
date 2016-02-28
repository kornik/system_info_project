from flask import Flask, render_template
from flask_restful import Resource, Api, abort
from utilities import size_display
import psutil
import datetime
import os




app = Flask(__name__)
api = Api(app)

app.jinja_env.add_extension('pyjade.ext.jinja.PyJadeExtension')



@app.route('/')
def test():
    return render_template('index.jade')


class HelloWorld(Resource):
    def get(self):

        return {'hello': 'world'}


class Cpus(Resource):
    def get(self):
        cpu_usage = []
        for i in psutil.cpu_percent(percpu=True):
            percent = int(i)
            cpu_usage.append({'cpu': percent})
        return cpu_usage


class Memory(Resource):
    def get(self):
        memory = psutil.virtual_memory()
        total = '%0.2f %s' % (size_display(memory.total))
        available = '%0.2f %s' % (size_display(memory.available))
        used = '%0.2f %s' % (size_display(memory.used))
        percent = '%d' % memory.percent
        mem_json = {'total': total, 'available': available, 'used': used, 'percent': percent}
        return mem_json

class Disks(Resource):
    def get(self):
        disks = psutil.disk_partitions()
        disks_info = []

        for disk in disks:
            disk_usage = psutil.disk_usage(disk.mountpoint)
            total = '%0.2f %s' % (size_display(disk_usage.total))
            used = '%0.2f %s' % (size_display(disk_usage.used))
            free = '%0.2f %s' % (size_display(disk_usage.free))
            disks_info.append({'device': disk.device, 'mountpoint': disk.mountpoint, 'fstype': disk.fstype,
                               'usage': {'total': total, 'used': used,
                                         'free': free, 'usage_percent': disk_usage.percent}})

        return disks_info


class Processes(Resource):
    def get(self):
        pids = psutil.pids()
        processes = []
        for p in pids:
            try:
                process = psutil.Process(p)
                pid = p
                name = process.name()
                status = process.status()
                start_time = datetime.datetime.fromtimestamp(int(process.create_time())).strftime('%d.%m.%Y %H:%M')
                cpu_usage = '%0.1f' % process.cpu_percent()
                memory_usage = '%0.1f' % process.memory_percent()
                processes.append({'pid': pid, 'name': name, 'status': status, 'start_date': start_time,
                                  'cpu_usage': cpu_usage, 'memory_usage': memory_usage})

            except psutil.AccessDenied:
                pass
        return processes


class Process(Resource):

    def post(self, pid):
        try:
            os.system(('taskkill /pid {}').format(pid))
            return 'Complete', 204
        except:
            abort(404, message="Process PID {} doesn't exist".format(pid))


class Uptime(Resource):
    def get(self):
        uptime = str(datetime.datetime.now()- datetime.datetime.fromtimestamp(psutil.boot_time()))
        return {'uptime': uptime}

#api.add_resource(HelloWorld, '/')
api.add_resource(Cpus, '/cpus')
api.add_resource(Memory, '/memory')
api.add_resource(Disks, '/disks')
api.add_resource(Processes, '/processes')
api.add_resource(Process, '/processes/<pid>')
api.add_resource(Uptime, '/uptime')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)