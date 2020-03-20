const kalastuspaivat_view = ((data) => {
    let html = `
    <html>
    <body>
        <h1> Kalastuspäiväkirja </h1>
        LOGGED IN USER: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>`;


    data.kalastuspaiva_foreach.forEach((kalastuspaiva1) => {
        html += ` <p> Päivämäärä: ${kalastuspaiva1.paivays} Paikka: ${kalastuspaiva1.paikka} Kommentit: ${kalastuspaiva1.kommentit}</p>`  
        html += `
            <form action="/poista-kalastuspaiva" method="POST">
                <input type="hidden" name="kalastuspaivaMongoObject_id" value="${kalastuspaiva1._id}">
                <button type="submit">Poista kalastuspäivä</button>
            </form>
            `
            html += `
            <form action="/saaliit" method="GET">
                <button type="submit">Näytä päivän saaliit</button>
            </form>
            `;
    });

    html += `
        <form action="/lisaa-kalastuspaiva" method="POST">
        <h2>Lisää uusi kalastuspäivä</h2>
         <div><p>Päivämäärä: <input type="text" name="paivays"> Paikka: <input type="text" name="paikka"> 
         Kommentit: <input type="text" name="kommentit"></p></div>
            <button type="submit">Lisää kalastuspäivä</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


// const kalastuspaiva_view = (data) => {
//     let html = `
//     <html>
//     <body>
//         <h1> Kalastuspaivien näyttäminen </h1>
//        Kalastuspaivan tiedot: ${data.paivays, data.paikka, data.kommentit}
//     </body>
//     </html>
//     `;
//     return html;
// };

module.exports.kalastuspaivat_view = kalastuspaivat_view;
//module.exports.kalastuspaiva_view = kalastuspaiva_view;