const saaliit_view = ((data) => {
    let html = `
    <html>
    <body>
        <h1> Kalastuspäiväkirja </h1>
        LOGGED IN USER: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>`;


    data.saaliit_foreach.forEach((saaliis) => {
        html += ` <p> Päivämäärä: ${saaliis.kalalaji} ${saaliis.paino}${saaliis.saa} </p>`  
        html += `
            <form action="/poista-saalis" method="POST">
                <input type="hidden" name="saaliitMongoObject_id" value="${saaliis._id}">
                <button type="submit">Poista saalis</button>
            </form>
            `
    });

    html += `
        <form action="/lisaa-saalis" method="POST">
        <h2>Lisää uusi saalis</h2>
         <div><p>Kalalaji: <input type="text" name="kalalaji"> Paino: <input type="text" name="paino"> 
         Sää: <input type="text" name="saa"></p></div>
            <button type="submit">Lisää kalastuspäivä</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


module.exports.saaliit_view = saaliit_view;
