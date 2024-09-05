const nodemailer = require("nodemailer")


const enviarMensaje = async (correoInteresado, correoCreador, origen, destino)  => {
    // console.log(fromTenant)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'cambio.grupos.informatica@gmail.com',
          pass: 'wirn sdkl mgjo fblc'
        }
      })

      const text = `Hola, <a href="mailto:${correoInteresado}">${correoInteresado}</a> está interesado en cambiar contigo de grupo ${origen} a ${destino}. Póngase en contacto con él si quieres proceder. Su oferta ha sido anulada, al haber encontrado a un interesado.`
      await transporter.sendMail({
        from: 'Cambio de grupos UC',
        to: correoCreador, // list of receivers
        subject: "Cambio de grupos UC", // Subject line
        html: text, // html body
      });
}

module.exports = {enviarMensaje}