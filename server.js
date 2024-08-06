const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

const ADMIN_USERNAME = 'nature';
const ADMIN_PASSWORD = 'Wan190203';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '用户名或密码错误' });
    }
});

function generatePassword() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/admin', (req, res) => {
    const { accounts } = req.body;
    const password = generatePassword();
    fs.writeFileSync('data.json', JSON.stringify({ accounts, password }));
    res.json({ message: '提取码已刷新！', password });
});

app.get('/api/content', (req, res) => {
    try {
        const data = fs.readFileSync('data.json', 'utf-8');
        const parsedData = JSON.parse(data);
        res.json(parsedData); // 修正了这里的括号和方法
    } catch (error) {
        res.json({ accounts: [], password: '' });
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});