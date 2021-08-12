const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client({intents: ["GUILDS","GUILD_MESSAGES"],partials:["CHANNEL"]});

client.on('ready',() => {
	console.log(`Logged in as ${client.user.tag})!`);
});

client.on('messageCreate' || 'messageUpdate', gotMessage);

async function gotMessage(msg) {
	if (msg.content.startsWith("!pear")) {
		let filter = (msg) => !msg.author.bot;
		let options = {
			max: 1,
			time: 30000,
			errors: ['time']
		};


		var questions = [
			{key: "Name",
			prompt: "What is your name?"},
			{key: "Cohort", 
			prompt: "What cohort are you from / apply to?"},
			{key: "UTC",
			prompt: "What time zone are you in?"},
			{key: "Days",
			prompt: "What days are you free?"},
			{key: "Start",
			prompt: "From what time are you free?"},
			{key: "End",
			prompt: "Until what time are you free?"}
			];

		var ks = ["Name","Cohort","UTC","Days","Start","End"];
		var messages = ["What is your name?","What cohort are you from / applying to?","What time zone are you in? (UTC)","What days are you free?","What start time are you free?","What end time are you free?"];
		var kcounter = 0;

		for (question in questions) {
			msg.reply(questions[question]["prompt"], {fetchReply: true})
			const res = await msg.channel.awaitMessages({filter, ...options})
				.catch(collected => {
					msg.channel.send("Looks like you took too long. Please try again by typing '!pear'!");
				});
			questions[question]["answer"] = res.first().content;
		};

		console.log(questions);

		const data = {};
		questions.map(v => data[v.key] = v.answer);

		console.log(data);

	};
};
		// 	const collector = msg.channel.awaitMessages(msg.channel,filter, options)
		// 	.then(collected => {
		// 		var k = ks[kcounter];
		// 		data = {k: msg.content};
		// 		console.log(data[k]);
		// 		kcounter++;
		// 	}).catch(err => {
		// 		console.log(err);
		// 	});
		// };
			// console.log(collector)
			// collector.on('collect', msg => {

			// var k = ks[kcounter];
			// data = {k: msg.content};
			// console.log(data[k]);
			// kcounter++;
			// });
		

		// collector.on('end', (collected) => {
		// 	console.log(`Collected ${collected.size} items`);
		// });
// function gotMessage(msg) {
// 	if (msg.content.startsWith("pear")) {
// 		message = msg.content.split("\n");
// 		for (const element of message) {
// 			if (element.split(": ")[0] === "Name") {
// 				console.log(element.split(": ")[1]);
// 			}
		
// 		}
// 	}
// 

client.login(process.env.TOKEN);




