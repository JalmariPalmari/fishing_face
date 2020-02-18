const kalastuspaivat_view = ((data) => {
    let html = `
    <html>
    <body>
        LOGGED IN USER: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>`;


    data.kalastuspaivat.forEach((kalastuspaiva) => {
        html += kalastuspaiva.text;
        html += `
            <form action="/poista-kalastuspaiva" method="POST">
                <input type="hidden" name="kalastuspaiva_id" value="${kalastuspaiva._id}">
                <button type="submit">Delete fishingday</button>
            </form>
            `;
    });

    html += `
        <form action="/lisaa-kalastuspaiva" method="POST">
            <input type="text" name="kalastuspaiva">
            <button type="submit">Lisää kalastuspäivä</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


const kalastuspaiva_view = (data) => {
    let html = `
    <html>
    <body>
       Kalastuspaivan tiedot: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.kalastuspaivat_view = kalastuspaivat_view;
module.exports.kalastuspaiva_view = kalastuspaiva_view;