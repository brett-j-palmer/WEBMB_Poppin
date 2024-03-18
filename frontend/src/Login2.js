const express = require("express");
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

function htmlStart(res) {
    res.write(`<!DOCTYPE html>
        <head>
            <title>Login</title>
        </head>
        <body>`);
}

function htmlEnd(res) {
    res.end(`</body>
    </html>`);
}

let loginData = [];

app.post('/login', (req, res) => {
    const { usernameTry, passwordTry } = req.body;
    const user = loginData.find(user => user.username === usernameTry && user.password === passwordTry);
    if (user) {
        res.redirect('homepage.html');
    } else {
        res.redirect('login.html');
    }
});

app.get('/logout', (req, res) => {
    res.redirect('login.html');
});


return (
    <div className="Login">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
);


const reactComponentHTML = ReactDOMServer.renderToString(<LoginForm />);


const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Full-stack App</title>
</head>
<body>
<div id="app">${reactComponentHTML}</div>
<script src="frontend.js"></script>
</body>
</html>
`;

app.get('/', (req, res) => {
res.send(fullHTML); 
});