const yf = require("node-yahoo-finance");
const nodemailer = require("nodemailer");

const getPrice = async (symbol) => {
  const result = await yf.getInfo(symbol + ".jk");
  return result.currentPrice;
};

const sendEmail = async (account, emailAddress, symbol) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const price = await getPrice(symbol);

  let mailOptions = {
    from: account.user,
    to: emailAddress,
    subject: `Laporan Saham`,
    html: `Harga Saham ${symbol} hari ini ${price}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};


const execute = async () => {
    const [,,user, pass, email, symbol] = process.argv;
    await sendEmail({user, pass}, email, symbol);
}

execute()