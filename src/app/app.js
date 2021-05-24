const express = require("express");
const fs = require("fs");
var path = require('path');
const app = express();

// обработчик по маршруту localhost:3000/add
app.get("/add", function(request, response){


    // асинхронное чтение C:\\Users\\student.KR\\Downloads\\goodsList\\src
    fs.readFile("\\assets\\usersdata.json", 'utf8',
    function(error,data){

        if(error) throw error; // если возникла ошибка
        res = JSON.parse(data);

        res.userList.forEach(u => {
          if(u.login===request.query.login && u.password===request.query.password)
          {
            response.send({result:'Ошибка записи, пользователь с такими данными уже существует!'});
          }
        });

        res.userList.push({login: request.query.login, password: request.query.password});
        json = JSON.stringify(res);
        fs.writeFile("\\assets\\usersdata.json", json, 'utf8',  function(error){
          if(error) throw error; // если возникла ошибка
          response.send({result: 'Данные успешно добавлены!'});
        }); // write it back

    });

    // настройка заголовков CORS для кроссдоменных запросов
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');

});

app.listen(3000);
