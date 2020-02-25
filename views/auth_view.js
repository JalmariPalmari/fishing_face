const login_view = () => {
    let html = `
    <html>
    <body>
    <h1> Kalastuspäiväkirja </h1>
    <h3> Kirjaudu sisään </h3>
        <form action="/login" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Log in</button>
        </form>
        <form action="/register" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form>
    </body>
    <html>
    `;

    return html;
}

module.exports.login_view = login_view;