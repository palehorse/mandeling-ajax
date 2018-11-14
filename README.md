## mandeling-ajax
用JavaScript實作非同步「傳送資料給伺服器」與「從伺服器取得資料」雙向網路傳輸模式，即所謂的AJAX．

## 安裝
    npm install mandeling

## 引入
### JavaScript
    <script src="mandeling-ajax/mandeling-ajax.js"></script>
    <script>
        var ajax = MandelingAJAX();
        var ajax = new MandelingAJAX();
### Vue
    var ajax = require('mandeling-ajax/mandeling-ajax.js');
## 常用方法
### get(url, objData)
    ajax.get('/example/get/something', {fields: 'name,birthday,gender'});
### post(url, objData)
    ajax.post('/example/update/something', {name: John, birthday: '1990-10-20'});
### upload(url, file)
    ajax.upload('/example/upload/something', file);
### success(callback)
    ajax.get('/example/get/something', {fields: 'name,birthday,gender'})  
        .success(function(res) {  
            document.write('name' + res.name);  
            document.write('birthday' + res.birthday);  
            document.write('gender' + res.gender);  
            //do something when success.   
        });  
### fail(callback)
    ajax.get('/example/get/something', {fields: 'name,birthday,gender'})  
        .success(function(res) {  
            //do something when success.   
        })  
        .fail(function(res) {  
            console.error('Something wrong!');  
        });  
