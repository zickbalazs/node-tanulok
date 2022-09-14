const express = require('express'), fs = require('fs'), path = require('path'), app = express();
app.use(express.urlencoded({extended:true}));
app.get('/adatfelvetel', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, './web/index.html'))
});
app.post('/rogzites', (req,res)=>{
    fs.appendFile('adat.csv', `${req.body.name};${req.body.class};${req.body.address};${req.body.age}\n`, (err)=>{
        if (err) res.status(500).send('Hiba');
        else{
            res.status(200).send("Sikeres felvétel!")
        }
    })
})
app.get('/listazas', (req,res)=>{
    fs.readFile('adat.csv', (err, data)=>{
        if (err) res.status(500).send("Szerver hiba!")
        else{
            let d = data.toString().trim();
            let rows = d.split('\n')
            res.status(200).send(createTable(rows));
        }
    })
})
function createTable(data){
    let table = `<table style="border-collapse='collapse'" border="1">
        <thead>
            <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>CLASS</td>
                <td>ADDRESS</td>
                <td>AGE</td>
            </tr>
        </thead>
        <tbody>`;
    for (let i = 0; i < data.length; i++){
        let g = data[i].split(';');
        table+=`
            <tr>
                <td>${i}</td>
                <td>${g[0]}</td>
                <td>${g[1]}</td>
                <td>${g[2]}</td>
                <td>${g[3]}</td>
            </tr>`
    };
    table+=`</tbody></table>`;
    return table;
}

app.listen(3000, console.log('Listening on http://localhost:3000'));