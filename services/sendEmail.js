import nodemailer from "nodemailer";

//================================================
export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abdofathey10@gmail.com",
      pass: "zooq skyb zcnb fxyj",
    },
  });

  const info = await transporter.sendMail({
    from: '" abdo 👻" <abdofathey10@gmail.com>',
    to: to ? to : "",
    subject: subject ? subject : " hi ",
    html: html ? html : "hello ",
  });
  //========================
  if (info.accepted.length) {
    return true;
  } else {
    return false;
  }
};
