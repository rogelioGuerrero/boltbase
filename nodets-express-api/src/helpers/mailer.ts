import nodemailer, { SendMailOptions } from 'nodemailer';
import { Address } from 'nodemailer/lib/mailer';
import config from '../config';
export default async function sendMail(recEmail: string | Address | Array<string | Address> | undefined, subject: string, msg: string) {
	const transporter = nodemailer.createTransport({
		host: config.mail.host,
		port: Number(config.mail.port),
		secure: config.mail.secure,
		auth: {
			user: config.mail.username,
			pass: config.mail.password
		},
		logger: true,
		debug: true,
	});

	let sender = `"${config.mail.sendername}" <${config.mail.senderemail}>`
	let mailOptions = {
		from: sender,
		to: recEmail,
		subject: subject,
		html: msg
	} as SendMailOptions;
	const info = await transporter.sendMail(mailOptions);
	return info;
}