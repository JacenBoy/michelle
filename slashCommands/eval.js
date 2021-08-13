// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS

// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
exports.run = async (interaction) => {
  const fetch = require("node-fetch");
  const code = interaction.options.getString("code");
  await interaction.deferReply();
  try {
    const evaled = eval(code);
    const clean = await interaction.client.clean(interaction.client, evaled);
    if (clean.length > 1090) { 
      try {
        const {key} = await fetch("https://hasteb.in/documents", {
          method: "POST",
          body: clean,
          headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        if (!key) throw "Error posting the response";
        interaction.editReply(`\`\`\`\nResponse too long. Uploaded output to https://hasteb.in/${key}.js.\n\`\`\``);
      } catch (ex) {
        interaction.client.logger.debug(clean);
        interaction.editReply("```\nResponse too long. Check the console for full output.\n```");
      }
      
    } else {
      interaction.editReply(`\`\`\`js\n${clean}\n\`\`\``);
    }
  } catch (err) {
    interaction.editReply(`\`ERROR\` \`\`\`xl\n${await interaction.client.clean(interaction.client, err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "Owner",
  options: [
    {
      name: "code",
      description: "The code to evaluate",
      type: "STRING",
      required: true
    }
  ]
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]"
};
