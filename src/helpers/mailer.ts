import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import base64url from "base64-url";

export const sendEmail = async ({
  email,
  emailType,
  userId,
  user_address,
  user_private,
}: {
  email: string;
  emailType: string;
  userId: any;
  user_address: string;
  user_private: string;
}) => {
  try {
    const unsafetoken = await bcryptjs.hash(userId.toHexString(), 10);
    const hashedToken = base64url.encode(unsafetoken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USERNAME!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    });

    const mailoption = {
      from: "ycoinaccounts@ycoin.ai", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password", // Subject line
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to Verify your Email<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p><br><br><p>Your User Address: ${user_address}</p><br><p>Your user Private: ${user_private}</p>`
          : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to Reset Your Password<br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p><br><br><p>Your User Address: ${user_address}</p><br><p>Your user Private: ${user_private}</p>`,
    };

    const mailresponse = await transporter.sendMail(mailoption);
  } catch (err) {
    console.log(err);
  }
};
