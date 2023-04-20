Latest Implementation of: ECharts server side rendering generates chart images using NodeJs and node canvas. 

Installation:

1. Docker run: 

```
docker build -t echarts-webservice . 
docker run -d -p 8081:8081 --name echarts-webservice --restart=always echarts-webservice
```

2. Local Node run: 

* a. Install dependencies (instructions provided for different operating systems)
* b. Download and install: 

```
git clone git@github.com:XRobotix-Pty-Ltd/echarts-webservice.git
cd echarts-webservice
npm install
npm start
```

Accessing Service:

1. Access via http request

2. Request parameter format: 

```javascript
{
    "width": 800,
    "height": 500,
    "renderer": "svg", // svg|canvas (default is canvas)    
    "option": {
        "backgroundColor": "#fff",
        "xAxis": {
            "type": "category",
            "data": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ]
        },
        "yAxis": {
            "type": "value"
        },
        "series": [
            {
                "data": [
                    820,
                    932,
                    901,
                    934,
                    1290,
                    1330,
                    1320
                ],
                "type": "line"
            }
        ]
    }
}
```

3. GET request (only suitable for small parameter data): 

```
http://localhost:8081/?config=%7B%22width%22%3A800%2C%22height%22%3A500%2C%20%22renderer%22%3A%22svg%22%2C%22option%22%3A%7B%22backgroundColor%22%3A%22%23fff%22%2C%22xAxis%22%3A%7B%22type%22%3A%22category%22%2C%22data%22%3A%5B%22Mon%22%2C%22Tue%22%2C%22Wed%22%2C%22Thu%22%2C%22Fri%22%2C%22Sat%22%2C%22Sun%22%5D%7D%2C%22yAxis%22%3A%7B%22type%22%3A%22value%22%7D%2C%22series%22%3A%5B%7B%22data%22%3A%5B820%2C932%2C901%2C934%2C1290%2C1330%2C1320%5D%2C%22type%22%3A%22line%22%7D%5D%7D%7D
```

4. POST request: 

```
curl -X POST \
  http://localhost:8081/ \
  -o echart-image.png \
  -d '{
    "width": 800,
    "height": 500,
    "renderer": "svg", 
    "option": {
        "backgroundColor": "#fff",
        "xAxis": {
            "type": "category",
            "data": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ]
        },
        "yAxis": {
            "type": "value"
        },
        "series": [
            {
                "data": [
                    820,
                    932,
                    901,
                    934,
                    1290,
                    1330,
                    1320
                ],
                "type": "line"
            }
        ]
    }
}'
```