const fishnotes_view = ((data) => {
    let html = `
    <html>
    <body>
        Logged in as user: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>`;


    data.fishnote.forEach((fishnote) => {
        html += fishnote.text;
        html += `
            <form action="delete-note" method="POST">
                <input type="hidden" name="fishnote_id" value="${fishnote._id}">
                <button type="submit">Delete fishnote</button>
            </form>
            `;
    });

    html += `
        <form action="/add-note" method="POST">
            <input type="text" name="fishnote">
            <button type="submit">Add fishnote</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


const fishnote_view = (data) => {
    let html = `
    <html>
    <body>
        Note text: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.fishnotes_view = fishnotes_view;
module.exports.fishnote_view = fishnote_view;