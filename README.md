# system_info_project
Simple web system information application. Just for fun. 

Live data about system on web ;)

Flask-restful for REST API, AngularJS for frontend.

## Dependences
[Flask](http://flask.pocoo.org/)

[Flask-restful](http://flask-restful-cn.readthedocs.org/en/0.3.4/index.html)

[psutil](https://github.com/giampaolo/psutil)

[pyJade](https://github.com/syrusakbary/pyjade)



## Usage:

Simple run:

python api.py

Server run on port 5000

## URLS:

| Method        | URL              | Info  |
| ------------- |:------------------:| -----:|
| GET           | /                | Main Page/Dashboard|
| GET           | /cpus            | cpu per core JSON |
| GET           | /memory          | memory usage JSON |
| GET           | /uptime          | uptime JSON |
| GET           | /disks           | disks usage JSON |
| GET           | /processes       | processes info JSON |
| POST          | /processes/(pid)| Kill process with pid (WINDOWS ONLY for now)|



