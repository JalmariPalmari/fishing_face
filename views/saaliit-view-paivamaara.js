

const saaliitpaivamaara_view = (data) => {
    let html = `
    <html>
    <body>
        <h1> saaliiden näyttäminen </h1>
    </body>
    </html>
    `;
    data.paivays.forEach((saaliis) => {
        html += `<p> ${saaliis.paivays} ${saaliis.kalalaji} ${saaliis.paino} ${saaliis.saa}${saaliis.image_url}   </p>`  
    });

    return html;
};

module.exports.saaliitpaivamaara_view = saaliitpaivamaara_view;